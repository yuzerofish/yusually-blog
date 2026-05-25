import type { CommentStatus, SiteSettings } from "./types";

export const defaultCommentBlockedKeywords = [
  "博彩",
  "赌博",
  "色情",
  "诈骗",
  "代开",
  "发票",
  "辱骂",
  "暴力",
  "casino",
  "porn",
  "scam",
  "invoice",
];

type ModerationSettings = Pick<
  SiteSettings,
  "commentAutoBlockEnabled" | "commentBlockedKeywords" | "commentsRequireApproval"
>;

export function normalizeCommentBlockedKeywords(value: unknown) {
  const items = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(/[\n,，]/)
      : [];

  return [...new Set(items.map((item) => String(item).trim()).filter(Boolean))];
}

export function getCommentInitialStatus({
  body,
  settings,
}: {
  body: string;
  settings: ModerationSettings;
}): CommentStatus {
  if (
    settings.commentAutoBlockEnabled &&
    findBlockedCommentKeyword(body, settings.commentBlockedKeywords)
  ) {
    return "spam";
  }

  return settings.commentsRequireApproval ? "pending" : "approved";
}

export function findBlockedCommentKeyword(body: string, keywords: string[]) {
  const normalizedBody = body.toLowerCase();

  return normalizeCommentBlockedKeywords(keywords).find((keyword) =>
    normalizedBody.includes(keyword.toLowerCase()),
  );
}
