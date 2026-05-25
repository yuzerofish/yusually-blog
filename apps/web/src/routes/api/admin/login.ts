import { createFileRoute } from "@tanstack/react-router";

import { loginAdmin, publicAdminUser } from "#/lib/admin-auth";
import { jsonResponse, readJsonBody } from "#/lib/cms-api";

export const Route = createFileRoute("/api/admin/login")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const body = await readJsonBody<{ email: string; password: string }>(request);
        const result = await loginAdmin(body, request).catch((error: unknown) => ({
          error: error instanceof Error ? error.message : "Login failed",
        }));

        if ("error" in result) {
          return jsonResponse({ error: result.error }, { status: 401 });
        }

        return jsonResponse({ data: publicAdminUser(result.data) }, { headers: result.headers });
      },
    },
  },
});
