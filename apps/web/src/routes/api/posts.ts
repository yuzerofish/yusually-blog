import { localizePost, resolveLocale, searchPosts } from "@repo/core";
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
        const persistedPosts = (await listD1Posts({ includeUnpublished, query })).filter((post) =>
          tagSlug ? post.tags.some((tag) => tag.slug === tagSlug) : true,
        );
        const seededPosts = searchPosts({ includeUnpublished, query, tagSlug });
        const persistedSlugs = new Set(persistedPosts.map((post) => post.slug));
        const posts = [
          ...persistedPosts,
          ...seededPosts.filter((post) => !persistedSlugs.has(post.slug)),
        ];

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

        if (body.status === "published") {
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
