import "@tanstack/react-start/server-only";
import { getRequest } from "@tanstack/react-start/server";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "admin";
  createdAt: string;
  lastLoginAt: string | null;
};

export async function _getUser(_query?: {
  disableCookieCache?: boolean;
  disableRefresh?: boolean;
}) {
  const request = getRequest();
  const url = new URL("/api/admin/me", request.url);

  if (_query?.disableCookieCache) {
    url.searchParams.set("disableCookieCache", "true");
  }

  if (_query?.disableRefresh) {
    url.searchParams.set("disableRefresh", "true");
  }

  const response = await fetch(url, {
    headers: request.headers,
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as { data?: AdminUser | null };
  return payload.data ?? null;
}
