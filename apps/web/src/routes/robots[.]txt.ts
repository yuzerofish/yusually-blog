import { siteSettings } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () => {
        const body = siteSettings.indexingEnabled
          ? `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${siteSettings.url}/sitemap.xml
`
          : `User-agent: *
Disallow: /
`;

        return new Response(body, {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=300",
          },
        });
      },
    },
  },
});
