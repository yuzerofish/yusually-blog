import { deletePost, updatePost } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { findPost, getApiLocale, jsonResponse, readJsonBody } from "#/lib/cms-api";
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
        const post = (await getD1PostByIdOrSlug(params.id)) ?? findPost(params.id, locale);

        if (!post) {
          return jsonResponse({ error: "Post not found" }, { status: 404 });
        }

        return jsonResponse({ data: post, locale });
      },
      PATCH: async ({ params, request }: { params: { id: string }; request: Request }) => {
        const accessError = await requireCmsAccess(request, "posts:write");

        if (accessError) {
          return accessError;
        }

        const locale = getApiLocale(request);
        const persistedPost = await getD1PostByIdOrSlug(params.id);
        const post = persistedPost ?? findPost(params.id, locale);

        if (!post) {
          return jsonResponse({ error: "Post not found" }, { status: 404 });
        }

        const body = await readJsonBody<Record<string, unknown>>(request);

        const updated = persistedPost
          ? await updateD1Post(post.id, body)
          : updatePost(post.id, body);

        return jsonResponse({
          data: updated ?? post,
          requiredScope: "posts:write",
        });
      },
      DELETE: async ({ params, request }: { params: { id: string }; request: Request }) => {
        const accessError = await requireCmsAccess(request, "posts:write");

        if (accessError) {
          return accessError;
        }

        const post =
          (await getD1PostByIdOrSlug(params.id)) ?? findPost(params.id, getApiLocale(request));

        if (!post) {
          return jsonResponse({ error: "Post not found" }, { status: 404 });
        }

        const deleted = (await deleteD1Post(post.id)) ?? deletePost(post.id);

        return jsonResponse({ data: deleted, requiredScope: "posts:write" });
      },
    },
  },
});
