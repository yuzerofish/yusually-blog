import { getPublishedPosts, projects, siteSettings, tags } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = [
          "",
          "/blog",
          "/tags",
          "/archive",
          "/about",
          "/projects",
          ...getPublishedPosts().map((post) => `/blog/${post.slug}`),
          ...tags.map((tag) => `/tags/${tag.slug}`),
          ...projects.map((project) => `/projects#${project.slug}`),
        ];

        const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${siteSettings.url}${path}</loc>
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
