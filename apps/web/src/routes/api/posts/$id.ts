import { createFileRoute } from "@tanstack/react-router";

import { findPost, getApiLocale, jsonResponse, readJsonBody } from "#/lib/cms-api";

export const Route = createFileRoute("/api/posts/$id")({
  server: {
    handlers: {
      GET: ({ params, request }: { params: { id: string }; request: Request }) => {
        const locale = getApiLocale(request);
        const post = findPost(params.id, locale);

        if (!post) {
          return jsonResponse({ error: "Post not found" }, { status: 404 });
        }

        return jsonResponse({ data: post, locale });
      },
      PATCH: async ({ params, request }: { params: { id: string }; request: Request }) => {
        const locale = getApiLocale(request);
        const post = findPost(params.id, locale);

        if (!post) {
          return jsonResponse({ error: "Post not found" }, { status: 404 });
        }

        const body = await readJsonBody<Record<string, unknown>>(request);

        return jsonResponse({
          data: {
            ...post,
            ...body,
            id: post.id,
            slug: post.slug,
            updatedAt: new Date().toISOString(),
          },
          requiredScope: "posts:write",
        });
      },
      DELETE: ({ params, request }: { params: { id: string }; request: Request }) => {
        const post = findPost(params.id, getApiLocale(request));

        if (!post) {
          return jsonResponse({ error: "Post not found" }, { status: 404 });
        }

        return jsonResponse({
          data: { id: post.id, status: "deleted" },
          requiredScope: "posts:write",
        });
      },
    },
  },
});
