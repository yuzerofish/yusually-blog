import { z } from "zod";

const ContentStatusSchema = z.enum(["draft", "published", "scheduled", "archived", "deleted"]);
const ContentSourceSchema = z.enum([
  "editor",
  "markdown_upload",
  "html_upload",
  "api",
  "cli",
  "ai",
  "import",
]);
const SupportedLocaleSchema = z.enum(["en", "zh"]);
const LocalizedStringSchema = z
  .object({
    en: z.string().optional(),
    zh: z.string().optional(),
  })
  .strict();
const PostI18nSchema = z
  .object({
    title: LocalizedStringSchema.optional(),
    excerpt: LocalizedStringSchema.optional(),
    contentMarkdown: LocalizedStringSchema.optional(),
    contentHtml: LocalizedStringSchema.optional(),
    contentText: LocalizedStringSchema.optional(),
    seoTitle: LocalizedStringSchema.optional(),
    seoDescription: LocalizedStringSchema.optional(),
  })
  .strict();

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
  parentId: z.string().nullish(),
  honeypot: z.string().optional().default(""),
  turnstileToken: z.preprocess(
    (value) => (value === null ? undefined : value),
    z.string().optional(),
  ),
});

export const PostWriteSchema = z
  .object({
    title: z.string().optional(),
    slug: z.string().optional(),
    excerpt: z.string().optional(),
    coverImage: z.string().optional(),
    contentMarkdown: z.string().optional(),
    contentHtml: z.string().optional(),
    status: ContentStatusSchema.optional(),
    source: ContentSourceSchema.optional(),
    featured: z.boolean().optional(),
    pinned: z.boolean().optional(),
    commentsEnabled: z.boolean().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    tags: z.array(z.string()).optional(),
    seriesId: z.string().nullable().optional(),
    seriesSlug: z.string().nullable().optional(),
    seriesName: z.string().nullable().optional(),
    publishedAt: z.string().optional(),
    locale: SupportedLocaleSchema.optional(),
    i18n: PostI18nSchema.optional(),
  })
  .strict();

export const PostPatchSchema = PostWriteSchema.refine((value) => Object.keys(value).length > 0, {
  message: "Provide at least one post field to update.",
});

export const BatchPostSchema = z
  .object({
    ids: z.array(z.string().min(1)).min(1).max(50),
    action: z.enum(["publish", "draft", "archive", "delete"]),
    locale: SupportedLocaleSchema.optional(),
  })
  .strict();

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
