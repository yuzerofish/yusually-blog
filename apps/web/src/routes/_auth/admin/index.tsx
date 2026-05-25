import { comments, getSiteSettingsForLocale, localizePost, posts } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRightIcon, CheckCircle2Icon, Clock3Icon, DatabaseIcon } from "lucide-react";

import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/admin/")({
  component: AdminOverviewPage,
});

function AdminOverviewPage() {
  const locale = getCurrentLocale();
  const siteSettings = getSiteSettingsForLocale(locale);
  const pendingComments = comments.filter((comment) => comment.status === "pending");
  const latestPost = localizePost(posts[0], locale);

  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-border/80 bg-card p-6 shadow-xs">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <p className="text-sm font-semibold text-link uppercase">
              {m.admin_overview_eyebrow()}
            </p>
            <h1 className="mt-3 text-3xl font-semibold">{m.admin_overview_title()}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              {m.admin_metric_overview_description({ name: siteSettings.name })}
            </p>
          </div>
          <Button render={<Link to="/admin/posts" />} nativeButton={false}>
            {m.admin_manage_posts()}
            <ArrowRightIcon />
          </Button>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        <section className="rounded-lg border border-border/80 bg-card p-5 shadow-xs">
          <DatabaseIcon className="size-5 text-link" />
          <h2 className="mt-4 text-lg font-semibold">{m.admin_storage_contract()}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {m.admin_storage_contract_detail()}
          </p>
        </section>
        <section className="rounded-lg border border-border/80 bg-card p-5 shadow-xs">
          <Clock3Icon className="size-5 text-warning" />
          <h2 className="mt-4 text-lg font-semibold">{m.admin_moderation_queue()}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {m.admin_moderation_queue_detail({ count: pendingComments.length })}
          </p>
        </section>
        <section className="rounded-lg border border-border/80 bg-card p-5 shadow-xs">
          <CheckCircle2Icon className="size-5 text-success" />
          <h2 className="mt-4 text-lg font-semibold">{m.admin_latest_post()}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{latestPost.title}</p>
        </section>
      </div>
    </div>
  );
}
