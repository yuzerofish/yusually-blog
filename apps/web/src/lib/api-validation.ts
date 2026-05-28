import { z } from "zod";

/**
 * Schema for POST /api/comments — comment creation body.
 *
 * Fields read from the request body in the comments route:
 *   postSlug, body, parentId, honeypot, turnstileToken
 *
 * `authorName` and `authorEmail` are resolved server-side from the
 * authenticated session, so they are not part of this input schema.
 */
export const CreateCommentSchema = z.object({
  postSlug: z.string().min(1).max(200),
  body: z.string().min(2).max(4000),
  parentId: z.string().optional(),
  honeypot: z.string().optional().default(""),
  turnstileToken: z.preprocess(
    (value) => (value === null ? undefined : value),
    z.string().optional(),
  ),
});

/**
 * Run a zod parse and return either the validated data or a 400 Response.
 * Returns `[data, null]` on success or `[null, errorResponse]` on failure.
 */
export function validateBody<T extends z.ZodType>(
  schema: T,
  data: unknown,
): [z.infer<T>, null] | [null, Response] {
  const result = schema.safeParse(data);

  if (result.success) {
    return [result.data, null];
  }

  const errors = result.error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));

  return [null, Response.json({ error: "Validation failed", details: errors }, { status: 400 })];
}
