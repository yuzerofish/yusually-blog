import { createFileRoute } from "@tanstack/react-router";

import { apiTokenScopes } from "#/lib/cms-api";

export const Route = createFileRoute("/openapi.json")({
  server: {
    handlers: {
      GET: () => {
        return Response.json({
          openapi: "3.1.0",
          info: {
            title: "01mvp-blog-starter API",
            version: "0.1.0",
            description:
              "Automation API for bilingual 01mvp-blog-starter publishing, imports, exports, assets, and moderation.",
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
                  "Creating a published or scheduled post requires both posts:write and posts:publish scopes.",
                security: [{ apiToken: ["posts:write"] }],
                responses: { "201": { description: "Post created" } },
              },
            },
            "/api/posts/batch": {
              post: {
                summary: "Batch update posts",
                description:
                  "Applies publish, draft, archive, or delete to selected posts. Publish requires posts:publish in addition to posts:write.",
                security: [{ apiToken: ["posts:write"] }],
                requestBody: {
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          ids: { type: "array", items: { type: "string" } },
                          action: { enum: ["publish", "draft", "archive", "delete"] },
                        },
                        required: ["ids", "action"],
                      },
                    },
                  },
                },
                responses: { "200": { description: "Posts updated" } },
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
                  "Changing a post to published or scheduled requires both posts:write and posts:publish scopes.",
                security: [{ apiToken: ["posts:write"] }],
                responses: { "200": { description: "Post updated" } },
              },
              delete: {
                summary: "Delete post",
                security: [{ apiToken: ["posts:write"] }],
                responses: { "200": { description: "Post deleted" } },
              },
            },
            "/api/pages": {
              get: {
                summary: "List pages",
                security: [{ apiToken: ["site:read"] }],
                parameters: [{ name: "status", in: "query", schema: { enum: ["all"] } }],
                responses: { "200": { description: "Page list" } },
              },
              post: {
                summary: "Create page",
                description: "Creates a Markdown-backed static page such as About.",
                security: [{ apiToken: ["site:write"] }],
                requestBody: {
                  content: {
                    "application/json": {
                      schema: { $ref: "#/components/schemas/PageInput" },
                    },
                  },
                },
                responses: { "201": { description: "Page created" } },
              },
            },
            "/api/pages/{id}": {
              get: {
                summary: "Get page",
                security: [{ apiToken: ["site:read"] }],
                responses: { "200": { description: "Page detail" } },
              },
              patch: {
                summary: "Update page",
                security: [{ apiToken: ["site:write"] }],
                requestBody: {
                  content: {
                    "application/json": {
                      schema: { $ref: "#/components/schemas/PageInput" },
                    },
                  },
                },
                responses: { "200": { description: "Page updated" } },
              },
              delete: {
                summary: "Delete page",
                security: [{ apiToken: ["site:write"] }],
                responses: { "200": { description: "Page deleted" } },
              },
            },
            "/api/projects": {
              get: {
                summary: "List projects",
                security: [{ apiToken: ["site:read"] }],
                parameters: [{ name: "status", in: "query", schema: { enum: ["all"] } }],
                responses: { "200": { description: "Project list" } },
              },
              post: {
                summary: "Create project",
                description:
                  "Creates a portfolio project with links, tags, screenshots, and Markdown body.",
                security: [{ apiToken: ["site:write"] }],
                requestBody: {
                  content: {
                    "application/json": {
                      schema: { $ref: "#/components/schemas/ProjectInput" },
                    },
                  },
                },
                responses: { "201": { description: "Project created" } },
              },
            },
            "/api/projects/{id}": {
              get: {
                summary: "Get project",
                security: [{ apiToken: ["site:read"] }],
                responses: { "200": { description: "Project detail" } },
              },
              patch: {
                summary: "Update project",
                security: [{ apiToken: ["site:write"] }],
                requestBody: {
                  content: {
                    "application/json": {
                      schema: { $ref: "#/components/schemas/ProjectInput" },
                    },
                  },
                },
                responses: { "200": { description: "Project updated" } },
              },
              delete: {
                summary: "Delete project",
                security: [{ apiToken: ["site:write"] }],
                responses: { "200": { description: "Project deleted" } },
              },
            },
            "/api/import/markdown": {
              post: {
                summary: "Import Markdown",
                description:
                  "Parses simple frontmatter, derives title/slug/excerpt, and creates a draft unless status is provided. Published and scheduled imports also require posts:publish.",
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
            "/api/assets/{id}": {
              delete: {
                summary: "Delete asset",
                description: "Deletes the D1 asset record and the matching R2 object when present.",
                security: [{ apiToken: ["assets:write"] }],
                responses: {
                  "200": { description: "Asset deleted" },
                  "404": { description: "Asset not found" },
                },
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
                          themePreset: { enum: ["maker", "apple", "editorial"] },
                          layoutPreset: { enum: ["shelf", "developer", "journal"] },
                          primaryLanguage: { enum: ["en", "zh"] },
                          rssEnabled: { type: "boolean" },
                          commentsEnabled: { type: "boolean" },
                          commentsRequireApproval: { type: "boolean" },
                          commentAutoBlockEnabled: { type: "boolean" },
                          commentBlockedKeywords: {
                            type: "array",
                            items: { type: "string" },
                          },
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
                description:
                  "Returns JSON by default. Use format=zip to download a full ZIP archive with Markdown, HTML, JSON manifests, comments, settings, and bundled R2 assets.",
                security: [{ apiToken: ["export:read"] }],
                parameters: [{ name: "format", in: "query", schema: { enum: ["json", "zip"] } }],
                responses: {
                  "200": {
                    description: "Export archive",
                    content: {
                      "application/json": {
                        schema: { type: "object" },
                      },
                      "application/zip": {
                        schema: { type: "string", format: "binary" },
                      },
                    },
                  },
                },
              },
            },
            "/api/backups": {
              post: {
                summary: "Create backup",
                description:
                  "Creates a ZIP export backup in R2 and applies the configured backup retention policy.",
                security: [{ apiToken: ["export:read"] }],
                responses: {
                  "201": {
                    description: "Backup created",
                    content: {
                      "application/json": {
                        schema: { $ref: "#/components/schemas/BackupResult" },
                      },
                    },
                  },
                },
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
                description:
                  "Requires a reader comment session. Author name and email are taken from the session.",
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
                          authorWebsite: { type: "string" },
                          body: { type: "string" },
                          turnstileToken: { type: "string" },
                        },
                        required: ["postSlug", "body"],
                      },
                    },
                  },
                },
                responses: {
                  "201": { description: "Comment created through moderation settings" },
                  "401": { description: "Comment login required" },
                },
              },
            },
            "/api/comment-auth/me": {
              get: {
                summary: "Read current comment user",
                responses: { "200": { description: "Current reader comment user or null" } },
              },
            },
            "/api/comment-auth/login": {
              post: {
                summary: "Email login for commenting",
                requestBody: {
                  content: {
                    "application/json": {
                      schema: { $ref: "#/components/schemas/CommentEmailAuthRequest" },
                    },
                  },
                },
                responses: { "200": { description: "Comment session created" } },
              },
            },
            "/api/comment-auth/signup": {
              post: {
                summary: "Email signup for commenting",
                requestBody: {
                  content: {
                    "application/json": {
                      schema: { $ref: "#/components/schemas/CommentEmailSignupRequest" },
                    },
                  },
                },
                responses: { "200": { description: "Comment user and session created" } },
              },
            },
            "/api/comment-auth/logout": {
              post: {
                summary: "Logout comment user",
                responses: { "200": { description: "Comment session cleared" } },
              },
            },
            "/api/comment-auth/github/start": {
              get: {
                summary: "Start GitHub comment login",
                responses: { "302": { description: "Redirect to GitHub OAuth" } },
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
            "/api/admin/password-reset": {
              post: {
                summary: "Request or confirm password reset",
                description:
                  "Requests an optional Email Sending password reset link when email is supplied, or confirms a reset when token and password are supplied.",
                requestBody: {
                  content: {
                    "application/json": {
                      schema: { $ref: "#/components/schemas/PasswordResetRequest" },
                    },
                  },
                },
                responses: {
                  "202": { description: "Password reset email accepted" },
                  "200": { description: "Password updated" },
                },
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
                  publishedAt: { type: "string", format: "date-time" },
                  coverImage: { type: "string" },
                  seoTitle: { type: "string" },
                  seoDescription: { type: "string" },
                  tags: { type: "array", items: { type: "string" } },
                  locale: { enum: ["en", "zh"] },
                  i18n: { $ref: "#/components/schemas/LocalizedFields" },
                },
              },
              PageInput: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  slug: { type: "string" },
                  contentMarkdown: { type: "string" },
                  contentHtml: { type: "string" },
                  status: { enum: ["draft", "published", "archived"] },
                  seoTitle: { type: "string" },
                  seoDescription: { type: "string" },
                  locale: { enum: ["en", "zh"] },
                  i18n: { $ref: "#/components/schemas/LocalizedFields" },
                },
                required: ["title", "contentMarkdown"],
              },
              ProjectInput: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  slug: { type: "string" },
                  excerpt: { type: "string" },
                  projectUrl: { type: "string" },
                  githubUrl: { type: "string" },
                  coverImage: { type: "string" },
                  contentMarkdown: { type: "string" },
                  contentHtml: { type: "string" },
                  tags: { type: "array", items: { type: "string" } },
                  screenshots: { type: "array", items: { type: "string" } },
                  status: { enum: ["draft", "published", "archived"] },
                  locale: { enum: ["en", "zh"] },
                  i18n: { $ref: "#/components/schemas/LocalizedFields" },
                },
                required: ["title", "contentMarkdown"],
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
              BackupResult: {
                type: "object",
                properties: {
                  trigger: { enum: ["manual", "cron"] },
                  backup: {
                    type: "object",
                    properties: {
                      key: { type: "string" },
                      url: { type: "string" },
                      contentType: { type: "string" },
                      sizeBytes: { type: "number" },
                      createdAt: { type: "string" },
                    },
                  },
                  retentionDays: { type: "number" },
                  prunedKeys: { type: "array", items: { type: "string" } },
                  assetCount: { type: "number" },
                  missingAssetKeys: { type: "array", items: { type: "string" } },
                  exportedAt: { type: "string" },
                },
              },
              PasswordResetRequest: {
                oneOf: [
                  {
                    type: "object",
                    properties: {
                      email: { type: "string" },
                    },
                    required: ["email"],
                  },
                  {
                    type: "object",
                    properties: {
                      token: { type: "string" },
                      password: { type: "string" },
                    },
                    required: ["token", "password"],
                  },
                ],
              },
              CommentEmailAuthRequest: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
                required: ["email", "password"],
              },
              CommentEmailSignupRequest: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" },
                },
                required: ["name", "email", "password"],
              },
            },
          },
          "x-token-scopes": apiTokenScopes,
        });
      },
    },
  },
});
