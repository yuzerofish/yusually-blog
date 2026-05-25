import { createFileRoute } from "@tanstack/react-router";

import { jsonResponse } from "#/lib/cms-api";
import { requireCmsAccess } from "#/lib/cms-authz";
import { createScheduledBackup } from "#/lib/cms-export";

export const Route = createFileRoute("/api/backups")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const accessError = await requireCmsAccess(request, "export:read");

        if (accessError) {
          return accessError;
        }

        const backup = await createScheduledBackup({ trigger: "manual" });

        return jsonResponse(backup, { status: 201 });
      },
    },
  },
});
