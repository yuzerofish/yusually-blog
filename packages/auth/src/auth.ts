import "@tanstack/react-start/server-only";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import type { AuthDatabase } from "@repo/db";
import { account, session, user, verification } from "@repo/db/schema";
import { betterAuth } from "better-auth/minimal";
import { tanstackStartCookies } from "better-auth/tanstack-start";

export type BlogAuthEnv = {
  baseURL?: string;
  githubClientId?: string;
  githubClientSecret?: string;
  secret?: string;
};

const authSchema = {
  user,
  session,
  account,
  verification,
};

export function createBlogAuth(database: AuthDatabase, env: BlogAuthEnv) {
  const baseURL = normalizeBaseURL(env.baseURL);

  return betterAuth({
    baseURL,
    secret: resolveSecret(env.secret, baseURL),
    telemetry: {
      enabled: false,
    },
    database: drizzleAdapter(database, {
      provider: "sqlite",
      schema: authSchema,
      transaction: false,
    }),

    user: {
      additionalFields: {
        role: {
          type: "string",
          input: false,
          required: true,
          defaultValue: "reader",
        },
      },
    },

    // https://www.better-auth.com/docs/integrations/tanstack#usage-tips
    plugins: [tanstackStartCookies()],

    // https://www.better-auth.com/docs/concepts/session-management#session-caching
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
      },
    },

    socialProviders: getSocialProviders(env),

    // Admin and reader bootstrap go through app-owned routes; the public Better Auth sign-up route stays closed.
    emailAndPassword: {
      enabled: true,
      disableSignUp: true,
      minPasswordLength: 8,
      revokeSessionsOnPasswordReset: true,
    },

    experimental: {
      // https://www.better-auth.com/docs/adapters/drizzle#joins-experimental
      joins: true,
    },
  });
}

function getSocialProviders(env: BlogAuthEnv) {
  const githubClientId = env.githubClientId?.trim();
  const githubClientSecret = env.githubClientSecret?.trim();

  if (!githubClientId || !githubClientSecret) {
    return undefined;
  }

  return {
    github: {
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    },
  };
}

function normalizeBaseURL(value: string | undefined) {
  return value?.trim().replace(/\/$/, "") || undefined;
}

function resolveSecret(secret: string | undefined, baseURL: string | undefined) {
  const value = secret?.trim();

  if (value) {
    return value;
  }

  if (isLocalBaseURL(baseURL)) {
    return "blog-starter-local-dev-better-auth-secret";
  }

  throw new Error("BETTER_AUTH_SECRET is required for Better Auth");
}

function isLocalBaseURL(baseURL: string | undefined) {
  if (!baseURL) {
    return false;
  }

  try {
    const hostname = new URL(baseURL).hostname;
    return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
  } catch {
    return false;
  }
}
