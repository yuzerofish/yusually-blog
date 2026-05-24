import { comments, posts, siteSettings } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRightIcon, CheckCircle2Icon, Clock3Icon, DatabaseIcon } from "lucide-react";

export const Route = createFileRoute("/_auth/admin/")({
  component: AdminOverviewPage,
});

function AdminOverviewPage() {
  const pendingComments = comments.filter((comment) => comment.status === "pending");
  const latestPost = posts[0];

  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-[#26312c]/10 bg-white p-6 dark:border-white/10 dark:bg-[#171d1a]">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <p className="text-sm font-semibold tracking-[0.16em] text-[#1f6f5b] uppercase dark:text-[#75c5ad]">
              Admin
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-normal">CMS overview</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64716a] dark:text-[#aeb8b1]">
              Manage posts, assets, comments, API tokens, and site settings for {siteSettings.name}.
            </p>
          </div>
          <Button render={<Link to="/admin/posts" />} nativeButton={false}>
            Manage posts
            <ArrowRightIcon />
          </Button>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        <section className="rounded-lg border border-[#26312c]/10 bg-white p-5 dark:border-white/10 dark:bg-[#171d1a]">
          <DatabaseIcon className="size-5 text-[#1f6f5b]" />
          <h2 className="mt-4 text-lg font-semibold">Storage contract</h2>
          <p className="mt-2 text-sm leading-6 text-[#64716a] dark:text-[#aeb8b1]">
            D1 owns structured records. R2 owns images, imports, exports, and backups.
          </p>
        </section>
        <section className="rounded-lg border border-[#26312c]/10 bg-white p-5 dark:border-white/10 dark:bg-[#171d1a]">
          <Clock3Icon className="size-5 text-[#e96f3a]" />
          <h2 className="mt-4 text-lg font-semibold">Moderation queue</h2>
          <p className="mt-2 text-sm leading-6 text-[#64716a] dark:text-[#aeb8b1]">
            {pendingComments.length} comment is waiting for review. New public comments default to
            pending.
          </p>
        </section>
        <section className="rounded-lg border border-[#26312c]/10 bg-white p-5 dark:border-white/10 dark:bg-[#171d1a]">
          <CheckCircle2Icon className="size-5 text-[#4b8fbf]" />
          <h2 className="mt-4 text-lg font-semibold">Latest post</h2>
          <p className="mt-2 text-sm leading-6 text-[#64716a] dark:text-[#aeb8b1]">
            {latestPost.title}
          </p>
        </section>
      </div>
    </div>
  );
}
