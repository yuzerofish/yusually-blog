import { apiTokens, createApiToken, type ApiTokenScope } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { jsonResponse, readJsonBody } from "#/lib/cms-api";

export const Route = createFileRoute("/api/tokens")({
  server: {
    handlers: {
      GET: () => jsonResponse({ data: apiTokens }),
      POST: async ({ request }: { request: Request }) => {
        const body = await readJsonBody<{
          name: string;
          scopes: ApiTokenScope[];
          expiresAt: string | null;
        }>(request);
        const created = createApiToken({
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
