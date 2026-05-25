import { getProjectsForLocale } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { ProjectCard } from "#/components/post-card";
import { SiteShell } from "#/components/site-shell";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
});

function ProjectsPage() {
  const projects = getProjectsForLocale(getCurrentLocale());

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.16em] text-[#1f6f5b] uppercase dark:text-[#75c5ad]">
            {m.projects_eyebrow()}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-[#1e2b25] sm:text-5xl dark:text-white">
            {m.projects_title()}
          </h1>
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
