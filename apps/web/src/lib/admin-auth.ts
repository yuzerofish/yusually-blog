import "@tanstack/react-start/server-only";
import { createAuthDb } from "@repo/db";
import { user as authUserTable } from "@repo/db/schema";
import { env } from "cloudflare:workers";
import { count, eq } from "drizzle-orm";

import { auth } from "#/lib/auth";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "admin";
  createdAt: string;
  lastLoginAt: string | null;
};

type AdminUserInput = {
  name?: string;
  email?: string;
  password?: string;
};

type BetterAuthUser = {
  id: string;
  name: string;
  email: string;
  role?: string;
  createdAt?: Date | string | number;
};

type AuthUserPayload = {
  user?: BetterAuthUser;
  message?: string;
  error?: string;
  code?: string;
};

const authDb = createAuthDb(env.CMS_DB as Parameters<typeof createAuthDb>[0]);

export async function countAdminUsers() {
  const [row] = await authDb
    .select({ value: count() })
    .from(authUserTable)
    .where(eq(authUserTable.role, "admin"));
  return Number(row?.value ?? 0);
}

export async function createAdminUser(input: AdminUserInput) {
  const email = normalizeEmail(input.email);
  const name = input.name?.trim() || email;
  const password = input.password ?? "";

  assertPassword(password);

  const context = await auth.$context;
  const existing = await context.internalAdapter.findUserByEmail(email);

  if (existing) {
    return { error: "Admin user already exists" } as const;
  }

  const hashedPassword = await context.password.hash(password);
  const user = await context.internalAdapter.createUser({
    name,
    email,
    emailVerified: true,
  });

  try {
    await authDb.update(authUserTable).set({ role: "admin" }).where(eq(authUserTable.id, user.id));
    await context.internalAdapter.linkAccount({
      userId: user.id,
      accountId: user.id,
      providerId: "credential",
      password: hashedPassword,
    });
  } catch (error) {
    await context.internalAdapter.deleteUser(user.id).catch(() => undefined);
    throw error;
  }

  return { data: toAdminUser({ ...user, role: "admin" }) } as const;
}

export async function resetAdminPassword(
  emailInput: string | undefined,
  password: string | undefined,
) {
  const email = normalizeEmail(emailInput);
  assertPassword(password ?? "");

  const context = await auth.$context;
  const record = await context.internalAdapter.findUserByEmail(email, {
    includeAccounts: true,
  });

  if (!record) {
    return { error: "Admin user not found" } as const;
  }

  if (!isAdminUser(record.user)) {
    return { error: "Admin user not found" } as const;
  }

  const hashedPassword = await context.password.hash(password ?? "");
  const credentialAccount = record.accounts.find((account) => account.providerId === "credential");

  if (credentialAccount) {
    await context.internalAdapter.updatePassword(record.user.id, hashedPassword);
  } else {
    await context.internalAdapter.createAccount({
      userId: record.user.id,
      accountId: record.user.id,
      providerId: "credential",
      password: hashedPassword,
    });
  }

  await context.internalAdapter.deleteSessions(record.user.id);

  return { data: toAdminUser(record.user) } as const;
}

export async function loginAdmin(input: { email?: string; password?: string }, request: Request) {
  const email = normalizeEmail(input.email);
  const response = await callAuthEndpoint(
    "/api/auth/sign-in/email",
    { email, password: input.password ?? "" },
    request,
  );
  const payload = await readAuthPayload(response);

  if (!response.ok || !payload?.user || !isAdminUser(payload.user)) {
    if (response.ok && payload?.user) {
      await callAuthEndpoint("/api/auth/sign-out", {}, request);
    }

    return { error: authErrorMessage(payload, "Invalid email or password") } as const;
  }

  return {
    data: toAdminUser(payload.user),
    headers: extractSetCookieHeaders(response),
  } as const;
}

export async function logoutAdmin(request: Request) {
  const response = await callAuthEndpoint("/api/auth/sign-out", {}, request);

  return {
    headers: extractSetCookieHeaders(response),
  };
}

export async function getAdminUserFromRequest(
  request: Request,
  query?: {
    disableCookieCache?: boolean;
    disableRefresh?: boolean;
  },
) {
  const session = await auth.api.getSession({
    headers: request.headers,
    query,
  });

  return session?.user && isAdminUser(session.user) ? toAdminUser(session.user) : null;
}

export function publicAdminUser(user: AdminUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt,
  };
}

export async function getAdminUserByEmail(emailInput: string | undefined) {
  const email = normalizeEmail(emailInput);
  const context = await auth.$context;
  const record = await context.internalAdapter.findUserByEmail(email);

  return record?.user && isAdminUser(record.user) ? toAdminUser(record.user) : null;
}

function isAdminUser(user: BetterAuthUser) {
  return user.role === "admin";
}

function toAdminUser(user: BetterAuthUser): AdminUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: "admin",
    createdAt: toIsoString(user.createdAt),
    lastLoginAt: null,
  };
}

function normalizeEmail(value: string | undefined) {
  const email = value?.trim().toLowerCase() ?? "";

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    throw new Error("A valid email is required");
  }

  return email;
}

function assertPassword(password: string) {
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
}

async function callAuthEndpoint(path: string, body: object, request: Request) {
  const url = new URL(path, request.url);
  const headers = new Headers(request.headers);
  headers.set("content-type", "application/json");

  return auth.handler(
    new Request(url, {
      body: JSON.stringify(body),
      headers,
      method: "POST",
    }),
  );
}

async function readAuthPayload(response: Response) {
  try {
    return (await response.clone().json()) as AuthUserPayload;
  } catch {
    return null;
  }
}

function authErrorMessage(payload: AuthUserPayload | null, fallback: string) {
  return payload?.message || payload?.error || payload?.code || fallback;
}

function extractSetCookieHeaders(response: Response) {
  const headers = new Headers();
  const getSetCookie = (
    response.headers as Headers & {
      getSetCookie?: () => string[];
    }
  ).getSetCookie;
  const cookies = getSetCookie ? getSetCookie.call(response.headers) : [];
  const fallback = response.headers.get("set-cookie");

  for (const cookie of cookies.length ? cookies : fallback ? [fallback] : []) {
    headers.append("set-cookie", cookie);
  }

  return headers;
}

function toIsoString(value: Date | string | number | undefined) {
  if (!value) {
    return new Date().toISOString();
  }

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toISOString();
}
