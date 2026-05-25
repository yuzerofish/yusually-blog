import {
  assets,
  createPost,
  findPost as findStoredPost,
  comments,
  getApprovedCommentsForPostForLocale,
  getProjectsForLocale,
  getSiteSettingsForLocale,
  getTagsForLocale,
  localizePost,
  posts,
  resolveLocale,
  siteSettings,
  type ContentStatus,
  type Post,
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
  { method: "GET", path: "/api/site", scope: "site:read" },
  { method: "PUT", path: "/api/site", scope: "site:write" },
  { method: "GET", path: "/api/export", scope: "export:read" },
  { method: "GET", path: "/api/comments", scope: "comments:moderate" },
  { method: "POST", path: "/api/comments", scope: "public" },
  { method: "POST", path: "/api/comments/{id}/approve", scope: "comments:moderate" },
  { method: "POST", path: "/api/comments/{id}/spam", scope: "comments:moderate" },
  { method: "POST", path: "/api/comments/{id}/delete", scope: "comments:moderate" },
  { method: "GET", path: "/api/tokens", scope: "site:read" },
  { method: "POST", path: "/api/tokens", scope: "site:write" },
  { method: "POST", path: "/api/tokens/{id}/revoke", scope: "site:write" },
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
  const post = findStoredPost(idOrSlug, { includeUnpublished: true });
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
    i18n: Post["i18n"];
  }>,
) {
  const post = createPost({
    ...body,
    locale: resolveLocale(body.locale),
  });

  return {
    ...post,
    url: `${siteSettings.url}/blog/${post.slug}`,
  };
}

export function buildSiteExport(locale: SupportedLocale) {
  const exportedPosts = posts
    .filter((post) => post.status === "published")
    .map((post) => ({
      ...localizePost(post, locale),
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
