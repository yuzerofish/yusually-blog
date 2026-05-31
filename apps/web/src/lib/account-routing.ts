import type { UserRole } from "@repo/core";

export function redirectForRole(_user: { readonly role: UserRole }, redirectTo = "/app") {
  if (redirectTo.startsWith("/admin")) {
    return "/app";
  }

  return redirectTo;
}
