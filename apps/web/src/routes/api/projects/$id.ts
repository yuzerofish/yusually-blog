import { localizeProject, resolveLocale } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { getApiLocale, jsonResponse, readJsonBody } from "#/lib/cms-api";
import { requireCmsAccess } from "#/lib/cms-authz";
import { deleteD1Project, getD1ProjectByIdOrSlug, updateD1Project } from "#/lib/cms-d1";

export const Route = createFileRoute("/api/projects/$id")({
  server: {
    handlers: {
      GET: async ({ params, request }: { params: { id: string }; request: Request }) => {
        const accessError = await requireCmsAccess(request, "site:read");

        if (accessError) {
          return accessError;
        }

        const locale = getApiLocale(request);
        const project = await getD1ProjectByIdOrSlug(params.id);

        if (!project) {
          return jsonResponse({ error: "Project not found" }, { status: 404 });
        }

        return jsonResponse({
          data: localizeProject(project, locale),
          locale,
          requiredScope: "site:read",
        });
      },
      PATCH: async ({ params, request }: { params: { id: string }; request: Request }) => {
        const accessError = await requireCmsAccess(request, "site:write");

        if (accessError) {
          return accessError;
        }

        const body = await readJsonBody<Parameters<typeof updateD1Project>[1]>(request);
        const locale = getApiLocale(request);
        const project = await updateD1Project(params.id, {
          ...body,
          locale: resolveLocale(body.locale),
        });

        if (!project) {
          return jsonResponse({ error: "Project not found" }, { status: 404 });
        }

        return jsonResponse({
          data: localizeProject(project, locale),
          requiredScope: "site:write",
        });
      },
      DELETE: async ({ params, request }: { params: { id: string }; request: Request }) => {
        const accessError = await requireCmsAccess(request, "site:write");

        if (accessError) {
          return accessError;
        }

        const project = await deleteD1Project(params.id);

        if (!project) {
          return jsonResponse({ error: "Project not found" }, { status: 404 });
        }

        return jsonResponse({ data: project, requiredScope: "site:write" });
      },
    },
  },
});
