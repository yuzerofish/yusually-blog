import { authQueryOptions } from "@repo/auth/tanstack/queries";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { m } from "#/paraglide/messages.js";

export function SignOutButton({ className }: { readonly className?: string }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return (
    <Button
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        queryClient.setQueryData(authQueryOptions().queryKey, null);
        await navigate({ to: "/login" });
      }}
      type="button"
      className={cn("w-fit", className)}
      variant="destructive"
      size="lg"
    >
      {m.sign_out()}
    </Button>
  );
}
