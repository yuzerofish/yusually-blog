import { createComment, resolveLocale } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { jsonResponse, readJsonBody } from "#/lib/cms-api";

export const Route = createFileRoute("/api/comments")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const body = await readJsonBody<{
          postSlug: string;
          authorName: string;
          authorEmail: string;
          authorWebsite: string;
          body: string;
          honeypot: string;
        }>(request);

        if (body.honeypot) {
          return jsonResponse({ error: "Comment rejected" }, { status: 400 });
        }

        const result = await createComment({
          postSlug: body.postSlug ?? "",
          authorName: body.authorName,
          authorEmail: body.authorEmail,
          authorWebsite: body.authorWebsite,
          body: body.body,
          locale: resolveLocale(new URL(request.url).searchParams.get("lang") ?? undefined),
        });

        if ("error" in result) {
          return jsonResponse({ error: result.error }, { status: 400 });
        }

        return jsonResponse(
          {
            data: result.comment,
          },
          { status: 201 },
        );
      },
    },
  },
});
