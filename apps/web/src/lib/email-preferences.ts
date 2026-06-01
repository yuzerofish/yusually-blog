import type { EmailPreference } from "@repo/core";

export const blogUpdateEmailPreference = "biweekly_digest" satisfies EmailPreference;

export function isEmailPreference(value: unknown): value is EmailPreference {
  return value === "none" || value === blogUpdateEmailPreference;
}

export function normalizeEmailPreference(value: unknown): EmailPreference {
  return value === blogUpdateEmailPreference || value === "instant_posts"
    ? blogUpdateEmailPreference
    : "none";
}
