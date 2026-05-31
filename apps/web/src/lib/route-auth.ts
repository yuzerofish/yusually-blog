import type { AuthQueryResult } from "@repo/auth/tanstack/queries";

export async function getServerAuthUser(): Promise<AuthQueryResult | undefined> {
  if (!import.meta.env.SSR) {
    return undefined;
  }

  const [{ getRequest }, { getAccountUserFromRequest }] = await Promise.all([
    import("@tanstack/react-start/server"),
    import("#/lib/account-auth"),
  ]);
  const user = await getAccountUserFromRequest(getRequest(), {
    disableCookieCache: true,
  }).catch(() => null);

  return user;
}
