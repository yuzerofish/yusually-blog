import { authQueryOptions } from "@repo/auth/tanstack/queries";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

import { m } from "#/paraglide/messages.js";

export function SignOutButton({ className }: { readonly className?: string }) {
  const queryClient = useQueryClient();

  return (
    <form
      action="/api/account/logout"
      method="post"
      className={cn("w-fit", className)}
      onSubmit={() => {
        queryClient.setQueryData(authQueryOptions().queryKey, null);
        queryClient.removeQueries({ queryKey: authQueryOptions().queryKey });
      }}
    >
      <Button type="submit" className="w-full justify-center" variant="destructive" size="lg">
        {m.sign_out()}
      </Button>
    </form>
  );
}
