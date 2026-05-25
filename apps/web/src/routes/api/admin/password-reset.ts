import { createFileRoute } from "@tanstack/react-router";
import { env } from "cloudflare:workers";

import { getAdminUserByEmail, publicAdminUser, resetAdminPassword } from "#/lib/admin-auth";
import { jsonResponse, readJsonBody } from "#/lib/cms-api";
import { sendPasswordResetEmail } from "#/lib/cms-email";

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
  const user = await getAdminUserByEmail(email).catch(() => null);
  let emailSent = false;

  if (user) {
    const token = `reset_${crypto.randomUUID().replace(/-/g, "")}`;
    await env.CMS_CACHE.put(passwordResetKey(token), user.email, {
      expirationTtl: ttlMinutes * 60,
    });

    const result = await sendPasswordResetEmail({
      email: user.email,
      token,
      siteUrl: publicSiteUrl(request),
      ttlMinutes,
    });
    emailSent = result.sent;
  }

  return jsonResponse(
    {
      data: {
        accepted: true,
        emailSent,
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
