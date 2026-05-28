import { digestText } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";
import { env } from "cloudflare:workers";

import { getAdminUserByEmail, publicAdminUser, resetAdminPassword } from "#/lib/admin-auth";
import { jsonResponse, readJsonBody } from "#/lib/cms-api";
import { sendPasswordResetEmail } from "#/lib/cms-email";
import { getClientIp } from "#/lib/comment-guard";

const passwordResetWindowSeconds = 60 * 60;
const passwordResetIpLimit = 5;
const passwordResetEmailLimit = 3;

export const Route = createFileRoute("/api/admin/password-reset")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const body = await readJsonBody<{
          email?: string;
          token?: string;
          password?: string;
        }>(request);

        if (body.token) {
          return confirmPasswordReset(body.token, body.password);
        }

        return requestPasswordReset(body.email, request);
      },
    },
  },
});

async function requestPasswordReset(email: string | undefined, request: Request) {
  const ttlMinutes = readPasswordResetTtlMinutes();
  const rateLimited = await isPasswordResetRateLimited(email, request).catch(() => false);
  const user = await getAdminUserByEmail(email).catch(() => null);

  if (user && !rateLimited) {
    const token = `reset_${crypto.randomUUID().replace(/-/g, "")}`;
    await env.CMS_CACHE.put(passwordResetKey(token), user.email, {
      expirationTtl: ttlMinutes * 60,
    });

    await sendPasswordResetEmail({
      email: user.email,
      token,
      siteUrl: publicSiteUrl(request),
      ttlMinutes,
    });
  }

  return jsonResponse(
    {
      data: {
        accepted: true,
        expiresInMinutes: ttlMinutes,
      },
    },
    { status: 202 },
  );
}

async function confirmPasswordReset(token: string, password: string | undefined) {
  const email = await env.CMS_CACHE.get(passwordResetKey(token.trim()));

  if (!email) {
    return jsonResponse({ error: "Password reset link is invalid or expired." }, { status: 400 });
  }

  const result = await resetAdminPassword(email, password);

  if ("error" in result) {
    return jsonResponse({ error: result.error }, { status: 400 });
  }

  await env.CMS_CACHE.delete(passwordResetKey(token.trim()));

  return jsonResponse({
    data: publicAdminUser(result.data),
  });
}

function passwordResetKey(token: string) {
  return `admin-password-reset:${token}`;
}

function publicSiteUrl(request: Request) {
  return env.CMS_PUBLIC_SITE_URL?.replace(/\/$/, "") || new URL(request.url).origin;
}

function readPasswordResetTtlMinutes() {
  const value = Number(
    (env as unknown as CloudflareBindings).CMS_PASSWORD_RESET_TTL_MINUTES || "30",
  );

  if (!Number.isFinite(value) || value < 5) {
    return 30;
  }

  return Math.min(Math.floor(value), 120);
}

async function isPasswordResetRateLimited(email: string | undefined, request: Request) {
  const normalizedEmail = email?.trim().toLowerCase() ?? "";
  const ip = getClientIp(request);
  const [ipLimited, emailLimited] = await Promise.all([
    consumePasswordResetBucket("ip", ip, passwordResetIpLimit),
    normalizedEmail
      ? consumePasswordResetBucket("email", normalizedEmail, passwordResetEmailLimit)
      : false,
  ]);

  return ipLimited || emailLimited;
}

async function consumePasswordResetBucket(kind: string, value: string, limit: number) {
  const key = `admin-password-reset-rate:${kind}:${await digestText(value)}`;
  const current = Number(await env.CMS_CACHE.get(key).catch(() => null));

  if (Number.isFinite(current) && current >= limit) {
    return true;
  }

  await env.CMS_CACHE.put(key, String((Number.isFinite(current) ? current : 0) + 1), {
    expirationTtl: passwordResetWindowSeconds,
  });

  return false;
}
