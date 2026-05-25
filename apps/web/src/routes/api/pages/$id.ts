import { localizePage, resolveLocale } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { getApiLocale, jsonResponse, readJsonBody } from "#/lib/cms-api";
import { requireCmsAccess } from "#/lib/cms-authz";
import { deleteD1Page, getD1PageByIdOrSlug, updateD1Page } from "#/lib/cms-d1";

export const Route = createFileRoute("/api/pages/$id")({
  server: {
    handlers: {
      GET: async ({ params, request }: { params: { id: string }; request: Request }) => {
        const accessError = await requireCmsAccess(request, "site:read");

        if (accessError) {
          return accessError;
        }

        const locale = getApiLocale(request);
        const page = await getD1PageByIdOrSlug(params.id);

        if (!page) {
          return jsonResponse({ error: "Page not found" }, { status: 404 });
        }

        return jsonResponse({
          data: localizePage(page, locale),
          locale,
          requiredScope: "site:read",
        });
      },
      PATCH: async ({ params, request }: { params: { id: string }; request: Request }) => {
        const accessError = await requireCmsAccess(request, "site:write");

        if (accessError) {
          return accessError;
        }

        const body = await readJsonBody<Parameters<typeof updateD1Page>[1]>(request);
        const locale = getApiLocale(request);
        const page = await updateD1Page(params.id, {
          ...body,
          locale: resolveLocale(body.locale),
        });

        if (!page) {
          return jsonResponse({ error: "Page not found" }, { status: 404 });
        }

        return jsonResponse({
          data: localizePage(page, locale),
          requiredScope: "site:write",
        });
      },
      DELETE: async ({ params, request }: { params: { id: string }; request: Request }) => {
        const accessError = await requireCmsAccess(request, "site:write");

        if (accessError) {
          return accessError;
        }

        const page = await deleteD1Page(params.id);

        if (!page) {
          return jsonResponse({ error: "Page not found" }, { status: 404 });
        }

        return jsonResponse({ data: page, requiredScope: "site:write" });
      },
    },
  },
});
