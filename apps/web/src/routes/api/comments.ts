import { localizeComment, resolveLocale } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { getApiLocale, jsonResponse, readJsonBody } from "#/lib/cms-api";
import { requireCmsAccess } from "#/lib/cms-authz";
import { createD1Comment, getD1PostBySlug, listD1Comments } from "#/lib/cms-d1";
import { notifyCommentCreated } from "#/lib/cms-email";
import { getCommentUserFromRequest } from "#/lib/comment-auth";
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

        return jsonResponse({
          data: persistedComments.map((comment) => localizeComment(comment, locale)),
          locale,
          requiredScope: "comments:moderate",
        });
      },
      POST: async ({ request }: { request: Request }) => {
        const body = await readJsonBody<{
          postSlug: string;
          authorWebsite: string;
          body: string;
          parentId: string;
          honeypot: string;
          turnstileToken: string;
        }>(request);

        if (body.honeypot) {
          return jsonResponse({ error: "Comment rejected" }, { status: 400 });
        }

        const user = await getCommentUserFromRequest(request);

        if (!user) {
          return jsonResponse({ error: "Login is required to comment" }, { status: 401 });
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
          authorUserId: user.id,
          authorName: user.name,
          authorEmail: user.email,
          authorWebsite: body.authorWebsite,
          body: body.body,
          parentId: body.parentId || null,
          locale: resolveLocale(new URL(request.url).searchParams.get("lang") ?? undefined),
        };
        const persistedPost = await getD1PostBySlug(commentInput.postSlug);

        if (!persistedPost) {
          return jsonResponse(
            { error: "Post not found or comments are disabled" },
            { status: 400 },
          );
        }

        const persistedResult = await createD1Comment(commentInput);
        const result =
          "data" in persistedResult
            ? { comment: persistedResult.data }
            : { error: persistedResult.error };

        if ("error" in result) {
          return jsonResponse({ error: result.error }, { status: 400 });
        }

        if (result.comment.status !== "spam") {
          await notifyCommentCreated({
            comment: result.comment,
            postTitle: persistedPost?.title ?? commentInput.postSlug,
            siteUrl: new URL(request.url).origin,
          });
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
