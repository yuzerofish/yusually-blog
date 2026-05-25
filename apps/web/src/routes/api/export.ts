import { createFileRoute } from "@tanstack/react-router";

import { buildSiteExport, getApiLocale, jsonResponse } from "#/lib/cms-api";
import { buildD1SiteExport } from "#/lib/cms-d1";
import { storeExportBackup } from "#/lib/cms-r2";

export const Route = createFileRoute("/api/export")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const locale = getApiLocale(request);
        const data = await buildD1SiteExport(locale).catch(() => buildSiteExport(locale));
        const backup = await storeExportBackup(data).catch(() => null);

        return jsonResponse({
          data,
          backup,
          requiredScope: "export:read",
        });
      },
    },
  },
});
