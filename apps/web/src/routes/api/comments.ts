import { getPostBySlug } from "@repo/core";
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

        const post = body.postSlug ? getPostBySlug(body.postSlug) : undefined;

        if (!post) {
          return jsonResponse({ error: "Post not found" }, { status: 404 });
        }

        if (!body.authorName || !body.authorEmail || !body.body) {
          return jsonResponse(
            { error: "Name, email, and comment body are required" },
            { status: 400 },
          );
        }

        const text = body.body.trim();

        if (text.length < 2 || text.length > 4000) {
          return jsonResponse(
            { error: "Comment body must be between 2 and 4000 characters" },
            { status: 400 },
          );
        }

        return jsonResponse(
          {
            data: {
              id: `comment_${crypto.randomUUID()}`,
              postId: post.id,
              parentId: null,
              authorName: body.authorName.trim(),
              authorWebsite: body.authorWebsite?.trim() || null,
              body: text,
              status: "pending",
              createdAt: new Date().toISOString(),
            },
          },
          { status: 201 },
        );
      },
    },
  },
});
