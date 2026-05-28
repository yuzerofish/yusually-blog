import { localizePage, renderMarkdownToHtml, type CmsPage } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FilePlusIcon } from "lucide-react";
import { lazy, Suspense, useEffect, useMemo, useState, type ComponentProps } from "react";

import {
  AdminPageHeader,
  AdminPanel,
  AdminTableFrame,
  adminPanelClassName,
  adminSelectClassName,
  adminTextareaClassName,
} from "#/components/admin/admin-ui";

const MdxEditorSurface = lazy(() =>
  import("#/components/mdx-editor-surface").then((m) => ({ default: m.MdxEditorSurface })),
);
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/admin/pages")({
  component: AdminPagesPage,
});

type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;
type PageStatus = CmsPage["status"];

const defaultPageMarkdown = "# About\n\nWrite a concise author profile or site story.";
const statusOptions: PageStatus[] = ["draft", "published", "archived"];

function AdminPagesPage() {
  const locale = getCurrentLocale();
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [editingPage, setEditingPage] = useState<CmsPage | null>(null);
  const [markdown, setMarkdown] = useState(defaultPageMarkdown);
  const [editorMode, setEditorMode] = useState<"editor" | "source" | "preview">("editor");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const previewHtml = useMemo(() => renderMarkdownToHtml(markdown), [markdown]);

  useEffect(() => {
    let ignore = false;

    void fetch(`/api/pages?status=all&lang=${locale}`)
      .then((response) => (response.ok ? response.json() : undefined))
      .then((payload) => {
        const data = (payload as { data?: CmsPage[] } | undefined)?.data;

        if (!ignore && data) {
          setPages(data.map((page) => localizePage(page, locale)));
        }
      });

    return () => {
      ignore = true;
    };
  }, [locale]);

  const startNewPage = () => {
    setEditingPage(null);
    setMarkdown(defaultPageMarkdown);
    setSaveState("idle");
    document.getElementById("page-editor")?.scrollIntoView({ behavior: "smooth" });
  };

  const editPage = (page: CmsPage) => {
    setEditingPage(page);
    setMarkdown(page.contentMarkdown);
    setSaveState("idle");
    document.getElementById("page-editor")?.scrollIntoView({ behavior: "smooth" });
  };

  const savePage: FormSubmitHandler = async (event) => {
    event.preventDefault();
    setSaveState("saving");

    const formData = new FormData(event.currentTarget);
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const status =
      (submitter?.value as PageStatus | undefined) ??
      ((formData.get("status") as PageStatus | null) || "draft");
    const endpoint = editingPage
      ? `/api/pages/${editingPage.id}?lang=${locale}`
      : `/api/pages?lang=${locale}`;
    const response = await fetch(endpoint, {
      method: editingPage ? "PATCH" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        slug: formData.get("slug"),
        seoTitle: formData.get("seoTitle"),
        seoDescription: formData.get("seoDescription"),
        contentMarkdown: markdown,
        status,
        locale,
      }),
    });

    if (!response.ok) {
      setSaveState("error");
      return;
    }

    const payload = (await response.json()) as { data: CmsPage };
    upsertPage(payload.data);
    setEditingPage(payload.data);
    setMarkdown(payload.data.contentMarkdown);
    setSaveState("saved");
  };

  const deletePage = async (page: CmsPage) => {
    const response = await fetch(`/api/pages/${page.id}`, { method: "DELETE" });

    if (!response.ok) {
      return;
    }

    const payload = (await response.json()) as { data: CmsPage };
    upsertPage(payload.data);
  };

  const upsertPage = (page: CmsPage) => {
    setPages((current) =>
      current.some((row) => row.id === page.id)
        ? current.map((row) => (row.id === page.id ? page : row))
        : [page, ...current],
    );
  };

  return (
    <section className="grid gap-5">
      <AdminPageHeader
        title={m.admin_pages_title()}
        description={m.admin_pages_description()}
        actions={
          <Button type="button" onClick={startNewPage}>
            <FilePlusIcon />
            {m.admin_new_page()}
          </Button>
        }
      />

      <AdminPanel>
        <AdminTableFrame>
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-muted/55 text-xs text-muted-foreground uppercase">
              <tr>
                <th className="px-3 py-2.5">{m.admin_posts_column_title()}</th>
                <th className="px-3 py-2.5">Slug</th>
                <th className="px-3 py-2.5">{m.admin_posts_status()}</th>
                <th className="px-3 py-2.5">{m.admin_posts_updated()}</th>
                <th className="px-3 py-2.5">{m.admin_posts_actions()}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/80">
              {pages.map((page) => (
                <tr key={page.id}>
                  <td className="px-3 py-3 font-medium">{page.title}</td>
                  <td className="px-3 py-3 text-muted-foreground">{page.slug}</td>
                  <td className="px-3 py-3">
                    <span className="rounded-sm bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                      {page.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">{page.updatedAt.slice(0, 10)}</td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-2">
                      {page.slug === "about" && page.status === "published" ? (
                        <Button
                          render={<Link to="/about" />}
                          nativeButton={false}
                          size="sm"
                          variant="outline"
                        >
                          {m.admin_posts_view()}
                        </Button>
                      ) : null}
                      <Button size="sm" variant="outline" onClick={() => editPage(page)}>
                        {m.admin_posts_edit()}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={page.status === "deleted"}
                        onClick={() => void deletePage(page)}
                      >
                        {m.admin_posts_delete()}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminTableFrame>
      </AdminPanel>

      <form
        key={editingPage?.id ?? "new-page"}
        id="page-editor"
        onSubmit={savePage}
        className={`${adminPanelClassName} grid gap-5`}
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-base font-semibold">{m.admin_pages_editor_title()}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{m.admin_editor_description()}</p>
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

        <div className="grid gap-5 lg:grid-cols-[0.4fr_0.6fr]">
          <div className="grid content-start gap-4">
            <div className="grid gap-2">
              <Label htmlFor="page-title">{m.admin_posts_column_title()}</Label>
              <Input
                id="page-title"
                name="title"
                required
                defaultValue={editingPage?.title ?? "About"}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="page-slug">Slug</Label>
              <Input
                id="page-slug"
                name="slug"
                required
                disabled={Boolean(editingPage)}
                defaultValue={editingPage?.slug ?? "about"}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="page-seo-title">{m.admin_editor_seo_title()}</Label>
              <Input id="page-seo-title" name="seoTitle" defaultValue={editingPage?.seoTitle} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="page-seo-description">{m.admin_editor_seo_description()}</Label>
              <Input
                id="page-seo-description"
                name="seoDescription"
                defaultValue={editingPage?.seoDescription}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="page-status">{m.admin_posts_status()}</Label>
              <select
                id="page-status"
                name="status"
                defaultValue={editingPage?.status ?? "draft"}
                className={adminSelectClassName}
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
            <Suspense fallback={<div className="h-64 animate-pulse rounded bg-muted" />}>
              <MdxEditorSurface value={markdown} onChange={setMarkdown} />
            </Suspense>
          ) : null}
          {editorMode === "source" ? (
            <textarea
              value={markdown}
              onChange={(event) => setMarkdown(event.target.value)}
              className={`${adminTextareaClassName} min-h-96 font-mono leading-6 focus-visible:ring-[3px] focus-visible:ring-ring/50`}
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
