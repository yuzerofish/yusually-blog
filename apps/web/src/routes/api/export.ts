import { createFileRoute } from "@tanstack/react-router";

import { buildSiteExport, getApiLocale, jsonResponse } from "#/lib/cms-api";

export const Route = createFileRoute("/api/export")({
  server: {
    handlers: {
      GET: ({ request }: { request: Request }) => {
        const locale = getApiLocale(request);

        return jsonResponse({
          data: buildSiteExport(locale),
          requiredScope: "export:read",
        });
      },
    },
  },
});
