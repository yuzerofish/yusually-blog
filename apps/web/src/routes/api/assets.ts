import { assets, createAsset } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { jsonResponse, readJsonBody } from "#/lib/cms-api";

export const Route = createFileRoute("/api/assets")({
  server: {
    handlers: {
      GET: () => jsonResponse({ data: assets }),
      POST: async ({ request }: { request: Request }) => {
        const body = await readJsonBody<{ filename: string; contentType: string; url: string }>(
          request,
        );
        const filename = body.filename?.trim() || "upload.jpg";
        const contentType = body.contentType?.trim() || "image/jpeg";

        const asset = createAsset({
          filename,
          contentType,
          url: body.url,
        });

        return jsonResponse({ data: asset, requiredScope: "assets:write" }, { status: 201 });
      },
    },
  },
});
