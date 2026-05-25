import { createFileRoute } from "@tanstack/react-router";

import { importPreview, jsonResponse, readJsonBody } from "#/lib/cms-api";

export const Route = createFileRoute("/api/import/html")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const body = await readJsonBody<{ filename: string }>(request);

        return jsonResponse(
          {
            data: importPreview("html", body.filename),
            mode: "sanitized",
            requiredScope: "posts:write",
          },
          { status: 202 },
        );
      },
    },
  },
});
