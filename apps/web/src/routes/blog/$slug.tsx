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

    const locale = getCurrentLocale();
    const post = localizePost(loaderData.post, locale);
    const siteSettings = localizeSiteSettings(loaderData.siteSettings, locale);
    const siteUrl = siteSettings.url.replace(/\/$/, "");
    const canonicalUrl = `${siteUrl}/blog/${post.slug}`;
    const imageUrl = absoluteUrl(post.coverImage, siteUrl);
    const avatarUrl = absoluteUrl(siteSettings.avatarUrl, siteUrl);
    const robots = siteSettings.indexingEnabled ? "index,follow" : "noindex,nofollow";
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.seoDescription,
      image: imageUrl ? [imageUrl] : undefined,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: {
        "@type": "Person",
        name: post.authorName || siteSettings.authorName,
      },
      publisher: {
        "@type": "Organization",
        name: siteSettings.name,
        logo: avatarUrl
          ? {
              "@type": "ImageObject",
              url: avatarUrl,
            }
          : undefined,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonicalUrl,
      },
      inLanguage: locale === "zh" ? "zh-CN" : "en",
    };

    return {
      meta: [
        { title: post.seoTitle },
        { name: "description", content: post.seoDescription },
        { name: "robots", content: robots },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: canonicalUrl },
        { property: "og:image", content: imageUrl },
        { property: "article:published_time", content: post.publishedAt },
        { property: "article:modified_time", content: post.updatedAt },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.seoDescription },
        { name: "twitter:image", content: imageUrl },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
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
        <header className="border-b border-border/80 bg-muted/35">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap gap-2">
                {localizedPost.tags.map((tag) => (
                  <Link
                    key={tag.slug}
                    to="/tags/$slug"
                    params={{ slug: tag.slug }}
                    className="rounded-sm border border-border bg-card px-2 py-1 text-xs font-medium text-link shadow-xs"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
              <h1 className="mt-5 text-4xl leading-tight font-semibold text-balance sm:text-5xl">
                {localizedPost.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                {localizedPost.excerpt}
              </p>
              <p className="mt-5 text-sm text-muted-foreground">
                {formatDate(localizedPost.publishedAt, locale)} · {m.updated()}{" "}
                {formatDate(localizedPost.updatedAt, locale)} · {localizedPost.authorName}
              </p>
            </div>
            <img
              src={localizedPost.coverImage}
              alt=""
              className="h-full min-h-80 rounded-lg border border-border/70 object-cover shadow-xs"
            />
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[220px_minmax(0,760px)_1fr] lg:px-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-lg border border-border/80 bg-card p-4 text-sm shadow-xs">
              <p className="font-semibold">{m.contents()}</p>
              <a
                href="#comments"
                className="mt-3 flex items-center gap-2 text-muted-foreground hover:text-link"
              >
                <MessageSquareIcon className="size-4" />
                {m.comments()}
              </a>
              <a
                href="/rss.xml"
                className="mt-2 flex items-center gap-2 text-muted-foreground hover:text-link"
              >
                <RssIcon className="size-4" />
                {m.rss_feed()}
              </a>
            </div>
          </aside>

          <div className="min-w-0">
            <div
              className="prose prose-neutral prose-a:text-link prose-headings:font-semibold dark:prose-invert max-w-none rounded-lg border border-border/80 bg-card p-6 leading-8 shadow-xs"
              dangerouslySetInnerHTML={{ __html: localizedPost.contentHtml }}
            />

            <section
              id="comments"
              className="mt-8 rounded-lg border border-border/80 bg-card p-6 shadow-xs"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">{m.comments()}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{m.comments_description()}</p>
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
            <div className="rounded-lg border border-border/80 bg-card p-4 shadow-xs">
              <p className="text-sm font-semibold">{m.related()}</p>
              <div className="mt-3 grid gap-3">
                {localizedRelatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to="/blog/$slug"
                    params={{ slug: relatedPost.slug }}
                    className="rounded-md bg-muted/55 p-3 text-sm font-medium transition hover:bg-muted hover:text-link"
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
            className="rounded-md border border-border bg-muted/55 p-4"
            style={{ marginLeft: depth ? Math.min(depth, 3) * 16 : 0 }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-medium">{comment.authorName}</p>
              {depth < 1 ? (
                <Button type="button" size="sm" variant="outline" onClick={() => onReply(comment)}>
                  {m.comment_reply()}
                </Button>
              ) : null}
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{comment.body}</p>
          </div>
          {depth < 1 ? (
            <CommentList
              comments={comments}
              depth={depth + 1}
              onReply={onReply}
              parentId={comment.id}
            />
          ) : null}
        </div>
      ))}
    </>
  );
}

function absoluteUrl(value: string, siteUrl: string) {
  if (!value) {
    return "";
  }

  return new URL(value, siteUrl).toString();
}
