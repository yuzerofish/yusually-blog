import { createAsset } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { getApiLocale, importPreview, jsonResponse, readJsonBody } from "#/lib/cms-api";
import { createD1Post } from "#/lib/cms-d1";

export const Route = createFileRoute("/api/import/zip")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const body = await readJsonBody<{ filename: string; contentMarkdown: string }>(request);
        const locale = getApiLocale(request);
        const post = await createD1Post({
          title: body.filename?.replace(/\.zip$/i, "") || "Imported ZIP gallery",
          contentMarkdown:
            body.contentMarkdown ||
            `# ${body.filename ?? "Imported ZIP gallery"}\n\nImported ZIP package accepted.`,
          status: "draft",
          locale,
        });
        const asset = createAsset({
          filename: body.filename || "import.zip",
          contentType: "application/zip",
          attachedPostId: post.id,
        });

        return jsonResponse(
          {
            data: {
              ...importPreview("zip", body.filename),
              post,
              asset,
            },
            supportedPackages: ["markdown-with-images", "html-with-assets", "gallery-images"],
            requiredScope: "posts:write",
          },
          { status: 202 },
        );
      },
    },
  },
});
