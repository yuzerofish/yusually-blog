import {
  normalizeCommentBlockedKeywords,
  siteSettings,
  type ApiToken,
  type ApiTokenScope,
  type Asset,
  type CmsPage,
  type Comment,
  type CommentStatus,
  type ContentStatus,
  type Post,
  type SiteSettings,
  type SupportedLocale,
  type Tag,
  cleanStringList,
  slugify,
} from "@repo/core";
import * as schema from "@repo/db/schema/cms";
import { env } from "cloudflare:workers";

// ---------------------------------------------------------------------------
// Content limits
// ---------------------------------------------------------------------------

export const MAX_EXCERPT_LENGTH = 180;
export const MAX_SEO_DESCRIPTION_LENGTH = 160;
export const MIN_COMMENT_LENGTH = 2;
export const MAX_COMMENT_LENGTH = 4000;
export const MAX_COMMENT_LINKS = 3;

// ---------------------------------------------------------------------------
// Input / option types
// ---------------------------------------------------------------------------

export type PostInput = Partial<{
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  contentMarkdown: string;
  contentHtml: string;
  status: ContentStatus;
  source: Post["source"];
  featured: boolean;
  pinned: boolean;
  commentsEnabled: boolean;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  publishedAt: string;
  locale: SupportedLocale;
  i18n: Post["i18n"];
}>;

export type PageInput = Partial<{
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

export type CommentInput = {
  postSlug: string;
  parentId?: string | null;
  authorUserId?: string | null;
  authorName?: string;
  authorEmail?: string;
  authorWebsite?: string | null;
  body?: string;
  locale?: SupportedLocale;
};

export type ListPostsOptions = {
  includeUnpublished?: boolean;
  query?: string;
};

export type AssetInput = {
  key: string;
  url: string;
  filename: string;
  contentType: string;
  sizeBytes: number;
  attachedPostId?: string | null;
};

export type SiteSettingsInput = Partial<
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

export type D1Result<TValue> = { data: TValue } | { error: string };

// ---------------------------------------------------------------------------
// Helpers to convert Drizzle rows to app types
// ---------------------------------------------------------------------------

export function drizzleRowToPost(
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

export function drizzleRowToPage(row: typeof schema.pages.$inferSelect): CmsPage {
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

export function drizzleRowToTag(row: typeof schema.tags.$inferSelect): Tag {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    i18n: row.i18n as Tag["i18n"],
  };
}

export function drizzleRowToComment(row: typeof schema.comments.$inferSelect): Comment {
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

export function drizzleRowToAsset(row: typeof schema.assets.$inferSelect): Asset {
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

export function drizzleRowToApiToken(row: typeof schema.apiTokens.$inferSelect): ApiToken {
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

import { eq, and, or, ne, sql } from "drizzle-orm";

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

export function postVisibilityFilter(includeUnpublished?: boolean) {
  return includeUnpublished ? notDeletedWhereClause() : publishedWhereClause();
}

export function entityVisibilityFilter(table: typeof schema.pages, includeUnpublished?: boolean) {
  return includeUnpublished ? ne(table.status, "deleted") : eq(table.status, "published");
}

// ---------------------------------------------------------------------------
// Settings normalization
// ---------------------------------------------------------------------------

export function normalizeSiteSettings(
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
  if (value === "maker" || value === "apple" || value === "claude" || value === "brutalist") {
    return value;
  }

  // Legacy: editorial mapped to claude
  if (value === "editorial" || value === "editorial-edge") {
    return "claude" as const;
  }

  return fallback;
}

function normalizeLayoutPreset(value: string | undefined, fallback: SiteSettings["layoutPreset"]) {
  return value === "developer" || value === "journal" || value === "shelf" ? value : fallback;
}

export function runtimeDefaultSiteSettings(): SiteSettings {
  const publicUrl = env.CMS_PUBLIC_SITE_URL || env.VITE_BASE_URL || siteSettings.url;

  return {
    ...siteSettings,
    url: publicUrl,
  };
}

// ---------------------------------------------------------------------------
// Shared utilities
// ---------------------------------------------------------------------------

function cleanString(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function cleanUrl(value: string | undefined, fallback: string) {
  return cleanString(value, fallback).replace(/\/$/, "");
}

export function normalizeContentRecordStatus(
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

export function tagsFromNames(names: string[]) {
  return cleanStringList(names).map((name) => ({
    id: `tag_${slugify(name) || name.toLowerCase()}`,
    name,
    slug: slugify(name),
    description: "",
  }));
}
