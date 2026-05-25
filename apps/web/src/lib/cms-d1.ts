import {
  htmlToText,
  markdownToText,
  renderMarkdownToHtml,
  sanitizeHtml,
  getProjectsForLocale,
  getTagsForLocale,
  localizeSiteSettings,
  siteSettings,
  type ApiToken,
  type ApiTokenScope,
  type Asset,
  type Comment,
  type CommentStatus,
  type ContentStatus,
  type Post,
  type SiteSettings,
  type SupportedLocale,
} from "@repo/core";
import { env } from "cloudflare:workers";

type D1PostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string | null;
  content_markdown: string;
  content_html: string;
  content_text: string;
  status: ContentStatus;
  source: Post["source"];
  featured: number;
  pinned: number;
  comments_enabled: number;
  seo_title: string | null;
  seo_description: string | null;
  i18n: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

type D1CommentRow = {
  id: string;
  post_id: string;
  parent_id: string | null;
  author_name: string;
  author_email_hash: string;
  author_website: string | null;
  body: string;
  i18n: string | null;
  status: CommentStatus;
  created_at: string;
};

type D1AssetRow = {
  id: string;
  key: string;
  url: string;
  filename: string;
  content_type: string;
  size_bytes: number;
  attached_post_id: string | null;
  created_at: string;
};

type D1SiteSettingsRow = {
  key: string;
  value: string;
  updated_at: string;
};

type D1ApiTokenRow = {
  id: string;
  name: string;
  token_hash: string;
  scopes: string;
  expires_at: string | null;
  last_used_at: string | null;
  revoked_at: string | null;
  created_at: string;
};

type PostInput = Partial<{
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  contentMarkdown: string;
  contentHtml: string;
  status: ContentStatus;
  commentsEnabled: boolean;
  seoTitle: string;
  seoDescription: string;
  locale: SupportedLocale;
  i18n: Post["i18n"];
}>;

type CommentInput = {
  postSlug: string;
  parentId?: string | null;
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
    | "indexingEnabled"
    | "primaryLanguage"
    | "i18n"
  >
>;

type D1Result<TValue> = { data: TValue } | { error: string };

const siteSettingsKey = "site";

export async function getD1SiteSettings(locale?: SupportedLocale) {
  const row = await env.CMS_DB.prepare("select * from site_settings where key = ? limit 1")
    .bind(siteSettingsKey)
    .first<D1SiteSettingsRow>();
  const settings = normalizeSiteSettings(parseJson<SiteSettingsInput>(row?.value ?? null) ?? {});

  return locale ? localizeSiteSettings(settings, locale) : settings;
}

export async function updateD1SiteSettings(input: SiteSettingsInput) {
  const current = await getD1SiteSettings();
  const settings = normalizeSiteSettings(input, current);
  const now = new Date().toISOString();

  await env.CMS_DB.prepare(
    "insert into site_settings (key, value, updated_at) values (?, ?, ?) on conflict(key) do update set value = excluded.value, updated_at = excluded.updated_at",
  )
    .bind(siteSettingsKey, JSON.stringify(settings), now)
    .run();

  return settings;
}

export async function listD1Posts({
  includeUnpublished = false,
  query = "",
}: ListPostsOptions = {}) {
  const normalizedQuery = query.trim().toLowerCase();
  const where = includeUnpublished ? "status != 'deleted'" : "status = 'published'";
  const params: string[] = [];
  let sql = `select * from posts where ${where}`;

  if (normalizedQuery) {
    sql +=
      " and (lower(title) like ? or lower(excerpt) like ? or lower(content_text) like ? or lower(slug) like ?)";
    const like = `%${normalizedQuery}%`;
    params.push(like, like, like, like);
  }

  sql += " order by pinned desc, published_at desc, updated_at desc";

  const result = await env.CMS_DB.prepare(sql)
    .bind(...params)
    .all<D1PostRow>();
  const currentSettings = await getD1SiteSettings();

  return result.results.map((row) => rowToPost(row, currentSettings));
}

export async function getD1PostBySlug(slug: string, includeUnpublished = false) {
  const result = await env.CMS_DB.prepare(
    `select * from posts where slug = ? and ${includeUnpublished ? "status != 'deleted'" : "status = 'published'"} limit 1`,
  )
    .bind(slug)
    .first<D1PostRow>();

  return result ? rowToPost(result, await getD1SiteSettings()) : undefined;
}

export async function getD1PostByIdOrSlug(idOrSlug: string, includeUnpublished = true) {
  const result = await env.CMS_DB.prepare(
    `select * from posts where (id = ? or slug = ?) and ${includeUnpublished ? "status != 'deleted'" : "status = 'published'"} limit 1`,
  )
    .bind(idOrSlug, idOrSlug)
    .first<D1PostRow>();

  return result ? rowToPost(result, await getD1SiteSettings()) : undefined;
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
  const post: Post = {
    id: `post_${crypto.randomUUID()}`,
    title,
    slug,
    excerpt: input.excerpt?.trim() || contentText.slice(0, 180),
    coverImage: input.coverImage?.trim() || currentSettings.defaultOgImage,
    contentMarkdown,
    contentHtml,
    contentText,
    status,
    source: "api",
    featured: false,
    pinned: false,
    commentsEnabled: input.commentsEnabled ?? true,
    publishedAt: now,
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

  await env.CMS_DB.prepare(
    `insert into posts (
      id, title, slug, excerpt, cover_image, content_markdown, content_html, content_text,
      status, source, featured, pinned, comments_enabled, seo_title, seo_description,
      i18n, published_at, created_at, updated_at
    ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      post.id,
      post.title,
      post.slug,
      post.excerpt,
      input.coverImage?.trim() || currentSettings.defaultOgImage,
      post.contentMarkdown,
      post.contentHtml,
      post.contentText,
      post.status,
      post.source,
      post.featured ? 1 : 0,
      post.pinned ? 1 : 0,
      post.commentsEnabled ? 1 : 0,
      post.seoTitle,
      post.seoDescription,
      post.i18n ? JSON.stringify(post.i18n) : null,
      post.publishedAt,
      now,
      post.updatedAt,
    )
    .run();

  return post;
}

export async function updateD1Post(idOrSlug: string, input: PostInput) {
  const currentSettings = await getD1SiteSettings();
  const post = await getD1PostByIdOrSlug(idOrSlug);

  if (!post) {
    return undefined;
  }

  const title = input.title?.trim() || post.title;
  const contentMarkdown = input.contentMarkdown?.trim() ?? post.contentMarkdown;
  const contentHtml =
    input.contentHtml !== undefined
      ? sanitizeHtml(input.contentHtml)
      : input.contentMarkdown !== undefined
        ? renderMarkdownToHtml(contentMarkdown)
        : post.contentHtml;
  const contentText =
    input.contentHtml !== undefined
      ? htmlToText(contentHtml)
      : input.contentMarkdown !== undefined
        ? markdownToText(contentMarkdown)
        : post.contentText;
  const status = input.status ?? post.status;
  const now = new Date().toISOString();
  const publishedAt =
    status === "published" && post.status !== "published" ? now : post.publishedAt;
  const i18n = input.i18n ?? post.i18n ?? null;
  const excerpt = input.excerpt !== undefined ? input.excerpt.trim() : post.excerpt;
  const seoTitle = input.seoTitle?.trim() || title;
  const seoDescription =
    input.seoDescription !== undefined
      ? input.seoDescription.trim()
      : input.excerpt !== undefined
        ? excerpt
        : post.seoDescription;
  const commentsEnabled = input.commentsEnabled ?? post.commentsEnabled;

  await env.CMS_DB.prepare(
    `update posts set
      title = ?, excerpt = ?, cover_image = ?, content_markdown = ?, content_html = ?,
      content_text = ?, status = ?, comments_enabled = ?, seo_title = ?, seo_description = ?,
      i18n = ?, published_at = ?, updated_at = ?
    where id = ?`,
  )
    .bind(
      title,
      excerpt,
      input.coverImage !== undefined
        ? input.coverImage.trim() || currentSettings.defaultOgImage
        : post.coverImage,
      contentMarkdown,
      contentHtml,
      contentText,
      status,
      commentsEnabled ? 1 : 0,
      seoTitle,
      seoDescription,
      i18n ? JSON.stringify(i18n) : null,
      publishedAt,
      now,
      post.id,
    )
    .run();

  return getD1PostByIdOrSlug(post.id);
}

export async function deleteD1Post(idOrSlug: string) {
  const post = await getD1PostByIdOrSlug(idOrSlug);

  if (!post) {
    return undefined;
  }

  const now = new Date().toISOString();

  await env.CMS_DB.prepare("update posts set status = ?, updated_at = ? where id = ?")
    .bind("deleted", now, post.id)
    .run();

  return {
    ...post,
    status: "deleted" as const,
    updatedAt: now,
  };
}

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

  const now = new Date().toISOString();
  const comment: Comment = {
    id: `comment_${crypto.randomUUID()}`,
    postId: post.id,
    parentId: input.parentId ?? null,
    authorName,
    authorEmailHash: await digestText(authorEmail),
    authorWebsite,
    body,
    status: "pending",
    createdAt: now,
  };

  if (input.locale === "zh") {
    comment.i18n = {
      body: { zh: body },
    };
  }

  await env.CMS_DB.prepare(
    `insert into comments (
      id, post_id, parent_id, author_name, author_email_hash, author_website,
      body, i18n, status, created_at, updated_at
    ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      comment.id,
      comment.postId,
      comment.parentId,
      comment.authorName,
      comment.authorEmailHash,
      comment.authorWebsite,
      comment.body,
      comment.i18n ? JSON.stringify(comment.i18n) : null,
      comment.status,
      comment.createdAt,
      now,
    )
    .run();

  return { data: comment };
}

export async function listD1ApprovedComments(postId: string) {
  const result = await env.CMS_DB.prepare(
    "select * from comments where post_id = ? and status = 'approved' order by created_at asc",
  )
    .bind(postId)
    .all<D1CommentRow>();

  return result.results.map(rowToComment);
}

export async function moderateD1Comment(id: string, status: Exclude<CommentStatus, "pending">) {
  await env.CMS_DB.prepare("update comments set status = ?, updated_at = ? where id = ?")
    .bind(status, new Date().toISOString(), id)
    .run();

  const row = await env.CMS_DB.prepare("select * from comments where id = ? limit 1")
    .bind(id)
    .first<D1CommentRow>();

  return row ? rowToComment(row) : undefined;
}

export async function listD1Comments() {
  const result = await env.CMS_DB.prepare(
    "select * from comments order by created_at desc",
  ).all<D1CommentRow>();

  return result.results.map(rowToComment);
}

export async function listD1Assets() {
  const result = await env.CMS_DB.prepare(
    "select * from assets order by created_at desc",
  ).all<D1AssetRow>();

  return result.results.map(rowToAsset);
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

  await env.CMS_DB.prepare(
    `insert into assets (
      id, key, url, filename, content_type, size_bytes, attached_post_id, created_at
    ) values (?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      asset.id,
      asset.key,
      asset.url,
      asset.filename,
      asset.contentType,
      asset.sizeBytes,
      asset.attachedPostId,
      asset.createdAt,
    )
    .run();

  return asset;
}

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

  await env.CMS_DB.prepare(
    "insert into api_tokens (id, name, token_hash, scopes, expires_at, last_used_at, revoked_at, created_at) values (?, ?, ?, ?, ?, ?, ?, ?)",
  )
    .bind(
      token.id,
      token.name,
      await digestText(secret),
      JSON.stringify(token.scopes),
      token.expiresAt,
      token.lastUsedAt,
      token.revokedAt,
      token.createdAt,
    )
    .run();

  return { token, secret };
}

export async function listD1ApiTokens() {
  const result = await env.CMS_DB.prepare(
    "select * from api_tokens order by created_at desc",
  ).all<D1ApiTokenRow>();

  return result.results.map(rowToApiToken);
}

export async function revokeD1ApiToken(id: string) {
  await env.CMS_DB.prepare(
    "update api_tokens set revoked_at = ? where id = ? and revoked_at is null",
  )
    .bind(new Date().toISOString(), id)
    .run();

  const row = await env.CMS_DB.prepare("select * from api_tokens where id = ? limit 1")
    .bind(id)
    .first<D1ApiTokenRow>();

  return row ? rowToApiToken(row) : undefined;
}

export async function verifyD1ApiToken(secret: string, requiredScope: ApiTokenScope) {
  const row = await env.CMS_DB.prepare(
    "select * from api_tokens where token_hash = ? and revoked_at is null and (expires_at is null or expires_at > ?) limit 1",
  )
    .bind(await digestText(secret), new Date().toISOString())
    .first<D1ApiTokenRow>();

  if (!row) {
    return null;
  }

  const token = rowToApiToken(row);

  if (!token.scopes.includes(requiredScope)) {
    return null;
  }

  await env.CMS_DB.prepare("update api_tokens set last_used_at = ? where id = ?")
    .bind(new Date().toISOString(), token.id)
    .run();

  return token;
}

export async function buildD1SiteExport(locale: SupportedLocale) {
  const [persistedPosts, persistedComments, persistedAssets] = await Promise.all([
    listD1Posts({ includeUnpublished: true }),
    listD1Comments(),
    listD1Assets(),
  ]);

  return {
    exportedAt: new Date().toISOString(),
    locale,
    site: await getD1SiteSettings(locale),
    posts: persistedPosts.map((post) => ({
      ...post,
      comments: persistedComments.filter((comment) => comment.postId === post.id),
    })),
    tags: getTagsForLocale(locale),
    projects: getProjectsForLocale(locale),
    assets: persistedAssets,
    comments: persistedComments,
  };
}

function rowToPost(
  row: D1PostRow,
  currentSettings: SiteSettings = runtimeDefaultSiteSettings(),
): Post {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    coverImage: row.cover_image || currentSettings.defaultOgImage,
    contentMarkdown: row.content_markdown,
    contentHtml: row.content_html,
    contentText: row.content_text,
    status: row.status,
    source: row.source,
    featured: Boolean(row.featured),
    pinned: Boolean(row.pinned),
    commentsEnabled: Boolean(row.comments_enabled),
    publishedAt: row.published_at ?? row.created_at,
    updatedAt: row.updated_at,
    authorName: currentSettings.authorName,
    tags: [],
    seoTitle: row.seo_title ?? row.title,
    seoDescription: row.seo_description ?? row.excerpt,
    i18n: parseJson(row.i18n),
  };
}

function rowToComment(row: D1CommentRow): Comment {
  return {
    id: row.id,
    postId: row.post_id,
    parentId: row.parent_id,
    authorName: row.author_name,
    authorEmailHash: row.author_email_hash,
    authorWebsite: row.author_website,
    body: row.body,
    status: row.status,
    createdAt: row.created_at,
    i18n: parseJson(row.i18n),
  };
}

function rowToAsset(row: D1AssetRow): Asset {
  return {
    id: row.id,
    key: row.key,
    url: row.url,
    filename: row.filename,
    contentType: row.content_type,
    sizeBytes: row.size_bytes,
    attachedPostId: row.attached_post_id,
    createdAt: row.created_at,
  };
}

function rowToApiToken(row: D1ApiTokenRow): ApiToken {
  return {
    id: row.id,
    name: row.name,
    tokenPrefix: row.token_hash.slice(0, 16),
    scopes: parseJson<ApiTokenScope[]>(row.scopes) ?? [],
    expiresAt: row.expires_at,
    lastUsedAt: row.last_used_at,
    revokedAt: row.revoked_at,
    createdAt: row.created_at,
  };
}

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
    indexingEnabled: input.indexingEnabled ?? base.indexingEnabled,
    locales: ["en", "zh"],
    primaryLanguage,
    i18n: {
      ...base.i18n,
      ...input.i18n,
    },
  };
}

function runtimeDefaultSiteSettings(): SiteSettings {
  const publicUrl = env.CMS_PUBLIC_SITE_URL || env.VITE_BASE_URL || siteSettings.url;

  return {
    ...siteSettings,
    url: publicUrl,
  };
}

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

function parseJson<TValue>(value: string | null): TValue | undefined {
  if (!value) {
    return undefined;
  }

  try {
    return JSON.parse(value) as TValue;
  } catch {
    return undefined;
  }
}

function countLinks(value: string) {
  return (value.match(/https?:\/\//g) ?? []).length;
}

async function digestText(value: string) {
  const data = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}
