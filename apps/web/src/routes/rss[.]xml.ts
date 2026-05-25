import { getPublishedPostsForLocale, getSiteSettingsForLocale, siteSettings } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: () => {
        const xml = renderRss();

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

function renderRss() {
  const locale = siteSettings.primaryLanguage;
  const posts = getPublishedPostsForLocale(locale);
  const localizedSiteSettings = getSiteSettingsForLocale(locale);

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
