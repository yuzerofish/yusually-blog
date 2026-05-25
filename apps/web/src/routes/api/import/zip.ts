import { createFileRoute } from "@tanstack/react-router";

import { importPreview, jsonResponse, readJsonBody } from "#/lib/cms-api";

export const Route = createFileRoute("/api/import/zip")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const body = await readJsonBody<{ filename: string }>(request);

        return jsonResponse(
          {
            data: importPreview("zip", body.filename),
            supportedPackages: ["markdown-with-images", "html-with-assets", "gallery-images"],
            requiredScope: "posts:write",
          },
          { status: 202 },
        );
      },
    },
  },
});
