import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "admin";
  createdAt: string;
  lastLoginAt: string | null;
};

export const $getUser = createServerFn({ method: "GET" }).handler(async () => {
  return _getUser();
});

export async function _getUser(_query?: {
  disableCookieCache?: boolean;
  disableRefresh?: boolean;
}) {
  const request = getRequest();
  const response = await fetch(new URL("/api/admin/me", request.url), {
    headers: request.headers,
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as { data?: AdminUser | null };
  return payload.data ?? null;
}
