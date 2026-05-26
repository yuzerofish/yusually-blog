import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

import { user as authUser } from "./auth.schema";

export const siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value", { mode: "json" }).notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const posts = sqliteTable(
  "posts",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    excerpt: text("excerpt").notNull().default(""),
    coverImage: text("cover_image"),
    contentMarkdown: text("content_markdown").notNull(),
    contentHtml: text("content_html").notNull(),
    contentText: text("content_text").notNull(),
    status: text("status", {
      enum: ["draft", "published", "scheduled", "archived", "deleted"],
    })
      .notNull()
      .default("draft"),
    source: text("source", {
      enum: ["editor", "markdown_upload", "html_upload", "api", "cli", "ai", "import"],
    })
      .notNull()
      .default("editor"),
    featured: integer("featured", { mode: "boolean" }).notNull().default(false),
    pinned: integer("pinned", { mode: "boolean" }).notNull().default(false),
    commentsEnabled: integer("comments_enabled", { mode: "boolean" }).notNull().default(true),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    canonicalUrl: text("canonical_url"),
    robots: text("robots").notNull().default("index,follow"),
    structuredData: text("structured_data", { mode: "json" }),
    i18n: text("i18n", { mode: "json" }),
    publishedAt: text("published_at"),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
    authorId: text("author_id"),
  },
  (table) => [
    uniqueIndex("posts_slug_idx").on(table.slug),
    index("posts_status_published_idx").on(table.status, table.publishedAt),
    index("posts_content_text_idx").on(table.contentText),
  ],
);

export const pages = sqliteTable(
  "pages",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    contentMarkdown: text("content_markdown").notNull(),
    contentHtml: text("content_html").notNull(),
    status: text("status", { enum: ["draft", "published", "archived", "deleted"] })
      .notNull()
      .default("draft"),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    i18n: text("i18n", { mode: "json" }),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [
    uniqueIndex("pages_slug_idx").on(table.slug),
    index("pages_status_idx").on(table.status),
  ],
);

export const tags = sqliteTable(
  "tags",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description").notNull().default(""),
    i18n: text("i18n", { mode: "json" }),
    createdAt: text("created_at").notNull(),
  },
  (table) => [uniqueIndex("tags_slug_idx").on(table.slug)],
);

export const postTags = sqliteTable(
  "post_tags",
  {
    postId: text("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => [uniqueIndex("post_tags_unique_idx").on(table.postId, table.tagId)],
);

export const projects = sqliteTable(
  "projects",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    excerpt: text("excerpt").notNull().default(""),
    projectUrl: text("project_url"),
    githubUrl: text("github_url"),
    coverImage: text("cover_image"),
    contentMarkdown: text("content_markdown").notNull().default(""),
    contentHtml: text("content_html").notNull().default(""),
    tags: text("tags", { mode: "json" }).notNull().default("[]"),
    screenshots: text("screenshots", { mode: "json" }).notNull().default("[]"),
    i18n: text("i18n", { mode: "json" }),
    status: text("status", { enum: ["draft", "published", "archived", "deleted"] })
      .notNull()
      .default("draft"),
    publishedAt: text("published_at"),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [
    uniqueIndex("projects_slug_idx").on(table.slug),
    index("projects_status_idx").on(table.status),
  ],
);

export const assets = sqliteTable(
  "assets",
  {
    id: text("id").primaryKey(),
    key: text("key").notNull(),
    url: text("url").notNull(),
    filename: text("filename").notNull(),
    contentType: text("content_type").notNull(),
    sizeBytes: integer("size_bytes").notNull().default(0),
    width: integer("width"),
    height: integer("height"),
    attachedPostId: text("attached_post_id").references(() => posts.id, { onDelete: "set null" }),
    createdAt: text("created_at").notNull(),
  },
  (table) => [
    uniqueIndex("assets_key_idx").on(table.key),
    index("assets_post_idx").on(table.attachedPostId),
  ],
);

export const comments = sqliteTable(
  "comments",
  {
    id: text("id").primaryKey(),
    postId: text("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    parentId: text("parent_id"),
    authorUserId: text("author_user_id").references(() => authUser.id, {
      onDelete: "set null",
    }),
    authorName: text("author_name").notNull(),
    authorEmailHash: text("author_email_hash").notNull(),
    authorWebsite: text("author_website"),
    body: text("body").notNull(),
    i18n: text("i18n", { mode: "json" }),
    status: text("status", { enum: ["pending", "approved", "spam", "deleted"] })
      .notNull()
      .default("pending"),
    ipHash: text("ip_hash"),
    userAgent: text("user_agent"),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [
    index("comments_post_status_idx").on(table.postId, table.status),
    index("comments_status_created_idx").on(table.status, table.createdAt),
    index("comments_author_user_idx").on(table.authorUserId),
  ],
);

export const apiTokens = sqliteTable(
  "api_tokens",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    tokenHash: text("token_hash").notNull(),
    scopes: text("scopes", { mode: "json" }).notNull(),
    expiresAt: text("expires_at"),
    lastUsedAt: text("last_used_at"),
    revokedAt: text("revoked_at"),
    createdAt: text("created_at").notNull(),
  },
  (table) => [uniqueIndex("api_tokens_hash_idx").on(table.tokenHash)],
);
