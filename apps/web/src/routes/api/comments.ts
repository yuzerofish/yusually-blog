import { comments, createComment, localizeComment, resolveLocale } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { getApiLocale, jsonResponse, readJsonBody } from "#/lib/cms-api";
import { requireCmsAccess } from "#/lib/cms-authz";
import { createD1Comment, getD1PostBySlug, listD1Comments } from "#/lib/cms-d1";
import { checkCommentRateLimit, getClientIp, verifyTurnstile } from "#/lib/comment-guard";

export const Route = createFileRoute("/api/comments")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const accessError = await requireCmsAccess(request, "comments:moderate");

        if (accessError) {
          return accessError;
        }

        const locale = getApiLocale(request);
        const persistedComments = await listD1Comments();
        const persistedIds = new Set(persistedComments.map((comment) => comment.id));

        return jsonResponse({
          data: [
            ...persistedComments,
            ...comments.filter((comment) => !persistedIds.has(comment.id)),
          ].map((comment) => localizeComment(comment, locale)),
          locale,
          requiredScope: "comments:moderate",
        });
      },
      POST: async ({ request }: { request: Request }) => {
        const body = await readJsonBody<{
          postSlug: string;
          authorName: string;
          authorEmail: string;
          authorWebsite: string;
          body: string;
          honeypot: string;
          turnstileToken: string;
        }>(request);

        if (body.honeypot) {
          return jsonResponse({ error: "Comment rejected" }, { status: 400 });
        }

        const turnstile = await verifyTurnstile({
          token: body.turnstileToken,
          request,
        });

        if (!turnstile.ok) {
          return jsonResponse({ error: turnstile.error }, { status: 400 });
        }

        const rateLimit = checkCommentRateLimit({
          ip: getClientIp(request),
          postSlug: body.postSlug ?? "",
        });

        if (!rateLimit.ok) {
          return jsonResponse({ error: rateLimit.error }, { status: 429 });
        }

        const commentInput = {
          postSlug: body.postSlug ?? "",
          authorName: body.authorName,
          authorEmail: body.authorEmail,
          authorWebsite: body.authorWebsite,
          body: body.body,
          locale: resolveLocale(new URL(request.url).searchParams.get("lang") ?? undefined),
        };
        const persistedPost = await getD1PostBySlug(commentInput.postSlug);
        const persistedResult = persistedPost ? await createD1Comment(commentInput) : undefined;
        const result = persistedResult
          ? "data" in persistedResult
            ? { comment: persistedResult.data }
            : { error: persistedResult.error }
          : await createComment(commentInput);

        if ("error" in result) {
          return jsonResponse({ error: result.error }, { status: 400 });
        }

        return jsonResponse(
          {
            data: result.comment,
          },
          { status: 201 },
        );
      },
    },
  },
});
