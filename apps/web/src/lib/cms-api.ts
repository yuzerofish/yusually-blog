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
  { method: "POST", path: "/api/posts/batch", scope: "posts:write" },
  { method: "GET", path: "/api/posts/{id}", scope: "posts:read" },
  { method: "PATCH", path: "/api/posts/{id}", scope: "posts:write" },
  { method: "DELETE", path: "/api/posts/{id}", scope: "posts:write" },
  { method: "GET", path: "/api/pages", scope: "site:read" },
  { method: "POST", path: "/api/pages", scope: "site:write" },
  { method: "GET", path: "/api/pages/{id}", scope: "site:read" },
  { method: "PATCH", path: "/api/pages/{id}", scope: "site:write" },
  { method: "DELETE", path: "/api/pages/{id}", scope: "site:write" },
  { method: "GET", path: "/api/projects", scope: "site:read" },
  { method: "POST", path: "/api/projects", scope: "site:write" },
  { method: "GET", path: "/api/projects/{id}", scope: "site:read" },
  { method: "PATCH", path: "/api/projects/{id}", scope: "site:write" },
  { method: "DELETE", path: "/api/projects/{id}", scope: "site:write" },
  { method: "POST", path: "/api/import/markdown", scope: "posts:write" },
  { method: "POST", path: "/api/import/html", scope: "posts:write" },
  { method: "POST", path: "/api/import/zip", scope: "posts:write" },
  { method: "GET", path: "/api/assets", scope: "site:read" },
  { method: "POST", path: "/api/assets", scope: "assets:write" },
  { method: "GET", path: "/api/site", scope: "site:read" },
  { method: "PUT", path: "/api/site", scope: "site:write" },
  { method: "GET", path: "/api/export", scope: "export:read" },
  { method: "POST", path: "/api/backups", scope: "export:read" },
  { method: "GET", path: "/api/comments", scope: "comments:moderate" },
  { method: "POST", path: "/api/comments", scope: "comment-session" },
  { method: "POST", path: "/api/comments/{id}/approve", scope: "comments:moderate" },
  { method: "POST", path: "/api/comments/{id}/spam", scope: "comments:moderate" },
  { method: "POST", path: "/api/comments/{id}/delete", scope: "comments:moderate" },
  { method: "GET", path: "/api/comment-auth/me", scope: "public" },
  { method: "POST", path: "/api/comment-auth/login", scope: "public" },
  { method: "POST", path: "/api/comment-auth/signup", scope: "public" },
  { method: "POST", path: "/api/comment-auth/logout", scope: "comment-session" },
  { method: "GET", path: "/api/comment-auth/github/start", scope: "public" },
  { method: "GET", path: "/api/tokens", scope: "site:read" },
  { method: "POST", path: "/api/tokens", scope: "site:write" },
  { method: "POST", path: "/api/tokens/{id}/revoke", scope: "site:write" },
  { method: "POST", path: "/api/admin/password-reset", scope: "public" },
] as const;

export function jsonResponse(body: unknown, init?: ResponseInit) {
  const headers = new Headers({ "cache-control": "no-store" });

  if (init?.headers) {
    const inputHeaders = new Headers(init.headers);

    inputHeaders.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        return;
      }

      headers.set(key, value);
    });

    for (const cookie of getSetCookieValues(inputHeaders)) {
      headers.append("set-cookie", cookie);
    }
  }

  return Response.json(body, {
    ...init,
    headers,
  });
}

function getSetCookieValues(headers: Headers) {
  const getSetCookie = (
    headers as Headers & {
      getSetCookie?: () => string[];
    }
  ).getSetCookie;
  const cookies = getSetCookie ? getSetCookie.call(headers) : [];
  const fallback = headers.get("set-cookie");

  return cookies.length ? cookies : fallback ? [fallback] : [];
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
    commentsEnabled: boolean;
    seoTitle: string;
    seoDescription: string;
    tags: string[];
    publishedAt: string;
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
    pages: [],
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
