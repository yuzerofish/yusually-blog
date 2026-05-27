import { createFileRoute } from "@tanstack/react-router";

import { jsonResponse } from "#/lib/cms-api";
import { requireCmsAccess } from "#/lib/cms-authz";
import { listD1Assets } from "#/lib/cms-d1";
import { readAssetUpload, uploadAssetToR2 } from "#/lib/cms-r2";

export const Route = createFileRoute("/api/assets")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const accessError = await requireCmsAccess(request, "site:read");

        if (accessError) {
          return accessError;
        }

        const persistedAssets = await listD1Assets().catch(() => []);

        return jsonResponse({
          data: persistedAssets,
        });
      },
      POST: async ({ request }: { request: Request }) => {
        const accessError = await requireCmsAccess(request, "assets:write");

        if (accessError) {
          return accessError;
        }

        const upload = await readAssetUpload(request);
        const asset = await uploadAssetToR2(upload).catch(() => null);

        if (!asset) {
          return jsonResponse({ error: "Asset upload failed" }, { status: 500 });
        }

        return jsonResponse({ data: asset, requiredScope: "assets:write" }, { status: 201 });
      },
    },
  },
});
