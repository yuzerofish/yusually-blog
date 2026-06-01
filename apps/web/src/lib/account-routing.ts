import type { UserRole } from "@repo/core";

export function redirectForRole(_user: { readonly role: UserRole }, redirectTo = "/app") {
  // Keep post-login routing centered on the account hub; admins can open /admin from there.
  if (redirectTo.startsWith("/admin")) {
    return "/app";
  }

  return redirectTo;
}
