import { createServerFn } from "@tanstack/react-start";

export const $getUser = createServerFn({ method: "GET" }).handler(async () => {
  const { _getUser } = await import("./user.server");

  return _getUser();
});
