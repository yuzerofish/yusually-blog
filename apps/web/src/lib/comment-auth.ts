import "@tanstack/react-start/server-only";
import {
  assertPassword,
  authErrorMessage,
  digestText,
  extractSetCookieHeaders,
  normalizeEmail,
  toIsoString,
} from "@repo/core";
import { createAuthDb } from "@repo/db";
import { user as authUserTable } from "@repo/db/schema";
import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";

import { auth } from "#/lib/auth";
import {
  deleteCommentEmailVerification,
  isCommentEmailVerificationRequired,
  sendCommentEmailVerification,
} from "#/lib/email-verification";

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
  emailVerified?: boolean;
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

  if (!session?.user) {
    return null;
  }

  const user = await toCommentUser(session.user);

  if (
    user.provider === "email" &&
    !session.user.emailVerified &&
    (await isCommentEmailVerificationRequired())
  ) {
    return null;
  }

  return user;
}

export async function signupCommentUser(input: CommentUserInput, request: Request) {
  const email = normalizeEmail(input.email);
  const name = input.name?.trim() || email.split("@")[0] || email;
  const password = input.password ?? "";

  assertPassword(password);

  const context = await auth.$context;
  const existing = await context.internalAdapter.findUserByEmail(email);
  const verificationRequired = await isCommentEmailVerificationRequired();

  if (existing) {
    const existingUser = toBetterAuthUser(existing);

    if (verificationRequired && existingUser && !existingUser.emailVerified) {
      const verification = await sendCommentEmailVerification({
        email,
        name: existingUser.name || name,
        request,
        userId: existingUser.id,
      });

      if (!verification.sent) {
        await deleteCommentEmailVerification(existingUser.id).catch(() => undefined);
        return { error: "Verification email could not be sent" } as const;
      }

      return {
        data: await toCommentUser(existingUser),
        verificationRequired: true,
      } as const;
    }

    return { error: "Comment account already exists" } as const;
  }

  const hashedPassword = await context.password.hash(password);
  const user = await context.internalAdapter.createUser({
    name,
    email,
    emailVerified: !verificationRequired,
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

  if (verificationRequired) {
    const verification = await sendCommentEmailVerification({
      email,
      name,
      request,
      userId: user.id,
    });

    if (!verification.sent) {
      await deleteCommentEmailVerification(user.id).catch(() => undefined);
      await context.internalAdapter.deleteUser(user.id).catch(() => undefined);
      return { error: "Verification email could not be sent" } as const;
    }

    return {
      data: await toCommentUser({ ...user, emailVerified: false }),
      verificationRequired: true,
    } as const;
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

  if (!payload.user.emailVerified && (await isCommentEmailVerificationRequired())) {
    return {
      error: "Email verification is required. Check your inbox for the verification link.",
    } as const;
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

function toBetterAuthUser(value: unknown) {
  const record = value as ({ user?: BetterAuthUser } & Partial<BetterAuthUser>) | null;

  if (record?.user) {
    return record.user;
  }

  if (record?.id && record.email && record.name) {
    return record as BetterAuthUser;
  }

  return null;
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
