import { getPublishedPosts, projects, tags } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { getD1SiteSettings, listD1Posts } from "#/lib/cms-d1";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const runtimeSiteSettings = await getD1SiteSettings();
        const persistedPosts = await listD1Posts().catch(() => []);
        const persistedSlugs = new Set(persistedPosts.map((post) => post.slug));
        const posts = [
          ...persistedPosts,
          ...getPublishedPosts().filter((post) => !persistedSlugs.has(post.slug)),
        ];
        const urls = [
          "",
          "/blog",
          "/tags",
          "/archive",
          "/about",
          "/projects",
          ...posts.map((post) => `/blog/${post.slug}`),
          ...tags.map((tag) => `/tags/${tag.slug}`),
          ...projects.map((project) => `/projects#${project.slug}`),
        ];

        const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${runtimeSiteSettings.url}${path}</loc>
  </url>`,
  )
  .join("\n")}
</urlset>`;

        return new Response(xml, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=300",
          },
        });
      },
    },
  },
});
