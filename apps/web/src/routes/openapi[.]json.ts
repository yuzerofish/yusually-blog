import { createFileRoute } from "@tanstack/react-router";

import { apiTokenScopes } from "#/lib/cms-api";

export const Route = createFileRoute("/openapi.json")({
  server: {
    handlers: {
      GET: () => {
        return Response.json({
          openapi: "3.1.0",
          info: {
            title: "Cloud Blog CMS API",
            version: "0.1.0",
            description:
              "Automation API for bilingual Cloud Blog CMS publishing, imports, exports, assets, and moderation.",
          },
          paths: {
            "/api/posts": {
              get: {
                summary: "List posts",
                security: [{ apiToken: ["posts:read"] }],
                parameters: [{ name: "lang", in: "query", schema: { enum: ["en", "zh"] } }],
                responses: { "200": { description: "Localized post list" } },
              },
              post: {
                summary: "Create post",
                security: [{ apiToken: ["posts:write"] }],
                responses: { "201": { description: "Post created" } },
              },
            },
            "/api/posts/{id}": {
              get: {
                summary: "Get post",
                security: [{ apiToken: ["posts:read"] }],
                responses: { "200": { description: "Post detail" } },
              },
              patch: {
                summary: "Update post",
                security: [{ apiToken: ["posts:write"] }],
                responses: { "200": { description: "Post updated" } },
              },
              delete: {
                summary: "Delete post",
                security: [{ apiToken: ["posts:write"] }],
                responses: { "200": { description: "Post deleted" } },
              },
            },
            "/api/import/markdown": {
              post: {
                summary: "Import Markdown",
                security: [{ apiToken: ["posts:write"] }],
                responses: { "202": { description: "Markdown import accepted" } },
              },
            },
            "/api/import/html": {
              post: {
                summary: "Import HTML",
                security: [{ apiToken: ["posts:write"] }],
                responses: { "202": { description: "HTML import accepted" } },
              },
            },
            "/api/import/zip": {
              post: {
                summary: "Import ZIP package",
                security: [{ apiToken: ["posts:write"] }],
                responses: { "202": { description: "ZIP import accepted" } },
              },
            },
            "/api/assets": {
              get: {
                summary: "List assets",
                security: [{ apiToken: ["site:read"] }],
                responses: { "200": { description: "Asset list" } },
              },
              post: {
                summary: "Upload asset",
                security: [{ apiToken: ["assets:write"] }],
                responses: { "201": { description: "Asset uploaded" } },
              },
            },
            "/api/export": {
              get: {
                summary: "Export site archive",
                security: [{ apiToken: ["export:read"] }],
                responses: { "200": { description: "Export archive" } },
              },
            },
            "/api/comments": {
              post: {
                summary: "Submit comment",
                responses: { "201": { description: "Comment created as pending" } },
              },
            },
            "/api/comments/{id}/approve": {
              post: {
                summary: "Approve comment",
                security: [{ apiToken: ["comments:moderate"] }],
                responses: { "200": { description: "Comment approved" } },
              },
            },
            "/api/comments/{id}/spam": {
              post: {
                summary: "Mark comment as spam",
                security: [{ apiToken: ["comments:moderate"] }],
                responses: { "200": { description: "Comment marked as spam" } },
              },
            },
            "/api/comments/{id}/delete": {
              post: {
                summary: "Delete comment",
                security: [{ apiToken: ["comments:moderate"] }],
                responses: { "200": { description: "Comment deleted" } },
              },
            },
          },
          components: {
            securitySchemes: {
              apiToken: {
                type: "http",
                scheme: "bearer",
              },
            },
            schemas: {
              LocalizedFields: {
                type: "object",
                additionalProperties: {
                  type: "object",
                  properties: {
                    en: { type: "string" },
                    zh: { type: "string" },
                  },
                },
              },
            },
          },
          "x-token-scopes": apiTokenScopes,
        });
      },
    },
  },
});
