import { localizeProject, localizeSiteSettings } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { ProjectCard } from "#/components/post-card";
import { SiteShell } from "#/components/site-shell";
import { $getProjectsPageData } from "#/lib/cms-server";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/projects")({
  loader: () => $getProjectsPageData(),
  component: ProjectsPage,
});

function ProjectsPage() {
  const data = Route.useLoaderData();
  const locale = getCurrentLocale();
  const projects = data.projects.map((project) => localizeProject(project, locale));
  const siteSettings = localizeSiteSettings(data.siteSettings, locale);

  return (
    <SiteShell siteSettings={siteSettings}>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-link uppercase">{m.projects_eyebrow()}</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{m.projects_title()}</h1>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
