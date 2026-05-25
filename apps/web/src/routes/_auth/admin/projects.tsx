import { localizeProject, renderMarkdownToHtml, type Project } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { createFileRoute } from "@tanstack/react-router";
import { BriefcaseBusinessIcon, ExternalLinkIcon } from "lucide-react";
import { useEffect, useMemo, useState, type ComponentProps } from "react";

import { MdxEditorSurface } from "#/components/mdx-editor-surface";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/admin/projects")({
  component: AdminProjectsPage,
});

type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;
type ProjectStatus = Project["status"];

const defaultProjectMarkdown = "# Project\n\nDescribe the problem, scope, stack, and outcome.";
const statusOptions: ProjectStatus[] = ["draft", "published", "archived"];

function AdminProjectsPage() {
  const locale = getCurrentLocale();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [markdown, setMarkdown] = useState(defaultProjectMarkdown);
  const [editorMode, setEditorMode] = useState<"editor" | "source" | "preview">("editor");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const previewHtml = useMemo(() => renderMarkdownToHtml(markdown), [markdown]);

  useEffect(() => {
    let ignore = false;

    void fetch(`/api/projects?status=all&lang=${locale}`)
      .then((response) => (response.ok ? response.json() : undefined))
      .then((payload) => {
        const data = (payload as { data?: Project[] } | undefined)?.data;

        if (!ignore && data) {
          setProjects(data.map((project) => localizeProject(project, locale)));
        }
      });

    return () => {
      ignore = true;
    };
  }, [locale]);

  const startNewProject = () => {
    setEditingProject(null);
    setMarkdown(defaultProjectMarkdown);
    setSaveState("idle");
    document.getElementById("project-editor")?.scrollIntoView({ behavior: "smooth" });
  };

  const editProject = (project: Project) => {
    setEditingProject(project);
    setMarkdown(project.contentMarkdown);
    setSaveState("idle");
    document.getElementById("project-editor")?.scrollIntoView({ behavior: "smooth" });
  };

  const saveProject: FormSubmitHandler = async (event) => {
    event.preventDefault();
    setSaveState("saving");

    const formData = new FormData(event.currentTarget);
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const status =
      (submitter?.value as ProjectStatus | undefined) ??
      ((formData.get("status") as ProjectStatus | null) || "draft");
    const endpoint = editingProject
      ? `/api/projects/${editingProject.id}?lang=${locale}`
      : `/api/projects?lang=${locale}`;
    const response = await fetch(endpoint, {
      method: editingProject ? "PATCH" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        slug: formData.get("slug"),
        excerpt: formData.get("excerpt"),
        coverImage: formData.get("coverImage"),
        projectUrl: formData.get("projectUrl"),
        githubUrl: formData.get("githubUrl"),
        tags: parseList(formData.get("tags")),
        screenshots: parseList(formData.get("screenshots")),
        contentMarkdown: markdown,
        status,
        locale,
      }),
    });

    if (!response.ok) {
      setSaveState("error");
      return;
    }

    const payload = (await response.json()) as { data: Project };
    upsertProject(payload.data);
    setEditingProject(payload.data);
    setMarkdown(payload.data.contentMarkdown);
    setSaveState("saved");
  };

  const deleteProject = async (project: Project) => {
    const response = await fetch(`/api/projects/${project.id}`, { method: "DELETE" });

    if (!response.ok) {
      return;
    }

    const payload = (await response.json()) as { data: Project };
    upsertProject(payload.data);
  };

  const upsertProject = (project: Project) => {
    setProjects((current) =>
      current.some((row) => row.id === project.id)
        ? current.map((row) => (row.id === project.id ? project : row))
        : [project, ...current],
    );
  };

  return (
    <section className="grid gap-6">
      <div className="rounded-lg border border-border/80 bg-card p-6 shadow-xs">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold">{m.admin_projects_title()}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{m.admin_projects_description()}</p>
          </div>
          <Button type="button" onClick={startNewProject}>
            <BriefcaseBusinessIcon />
            {m.admin_new_project()}
          </Button>
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-border/80">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-muted/55 text-xs text-muted-foreground uppercase">
              <tr>
                <th className="px-4 py-3">{m.admin_posts_column_title()}</th>
                <th className="px-4 py-3">{m.admin_posts_status()}</th>
                <th className="px-4 py-3">{m.admin_editor_tags()}</th>
                <th className="px-4 py-3">{m.admin_posts_updated()}</th>
                <th className="px-4 py-3">{m.admin_posts_public_url()}</th>
                <th className="px-4 py-3">{m.admin_posts_actions()}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/80">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-4 py-4">
                    <div className="font-medium">{project.title}</div>
                    <div className="mt-1 max-w-sm truncate text-xs text-muted-foreground">
                      {project.excerpt}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-sm bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                      {project.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    {project.tags.map((tag) => tag.name).join(", ") || "-"}
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    {project.updatedAt.slice(0, 10)}
                  </td>
                  <td className="px-4 py-4">
                    {project.projectUrl ? (
                      <a
                        href={project.projectUrl}
                        className="inline-flex items-center gap-1 text-link hover:underline"
                      >
                        <ExternalLinkIcon className="size-3.5" />
                        {m.admin_posts_view()}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" onClick={() => editProject(project)}>
                        {m.admin_posts_edit()}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={project.status === "deleted"}
                        onClick={() => void deleteProject(project)}
                      >
                        {m.admin_posts_delete()}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <form
        key={editingProject?.id ?? "new-project"}
        id="project-editor"
        onSubmit={saveProject}
        className="rounded-lg border border-border/80 bg-card p-6 shadow-xs"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold">{m.admin_projects_editor_title()}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{m.admin_projects_description()}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="submit" name="status" value="draft" variant="outline">
              {m.admin_save_draft()}
            </Button>
            <Button type="submit" name="status" value="published">
              {m.admin_publish_post()}
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[0.42fr_0.58fr]">
          <div className="grid content-start gap-4">
            <div className="grid gap-2">
              <Label htmlFor="project-title">{m.admin_posts_column_title()}</Label>
              <Input
                id="project-title"
                name="title"
                required
                defaultValue={editingProject?.title ?? "New project"}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project-slug">Slug</Label>
              <Input
                id="project-slug"
                name="slug"
                required
                disabled={Boolean(editingProject)}
                defaultValue={editingProject?.slug ?? "new-project"}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project-excerpt">{m.admin_editor_excerpt()}</Label>
              <Input id="project-excerpt" name="excerpt" defaultValue={editingProject?.excerpt} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project-cover">{m.admin_project_cover()}</Label>
              <Input
                id="project-cover"
                name="coverImage"
                defaultValue={editingProject?.coverImage}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project-url">{m.admin_project_live_url()}</Label>
              <Input id="project-url" name="projectUrl" defaultValue={editingProject?.projectUrl} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project-github">{m.admin_project_github_url()}</Label>
              <Input
                id="project-github"
                name="githubUrl"
                defaultValue={editingProject?.githubUrl}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project-tags">{m.admin_editor_tags()}</Label>
              <Input
                id="project-tags"
                name="tags"
                defaultValue={editingProject?.tags.map((tag) => tag.name).join(", ")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project-screenshots">{m.admin_project_screenshots()}</Label>
              <textarea
                id="project-screenshots"
                name="screenshots"
                defaultValue={editingProject?.screenshots.join("\n")}
                className="min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project-status">{m.admin_posts_status()}</Label>
              <select
                id="project-status"
                name="status"
                defaultValue={editingProject?.status ?? "draft"}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={editorMode === "editor" ? "default" : "outline"}
                onClick={() => setEditorMode("editor")}
              >
                {m.admin_editor_rich_mode()}
              </Button>
              <Button
                type="button"
                variant={editorMode === "source" ? "default" : "outline"}
                onClick={() => setEditorMode("source")}
              >
                {m.admin_editor_source_mode()}
              </Button>
              <Button
                type="button"
                variant={editorMode === "preview" ? "default" : "outline"}
                onClick={() => setEditorMode("preview")}
              >
                {m.admin_editor_preview_mode()}
              </Button>
            </div>
            {saveState === "saved" ? (
              <p className="text-sm text-success">{m.admin_editor_saved()}</p>
            ) : null}
            {saveState === "error" ? (
              <p className="text-sm text-destructive">{m.admin_editor_error()}</p>
            ) : null}
          </div>

          {editorMode === "editor" ? (
            <MdxEditorSurface value={markdown} onChange={setMarkdown} />
          ) : null}
          {editorMode === "source" ? (
            <textarea
              value={markdown}
              onChange={(event) => setMarkdown(event.target.value)}
              className="min-h-96 rounded-md border border-input bg-background px-3 py-3 font-mono text-sm leading-6 shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
          ) : null}
          {editorMode === "preview" ? (
            <div
              className="prose prose-neutral prose-a:text-link dark:prose-invert min-h-96 max-w-none rounded-md border border-border bg-muted/45 p-5"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          ) : null}
        </div>
      </form>
    </section>
  );
}

function parseList(value: FormDataEntryValue | null) {
  const text = typeof value === "string" ? value : "";

  return text
    .split(/[,\n]/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}
