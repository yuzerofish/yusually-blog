import { resolveLocale, siteSettings, type SupportedLocale } from "@repo/core";

import { getSetCookieValues } from "#/lib/auth-helpers";

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
