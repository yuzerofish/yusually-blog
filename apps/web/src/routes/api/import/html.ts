import { createPost } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { getApiLocale, importPreview, jsonResponse, readJsonBody } from "#/lib/cms-api";

export const Route = createFileRoute("/api/import/html")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const body = await readJsonBody<{ filename: string; contentHtml: string }>(request);
        const locale = getApiLocale(request);
        const post = createPost({
          title: body.filename?.replace(/\.html?$/i, "") || "Imported HTML post",
          contentMarkdown: "",
          contentHtml: body.contentHtml || `<h1>${body.filename ?? "Imported HTML post"}</h1>`,
          status: "draft",
          locale,
        });

        return jsonResponse(
          {
            data: {
              ...importPreview("html", body.filename),
              post,
            },
            mode: "sanitized",
            requiredScope: "posts:write",
          },
          { status: 202 },
        );
      },
    },
  },
});
