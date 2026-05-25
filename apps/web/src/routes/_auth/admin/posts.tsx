import { localizePost, posts } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusIcon, SearchIcon } from "lucide-react";
import { useMemo, useState, type ComponentProps } from "react";

import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/admin/posts")({
  component: AdminPostsPage,
});

type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;

function AdminPostsPage() {
  const locale = getCurrentLocale();
  const localizedPosts = posts.map((post) => localizePost(post, locale));
  const [query, setQuery] = useState("");
  const [editorMode, setEditorMode] = useState<"source" | "preview">("source");
  const [editorState, setEditorState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [markdown, setMarkdown] = useState("# New post\n\nStart writing in Markdown.");

  const visiblePosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return localizedPosts;
    }

    return localizedPosts.filter((post) =>
      [post.title, post.excerpt, post.status, post.source]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [localizedPosts, query]);

  const handleEditorSubmit: FormSubmitHandler = async (event) => {
    event.preventDefault();
    setEditorState("saving");

    const formData = new FormData(event.currentTarget);
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const status = submitter?.value === "published" ? "published" : "draft";

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        excerpt: formData.get("excerpt"),
        contentMarkdown: markdown,
        status,
        locale,
      }),
    });

    setEditorState(response.ok ? "saved" : "error");
  };

  return (
    <section className="grid gap-6">
      <div className="rounded-lg border border-[#26312c]/10 bg-white p-6 dark:border-white/10 dark:bg-[#171d1a]">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold tracking-normal">{m.admin_posts_title()}</h1>
            <p className="mt-2 text-sm text-[#64716a] dark:text-[#aeb8b1]">
              {m.admin_posts_description()}
            </p>
          </div>
          <Button
            render={<a href="#post-editor" aria-label={m.admin_new_post()} />}
            nativeButton={false}
          >
            <PlusIcon />
            {m.admin_new_post()}
          </Button>
        </div>

        <div className="mt-6 flex max-w-md items-center gap-2 rounded-md border border-[#26312c]/10 bg-[#f8f5ef] px-3 dark:border-white/10 dark:bg-white/5">
          <SearchIcon className="size-4 text-[#64716a]" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={m.admin_posts_search()}
            className="border-0 bg-transparent shadow-none focus-visible:ring-0"
          />
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-[#26312c]/10 dark:border-white/10">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-[#f8f5ef] text-xs tracking-[0.12em] text-[#64716a] uppercase dark:bg-white/5 dark:text-[#aeb8b1]">
              <tr>
                <th className="px-4 py-3">{m.admin_posts_column_title()}</th>
                <th className="px-4 py-3">{m.admin_posts_status()}</th>
                <th className="px-4 py-3">{m.admin_posts_source()}</th>
                <th className="px-4 py-3">{m.admin_posts_updated()}</th>
                <th className="px-4 py-3">{m.admin_posts_public_url()}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#26312c]/10 dark:divide-white/10">
              {visiblePosts.map((post) => (
                <tr key={post.id}>
                  <td className="px-4 py-4 font-medium">{post.title}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-sm bg-[#1f6f5b]/10 px-2 py-1 text-xs font-medium text-[#1f6f5b] dark:text-[#75c5ad]">
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[#64716a] dark:text-[#aeb8b1]">{post.source}</td>
                  <td className="px-4 py-4 text-[#64716a] dark:text-[#aeb8b1]">
                    {post.updatedAt.slice(0, 10)}
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="text-[#1f6f5b] hover:underline dark:text-[#75c5ad]"
                    >
                      {m.admin_posts_view()}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <form
        id="post-editor"
        onSubmit={handleEditorSubmit}
        className="rounded-lg border border-[#26312c]/10 bg-white p-6 dark:border-white/10 dark:bg-[#171d1a]"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-normal">{m.admin_editor_title()}</h2>
            <p className="mt-2 text-sm text-[#64716a] dark:text-[#aeb8b1]">
              {m.admin_editor_description()}
            </p>
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
              <Label htmlFor="editor-title">{m.admin_posts_column_title()}</Label>
              <Input
                id="editor-title"
                name="title"
                required
                defaultValue={m.admin_editor_default_title()}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="editor-excerpt">{m.admin_editor_excerpt()}</Label>
              <Input
                id="editor-excerpt"
                name="excerpt"
                defaultValue={m.admin_editor_default_excerpt()}
              />
            </div>
            <div className="flex flex-wrap gap-2">
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
            {editorState === "saved" ? (
              <p className="text-sm text-[#1f6f5b] dark:text-[#75c5ad]">{m.admin_editor_saved()}</p>
            ) : null}
            {editorState === "error" ? (
              <p className="text-sm text-destructive">{m.admin_editor_error()}</p>
            ) : null}
          </div>

          {editorMode === "source" ? (
            <textarea
              value={markdown}
              onChange={(event) => setMarkdown(event.target.value)}
              className="min-h-96 rounded-md border border-input bg-background px-3 py-3 font-mono text-sm leading-6 shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
          ) : (
            <div className="prose prose-neutral dark:prose-invert min-h-96 max-w-none rounded-md border border-[#26312c]/10 bg-[#f8f5ef] p-5 dark:border-white/10 dark:bg-white/5">
              {markdown
                .split("\n")
                .map((line, index) =>
                  line.startsWith("# ") ? (
                    <h1 key={`${line}-${index}`}>{line.replace(/^#\s+/, "")}</h1>
                  ) : (
                    <p key={`${line}-${index}`}>{line || "\u00a0"}</p>
                  ),
                )}
            </div>
          )}
        </div>
      </form>
    </section>
  );
}
