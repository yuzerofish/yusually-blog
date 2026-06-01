import type { AuthQueryResult } from "@repo/auth/tanstack/queries";
import { createIsomorphicFn } from "@tanstack/react-start";

export const getServerAuthUser = createIsomorphicFn()
  .client(async (): Promise<AuthQueryResult | undefined> => undefined)
  .server(async (): Promise<AuthQueryResult | null> => {
    const [{ getRequest }, { getAccountUserFromRequest }] = await Promise.all([
      import("@tanstack/react-start/server"),
      import("#/lib/account-auth"),
    ]);
    const user = await getAccountUserFromRequest(getRequest()).catch(() => null);

    return user;
  });
