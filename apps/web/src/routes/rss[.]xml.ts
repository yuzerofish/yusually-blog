import { getPublishedPosts, localizePost } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { getD1SiteSettings, listD1Posts } from "#/lib/cms-d1";

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: async () => {
        const xml = await renderRss();

        return new Response(xml, {
          headers: {
            "content-type": "application/rss+xml; charset=utf-8",
            "cache-control": "public, max-age=300",
          },
        });
      },
    },
  },
});

async function renderRss() {
  const siteSettings = await getD1SiteSettings();
  const locale = siteSettings.primaryLanguage;
  const persistedPosts = await listD1Posts().catch(() => []);
  const persistedSlugs = new Set(persistedPosts.map((post) => post.slug));
  const posts = [
    ...persistedPosts,
    ...getPublishedPosts().filter((post) => !persistedSlugs.has(post.slug)),
  ].map((post) => localizePost(post, locale));
  const localizedSiteSettings = await getD1SiteSettings(locale);

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(localizedSiteSettings.name)}</title>
    <link>${localizedSiteSettings.url}</link>
    <description>${escapeXml(localizedSiteSettings.description)}</description>
    ${posts
      .map(
        (post) => `<item>
      <title>${escapeXml(post.title)}</title>
      <link>${localizedSiteSettings.url}/blog/${post.slug}</link>
      <guid>${localizedSiteSettings.url}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`,
      )
      .join("\n    ")}
  </channel>
</rss>`;
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
