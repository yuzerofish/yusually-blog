import { SiGithub } from "@icons-pack/react-simple-icons";
import { formatDate, localizeProject, localizeSiteSettings } from "@repo/core";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowUpRightIcon, CalendarDaysIcon } from "lucide-react";

import { SiteShell } from "#/components/site-shell";
import { $getProjectPageData } from "#/lib/cms-server";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ params }) => {
    const data = await $getProjectPageData({ data: { slug: params.slug } });

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
    const project = localizeProject(loaderData.project, locale);
    const siteSettings = localizeSiteSettings(loaderData.siteSettings, locale);
    const siteUrl = siteSettings.url.replace(/\/$/, "");
    const canonicalUrl = `${siteUrl}/projects/${project.slug}`;
    const imageUrl = new URL(project.coverImage, siteUrl).toString();

    return {
      meta: [
        { title: `${project.title} | ${siteSettings.name}` },
        { name: "description", content: project.excerpt },
        {
          name: "robots",
          content: siteSettings.indexingEnabled ? "index,follow" : "noindex,nofollow",
        },
        { property: "og:title", content: project.title },
        { property: "og:description", content: project.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: canonicalUrl },
        { property: "og:image", content: imageUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: project.title },
        { name: "twitter:description", content: project.excerpt },
        { name: "twitter:image", content: imageUrl },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
    };
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const data = Route.useLoaderData();
  const locale = getCurrentLocale();
  const project = localizeProject(data.project, locale);
  const siteSettings = localizeSiteSettings(data.siteSettings, locale);

  return (
    <SiteShell siteSettings={siteSettings}>
      <article>
        <header className="border-b border-border/80 bg-muted/35">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag.slug}
                    className="rounded-sm border border-border bg-card px-2 py-1 text-xs font-medium text-link shadow-xs"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              <h1 className="mt-5 text-4xl leading-tight font-semibold text-balance sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">{project.excerpt}</p>
              <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDaysIcon className="size-4" />
                {formatDate(project.publishedAt, locale)} · {m.updated()}{" "}
                {formatDate(project.updatedAt, locale)}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {project.projectUrl ? (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                  >
                    <ArrowUpRightIcon className="size-4" />
                    {project.title}
                  </a>
                ) : null}
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium transition hover:bg-muted"
                  >
                    <SiGithub className="size-4" />
                    GitHub
                  </a>
                ) : null}
              </div>
            </div>
            <img
              src={project.coverImage}
              alt=""
              className="h-full min-h-80 rounded-lg border border-border/70 object-cover shadow-xs"
            />
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,760px)_1fr] lg:px-8">
          <div
            className="prose prose-neutral prose-a:text-link prose-headings:font-semibold dark:prose-invert max-w-none rounded-lg border border-border/80 bg-card p-6 leading-8 shadow-xs"
            dangerouslySetInnerHTML={{ __html: project.contentHtml }}
          />

          <aside className="min-w-0">
            <div className="rounded-lg border border-border/80 bg-card p-4 shadow-xs">
              <p className="text-sm font-semibold">{m.projects_title()}</p>
              <div className="mt-3 grid gap-3">
                {project.screenshots.length ? (
                  project.screenshots.map((screenshot) => (
                    <img
                      key={screenshot}
                      src={screenshot}
                      alt=""
                      className="rounded-md border border-border object-cover"
                    />
                  ))
                ) : (
                  <img
                    src={project.coverImage}
                    alt=""
                    className="rounded-md border border-border object-cover"
                  />
                )}
              </div>
            </div>
          </aside>
        </div>
      </article>
    </SiteShell>
  );
}
