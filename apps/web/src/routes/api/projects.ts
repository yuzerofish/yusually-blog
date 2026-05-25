import { localizeProject, resolveLocale } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { getApiLocale, jsonResponse, readJsonBody } from "#/lib/cms-api";
import { requireCmsAccess } from "#/lib/cms-authz";
import { createD1Project, listD1Projects } from "#/lib/cms-d1";

export const Route = createFileRoute("/api/projects")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const accessError = await requireCmsAccess(request, "site:read");

        if (accessError) {
          return accessError;
        }

        const locale = getApiLocale(request);
        const includeUnpublished = new URL(request.url).searchParams.get("status") === "all";
        const projects = await listD1Projects({ includeUnpublished });

        return jsonResponse({
          data: projects.map((project) => localizeProject(project, locale)),
          locale,
          requiredScope: "site:read",
        });
      },
      POST: async ({ request }: { request: Request }) => {
        const accessError = await requireCmsAccess(request, "site:write");

        if (accessError) {
          return accessError;
        }

        const body = await readJsonBody<Parameters<typeof createD1Project>[0]>(request);
        const project = await createD1Project({
          ...body,
          locale: resolveLocale(body.locale),
        });

        return jsonResponse({ data: project, requiredScope: "site:write" }, { status: 201 });
      },
    },
  },
});
