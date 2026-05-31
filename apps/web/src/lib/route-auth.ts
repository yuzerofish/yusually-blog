import type { AuthQueryResult } from "@repo/auth/tanstack/queries";

export async function getServerAuthUser(): Promise<AuthQueryResult | undefined> {
  if (!import.meta.env.SSR) {
    return undefined;
  }

  const [{ getRequest }, { getAdminUserFromRequest, publicAdminUser }] = await Promise.all([
    import("@tanstack/react-start/server"),
    import("#/lib/admin-auth"),
  ]);
  const user = await getAdminUserFromRequest(getRequest(), {
    disableCookieCache: true,
  }).catch(() => null);

  return user ? publicAdminUser(user) : null;
}
