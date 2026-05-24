import { siteSettings } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/admin/settings")({
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  return (
    <section className="rounded-lg border border-[#26312c]/10 bg-white p-6 dark:border-white/10 dark:bg-[#171d1a]">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">Site settings</h1>
          <p className="mt-2 text-sm text-[#64716a] dark:text-[#aeb8b1]">
            Basic identity, SEO, RSS, and comments configuration.
          </p>
        </div>
        <Button>Save settings</Button>
      </div>

      <form className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="site-name">Site name</Label>
          <Input id="site-name" defaultValue={siteSettings.name} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="site-url">Site URL</Label>
          <Input id="site-url" defaultValue={siteSettings.url} />
        </div>
        <div className="grid gap-2 md:col-span-2">
          <Label htmlFor="site-description">Description</Label>
          <Input id="site-description" defaultValue={siteSettings.description} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="author-name">Author name</Label>
          <Input id="author-name" defaultValue={siteSettings.authorName} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="default-og">Default OG image</Label>
          <Input id="default-og" defaultValue={siteSettings.defaultOgImage} />
        </div>
      </form>
    </section>
  );
}
