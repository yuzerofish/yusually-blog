import { getArchiveGroups } from "@repo/core";
import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteShell } from "#/components/site-shell";

export const Route = createFileRoute("/archive")({
  component: ArchivePage,
});

function ArchivePage() {
  const groups = getArchiveGroups();

  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-normal text-[#1e2b25] dark:text-white">
          Archive
        </h1>
        <div className="mt-8 grid gap-5">
          {groups.map((group) => (
            <section
              key={group.key}
              className="rounded-lg border border-[#26312c]/10 bg-white p-5 dark:border-white/10 dark:bg-[#171d1a]"
            >
              <h2 className="text-xl font-semibold">{group.label}</h2>
              <div className="mt-4 grid gap-3">
                {group.posts.map((post) => (
                  <Link
                    key={post.id}
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="flex flex-col justify-between gap-2 rounded-md bg-[#f8f5ef] p-4 hover:text-[#1f6f5b] sm:flex-row sm:items-center dark:bg-white/5"
                  >
                    <span className="font-medium">{post.title}</span>
                    <span className="text-sm text-[#64716a] dark:text-[#aeb8b1]">
                      {post.publishedAt.slice(0, 10)}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
