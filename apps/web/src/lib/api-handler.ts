import { jsonResponse } from "#/lib/cms-api";

type HandlerCtx = { request: Request; params?: Record<string, string> };
type RouteHandler = (ctx: HandlerCtx) => Promise<Response>;

/**
 * Wraps an API route handler with try/catch error handling.
 * Catches unhandled errors and returns a 500 JSON response instead of crashing.
 *
 * Usage inside a TanStack Start route:
 *   POST: withErrorHandling(async ({ request }) => { ... })
 */
export function withErrorHandling(handler: RouteHandler): RouteHandler {
  return async (ctx) => {
    try {
      return await handler(ctx);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Internal server error";
      console.error("[API Error]", ctx.request.url, message);
      return jsonResponse({ error: "Internal server error" }, { status: 500 });
    }
  };
}
