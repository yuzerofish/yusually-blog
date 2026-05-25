import { getPublishedPosts, tags } from "@repo/core";

import { getD1SiteSettings, listD1Posts } from "#/lib/cms-d1";

export async function getSitemapPaths() {
  const siteSettings = await getD1SiteSettings();
  const persistedPosts = await listD1Posts().catch(() => []);
  const persistedSlugs = new Set(persistedPosts.map((post) => post.slug));
  const posts = [
    ...persistedPosts,
    ...getPublishedPosts().filter((post) => !persistedSlugs.has(post.slug)),
  ];
  const pagePaths = ["", "/blog", "/tags", "/archive", "/about", "/projects"];
  const postPaths = posts.map((post) => `/blog/${post.slug}`);
  const taxonomyPaths = tags.map((tag) => `/tags/${tag.slug}`);

  return {
    siteUrl: siteSettings.url,
    allPaths: [...pagePaths, ...postPaths, ...taxonomyPaths],
    pagePaths,
    postPaths,
  };
}

export function sitemapXml(siteUrl: string, paths: string[]) {
  return `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (path) => `  <url>
    <loc>${siteUrl}${path}</loc>
  </url>`,
  )
  .join("\n")}
</urlset>`;
}

export function sitemapResponse(xml: string) {
  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
}
