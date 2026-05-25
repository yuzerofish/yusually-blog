import {
  formatDate,
  localizeComment,
  localizePost,
  localizeSiteSettings,
  type Comment,
} from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MessageSquareIcon, RssIcon } from "lucide-react";
import { useState } from "react";

import { CommentForm } from "#/components/comment-form";
import { SiteShell } from "#/components/site-shell";
import { $getBlogPostPage } from "#/lib/cms-server";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const data = await $getBlogPostPage({ data: { slug: params.slug } });

    if (!data) {
      throw notFound();
    }

    return data;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [] };
    }

    const post = localizePost(loaderData.post, getCurrentLocale());

    return {
      meta: [
        { title: post.seoTitle },
        { name: "description", content: post.seoDescription },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:image", content: post.coverImage },
        { property: "article:published_time", content: post.publishedAt },
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { comments, post, relatedPosts, siteSettings } = Route.useLoaderData();
  const [replyTarget, setReplyTarget] = useState<Comment | null>(null);
  const locale = getCurrentLocale();
  const localizedPost = localizePost(post, locale);
  const localizedSiteSettings = localizeSiteSettings(siteSettings, locale);
  const localizedComments = comments.map((comment) => localizeComment(comment, locale));
  const localizedRelatedPosts = relatedPosts.map((relatedPost) =>
    localizePost(relatedPost, locale),
  );

  return (
    <SiteShell siteSettings={localizedSiteSettings}>
      <article>
        <header className="border-b border-[#26312c]/10 bg-[#eee8da] dark:border-white/10 dark:bg-[#171d1a]">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap gap-2">
                {localizedPost.tags.map((tag) => (
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
                {localizedPost.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-[#56625c] dark:text-[#cbd3cd]">
                {localizedPost.excerpt}
              </p>
              <p className="mt-5 text-sm text-[#64716a] dark:text-[#aeb8b1]">
                {formatDate(localizedPost.publishedAt, locale)} · {m.updated()}{" "}
                {formatDate(localizedPost.updatedAt, locale)} · {localizedPost.authorName}
              </p>
            </div>
            <img
              src={localizedPost.coverImage}
              alt=""
              className="h-full min-h-80 rounded-lg object-cover shadow-sm"
            />
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[220px_minmax(0,760px)_1fr] lg:px-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-lg border border-[#26312c]/10 bg-white p-4 text-sm dark:border-white/10 dark:bg-[#171d1a]">
              <p className="font-semibold">{m.contents()}</p>
              <a
                href="#comments"
                className="mt-3 flex items-center gap-2 text-[#64716a] hover:text-[#1f6f5b] dark:text-[#aeb8b1]"
              >
                <MessageSquareIcon className="size-4" />
                {m.comments()}
              </a>
              <a
                href="/rss.xml"
                className="mt-2 flex items-center gap-2 text-[#64716a] hover:text-[#1f6f5b] dark:text-[#aeb8b1]"
              >
                <RssIcon className="size-4" />
                {m.rss_feed()}
              </a>
            </div>
          </aside>

          <div className="min-w-0">
            <div
              className="prose prose-neutral prose-headings:tracking-normal dark:prose-invert max-w-none rounded-lg border border-[#26312c]/10 bg-white p-6 leading-8 shadow-sm dark:border-white/10 dark:bg-[#171d1a]"
              dangerouslySetInnerHTML={{ __html: localizedPost.contentHtml }}
            />

            <section
              id="comments"
              className="mt-8 rounded-lg border border-[#26312c]/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#171d1a]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold tracking-normal">{m.comments()}</h2>
                  <p className="mt-2 text-sm text-[#64716a] dark:text-[#aeb8b1]">
                    {m.comments_description()}
                  </p>
                </div>
              </div>
              <CommentForm
                postSlug={localizedPost.slug}
                parentId={replyTarget?.id ?? null}
                replyingTo={replyTarget?.authorName ?? null}
                onCancelReply={() => setReplyTarget(null)}
              />
              <div className="mt-6 grid gap-4">
                <CommentList comments={localizedComments} onReply={setReplyTarget} />
              </div>
            </section>
          </div>

          <aside className="min-w-0">
            <div className="rounded-lg border border-[#26312c]/10 bg-white p-4 dark:border-white/10 dark:bg-[#171d1a]">
              <p className="text-sm font-semibold">{m.related()}</p>
              <div className="mt-3 grid gap-3">
                {localizedRelatedPosts.map((relatedPost) => (
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

type CommentListProps = {
  readonly comments: Comment[];
  readonly depth?: number;
  readonly onReply: (comment: Comment) => void;
  readonly parentId?: string | null;
};

function CommentList({ comments, depth = 0, onReply, parentId = null }: CommentListProps) {
  const visibleIds = new Set(comments.map((comment) => comment.id));
  const children = comments.filter((comment) => {
    if (parentId) {
      return comment.parentId === parentId;
    }

    return !comment.parentId || !visibleIds.has(comment.parentId);
  });

  return (
    <>
      {children.map((comment) => (
        <div key={comment.id} className="grid gap-3">
          <div
            className="rounded-md border border-[#26312c]/10 bg-[#f8f5ef] p-4 dark:border-white/10 dark:bg-white/5"
            style={{ marginLeft: depth ? Math.min(depth, 3) * 16 : 0 }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-medium">{comment.authorName}</p>
              <Button type="button" size="sm" variant="outline" onClick={() => onReply(comment)}>
                {m.comment_reply()}
              </Button>
            </div>
            <p className="mt-2 text-sm leading-6 text-[#56625c] dark:text-[#cbd3cd]">
              {comment.body}
            </p>
          </div>
          <CommentList
            comments={comments}
            depth={depth + 1}
            onReply={onReply}
            parentId={comment.id}
          />
        </div>
      ))}
    </>
  );
}
