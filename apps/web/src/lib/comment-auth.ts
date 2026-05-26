import "@tanstack/react-start/server-only";
import { createAuthDb } from "@repo/db";
import { user as authUserTable } from "@repo/db/schema";
import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";

import { auth } from "#/lib/auth";

export type CommentUser = {
  id: string;
  name: string;
  email: string;
  emailHash: string;
  avatarUrl: string | null;
  provider: "email" | "github";
  createdAt: string;
  lastLoginAt: string | null;
};

type CommentUserInput = {
  email?: string;
  name?: string;
  password?: string;
};

type BetterAuthUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  createdAt?: Date | string | number;
};

type AuthUserPayload = {
  user?: BetterAuthUser;
  message?: string;
  error?: string;
  code?: string;
};

type SocialSignInPayload = {
  url?: string;
  message?: string;
  error?: string;
  code?: string;
};

const authDb = createAuthDb(env.CMS_DB as Parameters<typeof createAuthDb>[0]);

export async function getCommentUserFromRequest(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  return session?.user ? toCommentUser(session.user) : null;
}

export async function signupCommentUser(input: CommentUserInput, request: Request) {
  const email = normalizeEmail(input.email);
  const name = input.name?.trim() || email.split("@")[0] || email;
  const password = input.password ?? "";

  assertPassword(password);

  const context = await auth.$context;
  const existing = await context.internalAdapter.findUserByEmail(email);

  if (existing) {
    return { error: "Comment account already exists" } as const;
  }

  const hashedPassword = await context.password.hash(password);
  const user = await context.internalAdapter.createUser({
    name,
    email,
    emailVerified: true,
  });

  try {
    await authDb.update(authUserTable).set({ role: "reader" }).where(eq(authUserTable.id, user.id));
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

  return loginCommentUser({ email, password }, request);
}

export async function loginCommentUser(
  input: { email?: string; password?: string },
  request: Request,
) {
  const response = await callAuthEndpoint(
    "/api/auth/sign-in/email",
    { email: normalizeEmail(input.email), password: input.password ?? "" },
    request,
  );
  const payload = await readAuthPayload<AuthUserPayload>(response);

  if (!response.ok || !payload?.user) {
    return { error: authErrorMessage(payload, "Invalid email or password") } as const;
  }

  return {
    data: await toCommentUser(payload.user),
    headers: extractSetCookieHeaders(response),
  } as const;
}

export async function logoutCommentUser(request: Request) {
  const response = await callAuthEndpoint("/api/auth/sign-out", {}, request);

  return {
    headers: extractSetCookieHeaders(response),
  };
}

export async function redirectToGitHubForCommentLogin(request: Request) {
  if (!hasGitHubProvider()) {
    return Response.json({ error: "GitHub login is not configured" }, { status: 503 });
  }

  const url = new URL(request.url);
  const redirectTo = safeRedirectPath(url.searchParams.get("redirectTo") ?? "/");
  const callbackURL = new URL(redirectTo, request.url).toString();
  const errorCallbackURL = new URL(redirectTo, request.url);

  errorCallbackURL.searchParams.set("commentAuth", "github_error");

  const response = await callAuthEndpoint(
    "/api/auth/sign-in/social",
    {
      callbackURL,
      errorCallbackURL: errorCallbackURL.toString(),
      provider: "github",
    },
    request,
  );
  const payload = await readAuthPayload<SocialSignInPayload>(response);

  if (!response.ok || !payload?.url) {
    return Response.json(
      { error: authErrorMessage(payload, "GitHub login failed") },
      { status: response.ok ? 500 : response.status },
    );
  }

  const redirect = Response.redirect(payload.url, 302);

  for (const cookie of getSetCookieValues(response.headers)) {
    redirect.headers.append("set-cookie", cookie);
  }

  return redirect;
}

export function publicCommentUser(user: CommentUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
    provider: user.provider,
  };
}

async function toCommentUser(user: BetterAuthUser): Promise<CommentUser> {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    emailHash: await digestText(user.email),
    avatarUrl: user.image ?? null,
    provider: await resolvePrimaryProvider(user.id),
    createdAt: toIsoString(user.createdAt),
    lastLoginAt: null,
  };
}

async function resolvePrimaryProvider(userId: string): Promise<CommentUser["provider"]> {
  const context = await auth.$context;
  const accounts = await context.internalAdapter.findAccounts(userId);

  return accounts.some((account) => account.providerId === "github") ? "github" : "email";
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

async function readAuthPayload<TPayload extends AuthUserPayload | SocialSignInPayload>(
  response: Response,
) {
  try {
    return (await response.clone().json()) as TPayload;
  } catch {
    return null;
  }
}

function authErrorMessage(
  payload: Pick<AuthUserPayload, "code" | "error" | "message"> | null,
  fallback: string,
) {
  return payload?.message || payload?.error || payload?.code || fallback;
}

function extractSetCookieHeaders(response: Response) {
  const headers = new Headers();

  for (const cookie of getSetCookieValues(response.headers)) {
    headers.append("set-cookie", cookie);
  }

  return headers;
}

function getSetCookieValues(headers: Headers) {
  const getSetCookie = (
    headers as Headers & {
      getSetCookie?: () => string[];
    }
  ).getSetCookie;
  const cookies = getSetCookie ? getSetCookie.call(headers) : [];
  const fallback = headers.get("set-cookie");

  return cookies.length ? cookies : fallback ? [fallback] : [];
}

function hasGitHubProvider() {
  return Boolean(env.GITHUB_CLIENT_ID?.trim() && env.GITHUB_CLIENT_SECRET?.trim());
}

function safeRedirectPath(value: string) {
  if (!value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }

  return value;
}

async function digestText(value: string) {
  const data = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function toIsoString(value: Date | string | number | undefined) {
  if (!value) {
    return new Date().toISOString();
  }

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toISOString();
}
