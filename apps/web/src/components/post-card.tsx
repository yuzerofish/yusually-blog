import type { Post, Project, SupportedLocale } from "@repo/core";
import { formatDate } from "@repo/core";
import { Link } from "@tanstack/react-router";
import { ArrowUpRightIcon, CalendarDaysIcon } from "lucide-react";

import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

type PostCardProps = {
  readonly post: Post;
  readonly priority?: boolean;
  readonly locale?: SupportedLocale;
};

export function PostCard({ post, priority = false, locale = getCurrentLocale() }: PostCardProps) {
  return (
    <article className="grid overflow-hidden rounded-lg border border-border/80 bg-card shadow-xs transition hover:border-ring/45 hover:shadow-sm md:grid-cols-[0.42fr_0.58fr]">
      <Link to="/blog/$slug" params={{ slug: post.slug }} className="block min-h-56 bg-muted">
        <img
          src={post.coverImage}
          alt=""
          loading={priority ? "eager" : "lazy"}
          className="h-full min-h-56 w-full object-cover"
        />
      </Link>
      <div className="flex min-w-0 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <CalendarDaysIcon className="size-3.5" />
            {formatDate(post.publishedAt, locale)}
          </span>
          {post.pinned ? (
            <span className="rounded-sm bg-accent px-2 py-0.5 text-accent-foreground">
              {m.pinned()}
            </span>
          ) : null}
        </div>
        <Link to="/blog/$slug" params={{ slug: post.slug }} className="group mt-3">
          <h2 className="text-2xl font-semibold text-balance group-hover:text-link">
            {post.title}
          </h2>
        </Link>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag.slug}
              to="/tags/$slug"
              params={{ slug: tag.slug }}
              className="rounded-sm border border-border bg-muted/45 px-2 py-1 text-xs text-muted-foreground transition hover:border-ring/50 hover:text-foreground"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}

export function ProjectCard({ project }: { readonly project: Project }) {
  return (
    <article className="overflow-hidden rounded-lg border border-border/80 bg-card shadow-xs transition hover:border-ring/45 hover:shadow-sm">
      <img src={project.coverImage} alt="" loading="lazy" className="h-52 w-full object-cover" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold">{project.title}</h2>
          <a
            href={project.projectUrl}
            aria-label={`${project.title} website`}
            className="rounded-md p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <ArrowUpRightIcon className="size-4" />
          </a>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.excerpt}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag.slug}
              className="rounded-sm bg-accent px-2 py-1 text-xs text-accent-foreground"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
