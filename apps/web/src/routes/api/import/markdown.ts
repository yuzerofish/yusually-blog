import { createFileRoute } from "@tanstack/react-router";

import { importPreview, jsonResponse, readJsonBody } from "#/lib/cms-api";

export const Route = createFileRoute("/api/import/markdown")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const body = await readJsonBody<{ filename: string }>(request);

        return jsonResponse(
          {
            data: importPreview("markdown", body.filename),
            requiredScope: "posts:write",
          },
          { status: 202 },
        );
      },
    },
  },
});
