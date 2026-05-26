import "@tanstack/react-start/server-only";
import { createBlogAuth } from "@repo/auth/auth";
import { createAuthDb } from "@repo/db";
import { env } from "cloudflare:workers";

const database = env.CMS_DB as Parameters<typeof createAuthDb>[0];

export const auth = createBlogAuth(createAuthDb(database), {
  baseURL: env.VITE_BASE_URL || env.CMS_PUBLIC_SITE_URL,
  githubClientId: env.GITHUB_CLIENT_ID,
  githubClientSecret: env.GITHUB_CLIENT_SECRET,
  secret: env.BETTER_AUTH_SECRET,
});
