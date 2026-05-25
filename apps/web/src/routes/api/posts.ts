import { localizePost, resolveLocale, searchPosts } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { createPostPreview, getApiLocale, jsonResponse, readJsonBody } from "#/lib/cms-api";

export const Route = createFileRoute("/api/posts")({
  server: {
    handlers: {
      GET: ({ request }: { request: Request }) => {
        const locale = getApiLocale(request);
        const url = new URL(request.url);
        const includeUnpublished = url.searchParams.get("status") === "all";
        const query = url.searchParams.get("q") ?? "";
        const tagSlug = url.searchParams.get("tag") ?? undefined;

        return jsonResponse({
          data: searchPosts({ includeUnpublished, query, tagSlug }).map((post) =>
            localizePost(post, locale),
          ),
          locale,
        });
      },
      POST: async ({ request }: { request: Request }) => {
        const body = await readJsonBody<Parameters<typeof createPostPreview>[0]>(request);
        const post = createPostPreview({
          ...body,
          locale: resolveLocale(body.locale),
        });

        return jsonResponse(
          {
            data: post,
            requiredScope: "posts:write",
          },
          { status: 201 },
        );
      },
    },
  },
});
