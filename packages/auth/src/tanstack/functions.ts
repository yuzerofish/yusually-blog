import { createServerFn } from "@tanstack/react-start";

export const $getUser = createServerFn({ method: "GET" }).handler(async () => {
  const { setResponseHeader } = await import("@tanstack/react-start/server");
  const { _getUser } = await import("./user.server");

  setResponseHeader("cache-control", "no-store, max-age=0");
  setResponseHeader("pragma", "no-cache");

  return _getUser();
});
