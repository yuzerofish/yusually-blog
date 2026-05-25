import { revokeApiToken } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { jsonResponse } from "#/lib/cms-api";
import { revokeD1ApiToken } from "#/lib/cms-d1";

export const Route = createFileRoute("/api/tokens/$id/revoke")({
  server: {
    handlers: {
      POST: async ({ params }: { params: { id: string } }) => {
        const token =
          (await revokeD1ApiToken(params.id).catch(() => undefined)) ?? revokeApiToken(params.id);

        if (!token) {
          return jsonResponse({ error: "Token not found" }, { status: 404 });
        }

        return jsonResponse({ data: token, requiredScope: "site:write" });
      },
    },
  },
});
