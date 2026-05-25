import { localizePage, resolveLocale } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { getApiLocale, jsonResponse, readJsonBody } from "#/lib/cms-api";
import { requireCmsAccess } from "#/lib/cms-authz";
import { createD1Page, listD1Pages } from "#/lib/cms-d1";

export const Route = createFileRoute("/api/pages")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const accessError = await requireCmsAccess(request, "site:read");

        if (accessError) {
          return accessError;
        }

        const locale = getApiLocale(request);
        const includeUnpublished = new URL(request.url).searchParams.get("status") === "all";
        const pages = await listD1Pages({ includeUnpublished });

        return jsonResponse({
          data: pages.map((page) => localizePage(page, locale)),
          locale,
          requiredScope: "site:read",
        });
      },
      POST: async ({ request }: { request: Request }) => {
        const accessError = await requireCmsAccess(request, "site:write");

        if (accessError) {
          return accessError;
        }

        const body = await readJsonBody<Parameters<typeof createD1Page>[0]>(request);
        const page = await createD1Page({
          ...body,
          locale: resolveLocale(body.locale),
        });

        return jsonResponse({ data: page, requiredScope: "site:write" }, { status: 201 });
      },
    },
  },
});
