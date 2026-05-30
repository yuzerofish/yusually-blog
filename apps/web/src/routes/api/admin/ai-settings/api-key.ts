import { createFileRoute } from "@tanstack/react-router";

import { clearAiProviderApiKey } from "#/lib/ai-provider.server";
import { jsonResponse } from "#/lib/cms-api";
import { requireCmsAccess } from "#/lib/cms-authz";

export const Route = createFileRoute("/api/admin/ai-settings/api-key")({
  server: {
    handlers: {
      DELETE: async ({ request }: { request: Request }) => {
        const accessError = await requireCmsAccess(request, "site:write");

        if (accessError) {
          return accessError;
        }

        return jsonResponse({
          data: await clearAiProviderApiKey(),
          requiredScope: "site:write",
        });
      },
    },
  },
});
