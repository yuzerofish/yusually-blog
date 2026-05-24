import type { Post, Project } from "@repo/core";
import { formatDate } from "@repo/core";
import { Link } from "@tanstack/react-router";
import { ArrowUpRightIcon, CalendarDaysIcon } from "lucide-react";

type PostCardProps = {
  readonly post: Post;
  readonly priority?: boolean;
};

export function PostCard({ post, priority = false }: PostCardProps) {
  return (
    <article className="grid overflow-hidden rounded-lg border border-[#26312c]/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:grid-cols-[0.42fr_0.58fr] dark:border-white/10 dark:bg-[#171d1a]">
      <Link to="/blog/$slug" params={{ slug: post.slug }} className="block min-h-56 bg-[#d7d0c1]">
        <img
          src={post.coverImage}
          alt=""
          loading={priority ? "eager" : "lazy"}
          className="h-full min-h-56 w-full object-cover"
        />
      </Link>
      <div className="flex min-w-0 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#64716a] dark:text-[#aeb8b1]">
          <span className="inline-flex items-center gap-1">
            <CalendarDaysIcon className="size-3.5" />
            {formatDate(post.publishedAt)}
          </span>
          {post.pinned ? (
            <span className="rounded-sm bg-[#e7d36a] px-2 py-0.5 text-[#26312c]">Pinned</span>
          ) : null}
        </div>
        <Link to="/blog/$slug" params={{ slug: post.slug }} className="group mt-3">
          <h2 className="text-2xl font-semibold tracking-normal text-balance text-[#1e2b25] group-hover:text-[#1f6f5b] dark:text-white">
            {post.title}
          </h2>
        </Link>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#64716a] dark:text-[#aeb8b1]">
          {post.excerpt}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag.slug}
              to="/tags/$slug"
              params={{ slug: tag.slug }}
              className="rounded-sm border border-[#26312c]/10 bg-[#f8f5ef] px-2 py-1 text-xs text-[#46524c] hover:border-[#1f6f5b] hover:text-[#1f6f5b] dark:border-white/10 dark:bg-white/5 dark:text-[#d8ded8]"
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
    <article className="overflow-hidden rounded-lg border border-[#26312c]/10 bg-white shadow-sm dark:border-white/10 dark:bg-[#171d1a]">
      <img src={project.coverImage} alt="" loading="lazy" className="h-52 w-full object-cover" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold text-[#1e2b25] dark:text-white">{project.title}</h2>
          <a
            href={project.projectUrl}
            aria-label={`${project.title} website`}
            className="rounded-md p-2 hover:bg-[#f1eadb] dark:hover:bg-white/10"
          >
            <ArrowUpRightIcon className="size-4" />
          </a>
        </div>
        <p className="mt-3 text-sm leading-6 text-[#64716a] dark:text-[#aeb8b1]">
          {project.excerpt}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag.slug}
              className="rounded-sm bg-[#e7d36a]/40 px-2 py-1 text-xs text-[#26312c] dark:text-[#f5f1e8]"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
