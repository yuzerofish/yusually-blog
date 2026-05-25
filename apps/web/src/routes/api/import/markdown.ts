import { createFileRoute } from "@tanstack/react-router";

import { getApiLocale, importPreview, jsonResponse, readJsonBody } from "#/lib/cms-api";
import { requireCmsAccess } from "#/lib/cms-authz";
import { createD1Post } from "#/lib/cms-d1";

export const Route = createFileRoute("/api/import/markdown")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const accessError = await requireCmsAccess(request, "posts:write");

        if (accessError) {
          return accessError;
        }

        const body = await readJsonBody<{ filename: string; contentMarkdown: string }>(request);
        const locale = getApiLocale(request);
        const post = await createD1Post({
          title: body.filename?.replace(/\.(md|mdx)$/i, "") || "Imported Markdown post",
          contentMarkdown:
            body.contentMarkdown || `# ${body.filename ?? "Imported Markdown post"}\n`,
          status: "draft",
          locale,
        });

        return jsonResponse(
          {
            data: {
              ...importPreview("markdown", body.filename),
              post,
            },
            requiredScope: "posts:write",
          },
          { status: 202 },
        );
      },
    },
  },
});
