import { createFileRoute } from "@tanstack/react-router";

import { jsonResponse } from "#/lib/cms-api";
import { requireCmsAccess } from "#/lib/cms-authz";
import { listD1Assets } from "#/lib/cms-d1";
import { getR2StorageStatus, readAssetUpload, uploadAssetToR2 } from "#/lib/cms-r2";

export const Route = createFileRoute("/api/assets")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const accessError = await requireCmsAccess(request, "site:read");

        if (accessError) {
          return accessError;
        }

        const [persistedAssets, storage] = await Promise.all([
          listD1Assets().catch(() => []),
          getR2StorageStatus(),
        ]);

        return jsonResponse({
          data: persistedAssets,
          storage,
        });
      },
      POST: async ({ request }: { request: Request }) => {
        const accessError = await requireCmsAccess(request, "assets:write");

        if (accessError) {
          return accessError;
        }

        const upload = await readAssetUpload(request).catch(() => null);

        if (!upload) {
          return jsonResponse(
            {
              error: "Upload requires a file.",
              requiredScope: "assets:write",
            },
            { status: 400 },
          );
        }

        const asset = await uploadAssetToR2(upload).catch(() => null);

        if (!asset) {
          const storage = await getR2StorageStatus();
          const status = storage.status === "ready" ? 500 : 503;

          return jsonResponse(
            {
              error:
                storage.status === "ready"
                  ? "Asset upload failed"
                  : "R2 storage is not ready for uploads",
              requiredScope: "assets:write",
              storage,
            },
            { status },
          );
        }

        return jsonResponse({ data: asset, requiredScope: "assets:write" }, { status: 201 });
      },
    },
  },
});
