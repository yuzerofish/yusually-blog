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
                description:
                  "Creating a published post requires both posts:write and posts:publish scopes.",
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
                description:
                  "Changing a post to published requires both posts:write and posts:publish scopes.",
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
                description:
                  "Parses simple frontmatter, derives title/slug/excerpt, and creates a draft unless status is provided. Published imports also require posts:publish.",
                security: [{ apiToken: ["posts:write"] }],
                requestBody: {
                  content: {
                    "application/json": {
                      schema: { $ref: "#/components/schemas/MarkdownImportRequest" },
                    },
                  },
                },
                responses: { "202": { description: "Markdown import accepted" } },
              },
            },
            "/api/import/html": {
              post: {
                summary: "Import HTML",
                description:
                  "Sanitizes HTML, extracts title and description metadata, and creates a draft unless status is provided.",
                security: [{ apiToken: ["posts:write"] }],
                requestBody: {
                  content: {
                    "application/json": {
                      schema: { $ref: "#/components/schemas/HtmlImportRequest" },
                    },
                  },
                },
                responses: { "202": { description: "HTML import accepted" } },
              },
            },
            "/api/import/zip": {
              post: {
                summary: "Import ZIP package",
                description:
                  "Accepts a base64 ZIP or CLI file manifest, imports Markdown/HTML content, uploads image entries to R2, and rewrites local image references.",
                security: [{ apiToken: ["posts:write"] }],
                requestBody: {
                  content: {
                    "application/json": {
                      schema: { $ref: "#/components/schemas/ZipImportRequest" },
                    },
                  },
                },
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
            "/api/site": {
              get: {
                summary: "Read site settings",
                security: [{ apiToken: ["site:read"] }],
                responses: { "200": { description: "Site settings" } },
              },
              put: {
                summary: "Update site settings",
                security: [{ apiToken: ["site:write"] }],
                requestBody: {
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          name: { type: "string" },
                          url: { type: "string" },
                          description: { type: "string" },
                          authorName: { type: "string" },
                          authorBio: { type: "string" },
                          defaultOgImage: { type: "string" },
                          themePreset: { enum: ["claude", "apple", "editorial"] },
                          primaryLanguage: { enum: ["en", "zh"] },
                          rssEnabled: { type: "boolean" },
                          commentsEnabled: { type: "boolean" },
                          indexingEnabled: { type: "boolean" },
                        },
                      },
                    },
                  },
                },
                responses: { "200": { description: "Site settings updated" } },
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
              get: {
                summary: "List comments for moderation",
                security: [{ apiToken: ["comments:moderate"] }],
                parameters: [{ name: "lang", in: "query", schema: { enum: ["en", "zh"] } }],
                responses: { "200": { description: "Localized moderation queue" } },
              },
              post: {
                summary: "Submit comment",
                requestBody: {
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          postSlug: { type: "string" },
                          parentId: {
                            type: "string",
                            description: "Optional approved parent comment id for replies.",
                          },
                          authorName: { type: "string" },
                          authorEmail: { type: "string" },
                          authorWebsite: { type: "string" },
                          body: { type: "string" },
                          turnstileToken: { type: "string" },
                        },
                        required: ["postSlug", "authorName", "authorEmail", "body"],
                      },
                    },
                  },
                },
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
            "/api/tokens": {
              get: {
                summary: "List API tokens",
                security: [{ apiToken: ["site:read"] }],
                responses: { "200": { description: "API token list" } },
              },
              post: {
                summary: "Create API token",
                security: [{ apiToken: ["site:write"] }],
                responses: { "201": { description: "API token created" } },
              },
            },
            "/api/tokens/{id}/revoke": {
              post: {
                summary: "Revoke API token",
                security: [{ apiToken: ["site:write"] }],
                responses: { "200": { description: "API token revoked" } },
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
              ImportPostFields: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  slug: { type: "string" },
                  excerpt: { type: "string" },
                  status: { enum: ["draft", "published", "scheduled", "archived"] },
                  coverImage: { type: "string" },
                  seoTitle: { type: "string" },
                  seoDescription: { type: "string" },
                  tags: { type: "array", items: { type: "string" } },
                  locale: { enum: ["en", "zh"] },
                  i18n: { $ref: "#/components/schemas/LocalizedFields" },
                },
              },
              MarkdownImportRequest: {
                allOf: [
                  { $ref: "#/components/schemas/ImportPostFields" },
                  {
                    type: "object",
                    properties: {
                      filename: { type: "string" },
                      contentMarkdown: { type: "string" },
                    },
                    required: ["contentMarkdown"],
                  },
                ],
              },
              HtmlImportRequest: {
                allOf: [
                  { $ref: "#/components/schemas/ImportPostFields" },
                  {
                    type: "object",
                    properties: {
                      filename: { type: "string" },
                      contentHtml: { type: "string" },
                    },
                    required: ["contentHtml"],
                  },
                ],
              },
              ZipImportRequest: {
                allOf: [
                  { $ref: "#/components/schemas/ImportPostFields" },
                  {
                    type: "object",
                    properties: {
                      filename: { type: "string" },
                      contentBase64: { type: "string" },
                      files: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            path: { type: "string" },
                            contentBase64: { type: "string" },
                            contentText: { type: "string" },
                            contentType: { type: "string" },
                          },
                          required: ["path"],
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
          "x-token-scopes": apiTokenScopes,
        });
      },
    },
  },
});
