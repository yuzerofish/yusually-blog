import "@tanstack/react-start/server-only";
import { digestText } from "@repo/core";
import { createAuthDb } from "@repo/db";
import { user as authUserTable, verification } from "@repo/db/schema";
import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";

import { getD1SiteSettings } from "#/lib/cms-d1";
import {
  getEmailDeliveryStatus,
  sendEmailVerificationEmail,
  type EmailDeliveryStatus,
} from "#/lib/cms-email";

const emailVerificationTtlMinutes = 30;

function getAuthDb() {
  return createAuthDb(env.CMS_DB as Parameters<typeof createAuthDb>[0]);
}

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

  const db = getAuthDb();
  const identifier = emailVerificationIdentifier(input.userId);

  await db.delete(verification).where(eq(verification.identifier, identifier));
  await db.insert(verification).values({
    id: `verification_${crypto.randomUUID()}`,
    identifier,
    value: tokenHash,
    expiresAt: new Date(expiresAt),
    createdAt: new Date(now),
    updatedAt: new Date(now),
  });

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

  const db = getAuthDb();
  const identifier = emailVerificationIdentifier(userId);

  const rows = await db
    .select({ value: verification.value, expiresAt: verification.expiresAt })
    .from(verification)
    .where(eq(verification.identifier, identifier))
    .limit(1);
  const row = rows[0];

  if (!row || row.expiresAt < new Date()) {
    await deleteCommentEmailVerification(userId);
    return { ok: false, error: "Email verification link is invalid or expired." } as const;
  }

  const tokenHash = await digestText(token);

  if (tokenHash !== row.value) {
    return { ok: false, error: "Email verification link is invalid or expired." } as const;
  }

  await db
    .update(authUserTable)
    .set({ emailVerified: true, updatedAt: new Date() })
    .where(eq(authUserTable.id, userId));
  await deleteCommentEmailVerification(userId);

  return { ok: true } as const;
}

export async function deleteCommentEmailVerification(userId: string) {
  const db = getAuthDb();
  await db
    .delete(verification)
    .where(eq(verification.identifier, emailVerificationIdentifier(userId)));
}

function emailVerificationIdentifier(userId: string) {
  return `comment-email-verification:${userId}`;
}

function publicSiteUrl(request: Request) {
  return (
    env.CMS_PUBLIC_SITE_URL?.replace(/\/$/, "") || env.VITE_BASE_URL || new URL(request.url).origin
  );
}
