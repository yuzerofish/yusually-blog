import { localizePost, posts } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/admin/posts")({
  component: AdminPostsPage,
});

function AdminPostsPage() {
  const locale = getCurrentLocale();
  const localizedPosts = posts.map((post) => localizePost(post, locale));

  return (
    <section className="rounded-lg border border-[#26312c]/10 bg-white p-6 dark:border-white/10 dark:bg-[#171d1a]">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">{m.admin_posts_title()}</h1>
          <p className="mt-2 text-sm text-[#64716a] dark:text-[#aeb8b1]">
            {m.admin_posts_description()}
          </p>
        </div>
        <Button>
          <PlusIcon />
          {m.admin_new_post()}
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-[#26312c]/10 dark:border-white/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-[#f8f5ef] text-xs tracking-[0.12em] text-[#64716a] uppercase dark:bg-white/5 dark:text-[#aeb8b1]">
            <tr>
              <th className="px-4 py-3">{m.admin_posts_column_title()}</th>
              <th className="px-4 py-3">{m.admin_posts_status()}</th>
              <th className="px-4 py-3">{m.admin_posts_source()}</th>
              <th className="px-4 py-3">{m.admin_posts_updated()}</th>
              <th className="px-4 py-3">{m.admin_posts_public_url()}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#26312c]/10 dark:divide-white/10">
            {localizedPosts.map((post) => (
              <tr key={post.id}>
                <td className="px-4 py-4 font-medium">{post.title}</td>
                <td className="px-4 py-4">
                  <span className="rounded-sm bg-[#1f6f5b]/10 px-2 py-1 text-xs font-medium text-[#1f6f5b] dark:text-[#75c5ad]">
                    {post.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-[#64716a] dark:text-[#aeb8b1]">{post.source}</td>
                <td className="px-4 py-4 text-[#64716a] dark:text-[#aeb8b1]">
                  {post.updatedAt.slice(0, 10)}
                </td>
                <td className="px-4 py-4">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="text-[#1f6f5b] hover:underline dark:text-[#75c5ad]"
                  >
                    {m.admin_posts_view()}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
