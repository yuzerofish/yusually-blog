import { getPublishedPostsForLocale } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { createPostPreview, getApiLocale, jsonResponse, readJsonBody } from "#/lib/cms-api";

export const Route = createFileRoute("/api/posts")({
  server: {
    handlers: {
      GET: ({ request }: { request: Request }) => {
        const locale = getApiLocale(request);

        return jsonResponse({
          data: getPublishedPostsForLocale(locale),
          locale,
        });
      },
      POST: async ({ request }: { request: Request }) => {
        const body = await readJsonBody<Parameters<typeof createPostPreview>[0]>(request);
        const post = createPostPreview(body);

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
