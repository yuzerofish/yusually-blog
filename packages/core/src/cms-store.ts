import {
  assets as seedAssets,
  comments as seedComments,
  dashboardMetrics,
  posts as seedPosts,
  projects as seedProjects,
  siteSettings as seedSiteSettings,
  tags as seedTags,
} from "./demo-data";
import { htmlToText, markdownToText, renderMarkdownToHtml, sanitizeHtml } from "./markdown";
import type {
  ApiToken,
  ApiTokenScope,
  Asset,
  Comment,
  CommentStatus,
  ContentStatus,
  Post,
  SiteSettings,
  SupportedLocale,
  Tag,
} from "./types";

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
  tags: string[];
  locale: SupportedLocale;
}>;

type AssetInput = Partial<{
  filename: string;
  contentType: string;
  url: string;
  sizeBytes: number;
  attachedPostId: string | null;
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

type ApiTokenInput = {
  name?: string;
  scopes?: ApiTokenScope[];
  expiresAt?: string | null;
};

const state = {
  siteSettings: clone(seedSiteSettings),
  posts: clone(seedPosts),
  tags: clone(seedTags),
  projects: clone(seedProjects),
  comments: clone(seedComments),
  assets: clone(seedAssets),
  apiTokens: [
    {
      id: "token-demo",
      name: "Local automation token",
      tokenPrefix: "blogcms_demo",
      scopes: [
        "posts:read",
        "posts:write",
        "posts:publish",
        "assets:write",
        "comments:moderate",
        "site:read",
        "site:write",
        "export:read",
      ],
      expiresAt: null,
      lastUsedAt: null,
      revokedAt: null,
      createdAt: "2026-05-24T09:00:00.000Z",
    },
  ] as ApiToken[],
};

export const siteSettings = state.siteSettings;
export const posts = state.posts;
export const tags = state.tags;
export const projects = state.projects;
export const comments = state.comments;
export const assets = state.assets;
export const apiTokens = state.apiTokens;
export { dashboardMetrics };

export function listPosts(options: { includeUnpublished?: boolean } = {}) {
  const list = options.includeUnpublished
    ? state.posts.filter((post) => post.status !== "deleted")
    : state.posts.filter((post) => post.status === "published");

  return [...list].sort((a, b) => {
    if (a.pinned !== b.pinned) {
      return a.pinned ? -1 : 1;
    }

    return b.publishedAt.localeCompare(a.publishedAt);
  });
}

export function searchPosts({
  includeUnpublished = false,
  query = "",
  tagSlug,
}: {
  includeUnpublished?: boolean;
  query?: string;
  tagSlug?: string;
}) {
  const normalizedQuery = query.trim().toLowerCase();

  return listPosts({ includeUnpublished })
    .filter((post) => (tagSlug ? post.tags.some((tag) => tag.slug === tagSlug) : true))
    .filter((post) => {
      if (!normalizedQuery) {
        return true;
      }

      return [post.title, post.excerpt, post.contentText, post.slug]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    });
}

export function findPost(idOrSlug: string, options: { includeUnpublished?: boolean } = {}) {
  return listPosts(options).find((post) => post.slug === idOrSlug || post.id === idOrSlug);
}

export function createPost(input: PostInput) {
  const title = input.title?.trim() || "Untitled post";
  const slug = uniqueSlug(input.slug?.trim() || slugify(title));
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
    coverImage: input.coverImage?.trim() || state.siteSettings.defaultOgImage,
    contentMarkdown,
    contentHtml,
    contentText,
    status,
    source: "api",
    featured: false,
    pinned: false,
    commentsEnabled: input.commentsEnabled ?? true,
    publishedAt: status === "published" ? now : now,
    updatedAt: now,
    authorName: state.siteSettings.authorName,
    tags: resolveInputTags(input.tags),
    seoTitle: input.seoTitle?.trim() || title,
    seoDescription:
      input.seoDescription?.trim() || input.excerpt?.trim() || contentText.slice(0, 160),
  };

  if (input.locale === "zh") {
    post.i18n = {
      title: { zh: title },
      excerpt: { zh: post.excerpt },
      contentMarkdown: { zh: post.contentMarkdown },
      contentHtml: { zh: post.contentHtml },
      contentText: { zh: post.contentText },
      seoTitle: { zh: post.seoTitle },
      seoDescription: { zh: post.seoDescription },
    };
  }

  state.posts.unshift(post);

  return post;
}

export function updatePost(idOrSlug: string, input: PostInput) {
  const post = findPost(idOrSlug, { includeUnpublished: true });

  if (!post) {
    return undefined;
  }

  const title = input.title?.trim();
  const markdown = input.contentMarkdown?.trim();
  const html = input.contentHtml?.trim();

  if (title) {
    post.title = title;
    post.seoTitle = title;
  }

  if (input.excerpt !== undefined) {
    post.excerpt = input.excerpt.trim();
  }

  if (input.seoTitle !== undefined) {
    post.seoTitle = input.seoTitle.trim() || post.title;
  }

  if (input.seoDescription !== undefined) {
    post.seoDescription = input.seoDescription.trim() || post.excerpt;
  }

  if (input.commentsEnabled !== undefined) {
    post.commentsEnabled = input.commentsEnabled;
  }

  if (input.tags !== undefined) {
    post.tags = resolveInputTags(input.tags);
  }

  if (input.coverImage !== undefined) {
    post.coverImage = input.coverImage.trim() || state.siteSettings.defaultOgImage;
  }

  if (markdown !== undefined) {
    post.contentMarkdown = markdown;
    post.contentHtml = renderMarkdownToHtml(markdown);
    post.contentText = markdownToText(markdown);
  }

  if (html !== undefined) {
    post.contentHtml = sanitizeHtml(html);
    post.contentText = htmlToText(post.contentHtml);
  }

  if (input.status) {
    post.status = input.status;
    if (input.status === "published") {
      post.publishedAt = new Date().toISOString();
    }
  }

  post.seoDescription = post.seoDescription || post.excerpt || post.contentText.slice(0, 160);
  post.updatedAt = new Date().toISOString();

  return post;
}

export function deletePost(idOrSlug: string) {
  return updatePost(idOrSlug, { status: "deleted" });
}

export function createAsset(input: AssetInput) {
  const filename = input.filename?.trim() || "upload.jpg";
  const asset: Asset = {
    id: `asset_${crypto.randomUUID()}`,
    key: `uploads/${filename}`,
    url: input.url?.trim() || `/uploads/${filename}`,
    filename,
    contentType: input.contentType?.trim() || "image/jpeg",
    sizeBytes: input.sizeBytes ?? 0,
    createdAt: new Date().toISOString(),
    attachedPostId: input.attachedPostId ?? null,
  };

  state.assets.unshift(asset);

  return asset;
}

export function deleteAsset(idOrKey: string) {
  const index = state.assets.findIndex((asset) => asset.id === idOrKey || asset.key === idOrKey);

  if (index === -1) {
    return undefined;
  }

  const [asset] = state.assets.splice(index, 1);

  return asset;
}

export async function createComment(input: CommentInput) {
  const post = findPost(input.postSlug);

  if (!post || !post.commentsEnabled || !state.siteSettings.commentsEnabled) {
    return { error: "Post not found or comments are disabled" as const };
  }

  const body = input.body?.trim() ?? "";
  const authorName = input.authorName?.trim() ?? "";
  const authorEmail = input.authorEmail?.trim().toLowerCase() ?? "";
  const authorWebsite = input.authorWebsite?.trim() || null;

  if (!authorName || !authorEmail || !body) {
    return { error: "Name, email, and comment body are required" as const };
  }

  if (body.length < 2 || body.length > 4000) {
    return { error: "Comment body must be between 2 and 4000 characters" as const };
  }

  if (countLinks(body) > 3) {
    return { error: "Comment contains too many links" as const };
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

  state.comments.unshift(comment);

  return { comment };
}

export function moderateComment(id: string, status: Exclude<CommentStatus, "pending">) {
  const comment = state.comments.find((candidate) => candidate.id === id);

  if (!comment) {
    return undefined;
  }

  comment.status = status;

  return comment;
}

export function listApprovedComments(postId: string) {
  return state.comments.filter(
    (comment) => comment.postId === postId && comment.status === "approved",
  );
}

export function createApiToken(input: ApiTokenInput) {
  const secret = `blogcms_${crypto.randomUUID().replace(/-/g, "")}`;
  const token: ApiToken = {
    id: `token_${crypto.randomUUID()}`,
    name: input.name?.trim() || "Automation token",
    tokenPrefix: secret.slice(0, 16),
    scopes: input.scopes?.length ? input.scopes : ["posts:read", "posts:write"],
    expiresAt: input.expiresAt ?? null,
    lastUsedAt: null,
    revokedAt: null,
    createdAt: new Date().toISOString(),
  };

  state.apiTokens.unshift(token);

  return { token, secret };
}

export function revokeApiToken(id: string) {
  const token = state.apiTokens.find((candidate) => candidate.id === id);

  if (!token) {
    return undefined;
  }

  token.revokedAt = new Date().toISOString();

  return token;
}

export function updateSiteSettings(input: Partial<SiteSettings>) {
  Object.assign(state.siteSettings, {
    ...input,
    themePreset: normalizeThemePreset(input.themePreset, state.siteSettings.themePreset),
    locales: ["en", "zh"],
  });

  return state.siteSettings;
}

function normalizeThemePreset(
  value: SiteSettings["themePreset"] | undefined,
  fallback: SiteSettings["themePreset"],
) {
  return value === "apple" || value === "editorial" || value === "claude" ? value : fallback;
}

function clone<TValue>(value: TValue): TValue {
  return JSON.parse(JSON.stringify(value)) as TValue;
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

function uniqueSlug(base: string) {
  const normalized = base || "untitled-post";
  let candidate = normalized;
  let index = 2;

  while (state.posts.some((post) => post.slug === candidate)) {
    candidate = `${normalized}-${index}`;
    index += 1;
  }

  return candidate;
}

function resolveInputTags(input: string[] | undefined): Tag[] {
  if (!input) {
    return [];
  }

  const names = Array.from(new Set(input.map((name) => name.trim()).filter(Boolean)));

  return names.map((name) => upsertTag(name));
}

function upsertTag(name: string): Tag {
  const slug = slugify(name);
  const existing = state.tags.find((tag) => tag.slug === slug);

  if (existing) {
    return existing;
  }

  const tag: Tag = {
    id: `tag_${crypto.randomUUID()}`,
    name,
    slug,
    description: "",
  };

  state.tags.push(tag);

  return tag;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}
