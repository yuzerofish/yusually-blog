import type { ApiTokenScope } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { jsonResponse, readJsonBody } from "#/lib/cms-api";
import { requireCmsAccess } from "#/lib/cms-authz";
import { createD1ApiToken, listD1ApiTokens } from "#/lib/cms-d1";

export const Route = createFileRoute("/api/tokens")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const accessError = await requireCmsAccess(request, "site:read");

        if (accessError) {
          return accessError;
        }

        const tokens = await listD1ApiTokens();

        return jsonResponse({
          data: tokens,
        });
      },
      POST: async ({ request }: { request: Request }) => {
        const accessError = await requireCmsAccess(request, "site:write");

        if (accessError) {
          return accessError;
        }

        const body = await readJsonBody<{
          name: string;
          scopes: ApiTokenScope[];
          expiresAt: string | null;
        }>(request);
        const created = await createD1ApiToken({
          name: body.name,
          scopes: body.scopes,
          expiresAt: body.expiresAt,
        });

        return jsonResponse(
          {
            data: created.token,
            secret: created.secret,
            requiredScope: "site:write",
          },
          { status: 201 },
        );
      },
    },
  },
});
