import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/openapi.json")({
  server: {
    handlers: {
      GET: () => {
        return Response.json({
          openapi: "3.1.0",
          info: {
            title: "Cloud Blog CMS API",
            version: "0.1.0",
          },
          paths: {
            "/api/posts": {
              get: {
                summary: "List posts",
                security: [{ apiToken: ["posts:read"] }],
                responses: { "200": { description: "Post list" } },
              },
              post: {
                summary: "Create post",
                security: [{ apiToken: ["posts:write"] }],
                responses: { "201": { description: "Post created" } },
              },
            },
            "/api/assets": {
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
          },
          components: {
            securitySchemes: {
              apiToken: {
                type: "http",
                scheme: "bearer",
              },
            },
          },
        });
      },
    },
  },
});
