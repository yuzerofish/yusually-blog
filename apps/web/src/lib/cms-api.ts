import {
  assets,
  comments,
  getApprovedCommentsForPostForLocale,
  getPostBySlug,
  getPublishedPostsForLocale,
  getProjectsForLocale,
  getSiteSettingsForLocale,
  getTagsForLocale,
  localizePost,
  posts,
  resolveLocale,
  siteSettings,
  type ContentStatus,
  type SupportedLocale,
} from "@repo/core";

export const apiTokenScopes = [
  "posts:read",
  "posts:write",
  "posts:publish",
  "assets:write",
  "comments:moderate",
  "site:read",
  "site:write",
  "export:read",
] as const;

export const apiEndpoints = [
  { method: "GET", path: "/api/posts", scope: "posts:read" },
  { method: "POST", path: "/api/posts", scope: "posts:write" },
  { method: "GET", path: "/api/posts/{id}", scope: "posts:read" },
  { method: "PATCH", path: "/api/posts/{id}", scope: "posts:write" },
  { method: "DELETE", path: "/api/posts/{id}", scope: "posts:write" },
  { method: "POST", path: "/api/import/markdown", scope: "posts:write" },
  { method: "POST", path: "/api/import/html", scope: "posts:write" },
  { method: "POST", path: "/api/import/zip", scope: "posts:write" },
  { method: "GET", path: "/api/assets", scope: "site:read" },
  { method: "POST", path: "/api/assets", scope: "assets:write" },
  { method: "GET", path: "/api/export", scope: "export:read" },
  { method: "POST", path: "/api/comments/{id}/approve", scope: "comments:moderate" },
  { method: "POST", path: "/api/comments/{id}/spam", scope: "comments:moderate" },
  { method: "POST", path: "/api/comments/{id}/delete", scope: "comments:moderate" },
] as const;

export function jsonResponse(body: unknown, init?: ResponseInit) {
  return Response.json(body, {
    ...init,
    headers: {
      "cache-control": "no-store",
      ...init?.headers,
    },
  });
}

export function getApiLocale(request: Request): SupportedLocale {
  const url = new URL(request.url);
  const queryLocale = url.searchParams.get("lang");

  if (queryLocale) {
    return resolveLocale(queryLocale);
  }

  const acceptLanguage = request.headers.get("accept-language") ?? "";
  return acceptLanguage.toLowerCase().includes("zh") ? "zh" : siteSettings.primaryLanguage;
}

export async function readJsonBody<TBody extends object>(
  request: Request,
): Promise<Partial<TBody>> {
  try {
    return (await request.json()) as Partial<TBody>;
  } catch {
    return {} as Partial<TBody>;
  }
}

export function findPost(idOrSlug: string, locale: SupportedLocale) {
  const bySlug = getPostBySlug(idOrSlug);
  const post = bySlug ?? posts.find((candidate) => candidate.id === idOrSlug);
  return post ? localizePost(post, locale) : undefined;
}

export function createPostPreview(
  body: Partial<{
    title: string;
    slug: string;
    excerpt: string;
    contentMarkdown: string;
    status: ContentStatus;
    locale: SupportedLocale;
  }>,
) {
  const title = body.title?.trim() || "Untitled post";
  const slug = body.slug?.trim() || slugify(title);
  const now = new Date().toISOString();
  const status = body.status ?? "draft";

  return {
    id: `post_${crypto.randomUUID()}`,
    title,
    slug,
    excerpt: body.excerpt?.trim() || "",
    contentMarkdown: body.contentMarkdown?.trim() || `# ${title}\n`,
    status,
    source: "api",
    publishedAt: status === "published" ? now : null,
    updatedAt: now,
    locale: resolveLocale(body.locale),
    url: `${siteSettings.url}/blog/${slug}`,
  };
}

export function buildSiteExport(locale: SupportedLocale) {
  const exportedPosts = getPublishedPostsForLocale(locale).map((post) => ({
    ...post,
    comments: getApprovedCommentsForPostForLocale(post.id, locale),
  }));

  return {
    exportedAt: new Date().toISOString(),
    locale,
    site: getSiteSettingsForLocale(locale),
    posts: exportedPosts,
    tags: getTagsForLocale(locale),
    projects: getProjectsForLocale(locale),
    assets,
    comments,
  };
}

export function importPreview(kind: "markdown" | "html" | "zip", filename: string | undefined) {
  const now = new Date().toISOString();
  return {
    id: `import_${crypto.randomUUID()}`,
    kind,
    filename: filename ?? null,
    status: "accepted",
    createdAt: now,
    createdPostStatus: "draft",
  };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}
