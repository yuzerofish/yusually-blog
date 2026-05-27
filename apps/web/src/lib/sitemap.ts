import { getPublishedPosts, tags as seedTags } from "@repo/core";

import { getD1SiteSettings, listD1Posts, listD1Tags } from "#/lib/cms-d1";
import { source } from "#/lib/source";

export async function getSitemapPaths() {
  const siteSettings = await getD1SiteSettings();
  const [persistedPosts, persistedTags] = await Promise.all([
    listD1Posts().catch(() => []),
    listD1Tags().catch(() => []),
  ]);
  const persistedSlugs = new Set(persistedPosts.map((post) => post.slug));
  const posts = [
    ...persistedPosts,
    ...getPublishedPosts().filter((post) => !persistedSlugs.has(post.slug)),
  ];
  const tagSlugs = new Set([
    ...persistedTags.map((tag) => tag.slug),
    ...posts.flatMap((post) => post.tags.map((tag) => tag.slug)),
    ...seedTags.map((tag) => tag.slug),
  ]);
  const docsPaths = source.getPages().map((page) => page.url);
  const pagePaths = ["", "/blog", "/docs", "/tags", "/archive", "/about"];
  const postPaths = posts.map((post) => `/blog/${post.slug}`);
  const taxonomyPaths = Array.from(tagSlugs).map((slug) => `/tags/${slug}`);

  const pageAndDocsPaths = Array.from(new Set([...pagePaths, ...docsPaths]));

  return {
    siteUrl: siteSettings.url,
    allPaths: [...pageAndDocsPaths, ...postPaths, ...taxonomyPaths],
    pagePaths: pageAndDocsPaths,
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
