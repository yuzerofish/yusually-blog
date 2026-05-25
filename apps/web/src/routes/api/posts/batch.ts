import { localizePost, updatePost, type ContentStatus, type Post } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { findPost, getApiLocale, jsonResponse, readJsonBody } from "#/lib/cms-api";
import { requireCmsAccess } from "#/lib/cms-authz";
import { getD1PostByIdOrSlug, updateD1Post } from "#/lib/cms-d1";

const batchStatusByAction = {
  publish: "published",
  draft: "draft",
  archive: "archived",
  delete: "deleted",
} satisfies Record<string, ContentStatus>;

export const Route = createFileRoute("/api/posts/batch")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const body = await readJsonBody<{
          ids: string[];
          action: keyof typeof batchStatusByAction;
          locale: string;
        }>(request);
        const accessError = await requireCmsAccess(request, "posts:write");

        if (accessError) {
          return accessError;
        }

        if (body.action === "publish") {
          const publishError = await requireCmsAccess(request, "posts:publish");

          if (publishError) {
            return publishError;
          }
        }

        const status = body.action ? batchStatusByAction[body.action] : undefined;

        if (!status || !Array.isArray(body.ids) || body.ids.length === 0) {
          return jsonResponse({ error: "Provide ids and a valid batch action." }, { status: 400 });
        }

        const locale = getApiLocale(request);
        const updatedPosts: Post[] = [];

        for (const id of body.ids) {
          const persistedPost = await getD1PostByIdOrSlug(id);
          const post = persistedPost ?? findPost(id, locale);

          if (!post) {
            continue;
          }

          const updated = persistedPost
            ? await updateD1Post(post.id, { status, locale })
            : updatePost(post.id, { status, locale });

          if (updated) {
            updatedPosts.push(localizePost(updated, locale));
          }
        }

        return jsonResponse({
          data: updatedPosts,
          action: body.action,
          requiredScope: "posts:write",
        });
      },
    },
  },
});
