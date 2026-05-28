import { localizePost, resolveLocale } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { createPostPreview, getApiLocale, jsonResponse, readJsonBody } from "#/lib/cms-api";
import { requireCmsAccess } from "#/lib/cms-authz";
import { createD1Post, listD1Posts } from "#/lib/cms-d1";

export const Route = createFileRoute("/api/posts")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const locale = getApiLocale(request);
        const url = new URL(request.url);
        const includeUnpublished = url.searchParams.get("status") === "all";

        if (includeUnpublished) {
          const accessError = await requireCmsAccess(request, "posts:read");

          if (accessError) {
            return accessError;
          }
        }

        const query = url.searchParams.get("q") ?? "";
        const tagSlug = url.searchParams.get("tag") ?? undefined;
        const posts = (await listD1Posts({ includeUnpublished, query })).filter((post) =>
          tagSlug ? post.tags.some((tag) => tag.slug === tagSlug) : true,
        );

        return jsonResponse({
          data: posts.map((post) => localizePost(post, locale)),
          locale,
        });
      },
      POST: async ({ request }: { request: Request }) => {
        const body = await readJsonBody<Parameters<typeof createPostPreview>[0]>(request);
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

        const post = await createD1Post({
          ...body,
          locale: resolveLocale(body.locale),
        });

        return jsonResponse(
          {
            data: {
              ...post,
              url: `${new URL(request.url).origin}/blog/${post.slug}`,
            },
            requiredScope: "posts:write",
          },
          { status: 201 },
        );
      },
    },
  },
});
