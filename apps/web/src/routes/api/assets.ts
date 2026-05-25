import { assets, createAsset } from "@repo/core";
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
        const persistedKeys = new Set(persistedAssets.map((asset) => asset.key));

        return jsonResponse({
          data: [...persistedAssets, ...assets.filter((asset) => !persistedKeys.has(asset.key))],
        });
      },
      POST: async ({ request }: { request: Request }) => {
        const accessError = await requireCmsAccess(request, "assets:write");

        if (accessError) {
          return accessError;
        }

        const upload = await readAssetUpload(request);
        const asset = await uploadAssetToR2(upload).catch(() =>
          createAsset({
            filename: upload.filename,
            contentType: upload.contentType,
            sizeBytes: upload.data instanceof Blob ? upload.data.size : upload.data.byteLength,
            attachedPostId: upload.attachedPostId,
          }),
        );

        return jsonResponse({ data: asset, requiredScope: "assets:write" }, { status: 201 });
      },
    },
  },
});
