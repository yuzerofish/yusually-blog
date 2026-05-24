import { formatDate, getApprovedCommentsForPost, getPostBySlug, getRelatedPosts } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MessageSquareIcon, RssIcon } from "lucide-react";

import { SiteShell } from "#/components/site-shell";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);

    if (!post) {
      throw notFound();
    }

    return {
      post,
      comments: getApprovedCommentsForPost(post.id),
      relatedPosts: getRelatedPosts(post.id),
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: loaderData.post.seoTitle },
          { name: "description", content: loaderData.post.seoDescription },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.excerpt },
          { property: "og:image", content: loaderData.post.coverImage },
          { property: "article:published_time", content: loaderData.post.publishedAt },
        ]
      : [],
  }),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { comments, post, relatedPosts } = Route.useLoaderData();

  return (
    <SiteShell>
      <article>
        <header className="border-b border-[#26312c]/10 bg-[#eee8da] dark:border-white/10 dark:bg-[#171d1a]">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.slug}
                    to="/tags/$slug"
                    params={{ slug: tag.slug }}
                    className="rounded-sm bg-white px-2 py-1 text-xs font-medium text-[#1f6f5b] dark:bg-white/10 dark:text-[#75c5ad]"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
              <h1 className="mt-5 text-4xl leading-tight font-semibold tracking-normal text-balance text-[#1e2b25] sm:text-5xl dark:text-white">
                {post.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-[#56625c] dark:text-[#cbd3cd]">
                {post.excerpt}
              </p>
              <p className="mt-5 text-sm text-[#64716a] dark:text-[#aeb8b1]">
                {formatDate(post.publishedAt)} · Updated {formatDate(post.updatedAt)} ·{" "}
                {post.authorName}
              </p>
            </div>
            <img
              src={post.coverImage}
              alt=""
              className="h-full min-h-80 rounded-lg object-cover shadow-sm"
            />
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[220px_minmax(0,760px)_1fr] lg:px-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-lg border border-[#26312c]/10 bg-white p-4 text-sm dark:border-white/10 dark:bg-[#171d1a]">
              <p className="font-semibold">Contents</p>
              <a
                href="#comments"
                className="mt-3 flex items-center gap-2 text-[#64716a] hover:text-[#1f6f5b] dark:text-[#aeb8b1]"
              >
                <MessageSquareIcon className="size-4" />
                Comments
              </a>
              <a
                href="/rss.xml"
                className="mt-2 flex items-center gap-2 text-[#64716a] hover:text-[#1f6f5b] dark:text-[#aeb8b1]"
              >
                <RssIcon className="size-4" />
                RSS
              </a>
            </div>
          </aside>

          <div className="min-w-0">
            <div
              className="prose prose-neutral prose-headings:tracking-normal dark:prose-invert max-w-none rounded-lg border border-[#26312c]/10 bg-white p-6 leading-8 shadow-sm dark:border-white/10 dark:bg-[#171d1a]"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            <section
              id="comments"
              className="mt-8 rounded-lg border border-[#26312c]/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#171d1a]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold tracking-normal">Comments</h2>
                  <p className="mt-2 text-sm text-[#64716a] dark:text-[#aeb8b1]">
                    New comments are held for review before publication.
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Submit comment
                </Button>
              </div>
              <div className="mt-6 grid gap-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="rounded-md border border-[#26312c]/10 bg-[#f8f5ef] p-4 dark:border-white/10 dark:bg-white/5"
                  >
                    <p className="font-medium">{comment.authorName}</p>
                    <p className="mt-2 text-sm leading-6 text-[#56625c] dark:text-[#cbd3cd]">
                      {comment.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="min-w-0">
            <div className="rounded-lg border border-[#26312c]/10 bg-white p-4 dark:border-white/10 dark:bg-[#171d1a]">
              <p className="text-sm font-semibold">Related</p>
              <div className="mt-3 grid gap-3">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to="/blog/$slug"
                    params={{ slug: relatedPost.slug }}
                    className="rounded-md bg-[#f8f5ef] p-3 text-sm font-medium hover:text-[#1f6f5b] dark:bg-white/5"
                  >
                    {relatedPost.title}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </article>
    </SiteShell>
  );
}
