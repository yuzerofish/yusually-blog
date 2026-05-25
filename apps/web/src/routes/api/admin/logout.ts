import { createFileRoute } from "@tanstack/react-router";

import { logoutAdmin } from "#/lib/admin-auth";
import { jsonResponse } from "#/lib/cms-api";

export const Route = createFileRoute("/api/admin/logout")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const result = await logoutAdmin(request);

        return jsonResponse({ data: { signedOut: true } }, { headers: result.headers });
      },
    },
  },
});
