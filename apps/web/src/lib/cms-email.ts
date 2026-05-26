import "@tanstack/react-start/server-only";
import type { Comment, Post } from "@repo/core";
import { env } from "cloudflare:workers";

type EmailMessageBuilder = {
  to: string | string[];
  from: string | { email: string; name: string };
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string | { email: string; name: string };
};

type SendEmailBinding = {
  send(message: EmailMessageBuilder): Promise<{ messageId: string }>;
};

type EmailResult =
  | { sent: true; messageId: string }
  | { sent: false; reason: "disabled" | "not_configured" | "failed"; error?: string };

type EmailContext = {
  subject: string;
  text: string;
  html?: string;
  to?: string;
};

export async function sendCmsEmail(input: EmailContext): Promise<EmailResult> {
  const bindings = env as unknown as CloudflareBindings & { CMS_EMAIL?: SendEmailBinding };

  if (bindings.CMS_EMAIL_SENDING_ENABLED !== "true") {
    return { sent: false, reason: "disabled" };
  }

  const from = bindings.CMS_EMAIL_FROM?.trim();
  const to = input.to?.trim() || bindings.CMS_EMAIL_TO?.trim();

  if (!bindings.CMS_EMAIL || !from || !to) {
    return { sent: false, reason: "not_configured" };
  }

  try {
    const result = await bindings.CMS_EMAIL.send({
      to,
      from,
      subject: input.subject,
      text: input.text,
      html: input.html,
    });

    return { sent: true, messageId: result.messageId };
  } catch (error) {
    return {
      sent: false,
      reason: "failed",
      error: error instanceof Error ? error.message : "Email send failed",
    };
  }
}

export async function notifyCommentCreated(input: {
  comment: Comment;
  postTitle: string;
  siteUrl: string;
}) {
  const moderationUrl = `${input.siteUrl.replace(/\/$/, "")}/admin/comments`;

  return sendCmsEmail({
    subject: `New comment awaiting review: ${input.postTitle}`,
    text: [
      `Post: ${input.postTitle}`,
      `Author: ${input.comment.authorName}`,
      `Comment: ${input.comment.body}`,
      `Review: ${moderationUrl}`,
    ].join("\n"),
    html: [
      `<p><strong>Post:</strong> ${escapeHtml(input.postTitle)}</p>`,
      `<p><strong>Author:</strong> ${escapeHtml(input.comment.authorName)}</p>`,
      `<p>${escapeHtml(input.comment.body)}</p>`,
      `<p><a href="${escapeHtml(moderationUrl)}">Review comment</a></p>`,
    ].join(""),
  });
}

export async function notifyImportCompleted(input: {
  kind: "markdown" | "html" | "zip";
  post: Post;
  siteUrl: string;
}) {
  const postUrl = `${input.siteUrl.replace(/\/$/, "")}/blog/${input.post.slug}`;

  return sendCmsEmail({
    subject: `Import completed: ${input.post.title}`,
    text: [
      `Import type: ${input.kind}`,
      `Post: ${input.post.title}`,
      `Status: ${input.post.status}`,
      `URL: ${postUrl}`,
    ].join("\n"),
    html: [
      `<p><strong>Import type:</strong> ${escapeHtml(input.kind)}</p>`,
      `<p><strong>Post:</strong> ${escapeHtml(input.post.title)}</p>`,
      `<p><strong>Status:</strong> ${escapeHtml(input.post.status)}</p>`,
      `<p><a href="${escapeHtml(postUrl)}">Open post</a></p>`,
    ].join(""),
  });
}

export async function notifyExportCompleted(input: {
  format: "json" | "zip";
  backupKey: string | null;
  siteUrl: string;
}) {
  return sendCmsEmail({
    subject: `Export completed: ${input.format.toUpperCase()}`,
    text: [
      `Format: ${input.format}`,
      `Backup key: ${input.backupKey ?? "not stored"}`,
      `Site: ${input.siteUrl}`,
    ].join("\n"),
    html: [
      `<p><strong>Format:</strong> ${escapeHtml(input.format)}</p>`,
      `<p><strong>Backup key:</strong> ${escapeHtml(input.backupKey ?? "not stored")}</p>`,
      `<p>${escapeHtml(input.siteUrl)}</p>`,
    ].join(""),
  });
}

export async function notifyBackupCompleted(input: {
  backupKey: string;
  sizeBytes: number;
  trigger: "manual" | "cron";
  prunedCount: number;
}) {
  return sendCmsEmail({
    subject: `Backup completed: ${input.trigger}`,
    text: [
      `Backup key: ${input.backupKey}`,
      `Size: ${input.sizeBytes} bytes`,
      `Trigger: ${input.trigger}`,
      `Pruned objects: ${input.prunedCount}`,
    ].join("\n"),
    html: [
      `<p><strong>Backup key:</strong> ${escapeHtml(input.backupKey)}</p>`,
      `<p><strong>Size:</strong> ${input.sizeBytes} bytes</p>`,
      `<p><strong>Trigger:</strong> ${escapeHtml(input.trigger)}</p>`,
      `<p><strong>Pruned objects:</strong> ${input.prunedCount}</p>`,
    ].join(""),
  });
}

export async function sendPasswordResetEmail(input: {
  email: string;
  token: string;
  siteUrl: string;
  ttlMinutes: number;
}) {
  const resetUrl = `${input.siteUrl.replace(/\/$/, "")}/reset-password?token=${encodeURIComponent(
    input.token,
  )}`;

  return sendCmsEmail({
    to: input.email,
    subject: "Reset your 01mvp-blog-starter password",
    text: [
      `Open this link to reset your password: ${resetUrl}`,
      `This link expires in ${input.ttlMinutes} minutes.`,
    ].join("\n"),
    html: [
      `<p><a href="${escapeHtml(resetUrl)}">Reset your password</a></p>`,
      `<p>This link expires in ${input.ttlMinutes} minutes.</p>`,
    ].join(""),
  });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}
