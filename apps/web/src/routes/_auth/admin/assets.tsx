import { assets } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { createFileRoute } from "@tanstack/react-router";
import { UploadIcon } from "lucide-react";

import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/admin/assets")({
  component: AdminAssetsPage,
});

function AdminAssetsPage() {
  return (
    <section className="rounded-lg border border-[#26312c]/10 bg-white p-6 dark:border-white/10 dark:bg-[#171d1a]">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">{m.admin_assets_title()}</h1>
          <p className="mt-2 text-sm text-[#64716a] dark:text-[#aeb8b1]">
            {m.admin_assets_description()}
          </p>
        </div>
        <Button>
          <UploadIcon />
          {m.upload()}
        </Button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {assets.map((asset) => (
          <article
            key={asset.id}
            className="rounded-lg border border-[#26312c]/10 bg-[#f8f5ef] p-4 dark:border-white/10 dark:bg-white/5"
          >
            <img src={asset.url} alt="" className="h-36 w-full rounded-md object-cover" />
            <p className="mt-3 truncate font-medium">{asset.filename}</p>
            <p className="mt-1 text-xs text-[#64716a] dark:text-[#aeb8b1]">{asset.contentType}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
