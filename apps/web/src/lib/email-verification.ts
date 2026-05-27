import "@tanstack/react-start/server-only";
import { digestText } from "@repo/core";
import { env } from "cloudflare:workers";

import { getD1SiteSettings } from "#/lib/cms-d1";
import {
  getEmailDeliveryStatus,
  sendEmailVerificationEmail,
  type EmailDeliveryStatus,
} from "#/lib/cms-email";

const emailVerificationTtlMinutes = 30;

export type EmailVerificationStatus = {
  enabled: boolean;
  requested: boolean;
  delivery: EmailDeliveryStatus;
};

export async function getEmailVerificationStatus(): Promise<EmailVerificationStatus> {
  const [settings, delivery] = await Promise.all([
    getD1SiteSettings(),
    Promise.resolve(getEmailDeliveryStatus()),
  ]);

  return {
    delivery,
    enabled: settings.emailVerificationEnabled && delivery.configured,
    requested: settings.emailVerificationEnabled,
  };
}

export async function isCommentEmailVerificationRequired() {
  const status = await getEmailVerificationStatus();

  return status.enabled;
}

export async function sendCommentEmailVerification(input: {
  userId: string;
  email: string;
  name: string;
  request: Request;
}) {
  const settings = await getD1SiteSettings();
  const token = `verify_${crypto.randomUUID().replace(/-/g, "")}${crypto
    .randomUUID()
    .replace(/-/g, "")}`;
  const tokenHash = await digestText(token);
  const now = Date.now();
  const expiresAt = now + emailVerificationTtlMinutes * 60 * 1000;
  const verifyUrl = new URL("/api/comment-auth/verify-email", publicSiteUrl(input.request));

  verifyUrl.searchParams.set("userId", input.userId);
  verifyUrl.searchParams.set("token", token);

  await env.CMS_DB.prepare("delete from verification where identifier = ?")
    .bind(emailVerificationIdentifier(input.userId))
    .run();
  await env.CMS_DB.prepare(
    "insert into verification (id, identifier, value, expires_at, created_at, updated_at) values (?, ?, ?, ?, ?, ?)",
  )
    .bind(
      `verification_${crypto.randomUUID()}`,
      emailVerificationIdentifier(input.userId),
      tokenHash,
      expiresAt,
      now,
      now,
    )
    .run();

  const result = await sendEmailVerificationEmail({
    email: input.email,
    name: input.name,
    siteName: settings.name,
    ttlMinutes: emailVerificationTtlMinutes,
    verifyUrl: verifyUrl.toString(),
  });

  if (!result.sent) {
    await deleteCommentEmailVerification(input.userId);
  }

  return result;
}

export async function confirmCommentEmailVerification(input: { userId: string; token: string }) {
  const token = input.token.trim();
  const userId = input.userId.trim();

  if (!token || !userId) {
    return { ok: false, error: "Email verification link is invalid or expired." } as const;
  }

  const row = await env.CMS_DB.prepare(
    "select value, expires_at from verification where identifier = ? limit 1",
  )
    .bind(emailVerificationIdentifier(userId))
    .first<{ value: string; expires_at: number }>();

  if (!row || row.expires_at < Date.now()) {
    await deleteCommentEmailVerification(userId);
    return { ok: false, error: "Email verification link is invalid or expired." } as const;
  }

  const tokenHash = await digestText(token);

  if (tokenHash !== row.value) {
    return { ok: false, error: "Email verification link is invalid or expired." } as const;
  }

  await env.CMS_DB.prepare(
    'update "user" set email_verified = 1, updated_at = ? where id = ? and role = ?',
  )
    .bind(Date.now(), userId, "reader")
    .run();
  await deleteCommentEmailVerification(userId);

  return { ok: true } as const;
}

export async function deleteCommentEmailVerification(userId: string) {
  await env.CMS_DB.prepare("delete from verification where identifier = ?")
    .bind(emailVerificationIdentifier(userId))
    .run();
}

function emailVerificationIdentifier(userId: string) {
  return `comment-email-verification:${userId}`;
}

function publicSiteUrl(request: Request) {
  return (
    env.CMS_PUBLIC_SITE_URL?.replace(/\/$/, "") || env.VITE_BASE_URL || new URL(request.url).origin
  );
}
