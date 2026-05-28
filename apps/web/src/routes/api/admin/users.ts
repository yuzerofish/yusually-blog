import { createFileRoute } from "@tanstack/react-router";

import {
  countAdminUsers,
  createAdminUser,
  getAdminUserFromRequest,
  loginAdmin,
  publicAdminUser,
} from "#/lib/admin-auth";
import { jsonResponse, readJsonBody } from "#/lib/cms-api";
import { requireCmsAccess } from "#/lib/cms-authz";
import { listCmsUsers } from "#/lib/cms-users";

export const Route = createFileRoute("/api/admin/users")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const admin = await getAdminUserFromRequest(request).catch(() => null);

        if (!admin) {
          return jsonResponse({ error: "Admin authentication required" }, { status: 401 });
        }

        return jsonResponse({ data: await listCmsUsers() });
      },
      POST: async ({ request }: { request: Request }) => {
        const existingAdmins = await countAdminUsers();

        if (existingAdmins > 0) {
          const accessError = await requireCmsAccess(request, "site:write");

          if (accessError) {
            return accessError;
          }
        }

        const body = await readJsonBody<{ name: string; email: string; password: string }>(request);
        const created = await createAdminUser(body).catch((error: unknown) => ({
          error: error instanceof Error ? error.message : "Admin user could not be created",
        }));

        if ("error" in created) {
          return jsonResponse({ error: created.error }, { status: 400 });
        }

        const session = await loginAdmin({ email: body.email, password: body.password }, request);

        if ("error" in session) {
          return jsonResponse({ data: publicAdminUser(created.data) }, { status: 201 });
        }

        return jsonResponse(
          { data: publicAdminUser(session.data) },
          { status: 201, headers: session.headers },
        );
      },
    },
  },
});
