import { revokeApiToken } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { jsonResponse } from "#/lib/cms-api";

export const Route = createFileRoute("/api/tokens/$id/revoke")({
  server: {
    handlers: {
      POST: ({ params }: { params: { id: string } }) => {
        const token = revokeApiToken(params.id);

        if (!token) {
          return jsonResponse({ error: "Token not found" }, { status: 404 });
        }

        return jsonResponse({ data: token, requiredScope: "site:write" });
      },
    },
  },
});
