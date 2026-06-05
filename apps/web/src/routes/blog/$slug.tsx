import { useAuth } from "@repo/auth/tanstack/hooks";
import {
  formatDate,
  localizeComment,
  localizePost,
  localizeSiteSettings,
  slugify,
  type Comment,
} from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MessageSquareIcon, PencilLineIcon, RssIcon } from "lucide-react";
import { useState } from "react";

import { CommentForm } from "#/components/comment-form";
import { SiteShell } from "#/components/site-shell";
import { $getBlogPostPage, type BlogPostPageData } from "#/lib/cms-server";
import { getCurrentLocale } from "#/lib/i18n";
import { resolvePostCoverImage } from "#/lib/post-cover-image";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }): Promise<BlogPostPageData> => {
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
    const socialImage =
      resolvePostCoverImage(post.coverImage) || siteSettings.defaultOgImage.trim();
    const imageUrl = absoluteUrl(socialImage, siteUrl);
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
        { property: "article:published_time", content: post.publishedAt },
        { property: "article:modified_time", content: post.updatedAt },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.seoDescription },
        ...(imageUrl
          ? [
              { property: "og:image", content: imageUrl },
              { name: "twitter:image", content: imageUrl },
            ]
          : []),
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
  const { comments, post, relatedPosts, siteSettings, turnstileSiteKey }: BlogPostPageData =
    Route.useLoaderData();
  const { user } = useAuth();
  const [replyTarget, setReplyTarget] = useState<Comment | null>(null);
  const [submittedComments, setSubmittedComments] = useState<Comment[]>([]);
  const locale = getCurrentLocale();
  const localizedPost = localizePost(post, locale);
  const localizedSiteSettings = localizeSiteSettings(siteSettings, locale);
  const localizedComments = comments.map((comment) => localizeComment(comment, locale));
  const visibleComments = mergeCommentLists(
    localizedComments,
    submittedComments.map((comment) => localizeComment(comment, locale)),
  );
  const localizedRelatedPosts = relatedPosts.map((relatedPost) =>
    localizePost(relatedPost, locale),
  );
  const commentsEnabled = localizedSiteSettings.commentsEnabled && localizedPost.commentsEnabled;
  const commentsDescription = localizedSiteSettings.commentsRequireApproval
    ? m.comments_description()
    : null;
  const articleBody = buildArticleBody(localizedPost.contentHtml);
  const editLabel = locale === "zh" ? "编辑文章" : m.admin_posts_edit();
  const coverImage = resolvePostCoverImage(localizedPost.coverImage);

  return (
    <SiteShell siteSettings={localizedSiteSettings}>
      <article>
        <header className="relative isolate flex min-h-[calc(100svh-3.5rem)] items-end overflow-hidden bg-foreground text-white">
          {coverImage ? (
            <>
              <img
                src={coverImage}
                alt=""
                className="absolute inset-0 -z-20 size-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/85 via-black/40 to-black/20" />
            </>
          ) : null}

          {user?.role === "admin" ? (
            <Link
              to="/admin/posts/$postId"
              params={{ postId: localizedPost.id }}
              className="absolute top-5 right-4 z-10 inline-flex items-center gap-2 text-sm font-semibold text-white underline-offset-4 drop-shadow-md hover:underline sm:right-6 lg:right-8"
              aria-label={editLabel}
            >
              <PencilLineIcon className="size-4" />
              {editLabel}
            </Link>
          ) : null}

          <div className="mx-auto w-full max-w-5xl px-4 pt-24 pb-14 sm:px-6 sm:pb-20 lg:px-8">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {localizedPost.series ? (
                  <Link
                    to="/series/$slug"
                    params={{ slug: localizedPost.series.slug }}
                    className="text-xs font-semibold tracking-[0.18em] text-white uppercase underline-offset-4 drop-shadow-md hover:underline"
                  >
                    {localizedPost.series.name}
                  </Link>
                ) : null}
                {localizedPost.tags.map((tag) => (
                  <Link
                    key={tag.slug}
                    to="/tags/$slug"
                    params={{ slug: tag.slug }}
                    className="text-xs font-semibold tracking-[0.18em] text-white/80 uppercase underline-offset-4 drop-shadow-md hover:text-white hover:underline"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl leading-tight font-semibold text-balance drop-shadow-lg sm:text-6xl">
                {localizedPost.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85 drop-shadow-md sm:text-xl">
                {localizedPost.excerpt}
              </p>
              <p className="mt-7 text-sm font-medium tracking-wide text-white/75 drop-shadow-md">
                {formatDate(localizedPost.publishedAt, locale)} · {m.updated()}{" "}
                {formatDate(localizedPost.updatedAt, locale)} · {localizedPost.authorName}
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[12rem_minmax(0,48rem)] lg:px-8 xl:grid-cols-[12rem_minmax(0,48rem)_12rem]">
          <aside className="hidden lg:block">
            <nav aria-label={m.contents()} className="sticky top-24 text-sm">
              <p className="text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase">
                {m.contents()}
              </p>
              {articleBody.tocItems.length ? (
                <ol className="mt-4 grid gap-3">
                  {articleBody.tocItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`block leading-5 text-muted-foreground underline-offset-4 hover:text-link hover:underline ${
                          item.level === 3 ? "pl-4 text-xs" : ""
                        }`}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              ) : null}
              <div className="mt-7 grid gap-3 border-t border-border/70 pt-4">
                {commentsEnabled || localizedComments.length ? (
                  <a
                    href="#comments"
                    className="flex items-center gap-2 text-muted-foreground underline-offset-4 hover:text-link hover:underline"
                  >
                    <MessageSquareIcon className="size-4" />
                    {m.comments()}
                  </a>
                ) : null}
                <a
                  href="/rss.xml"
                  className="flex items-center gap-2 text-muted-foreground underline-offset-4 hover:text-link hover:underline"
                >
                  <RssIcon className="size-4" />
                  {m.rss_feed()}
                </a>
              </div>
            </nav>
          </aside>

          <div className="min-w-0">
            {articleBody.tocItems.length ? (
              <nav
                aria-label={m.contents()}
                className="mb-10 border-b border-border/70 pb-6 lg:hidden"
              >
                <p className="text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase">
                  {m.contents()}
                </p>
                <ol className="mt-4 grid gap-3">
                  {articleBody.tocItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`block leading-5 text-muted-foreground underline-offset-4 hover:text-link hover:underline ${
                          item.level === 3 ? "pl-4 text-xs" : ""
                        }`}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}

            <div
              className="prose prose-neutral prose-a:text-link prose-headings:scroll-mt-24 prose-headings:font-semibold dark:prose-invert max-w-none leading-8 [&>h1:first-child]:hidden"
              dangerouslySetInnerHTML={{ __html: articleBody.html }}
            />

            {commentsEnabled || localizedComments.length ? (
              <section id="comments" className="mt-16 border-t border-border/70 pt-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold">{m.comments()}</h2>
                    {commentsDescription ? (
                      <p className="mt-2 text-sm text-muted-foreground">{commentsDescription}</p>
                    ) : null}
                  </div>
                </div>
                {commentsEnabled ? (
                  <CommentForm
                    postSlug={localizedPost.slug}
                    turnstileSiteKey={turnstileSiteKey}
                    parentId={replyTarget?.id ?? null}
                    replyingTo={replyTarget?.authorName ?? null}
                    onCancelReply={() => setReplyTarget(null)}
                    onCommentCreated={(comment) =>
                      setSubmittedComments((current) => upsertComment(current, comment))
                    }
                  />
                ) : (
                  <p className="mt-6 text-sm text-muted-foreground">{m.comments_disabled()}</p>
                )}
                {visibleComments.length ? (
                  <div className="mt-8">
                    <CommentList comments={visibleComments} onReply={setReplyTarget} />
                  </div>
                ) : null}
              </section>
            ) : null}
          </div>

          <aside className="hidden min-w-0 xl:block">
            {localizedRelatedPosts.length ? (
              <div className="sticky top-24 text-sm">
                <p className="text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase">
                  {m.related()}
                </p>
                <div className="mt-3 grid gap-3">
                  {localizedRelatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      to="/blog/$slug"
                      params={{ slug: relatedPost.slug }}
                      className="leading-5 font-medium text-muted-foreground underline-offset-4 transition hover:text-link hover:underline"
                    >
                      {relatedPost.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
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
  const locale = getCurrentLocale();
  const visibleIds = new Set(comments.map((comment) => comment.id));
  const children = comments.filter((comment) => {
    if (parentId) {
      return comment.parentId === parentId;
    }

    return !comment.parentId || !visibleIds.has(comment.parentId);
  });

  return (
    <div className={cn("grid gap-4", depth ? "mt-3 border-l border-border/70 pl-4 md:pl-5" : "")}>
      {children.map((comment) => (
        <div key={comment.id} className="grid gap-3">
          <article
            className={cn(
              "rounded-md border p-4 shadow-xs",
              depth ? "bg-muted/25" : "bg-background",
              comment.status === "pending" ? "border-success/45 bg-success/5" : "border-border/80",
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-semibold text-foreground">
                  {commentInitial(comment.authorName)}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium">{comment.authorName}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(comment.createdAt, locale)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {comment.status === "pending" ? (
                  <span className="rounded-full border border-success/35 bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                    {m.comment_pending_badge()}
                  </span>
                ) : null}
                {depth < 1 && comment.status === "approved" ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="min-h-10"
                    onClick={() => onReply(comment)}
                  >
                    <MessageSquareIcon className="size-4" />
                    {m.comment_reply()}
                  </Button>
                ) : null}
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 break-words whitespace-pre-wrap text-foreground/80">
              {comment.body}
            </p>
            {comment.status === "pending" ? (
              <p className="mt-2 text-xs leading-5 text-success">
                {m.comment_pending_visible_note()}
              </p>
            ) : null}
          </article>
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
    </div>
  );
}

function commentInitial(name: string) {
  return name.trim().slice(0, 1).toUpperCase() || "?";
}

function mergeCommentLists(comments: Comment[], submittedComments: Comment[]) {
  const byId = new Map(comments.map((comment) => [comment.id, comment]));

  for (const comment of submittedComments) {
    byId.set(comment.id, comment);
  }

  return Array.from(byId.values()).sort((first, second) =>
    first.createdAt.localeCompare(second.createdAt),
  );
}

function upsertComment(comments: Comment[], comment: Comment) {
  const existingIndex = comments.findIndex((current) => current.id === comment.id);

  if (existingIndex === -1) {
    return [...comments, comment];
  }

  return comments.map((current, index) => (index === existingIndex ? comment : current));
}

function absoluteUrl(value: string, siteUrl: string) {
  if (!value) {
    return "";
  }

  return new URL(value, siteUrl).toString();
}

type TocItem = {
  id: string;
  level: 2 | 3;
  text: string;
};

function buildArticleBody(contentHtml: string): { html: string; tocItems: TocItem[] } {
  const usedIds = new Map<string, number>();
  const tocItems: TocItem[] = [];
  const html = contentHtml.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, levelValue: string, attrs: string, children: string) => {
      const text = decodeHtml(stripTags(children)).trim();

      if (!text) {
        return match;
      }

      const id = uniqueHeadingId(text, usedIds);
      const level = Number(levelValue) === 3 ? 3 : 2;
      tocItems.push({ id, level, text });

      return `<h${level}${removeIdAttribute(attrs)} id="${id}">${children}</h${level}>`;
    },
  );

  return { html, tocItems };
}

function uniqueHeadingId(text: string, usedIds: Map<string, number>) {
  const baseId = slugify(text) || "section";
  const count = usedIds.get(baseId) ?? 0;
  usedIds.set(baseId, count + 1);

  return count ? `${baseId}-${count + 1}` : baseId;
}

function removeIdAttribute(attrs: string) {
  return attrs.replace(/\s+id=(?:"[^"]*"|'[^']*'|[^\s>]*)/i, "");
}

function stripTags(value: string) {
  return value.replace(/<[^>]*>/g, "");
}

function decodeHtml(value: string) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
