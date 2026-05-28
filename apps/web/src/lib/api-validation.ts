import { z } from "zod";

/**
 * Schema for POST /api/comments — comment creation body.
 *
 * Fields read from the request body in the comments route:
 *   postSlug, body, authorWebsite, parentId, honeypot, turnstileToken
 *
 * `authorName` and `authorEmail` are resolved server-side from the
 * authenticated session, so they are not part of this input schema.
 */
export const CreateCommentSchema = z.object({
  postSlug: z.string().min(1).max(200),
  body: z.string().min(2).max(4000),
  authorWebsite: z.url().max(500).optional().or(z.literal("")),
  parentId: z.string().optional(),
  honeypot: z.string().optional().default(""),
  turnstileToken: z.string().min(1, "Turnstile token is required"),
});

export type CreateCommentInput = z.infer<typeof CreateCommentSchema>;

/**
 * Schema for POST /api/posts — post creation body.
 *
 * Matches the fields accepted by `createPostPreview()` in cms-api.ts.
 */
export const CreatePostSchema = z.object({
  title: z.string().min(1).max(500),
  slug: z.string().min(1).max(300).optional(),
  excerpt: z.string().max(2000).optional(),
  coverImage: z.string().max(1000).optional(),
  contentMarkdown: z.string().optional(),
  status: z.enum(["draft", "published", "scheduled"]).optional(),
  featured: z.boolean().optional(),
  pinned: z.boolean().optional(),
  commentsEnabled: z.boolean().optional(),
  seoTitle: z.string().max(200).optional(),
  seoDescription: z.string().max(500).optional(),
  tags: z.array(z.string()).optional(),
  publishedAt: z.string().optional(),
  locale: z.string().optional(),
});

export type CreatePostInput = z.infer<typeof CreatePostSchema>;

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
