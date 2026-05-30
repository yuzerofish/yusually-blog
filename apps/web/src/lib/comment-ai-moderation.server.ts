import "@tanstack/react-start/server-only";
import { applyAiCommentModerationDecision, type CommentStatus } from "@repo/core";

import { createConfiguredChatCompletion, parseAiJsonObject } from "#/lib/ai-provider.server";

export async function resolveAiCommentStatus({
  baseStatus,
  body,
  requireApproval,
  rules,
}: {
  baseStatus: CommentStatus;
  body: string;
  requireApproval: boolean;
  rules: string;
}) {
  if (baseStatus === "spam" || baseStatus === "deleted") {
    return baseStatus;
  }

  const result = await createConfiguredChatCompletion({
    messages: [
      {
        role: "system",
        content:
          'You review blog comments. Return compact JSON only: {"decision":"approve|review|spam","reason":"short reason"}. Never include markdown.',
      },
      {
        role: "user",
        content: JSON.stringify({
          rules,
          comment: body,
        }),
      },
    ],
    maxTokens: 160,
    temperature: 0,
    timeoutMs: 12_000,
  }).catch(() => null);

  if (!result?.ok) {
    return baseStatus;
  }

  const parsed = parseAiJsonObject(result.content);
  const decision = typeof parsed?.decision === "string" ? parsed.decision : undefined;

  return applyAiCommentModerationDecision({
    baseStatus,
    decision,
    requireApproval,
  });
}
