import { comments, localizeComment, localizePost, posts } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { createFileRoute } from "@tanstack/react-router";

import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/admin/comments")({
  component: AdminCommentsPage,
});

function AdminCommentsPage() {
  const locale = getCurrentLocale();

  return (
    <section className="rounded-lg border border-[#26312c]/10 bg-white p-6 dark:border-white/10 dark:bg-[#171d1a]">
      <h1 className="text-2xl font-semibold tracking-normal">{m.admin_comments_title()}</h1>
      <p className="mt-2 text-sm text-[#64716a] dark:text-[#aeb8b1]">
        {m.admin_comments_description()}
      </p>

      <div className="mt-6 grid gap-4">
        {comments.map((comment) => {
          const post = posts.find((candidate) => candidate.id === comment.postId);
          const localizedPost = post ? localizePost(post, locale) : undefined;
          const localizedComment = localizeComment(comment, locale);

          return (
            <article
              key={comment.id}
              className="rounded-lg border border-[#26312c]/10 bg-[#f8f5ef] p-4 dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <p className="font-medium">{localizedComment.authorName}</p>
                  <p className="mt-1 text-xs text-[#64716a] dark:text-[#aeb8b1]">
                    {localizedPost?.title}
                  </p>
                </div>
                <span className="w-fit rounded-sm bg-white px-2 py-1 text-xs font-medium text-[#26312c] dark:bg-[#171d1a] dark:text-[#f5f1e8]">
                  {localizedComment.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#56625c] dark:text-[#cbd3cd]">
                {localizedComment.body}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm">{m.admin_comments_approve()}</Button>
                <Button size="sm" variant="outline">
                  {m.admin_comments_mark_spam()}
                </Button>
                <Button size="sm" variant="destructive">
                  {m.admin_comments_delete()}
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
