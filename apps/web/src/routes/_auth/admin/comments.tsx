import { comments, posts } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/admin/comments")({
  component: AdminCommentsPage,
});

function AdminCommentsPage() {
  return (
    <section className="rounded-lg border border-[#26312c]/10 bg-white p-6 dark:border-white/10 dark:bg-[#171d1a]">
      <h1 className="text-2xl font-semibold tracking-normal">Comments</h1>
      <p className="mt-2 text-sm text-[#64716a] dark:text-[#aeb8b1]">
        Review pending comments before they appear publicly.
      </p>

      <div className="mt-6 grid gap-4">
        {comments.map((comment) => {
          const post = posts.find((candidate) => candidate.id === comment.postId);

          return (
            <article
              key={comment.id}
              className="rounded-lg border border-[#26312c]/10 bg-[#f8f5ef] p-4 dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <p className="font-medium">{comment.authorName}</p>
                  <p className="mt-1 text-xs text-[#64716a] dark:text-[#aeb8b1]">{post?.title}</p>
                </div>
                <span className="w-fit rounded-sm bg-white px-2 py-1 text-xs font-medium text-[#26312c] dark:bg-[#171d1a] dark:text-[#f5f1e8]">
                  {comment.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#56625c] dark:text-[#cbd3cd]">
                {comment.body}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm">Approve</Button>
                <Button size="sm" variant="outline">
                  Mark spam
                </Button>
                <Button size="sm" variant="destructive">
                  Delete
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
