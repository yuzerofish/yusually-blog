import { createFileRoute } from "@tanstack/react-router";

import { jsonResponse } from "#/lib/cms-api";
import { requireCmsAccess } from "#/lib/cms-authz";
import { getEmailVerificationStatus } from "#/lib/email-verification";

export const Route = createFileRoute("/api/admin/email-status")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const accessError = await requireCmsAccess(request, "site:read");

        if (accessError) {
          return accessError;
        }

        return jsonResponse({ data: await getEmailVerificationStatus() });
      },
    },
  },
});
