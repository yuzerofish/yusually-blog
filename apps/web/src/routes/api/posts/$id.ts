import { localizePost } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { getApiLocale, jsonResponse, readJsonBody } from "#/lib/cms-api";
import { requireCmsAccess } from "#/lib/cms-authz";
import { deleteD1Post, getD1PostByIdOrSlug, updateD1Post } from "#/lib/cms-d1";

export const Route = createFileRoute("/api/posts/$id")({
  server: {
    handlers: {
      GET: async ({ params, request }: { params: { id: string }; request: Request }) => {
        const accessError = await requireCmsAccess(request, "posts:read");

        if (accessError) {
          return accessError;
        }

        const locale = getApiLocale(request);
        const post = await getD1PostByIdOrSlug(params.id, true);

        if (!post) {
          return jsonResponse({ error: "Post not found" }, { status: 404 });
        }

        return jsonResponse({ data: localizePost(post, locale), locale });
      },
      PATCH: async ({ params, request }: { params: { id: string }; request: Request }) => {
        const body = await readJsonBody<Record<string, unknown>>(request);
        const accessError = await requireCmsAccess(request, "posts:write");

        if (accessError) {
          return accessError;
        }

        if (body.status === "published" || body.status === "scheduled") {
          const publishError = await requireCmsAccess(request, "posts:publish");

          if (publishError) {
            return publishError;
          }
        }

        const locale = getApiLocale(request);
        const post = await getD1PostByIdOrSlug(params.id);

        if (!post) {
          return jsonResponse({ error: "Post not found" }, { status: 404 });
        }

        const updated = await updateD1Post(post.id, body);

        return jsonResponse({
          data: updated ? localizePost(updated, locale) : post,
          requiredScope: "posts:write",
        });
      },
      DELETE: async ({ params, request }: { params: { id: string }; request: Request }) => {
        const accessError = await requireCmsAccess(request, "posts:write");

        if (accessError) {
          return accessError;
        }

        const locale = getApiLocale(request);
        const post = await getD1PostByIdOrSlug(params.id);

        if (!post) {
          return jsonResponse({ error: "Post not found" }, { status: 404 });
        }

        const deleted = await deleteD1Post(post.id);

        return jsonResponse({
          data: deleted ? localizePost(deleted, locale) : post,
          requiredScope: "posts:write",
        });
      },
    },
  },
});
