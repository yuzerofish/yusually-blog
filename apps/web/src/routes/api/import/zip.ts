import { createFileRoute } from "@tanstack/react-router";

import { getApiLocale, importPreview, jsonResponse, readJsonBody } from "#/lib/cms-api";
import { requireCmsAccess } from "#/lib/cms-authz";
import { createD1Post } from "#/lib/cms-d1";
import { storeImportPackage } from "#/lib/cms-r2";

export const Route = createFileRoute("/api/import/zip")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const accessError = await requireCmsAccess(request, "posts:write");

        if (accessError) {
          return accessError;
        }

        const body = await readJsonBody<{
          filename: string;
          contentMarkdown: string;
          contentBase64: string;
        }>(request);
        const locale = getApiLocale(request);
        const post = await createD1Post({
          title: body.filename?.replace(/\.zip$/i, "") || "Imported ZIP gallery",
          contentMarkdown:
            body.contentMarkdown ||
            `# ${body.filename ?? "Imported ZIP gallery"}\n\nImported ZIP package accepted.`,
          status: "draft",
          locale,
        });
        const asset = await storeImportPackage({
          filename: body.filename || "import.zip",
          contentType: "application/zip",
          contentBase64: body.contentBase64,
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
