import "@tanstack/react-start/server-only";
import {
  getCommentInitialStatus,
  htmlToText,
  markdownToText,
  normalizeCommentBlockedKeywords,
  renderMarkdownToHtml,
  sanitizeHtml,
  getProjectsForLocale,
  getTagsForLocale,
  localizeSiteSettings,
  siteSettings,
  type ApiToken,
  type ApiTokenScope,
  type Asset,
  type CmsPage,
  type Comment,
  type CommentStatus,
  type ContentStatus,
  type Post,
  type Project,
  type SiteSettings,
  type SupportedLocale,
  type Tag,
  cleanStringList,
  countLinks,
  digestText,
  normalizeDateInput,
  parseJson,
  slugify,
} from "@repo/core";
import * as schema from "@repo/db/schema/cms";
import { env } from "cloudflare:workers";
import { eq, and, or, like, desc, asc, ne, inArray, sql } from "drizzle-orm";

import { cachedGet, invalidateCache } from "./cms-cache";
import { getCmsDb } from "./cms-db";

// ---------------------------------------------------------------------------
// Input / option types (unchanged from original)
// ---------------------------------------------------------------------------

type PostInput = Partial<{
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  contentMarkdown: string;
  contentHtml: string;
  status: ContentStatus;
  source: Post["source"];
  commentsEnabled: boolean;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  publishedAt: string;
  locale: SupportedLocale;
  i18n: Post["i18n"];
}>;

type PageInput = Partial<{
  title: string;
  slug: string;
  contentMarkdown: string;
  contentHtml: string;
  status: CmsPage["status"];
  seoTitle: string;
  seoDescription: string;
  locale: SupportedLocale;
  i18n: CmsPage["i18n"];
}>;

type ProjectInput = Partial<{
  title: string;
  slug: string;
  excerpt: string;
  projectUrl: string;
  githubUrl: string;
  coverImage: string;
  contentMarkdown: string;
  contentHtml: string;
  tags: string[];
  screenshots: string[];
  status: Project["status"];
  locale: SupportedLocale;
  i18n: Project["i18n"];
}>;

type CommentInput = {
  postSlug: string;
  parentId?: string | null;
  authorUserId?: string | null;
  authorName?: string;
  authorEmail?: string;
  authorWebsite?: string | null;
  body?: string;
  locale?: SupportedLocale;
};

type ListPostsOptions = {
  includeUnpublished?: boolean;
  query?: string;
};

type AssetInput = {
  key: string;
  url: string;
  filename: string;
  contentType: string;
  sizeBytes: number;
  attachedPostId?: string | null;
};

type SiteSettingsInput = Partial<
  Pick<
    SiteSettings,
    | "name"
    | "description"
    | "url"
    | "authorName"
    | "authorBio"
    | "avatarUrl"
    | "defaultOgImage"
    | "socialLinks"
    | "navigation"
    | "rssEnabled"
    | "commentsEnabled"
    | "commentsRequireApproval"
    | "commentAutoBlockEnabled"
    | "commentBlockedKeywords"
    | "emailVerificationEnabled"
    | "indexingEnabled"
    | "themePreset"
    | "layoutPreset"
    | "primaryLanguage"
    | "i18n"
  >
> & {
  theme?: string;
};

type D1Result<TValue> = { data: TValue } | { error: string };

// ---------------------------------------------------------------------------
// Helpers to convert Drizzle rows to app types
// ---------------------------------------------------------------------------

function drizzleRowToPost(
  row: typeof schema.posts.$inferSelect,
  currentSettings: SiteSettings = runtimeDefaultSiteSettings(),
): Post {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    coverImage: row.coverImage || currentSettings.defaultOgImage,
    contentMarkdown: row.contentMarkdown,
    contentHtml: row.contentHtml,
    contentText: row.contentText,
    status: row.status as ContentStatus,
    source: row.source as Post["source"],
    featured: row.featured,
    pinned: row.pinned,
    commentsEnabled: row.commentsEnabled,
    publishedAt: row.publishedAt ?? row.createdAt,
    updatedAt: row.updatedAt,
    authorName: currentSettings.authorName,
    tags: [],
    seoTitle: row.seoTitle ?? row.title,
    seoDescription: row.seoDescription ?? row.excerpt,
    i18n: row.i18n as Post["i18n"],
  };
}

function drizzleRowToPage(row: typeof schema.pages.$inferSelect): CmsPage {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    contentMarkdown: row.contentMarkdown,
    contentHtml: row.contentHtml,
    status: row.status as CmsPage["status"],
    seoTitle: row.seoTitle ?? row.title,
    seoDescription: row.seoDescription ?? "",
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    i18n: row.i18n as CmsPage["i18n"],
  };
}

function drizzleRowToProject(row: typeof schema.projects.$inferSelect): Project {
  const tags = (row.tags ?? []) as string[];
  const screenshots = (row.screenshots ?? []) as string[];
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    coverImage: row.coverImage ?? "",
    projectUrl: row.projectUrl ?? "",
    githubUrl: row.githubUrl ?? "",
    contentMarkdown: row.contentMarkdown,
    contentHtml: row.contentHtml,
    tags: tagsFromNames(tags),
    screenshots: cleanStringList(screenshots),
    status: row.status as Project["status"],
    publishedAt: row.publishedAt ?? row.createdAt,
    updatedAt: row.updatedAt,
    i18n: row.i18n as Project["i18n"],
  };
}

function drizzleRowToTag(row: typeof schema.tags.$inferSelect): Tag {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    i18n: row.i18n as Tag["i18n"],
  };
}

function drizzleRowToComment(row: typeof schema.comments.$inferSelect): Comment {
  return {
    id: row.id,
    postId: row.postId,
    parentId: row.parentId,
    authorUserId: row.authorUserId,
    authorName: row.authorName,
    authorEmailHash: row.authorEmailHash,
    authorWebsite: row.authorWebsite,
    body: row.body,
    status: row.status as CommentStatus,
    createdAt: row.createdAt,
    i18n: row.i18n as Comment["i18n"],
  };
}

function drizzleRowToAsset(row: typeof schema.assets.$inferSelect): Asset {
  return {
    id: row.id,
    key: row.key,
    url: row.url,
    filename: row.filename,
    contentType: row.contentType,
    sizeBytes: row.sizeBytes,
    attachedPostId: row.attachedPostId,
    createdAt: row.createdAt,
  };
}

function drizzleRowToApiToken(row: typeof schema.apiTokens.$inferSelect): ApiToken {
  return {
    id: row.id,
    name: row.name,
    tokenPrefix: row.tokenHash.slice(0, 16),
    scopes: (row.scopes as ApiTokenScope[]) ?? [],
    expiresAt: row.expiresAt,
    lastUsedAt: row.lastUsedAt,
    revokedAt: row.revokedAt,
    createdAt: row.createdAt,
  };
}

// ---------------------------------------------------------------------------
// Published-scope WHERE condition (reused by multiple query builders)
// ---------------------------------------------------------------------------

function publishedWhereClause() {
  const now = new Date().toISOString();
  return or(
    eq(schema.posts.status, "published"),
    and(eq(schema.posts.status, "scheduled"), sql`${schema.posts.publishedAt} <= ${now}`),
  );
}

function notDeletedWhereClause() {
  return ne(schema.posts.status, "deleted");
}

function postVisibilityFilter(includeUnpublished?: boolean) {
  return includeUnpublished ? notDeletedWhereClause() : publishedWhereClause();
}

function entityVisibilityFilter(
  table: typeof schema.pages | typeof schema.projects,
  includeUnpublished?: boolean,
) {
  return includeUnpublished ? ne(table.status, "deleted") : eq(table.status, "published");
}

// ---------------------------------------------------------------------------
// Site settings
// ---------------------------------------------------------------------------

const siteSettingsKey = "site";

export async function getD1SiteSettings(locale?: SupportedLocale) {
  const settings = await cachedGet("site:settings", () =>
    readD1SiteSettings().catch(() => runtimeDefaultSiteSettings()),
  );

  return locale ? localizeSiteSettings(settings, locale) : settings;
}

async function readD1SiteSettings() {
  const db = getCmsDb();
  const rows = await db
    .select()
    .from(schema.siteSettings)
    .where(eq(schema.siteSettings.key, siteSettingsKey))
    .limit(1);
  const row = rows[0];

  return normalizeSiteSettings(
    parseJson<SiteSettingsInput>((row?.value as string | null) ?? null) ?? {},
  );
}

export async function updateD1SiteSettings(input: SiteSettingsInput) {
  const current = await getD1SiteSettings();
  const settings = normalizeSiteSettings(input, current);
  const now = new Date().toISOString();

  const db = getCmsDb();
  await db
    .insert(schema.siteSettings)
    .values({ key: siteSettingsKey, value: settings, updatedAt: now })
    .onConflictDoUpdate({
      target: schema.siteSettings.key,
      set: { value: settings, updatedAt: now },
    });

  await invalidateCache("site:settings");

  return settings;
}

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

export async function listD1Posts({
  includeUnpublished = false,
  query = "",
}: ListPostsOptions = {}) {
  // Cache the common case: published posts, no search query
  if (!includeUnpublished && !query) {
    return cachedGet("posts:published", () =>
      listD1PostsFromDb({ includeUnpublished: false, query: "" }),
    );
  }

  return listD1PostsFromDb({ includeUnpublished, query });
}

async function listD1PostsFromDb({
  includeUnpublished = false,
  query = "",
}: ListPostsOptions = {}) {
  const db = getCmsDb();
  const normalizedQuery = query.trim().toLowerCase();
  const conditions = [postVisibilityFilter(includeUnpublished)];

  if (normalizedQuery) {
    const pattern = `%${normalizedQuery}%`;
    conditions.push(
      or(
        like(sql`lower(${schema.posts.title})`, pattern),
        like(sql`lower(${schema.posts.excerpt})`, pattern),
        like(sql`lower(${schema.posts.contentText})`, pattern),
        like(sql`lower(${schema.posts.slug})`, pattern),
      )!,
    );
  }

  const rows = await db
    .select()
    .from(schema.posts)
    .where(and(...conditions))
    .orderBy(
      desc(schema.posts.pinned),
      desc(schema.posts.publishedAt),
      desc(schema.posts.updatedAt),
    );

  const currentSettings = await getD1SiteSettings();

  return attachD1Tags(rows.map((row) => drizzleRowToPost(row, currentSettings)));
}

export async function getD1PostBySlug(slug: string, includeUnpublished = false) {
  const db = getCmsDb();
  const rows = await db
    .select()
    .from(schema.posts)
    .where(and(eq(schema.posts.slug, slug), postVisibilityFilter(includeUnpublished)))
    .limit(1);

  const row = rows[0];

  if (!row) {
    return undefined;
  }

  const [post] = await attachD1Tags([drizzleRowToPost(row, await getD1SiteSettings())]);

  return post;
}

export async function getD1PostByIdOrSlug(idOrSlug: string, includeUnpublished = true) {
  const db = getCmsDb();
  const rows = await db
    .select()
    .from(schema.posts)
    .where(
      and(
        or(eq(schema.posts.id, idOrSlug), eq(schema.posts.slug, idOrSlug)),
        postVisibilityFilter(includeUnpublished),
      ),
    )
    .limit(1);

  const row = rows[0];

  if (!row) {
    return undefined;
  }

  const [post] = await attachD1Tags([drizzleRowToPost(row, await getD1SiteSettings())]);

  return post;
}

export async function listD1Tags() {
  return cachedGet("tags:all", async () => {
    const db = getCmsDb();
    const rows = await db.select().from(schema.tags).orderBy(asc(schema.tags.name));
    return rows.map(drizzleRowToTag);
  });
}

export async function createD1Post(input: PostInput) {
  const currentSettings = await getD1SiteSettings();
  const title = input.title?.trim() || "Untitled post";
  const slug = await uniqueD1Slug(input.slug?.trim() || slugify(title));
  const now = new Date().toISOString();
  const contentMarkdown = input.contentMarkdown?.trim() || `# ${title}\n`;
  const contentHtml = input.contentHtml
    ? sanitizeHtml(input.contentHtml)
    : renderMarkdownToHtml(contentMarkdown);
  const contentText = input.contentHtml ? htmlToText(contentHtml) : markdownToText(contentMarkdown);
  const status = input.status ?? "draft";
  const source = input.source ?? "api";
  const publishedAt = normalizeDateInput(input.publishedAt) ?? now;
  const coverImage = input.coverImage?.trim() || currentSettings.defaultOgImage;
  const post: Post = {
    id: `post_${crypto.randomUUID()}`,
    title,
    slug,
    excerpt: input.excerpt?.trim() || contentText.slice(0, 180),
    coverImage,
    contentMarkdown,
    contentHtml,
    contentText,
    status,
    source,
    featured: false,
    pinned: false,
    commentsEnabled: input.commentsEnabled ?? true,
    publishedAt,
    updatedAt: now,
    authorName: currentSettings.authorName,
    tags: [],
    seoTitle: input.seoTitle?.trim() || title,
    seoDescription:
      input.seoDescription?.trim() || input.excerpt?.trim() || contentText.slice(0, 160),
    i18n: input.i18n,
  };

  if (input.locale === "zh") {
    post.i18n = {
      ...post.i18n,
      title: { ...post.i18n?.title, zh: title },
      excerpt: { ...post.i18n?.excerpt, zh: post.excerpt },
      contentMarkdown: { ...post.i18n?.contentMarkdown, zh: post.contentMarkdown },
      contentHtml: { ...post.i18n?.contentHtml, zh: post.contentHtml },
      contentText: { ...post.i18n?.contentText, zh: post.contentText },
      seoTitle: { ...post.i18n?.seoTitle, zh: post.seoTitle },
      seoDescription: { ...post.i18n?.seoDescription, zh: post.seoDescription },
    };
  }

  const db = getCmsDb();
  await db.insert(schema.posts).values({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    coverImage: coverImage,
    contentMarkdown: post.contentMarkdown,
    contentHtml: post.contentHtml,
    contentText: post.contentText,
    status: post.status,
    source: post.source,
    featured: post.featured,
    pinned: post.pinned,
    commentsEnabled: post.commentsEnabled,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    i18n: post.i18n ?? null,
    publishedAt,
    createdAt: now,
    updatedAt: post.updatedAt,
  });

  await replaceD1PostTags(post.id, input.tags ?? [], input.locale);
  await invalidateCache("posts:published", "tags:all");

  return (await getD1PostByIdOrSlug(post.id)) ?? post;
}

export async function updateD1Post(idOrSlug: string, input: PostInput) {
  const currentSettings = await getD1SiteSettings();
  const post = await getD1PostByIdOrSlug(idOrSlug);

  if (!post) {
    return undefined;
  }

  const localizedUpdate = input.locale === "zh";
  const inputTitle = input.title?.trim();
  const inputExcerpt = input.excerpt?.trim();
  const inputMarkdown = input.contentMarkdown?.trim();
  const inputHtml = input.contentHtml !== undefined ? sanitizeHtml(input.contentHtml) : undefined;
  const title = localizedUpdate ? post.title : inputTitle || post.title;
  const contentMarkdown = localizedUpdate
    ? post.contentMarkdown
    : (inputMarkdown ?? post.contentMarkdown);
  const contentHtml = localizedUpdate
    ? post.contentHtml
    : inputHtml !== undefined
      ? inputHtml
      : inputMarkdown !== undefined
        ? renderMarkdownToHtml(contentMarkdown)
        : post.contentHtml;
  const contentText = localizedUpdate
    ? post.contentText
    : inputHtml !== undefined
      ? htmlToText(contentHtml)
      : inputMarkdown !== undefined
        ? markdownToText(contentMarkdown)
        : post.contentText;
  const status = input.status ?? post.status;
  const now = new Date().toISOString();
  const inputPublishedAt =
    input.publishedAt !== undefined ? normalizeDateInput(input.publishedAt) : undefined;
  const publishedAt =
    inputPublishedAt ??
    (status === "published" && post.status !== "published" ? now : post.publishedAt);
  const i18n = buildPostI18n(post, input, {
    contentHtml: inputHtml,
    contentMarkdown: inputMarkdown,
    excerpt: inputExcerpt,
    title: inputTitle,
  });
  const excerpt = localizedUpdate
    ? post.excerpt
    : inputExcerpt !== undefined
      ? inputExcerpt
      : post.excerpt;
  const seoTitle = localizedUpdate ? post.seoTitle : input.seoTitle?.trim() || title;
  const seoDescription = localizedUpdate
    ? post.seoDescription
    : input.seoDescription !== undefined
      ? input.seoDescription.trim()
      : input.excerpt !== undefined
        ? excerpt
        : post.seoDescription;
  const commentsEnabled = input.commentsEnabled ?? post.commentsEnabled;

  const db = getCmsDb();
  await db
    .update(schema.posts)
    .set({
      title,
      excerpt,
      coverImage:
        input.coverImage !== undefined
          ? input.coverImage.trim() || currentSettings.defaultOgImage
          : post.coverImage,
      contentMarkdown,
      contentHtml,
      contentText,
      status,
      commentsEnabled,
      seoTitle,
      seoDescription,
      i18n: i18n ?? null,
      publishedAt,
      updatedAt: now,
    })
    .where(eq(schema.posts.id, post.id));

  if (input.tags !== undefined) {
    await replaceD1PostTags(post.id, input.tags, input.locale);
  }

  await invalidateCache("posts:published", "tags:all");

  return getD1PostByIdOrSlug(post.id);
}

function buildPostI18n(
  post: Post,
  input: PostInput,
  normalized: {
    contentHtml?: string;
    contentMarkdown?: string;
    excerpt?: string;
    title?: string;
  },
) {
  if (input.i18n) {
    return input.i18n;
  }

  if (input.locale !== "zh") {
    return post.i18n ?? null;
  }

  const next = { ...post.i18n };
  const setZh = <TField extends keyof NonNullable<Post["i18n"]>>(field: TField, value?: string) => {
    if (value === undefined) {
      return;
    }

    next[field] = {
      ...next[field],
      zh: value,
    };
  };

  const localizedHtml =
    normalized.contentHtml ??
    (normalized.contentMarkdown !== undefined
      ? renderMarkdownToHtml(normalized.contentMarkdown)
      : undefined);
  const localizedText =
    normalized.contentHtml !== undefined
      ? htmlToText(normalized.contentHtml)
      : normalized.contentMarkdown !== undefined
        ? markdownToText(normalized.contentMarkdown)
        : undefined;

  setZh("title", normalized.title);
  setZh("excerpt", normalized.excerpt);
  setZh("contentMarkdown", normalized.contentMarkdown);
  setZh("contentHtml", localizedHtml);
  setZh("contentText", localizedText);
  setZh("seoTitle", input.seoTitle?.trim() || normalized.title);
  setZh("seoDescription", input.seoDescription?.trim() || normalized.excerpt || localizedText);

  return next;
}

function buildPageI18n(
  page: CmsPage,
  input: PageInput,
  normalized: {
    contentHtml?: string;
    contentMarkdown?: string;
    title?: string;
  },
) {
  if (input.i18n) {
    return input.i18n;
  }

  if (input.locale !== "zh") {
    return page.i18n ?? null;
  }

  const next = { ...page.i18n };
  const localizedHtml =
    normalized.contentHtml ??
    (normalized.contentMarkdown !== undefined
      ? renderMarkdownToHtml(normalized.contentMarkdown)
      : undefined);
  const localizedText =
    normalized.contentHtml !== undefined
      ? htmlToText(normalized.contentHtml)
      : normalized.contentMarkdown !== undefined
        ? markdownToText(normalized.contentMarkdown)
        : undefined;

  if (normalized.title !== undefined) {
    next.title = { ...next.title, zh: normalized.title };
  }

  if (normalized.contentMarkdown !== undefined) {
    next.contentMarkdown = { ...next.contentMarkdown, zh: normalized.contentMarkdown };
  }

  if (localizedHtml !== undefined) {
    next.contentHtml = { ...next.contentHtml, zh: localizedHtml };
  }

  if (input.seoTitle !== undefined || normalized.title !== undefined) {
    next.seoTitle = {
      ...next.seoTitle,
      zh: input.seoTitle?.trim() || normalized.title || page.seoTitle,
    };
  }

  if (input.seoDescription !== undefined || localizedText !== undefined) {
    next.seoDescription = {
      ...next.seoDescription,
      zh: input.seoDescription?.trim() || localizedText || page.seoDescription,
    };
  }

  return next;
}

function buildProjectI18n(
  project: Project,
  input: ProjectInput,
  normalized: {
    contentHtml?: string;
    contentMarkdown?: string;
    excerpt?: string;
    title?: string;
  },
) {
  if (input.i18n) {
    return input.i18n;
  }

  if (input.locale !== "zh") {
    return project.i18n ?? null;
  }

  const next = { ...project.i18n };
  const localizedHtml =
    normalized.contentHtml ??
    (normalized.contentMarkdown !== undefined
      ? renderMarkdownToHtml(normalized.contentMarkdown)
      : undefined);

  if (normalized.title !== undefined) {
    next.title = { ...next.title, zh: normalized.title };
  }

  if (normalized.excerpt !== undefined) {
    next.excerpt = { ...next.excerpt, zh: normalized.excerpt };
  }

  if (normalized.contentMarkdown !== undefined) {
    next.contentMarkdown = { ...next.contentMarkdown, zh: normalized.contentMarkdown };
  }

  if (localizedHtml !== undefined) {
    next.contentHtml = { ...next.contentHtml, zh: localizedHtml };
  }

  return next;
}

export async function deleteD1Post(idOrSlug: string) {
  const post = await getD1PostByIdOrSlug(idOrSlug);

  if (!post) {
    return undefined;
  }

  const now = new Date().toISOString();
  const db = getCmsDb();

  await db
    .update(schema.posts)
    .set({ status: "deleted", updatedAt: now })
    .where(eq(schema.posts.id, post.id));

  await invalidateCache("posts:published");

  return {
    ...post,
    status: "deleted" as const,
    updatedAt: now,
  };
}

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

export async function listD1Pages({ includeUnpublished = false } = {}) {
  const db = getCmsDb();
  const rows = await db
    .select()
    .from(schema.pages)
    .where(entityVisibilityFilter(schema.pages, includeUnpublished))
    .orderBy(desc(schema.pages.updatedAt));

  return rows.map(drizzleRowToPage);
}

export async function getD1PageBySlug(slug: string, includeUnpublished = false) {
  const db = getCmsDb();
  const rows = await db
    .select()
    .from(schema.pages)
    .where(
      and(eq(schema.pages.slug, slug), entityVisibilityFilter(schema.pages, includeUnpublished)),
    )
    .limit(1);

  return rows[0] ? drizzleRowToPage(rows[0]) : undefined;
}

export async function getD1PageByIdOrSlug(idOrSlug: string, includeUnpublished = true) {
  const db = getCmsDb();
  const rows = await db
    .select()
    .from(schema.pages)
    .where(
      and(
        or(eq(schema.pages.id, idOrSlug), eq(schema.pages.slug, idOrSlug)),
        entityVisibilityFilter(schema.pages, includeUnpublished),
      ),
    )
    .limit(1);

  return rows[0] ? drizzleRowToPage(rows[0]) : undefined;
}

export async function createD1Page(input: PageInput) {
  const title = input.title?.trim() || "Untitled page";
  const slug = await uniqueD1PageSlug(input.slug?.trim() || slugify(title));
  const now = new Date().toISOString();
  const contentMarkdown = input.contentMarkdown?.trim() || `# ${title}\n`;
  const contentHtml = input.contentHtml
    ? sanitizeHtml(input.contentHtml)
    : renderMarkdownToHtml(contentMarkdown);
  const status = normalizeContentRecordStatus(input.status, "draft");
  const page: CmsPage = {
    id: `page_${crypto.randomUUID()}`,
    title,
    slug,
    contentMarkdown,
    contentHtml,
    status,
    seoTitle: input.seoTitle?.trim() || title,
    seoDescription: input.seoDescription?.trim() || markdownToText(contentMarkdown).slice(0, 160),
    createdAt: now,
    updatedAt: now,
    i18n: input.i18n,
  };

  if (input.locale === "zh") {
    page.i18n = {
      ...page.i18n,
      title: { ...page.i18n?.title, zh: title },
      contentMarkdown: { ...page.i18n?.contentMarkdown, zh: contentMarkdown },
      contentHtml: { ...page.i18n?.contentHtml, zh: contentHtml },
      seoTitle: { ...page.i18n?.seoTitle, zh: page.seoTitle },
      seoDescription: { ...page.i18n?.seoDescription, zh: page.seoDescription },
    };
  }

  const db = getCmsDb();
  await db.insert(schema.pages).values({
    id: page.id,
    title: page.title,
    slug: page.slug,
    contentMarkdown: page.contentMarkdown,
    contentHtml: page.contentHtml,
    status: page.status,
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    i18n: page.i18n ?? null,
    createdAt: page.createdAt,
    updatedAt: page.updatedAt,
  });

  return (await getD1PageByIdOrSlug(page.id)) ?? page;
}

export async function updateD1Page(idOrSlug: string, input: PageInput) {
  const page = await getD1PageByIdOrSlug(idOrSlug);

  if (!page) {
    return undefined;
  }

  const localizedUpdate = input.locale === "zh";
  const inputTitle = input.title?.trim();
  const inputMarkdown = input.contentMarkdown?.trim();
  const inputHtml = input.contentHtml !== undefined ? sanitizeHtml(input.contentHtml) : undefined;
  const title = localizedUpdate ? page.title : inputTitle || page.title;
  const contentMarkdown = localizedUpdate
    ? page.contentMarkdown
    : (inputMarkdown ?? page.contentMarkdown);
  const contentHtml = localizedUpdate
    ? page.contentHtml
    : inputHtml !== undefined
      ? inputHtml
      : inputMarkdown !== undefined
        ? renderMarkdownToHtml(contentMarkdown)
        : page.contentHtml;
  const i18n = buildPageI18n(page, input, {
    contentHtml: inputHtml,
    contentMarkdown: inputMarkdown,
    title: inputTitle,
  });
  const seoTitle = localizedUpdate ? page.seoTitle : input.seoTitle?.trim() || title;
  const seoDescription = localizedUpdate
    ? page.seoDescription
    : input.seoDescription !== undefined
      ? input.seoDescription.trim()
      : page.seoDescription;
  const now = new Date().toISOString();

  const db = getCmsDb();
  await db
    .update(schema.pages)
    .set({
      title,
      contentMarkdown,
      contentHtml,
      status: normalizeContentRecordStatus(input.status, page.status),
      seoTitle,
      seoDescription,
      i18n: i18n ?? null,
      updatedAt: now,
    })
    .where(eq(schema.pages.id, page.id));

  return getD1PageByIdOrSlug(page.id);
}

export async function deleteD1Page(idOrSlug: string) {
  const page = await getD1PageByIdOrSlug(idOrSlug);

  if (!page) {
    return undefined;
  }

  const now = new Date().toISOString();
  const db = getCmsDb();

  await db
    .update(schema.pages)
    .set({ status: "deleted", updatedAt: now })
    .where(eq(schema.pages.id, page.id));

  return {
    ...page,
    status: "deleted" as const,
    updatedAt: now,
  };
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export async function listD1Projects({ includeUnpublished = false } = {}) {
  const db = getCmsDb();
  const rows = await db
    .select()
    .from(schema.projects)
    .where(entityVisibilityFilter(schema.projects, includeUnpublished))
    .orderBy(desc(schema.projects.publishedAt), desc(schema.projects.updatedAt));

  return rows.map(drizzleRowToProject);
}

export async function getD1ProjectByIdOrSlug(idOrSlug: string, includeUnpublished = true) {
  const db = getCmsDb();
  const rows = await db
    .select()
    .from(schema.projects)
    .where(
      and(
        or(eq(schema.projects.id, idOrSlug), eq(schema.projects.slug, idOrSlug)),
        entityVisibilityFilter(schema.projects, includeUnpublished),
      ),
    )
    .limit(1);

  return rows[0] ? drizzleRowToProject(rows[0]) : undefined;
}

export async function createD1Project(input: ProjectInput) {
  const currentSettings = await getD1SiteSettings();
  const title = input.title?.trim() || "Untitled project";
  const slug = await uniqueD1ProjectSlug(input.slug?.trim() || slugify(title));
  const now = new Date().toISOString();
  const contentMarkdown = input.contentMarkdown?.trim() || `# ${title}\n`;
  const contentHtml = input.contentHtml
    ? sanitizeHtml(input.contentHtml)
    : renderMarkdownToHtml(contentMarkdown);
  const status = normalizeContentRecordStatus(input.status, "draft");
  const coverImage = input.coverImage?.trim() || currentSettings.defaultOgImage;
  const project: Project = {
    id: `project_${crypto.randomUUID()}`,
    title,
    slug,
    excerpt: input.excerpt?.trim() || markdownToText(contentMarkdown).slice(0, 180),
    coverImage,
    projectUrl: input.projectUrl?.trim() || "",
    githubUrl: input.githubUrl?.trim() || "",
    contentMarkdown,
    contentHtml,
    tags: tagsFromNames(input.tags ?? []),
    screenshots: cleanStringList(input.screenshots),
    status,
    publishedAt: status === "published" ? now : now,
    updatedAt: now,
    i18n: input.i18n,
  };

  if (input.locale === "zh") {
    project.i18n = {
      ...project.i18n,
      title: { ...project.i18n?.title, zh: title },
      excerpt: { ...project.i18n?.excerpt, zh: project.excerpt },
      contentMarkdown: { ...project.i18n?.contentMarkdown, zh: contentMarkdown },
      contentHtml: { ...project.i18n?.contentHtml, zh: contentHtml },
    };
  }

  const db = getCmsDb();
  await db.insert(schema.projects).values({
    id: project.id,
    title: project.title,
    slug: project.slug,
    excerpt: project.excerpt,
    projectUrl: project.projectUrl || null,
    githubUrl: project.githubUrl || null,
    coverImage: project.coverImage,
    contentMarkdown: project.contentMarkdown,
    contentHtml: project.contentHtml,
    tags: project.tags.map((tag) => tag.name),
    screenshots: project.screenshots,
    i18n: project.i18n ?? null,
    status: project.status,
    publishedAt: project.status === "published" ? project.publishedAt : null,
    createdAt: now,
    updatedAt: project.updatedAt,
  });

  return (await getD1ProjectByIdOrSlug(project.id)) ?? project;
}

export async function updateD1Project(idOrSlug: string, input: ProjectInput) {
  const currentSettings = await getD1SiteSettings();
  const project = await getD1ProjectByIdOrSlug(idOrSlug);

  if (!project) {
    return undefined;
  }

  const localizedUpdate = input.locale === "zh";
  const inputTitle = input.title?.trim();
  const inputExcerpt = input.excerpt?.trim();
  const inputMarkdown = input.contentMarkdown?.trim();
  const inputHtml = input.contentHtml !== undefined ? sanitizeHtml(input.contentHtml) : undefined;
  const title = localizedUpdate ? project.title : inputTitle || project.title;
  const contentMarkdown = localizedUpdate
    ? project.contentMarkdown
    : (inputMarkdown ?? project.contentMarkdown);
  const contentHtml = localizedUpdate
    ? project.contentHtml
    : inputHtml !== undefined
      ? inputHtml
      : inputMarkdown !== undefined
        ? renderMarkdownToHtml(contentMarkdown)
        : project.contentHtml;
  const status = normalizeContentRecordStatus(input.status, project.status);
  const publishedAt =
    status === "published" && project.status !== "published"
      ? new Date().toISOString()
      : project.publishedAt;
  const i18n = buildProjectI18n(project, input, {
    contentHtml: inputHtml,
    contentMarkdown: inputMarkdown,
    excerpt: inputExcerpt,
    title: inputTitle,
  });
  const now = new Date().toISOString();

  const db = getCmsDb();
  await db
    .update(schema.projects)
    .set({
      title,
      excerpt: localizedUpdate
        ? project.excerpt
        : inputExcerpt !== undefined
          ? inputExcerpt
          : project.excerpt,
      projectUrl: localizedUpdate
        ? project.projectUrl || null
        : input.projectUrl !== undefined
          ? input.projectUrl.trim() || null
          : project.projectUrl || null,
      githubUrl: localizedUpdate
        ? project.githubUrl || null
        : input.githubUrl !== undefined
          ? input.githubUrl.trim() || null
          : project.githubUrl || null,
      coverImage: localizedUpdate
        ? project.coverImage
        : input.coverImage !== undefined
          ? input.coverImage.trim() || currentSettings.defaultOgImage
          : project.coverImage,
      contentMarkdown,
      contentHtml,
      tags:
        input.tags !== undefined
          ? cleanStringList(input.tags)
          : project.tags.map((tag) => tag.name),
      screenshots:
        input.screenshots !== undefined ? cleanStringList(input.screenshots) : project.screenshots,
      i18n: i18n ?? null,
      status,
      publishedAt: status === "published" ? publishedAt : null,
      updatedAt: now,
    })
    .where(eq(schema.projects.id, project.id));

  return getD1ProjectByIdOrSlug(project.id);
}

export async function deleteD1Project(idOrSlug: string) {
  const project = await getD1ProjectByIdOrSlug(idOrSlug);

  if (!project) {
    return undefined;
  }

  const now = new Date().toISOString();
  const db = getCmsDb();

  await db
    .update(schema.projects)
    .set({ status: "deleted", updatedAt: now })
    .where(eq(schema.projects.id, project.id));

  return {
    ...project,
    status: "deleted" as const,
    updatedAt: now,
  };
}

// ---------------------------------------------------------------------------
// Comments
// ---------------------------------------------------------------------------

export async function createD1Comment(input: CommentInput): Promise<D1Result<Comment>> {
  const currentSettings = await getD1SiteSettings();
  const post = await getD1PostBySlug(input.postSlug);

  if (!post || !post.commentsEnabled || !currentSettings.commentsEnabled) {
    return { error: "Post not found or comments are disabled" };
  }

  const body = input.body?.trim() ?? "";
  const authorName = input.authorName?.trim() ?? "";
  const authorEmail = input.authorEmail?.trim().toLowerCase() ?? "";
  const authorWebsite = input.authorWebsite?.trim() || null;

  if (!authorName || !authorEmail || !body) {
    return { error: "Name, email, and comment body are required" };
  }

  if (body.length < 2 || body.length > 4000) {
    return { error: "Comment body must be between 2 and 4000 characters" };
  }

  if (countLinks(body) > 3) {
    return { error: "Comment contains too many links" };
  }

  const parentId = input.parentId ?? null;
  const db = getCmsDb();
  const parentComment = parentId
    ? (
        await db
          .select({ parentId: schema.comments.parentId })
          .from(schema.comments)
          .where(
            and(
              eq(schema.comments.id, parentId),
              eq(schema.comments.postId, post.id),
              ne(schema.comments.status, "deleted"),
            ),
          )
          .limit(1)
      )[0]
    : null;

  if (parentId && !parentComment) {
    return { error: "Reply target not found" };
  }

  if (parentComment?.parentId) {
    return { error: "Comment replies are limited to two levels" };
  }

  const now = new Date().toISOString();
  const comment: Comment = {
    id: `comment_${crypto.randomUUID()}`,
    postId: post.id,
    parentId,
    authorUserId: input.authorUserId ?? null,
    authorName,
    authorEmailHash: await digestText(authorEmail),
    authorWebsite,
    body,
    status: getCommentInitialStatus({ body, settings: currentSettings }),
    createdAt: now,
  };

  if (input.locale === "zh") {
    comment.i18n = {
      body: { zh: body },
    };
  }

  await db.insert(schema.comments).values({
    id: comment.id,
    postId: comment.postId,
    parentId: comment.parentId,
    authorUserId: comment.authorUserId,
    authorName: comment.authorName,
    authorEmailHash: comment.authorEmailHash,
    authorWebsite: comment.authorWebsite,
    body: comment.body,
    i18n: comment.i18n ?? null,
    status: comment.status,
    createdAt: comment.createdAt,
    updatedAt: now,
  });

  return { data: comment };
}

export async function listD1ApprovedComments(postId: string) {
  const db = getCmsDb();
  const rows = await db
    .select()
    .from(schema.comments)
    .where(and(eq(schema.comments.postId, postId), eq(schema.comments.status, "approved")))
    .orderBy(asc(schema.comments.createdAt));

  return rows.map(drizzleRowToComment);
}

export async function moderateD1Comment(id: string, status: Exclude<CommentStatus, "pending">) {
  const db = getCmsDb();

  await db
    .update(schema.comments)
    .set({ status, updatedAt: new Date().toISOString() })
    .where(eq(schema.comments.id, id));

  const rows = await db.select().from(schema.comments).where(eq(schema.comments.id, id)).limit(1);

  return rows[0] ? drizzleRowToComment(rows[0]) : undefined;
}

export async function listD1Comments() {
  const db = getCmsDb();
  const rows = await db.select().from(schema.comments).orderBy(desc(schema.comments.createdAt));

  return rows.map(drizzleRowToComment);
}

// ---------------------------------------------------------------------------
// Assets
// ---------------------------------------------------------------------------

export async function listD1Assets() {
  const db = getCmsDb();
  const rows = await db.select().from(schema.assets).orderBy(desc(schema.assets.createdAt));

  return rows.map(drizzleRowToAsset);
}

export async function getD1AssetById(idOrKey: string) {
  const db = getCmsDb();
  const rows = await db
    .select()
    .from(schema.assets)
    .where(or(eq(schema.assets.id, idOrKey), eq(schema.assets.key, idOrKey)))
    .limit(1);

  return rows[0] ? drizzleRowToAsset(rows[0]) : undefined;
}

export async function createD1Asset(input: AssetInput) {
  const asset: Asset = {
    id: `asset_${crypto.randomUUID()}`,
    key: input.key,
    url: input.url,
    filename: input.filename,
    contentType: input.contentType,
    sizeBytes: input.sizeBytes,
    attachedPostId: input.attachedPostId ?? null,
    createdAt: new Date().toISOString(),
  };

  const db = getCmsDb();
  await db.insert(schema.assets).values({
    id: asset.id,
    key: asset.key,
    url: asset.url,
    filename: asset.filename,
    contentType: asset.contentType,
    sizeBytes: asset.sizeBytes,
    attachedPostId: asset.attachedPostId,
    createdAt: asset.createdAt,
  });

  return asset;
}

export async function deleteD1Asset(idOrKey: string) {
  const asset = await getD1AssetById(idOrKey);

  if (!asset) {
    return undefined;
  }

  const db = getCmsDb();
  await db.delete(schema.assets).where(eq(schema.assets.id, asset.id));

  return asset;
}

// ---------------------------------------------------------------------------
// API tokens
// ---------------------------------------------------------------------------

export async function createD1ApiToken(input: {
  name?: string;
  scopes?: ApiTokenScope[];
  expiresAt?: string | null;
}) {
  const secret = `blogcms_${crypto.randomUUID().replace(/-/g, "")}`;
  const token = {
    id: `token_${crypto.randomUUID()}`,
    name: input.name?.trim() || "Automation token",
    tokenPrefix: secret.slice(0, 16),
    scopes: input.scopes?.length ? input.scopes : ["posts:read", "posts:write"],
    expiresAt: input.expiresAt ?? null,
    lastUsedAt: null,
    revokedAt: null,
    createdAt: new Date().toISOString(),
  };

  const db = getCmsDb();
  await db.insert(schema.apiTokens).values({
    id: token.id,
    name: token.name,
    tokenHash: await digestText(secret),
    scopes: token.scopes,
    expiresAt: token.expiresAt,
    lastUsedAt: token.lastUsedAt,
    revokedAt: token.revokedAt,
    createdAt: token.createdAt,
  });

  return { token, secret };
}

export async function listD1ApiTokens() {
  const db = getCmsDb();
  const rows = await db.select().from(schema.apiTokens).orderBy(desc(schema.apiTokens.createdAt));

  return rows.map(drizzleRowToApiToken);
}

export async function revokeD1ApiToken(id: string) {
  const db = getCmsDb();

  await db
    .update(schema.apiTokens)
    .set({ revokedAt: new Date().toISOString() })
    .where(and(eq(schema.apiTokens.id, id), sql`${schema.apiTokens.revokedAt} is null`));

  const rows = await db.select().from(schema.apiTokens).where(eq(schema.apiTokens.id, id)).limit(1);

  return rows[0] ? drizzleRowToApiToken(rows[0]) : undefined;
}

export async function verifyD1ApiToken(secret: string, requiredScope: ApiTokenScope) {
  const db = getCmsDb();
  const now = new Date().toISOString();
  const rows = await db
    .select()
    .from(schema.apiTokens)
    .where(
      and(
        eq(schema.apiTokens.tokenHash, await digestText(secret)),
        sql`${schema.apiTokens.revokedAt} is null`,
        or(sql`${schema.apiTokens.expiresAt} is null`, sql`${schema.apiTokens.expiresAt} > ${now}`),
      ),
    )
    .limit(1);

  const row = rows[0];

  if (!row) {
    return null;
  }

  const token = drizzleRowToApiToken(row);

  if (!token.scopes.includes(requiredScope)) {
    return null;
  }

  await db
    .update(schema.apiTokens)
    .set({ lastUsedAt: now })
    .where(eq(schema.apiTokens.id, token.id));

  return token;
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export async function buildD1SiteExport(locale: SupportedLocale) {
  const [persistedPosts, persistedComments, persistedAssets, persistedPages, persistedProjects] =
    await Promise.all([
      listD1Posts({ includeUnpublished: true }),
      listD1Comments(),
      listD1Assets(),
      listD1Pages({ includeUnpublished: true }),
      listD1Projects({ includeUnpublished: true }),
    ]);
  const persistedProjectSlugs = new Set(persistedProjects.map((project) => project.slug));

  return {
    exportedAt: new Date().toISOString(),
    locale,
    site: await getD1SiteSettings(locale),
    posts: persistedPosts.map((post) => ({
      ...post,
      comments: persistedComments.filter((comment) => comment.postId === post.id),
    })),
    tags: getTagsForLocale(locale),
    pages: persistedPages,
    projects: [
      ...persistedProjects,
      ...getProjectsForLocale(locale).filter((project) => !persistedProjectSlugs.has(project.slug)),
    ],
    assets: persistedAssets,
    comments: persistedComments,
  };
}

// ---------------------------------------------------------------------------
// Tag helpers
// ---------------------------------------------------------------------------

async function attachD1Tags(posts: Post[]) {
  if (!posts.length) {
    return posts;
  }

  const db = getCmsDb();
  const postIds = posts.map((post) => post.id);
  const rows = await db
    .select({
      tagId: schema.tags.id,
      tagName: schema.tags.name,
      tagSlug: schema.tags.slug,
      tagDescription: schema.tags.description,
      tagI18n: schema.tags.i18n,
      postId: schema.postTags.postId,
    })
    .from(schema.tags)
    .innerJoin(schema.postTags, eq(schema.postTags.tagId, schema.tags.id))
    .where(inArray(schema.postTags.postId, postIds))
    .orderBy(asc(schema.tags.name));

  const tagsByPostId = new Map<string, Tag[]>();

  for (const row of rows) {
    const tag: Tag = {
      id: row.tagId,
      name: row.tagName,
      slug: row.tagSlug,
      description: row.tagDescription,
      i18n: row.tagI18n as Tag["i18n"],
    };
    const current = tagsByPostId.get(row.postId) ?? [];
    current.push(tag);
    tagsByPostId.set(row.postId, current);
  }

  return posts.map((post) => ({
    ...post,
    tags: tagsByPostId.get(post.id) ?? [],
  }));
}

async function replaceD1PostTags(
  postId: string,
  input: string[] | undefined,
  locale?: SupportedLocale,
) {
  const db = getCmsDb();
  await db.delete(schema.postTags).where(eq(schema.postTags.postId, postId));

  const names = Array.from(new Set((input ?? []).map((name) => name.trim()).filter(Boolean)));

  for (const name of names) {
    const tag = await upsertD1Tag(name, locale);

    if (!tag) {
      continue;
    }

    await db.insert(schema.postTags).values({ postId, tagId: tag.id }).onConflictDoNothing();
  }
}

async function upsertD1Tag(name: string, locale?: SupportedLocale) {
  const tagSlug = slugify(name);

  if (!tagSlug) {
    return undefined;
  }

  const db = getCmsDb();
  const rows = await db.select().from(schema.tags).where(eq(schema.tags.slug, tagSlug)).limit(1);
  const existing = rows[0];

  if (existing) {
    if (locale === "zh") {
      const existingI18n = existing.i18n as Tag["i18n"];
      const i18n = {
        ...existingI18n,
        name: {
          ...existingI18n?.name,
          zh: name,
        },
      };

      await db.update(schema.tags).set({ i18n }).where(eq(schema.tags.id, existing.id));

      return {
        ...drizzleRowToTag(existing),
        i18n,
      };
    }

    return drizzleRowToTag(existing);
  }

  const now = new Date().toISOString();
  const tag: Tag = {
    id: `tag_${crypto.randomUUID()}`,
    name,
    slug: tagSlug,
    description: "",
    i18n:
      locale === "zh"
        ? {
            name: { zh: name },
          }
        : undefined,
  };

  await db.insert(schema.tags).values({
    id: tag.id,
    name: tag.name,
    slug: tag.slug,
    description: tag.description,
    i18n: tag.i18n ?? null,
    createdAt: now,
  });

  return tag;
}

// ---------------------------------------------------------------------------
// Settings normalization
// ---------------------------------------------------------------------------

function normalizeSiteSettings(
  input: SiteSettingsInput,
  base: SiteSettings = runtimeDefaultSiteSettings(),
): SiteSettings {
  const primaryLanguage = (input.primaryLanguage ?? base.primaryLanguage) === "zh" ? "zh" : "en";

  return {
    ...base,
    name: cleanString(input.name, base.name),
    description: cleanString(input.description, base.description),
    url: cleanUrl(input.url, base.url),
    authorName: cleanString(input.authorName, base.authorName),
    authorBio: cleanString(input.authorBio, base.authorBio),
    avatarUrl: cleanString(input.avatarUrl, base.avatarUrl),
    defaultOgImage: cleanString(input.defaultOgImage, base.defaultOgImage),
    socialLinks: Array.isArray(input.socialLinks) ? input.socialLinks : base.socialLinks,
    navigation: Array.isArray(input.navigation) ? input.navigation : base.navigation,
    rssEnabled: input.rssEnabled ?? base.rssEnabled,
    commentsEnabled: input.commentsEnabled ?? base.commentsEnabled,
    commentsRequireApproval: input.commentsRequireApproval ?? base.commentsRequireApproval,
    commentAutoBlockEnabled: input.commentAutoBlockEnabled ?? base.commentAutoBlockEnabled,
    commentBlockedKeywords:
      input.commentBlockedKeywords !== undefined
        ? normalizeCommentBlockedKeywords(input.commentBlockedKeywords)
        : base.commentBlockedKeywords,
    emailVerificationEnabled: input.emailVerificationEnabled ?? base.emailVerificationEnabled,
    indexingEnabled: input.indexingEnabled ?? base.indexingEnabled,
    themePreset: normalizeThemePreset(input.themePreset ?? input.theme, base.themePreset),
    layoutPreset: normalizeLayoutPreset(input.layoutPreset, base.layoutPreset),
    locales: ["en", "zh"],
    primaryLanguage,
    i18n: {
      ...base.i18n,
      ...input.i18n,
    },
  };
}

function normalizeThemePreset(value: string | undefined, fallback: SiteSettings["themePreset"]) {
  if (value === "maker" || value === "apple" || value === "editorial") {
    return value;
  }

  if (value === "claude") {
    return "maker";
  }

  if (value === "editorial-edge") {
    return "editorial";
  }

  return fallback;
}

function normalizeLayoutPreset(value: string | undefined, fallback: SiteSettings["layoutPreset"]) {
  return value === "developer" || value === "journal" || value === "shelf" ? value : fallback;
}

function runtimeDefaultSiteSettings(): SiteSettings {
  const publicUrl = env.CMS_PUBLIC_SITE_URL || env.VITE_BASE_URL || siteSettings.url;

  return {
    ...siteSettings,
    url: publicUrl,
  };
}

// ---------------------------------------------------------------------------
// Shared utilities (kept locally to avoid circular deps with @repo/core for now)
// ---------------------------------------------------------------------------

function cleanString(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function cleanUrl(value: string | undefined, fallback: string) {
  return cleanString(value, fallback).replace(/\/$/, "");
}

async function uniqueD1Slug(base: string) {
  const normalized = base || "untitled-post";
  let candidate = normalized;
  let index = 2;

  while (await getD1PostBySlug(candidate, true)) {
    candidate = `${normalized}-${index}`;
    index += 1;
  }

  return candidate;
}

async function uniqueD1PageSlug(base: string) {
  const normalized = base || "untitled-page";
  let candidate = normalized;
  let index = 2;

  while (await getD1PageBySlug(candidate, true)) {
    candidate = `${normalized}-${index}`;
    index += 1;
  }

  return candidate;
}

async function uniqueD1ProjectSlug(base: string) {
  const normalized = base || "untitled-project";
  let candidate = normalized;
  let index = 2;

  while (await getD1ProjectByIdOrSlug(candidate, true)) {
    candidate = `${normalized}-${index}`;
    index += 1;
  }

  return candidate;
}

function normalizeContentRecordStatus(
  status: CmsPage["status"] | undefined,
  fallback: CmsPage["status"],
) {
  return status === "published" ||
    status === "archived" ||
    status === "deleted" ||
    status === "draft"
    ? status
    : fallback;
}

function tagsFromNames(names: string[]) {
  return cleanStringList(names).map((name) => ({
    id: `tag_${slugify(name) || name.toLowerCase()}`,
    name,
    slug: slugify(name),
    description: "",
  }));
}
