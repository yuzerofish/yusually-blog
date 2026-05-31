import type { UserRole } from "@repo/core";

export function redirectForRole(user: { readonly role: UserRole }, redirectTo = "/app") {
  if (user.role === "admin") {
    return redirectTo === "/app" ? "/admin" : redirectTo;
  }

  if (redirectTo.startsWith("/admin")) {
    return "/app";
  }

  return redirectTo;
}
