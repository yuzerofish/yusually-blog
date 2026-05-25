import { createFileRoute } from "@tanstack/react-router";

import { getAdminUserFromRequest, publicAdminUser } from "#/lib/admin-auth";
import { jsonResponse } from "#/lib/cms-api";

export const Route = createFileRoute("/api/admin/me")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const user = await getAdminUserFromRequest(request);

        if (!user) {
          return jsonResponse({ data: null }, { status: 401 });
        }

        return jsonResponse({ data: publicAdminUser(user) });
      },
    },
  },
});
