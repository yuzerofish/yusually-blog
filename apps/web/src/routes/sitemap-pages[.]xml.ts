import { createFileRoute } from "@tanstack/react-router";

import { getSitemapPaths, sitemapResponse, sitemapXml } from "#/lib/sitemap";

export const Route = createFileRoute("/sitemap-pages.xml")({
  server: {
    handlers: {
      GET: async () => {
        const { pagePaths, siteUrl } = await getSitemapPaths();

        return sitemapResponse(sitemapXml(siteUrl, pagePaths));
      },
    },
  },
});
