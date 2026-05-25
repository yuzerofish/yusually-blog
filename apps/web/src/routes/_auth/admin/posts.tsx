import {
  localizePost,
  posts,
  renderMarkdownToHtml,
  type ContentStatus,
  type Post,
} from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusIcon, SearchIcon } from "lucide-react";
import { useEffect, useMemo, useState, type ComponentProps } from "react";

import { MdxEditorSurface } from "#/components/mdx-editor-surface";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/admin/posts")({
  component: AdminPostsPage,
});

type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;
const defaultMarkdown = "# New post\n\nStart writing in Markdown.";
const statusOptions: Array<"all" | ContentStatus> = [
  "all",
  "draft",
  "published",
  "scheduled",
  "archived",
];

function AdminPostsPage() {
  const locale = getCurrentLocale();
  const [rows, setRows] = useState<Post[]>(posts.map((post) => localizePost(post, locale)));
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ContentStatus>("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editorMode, setEditorMode] = useState<"editor" | "source" | "preview">("editor");
  const [editorState, setEditorState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const previewHtml = useMemo(() => renderMarkdownToHtml(markdown), [markdown]);

  const visiblePosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return rows.filter(
      (post) =>
        (statusFilter === "all" || post.status === statusFilter) &&
        (tagFilter === "all" || post.tags.some((tag) => tag.slug === tagFilter)) &&
        (!normalizedQuery ||
          [post.title, post.excerpt, post.status, post.source, ...post.tags.map((tag) => tag.name)]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery)),
    );
  }, [rows, query, statusFilter, tagFilter]);

  const tagOptions = useMemo(() => {
    const tagsBySlug = new Map<string, Post["tags"][number]>();

    for (const post of rows) {
      for (const tag of post.tags) {
        tagsBySlug.set(tag.slug, tag);
      }
    }

    return Array.from(tagsBySlug.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [rows]);

  useEffect(() => {
    let ignore = false;

    void fetch(`/api/posts?status=all&lang=${locale}`)
      .then((response) => (response.ok ? response.json() : undefined))
      .then((payload) => {
        const data = (payload as { data?: Post[] } | undefined)?.data;

        if (!ignore && data) {
          setRows(data);
        }
      });

    return () => {
      ignore = true;
    };
  }, [locale]);

  const handleEditorSubmit: FormSubmitHandler = async (event) => {
    event.preventDefault();
    setEditorState("saving");

    const formData = new FormData(event.currentTarget);
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const status = submitter?.value === "published" ? "published" : "draft";
    const endpoint = editingPost
      ? `/api/posts/${editingPost.id}?lang=${locale}`
      : `/api/posts?lang=${locale}`;
    const tagsValue = formData.get("tags");

    const response = await fetch(endpoint, {
      method: editingPost ? "PATCH" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        excerpt: formData.get("excerpt"),
        seoTitle: formData.get("seoTitle"),
        seoDescription: formData.get("seoDescription"),
        contentMarkdown: markdown,
        status,
        commentsEnabled: formData.get("commentsEnabled") === "on",
        tags: parseTagNames(typeof tagsValue === "string" ? tagsValue : ""),
        locale,
      }),
    });

    if (!response.ok) {
      setEditorState("error");
      return;
    }

    const payload = (await response.json()) as { data: Post };
    upsertPost(payload.data);
    setEditingPost(payload.data);
    setMarkdown(payload.data.contentMarkdown);
    setEditorState("saved");
  };

  const upsertPost = (post: Post) => {
    setRows((current) => {
      if (current.some((row) => row.id === post.id)) {
        return current.map((row) => (row.id === post.id ? post : row));
      }

      return [post, ...current];
    });
  };

  const startNewPost = () => {
    setEditingPost(null);
    setMarkdown(defaultMarkdown);
    setEditorState("idle");
    document.getElementById("post-editor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const editPost = (post: Post) => {
    setEditingPost(post);
    setMarkdown(post.contentMarkdown);
    setEditorState("idle");
    document.getElementById("post-editor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const changePostStatus = async (post: Post, status: ContentStatus) => {
    const response = await fetch(`/api/posts/${post.id}?lang=${locale}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      return;
    }

    const payload = (await response.json()) as { data: Post };
    upsertPost(payload.data);
  };

  const deletePost = async (post: Post) => {
    const response = await fetch(`/api/posts/${post.id}?lang=${locale}`, { method: "DELETE" });

    if (!response.ok) {
      return;
    }

    const payload = (await response.json()) as { data: Post };
    upsertPost(payload.data);
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
          <Button type="button" onClick={startNewPost}>
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
        <div className="mt-4 max-w-xs">
          <Label htmlFor="post-status-filter">{m.admin_posts_filter_status()}</Label>
          <select
            id="post-status-filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.currentTarget.value as typeof statusFilter)}
            className="mt-2 h-10 w-full rounded-md border border-[#26312c]/15 bg-white px-3 text-sm dark:border-white/10 dark:bg-[#111614]"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status === "all" ? m.admin_posts_filter_all_status() : status}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 max-w-xs">
          <Label htmlFor="post-tag-filter">{m.admin_posts_filter_tag()}</Label>
          <select
            id="post-tag-filter"
            value={tagFilter}
            onChange={(event) => setTagFilter(event.currentTarget.value)}
            className="mt-2 h-10 w-full rounded-md border border-[#26312c]/15 bg-white px-3 text-sm dark:border-white/10 dark:bg-[#111614]"
          >
            <option value="all">{m.admin_posts_filter_all_tags()}</option>
            {tagOptions.map((tag) => (
              <option key={tag.slug} value={tag.slug}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-[#26312c]/10 dark:border-white/10">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead className="bg-[#f8f5ef] text-xs tracking-[0.12em] text-[#64716a] uppercase dark:bg-white/5 dark:text-[#aeb8b1]">
              <tr>
                <th className="px-4 py-3">{m.admin_posts_column_title()}</th>
                <th className="px-4 py-3">{m.admin_posts_status()}</th>
                <th className="px-4 py-3">{m.admin_posts_source()}</th>
                <th className="px-4 py-3">{m.admin_posts_updated()}</th>
                <th className="px-4 py-3">{m.admin_posts_public_url()}</th>
                <th className="px-4 py-3">{m.admin_posts_actions()}</th>
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
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" onClick={() => editPost(post)}>
                        {m.admin_posts_edit()}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={post.status === "deleted"}
                        onClick={() =>
                          void changePostStatus(
                            post,
                            post.status === "published" ? "archived" : "published",
                          )
                        }
                      >
                        {post.status === "published"
                          ? m.admin_posts_archive()
                          : m.admin_publish_post()}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={post.status === "deleted"}
                        onClick={() => void deletePost(post)}
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
        key={editingPost?.id ?? "new-post"}
        id="post-editor"
        onSubmit={handleEditorSubmit}
        className="rounded-lg border border-[#26312c]/10 bg-white p-6 dark:border-white/10 dark:bg-[#171d1a]"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-normal">
              {editingPost ? m.admin_editor_edit_title() : m.admin_editor_title()}
            </h2>
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
                defaultValue={editingPost?.title ?? m.admin_editor_default_title()}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="editor-excerpt">{m.admin_editor_excerpt()}</Label>
              <Input
                id="editor-excerpt"
                name="excerpt"
                defaultValue={editingPost?.excerpt ?? m.admin_editor_default_excerpt()}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="editor-seo-title">{m.admin_editor_seo_title()}</Label>
              <Input id="editor-seo-title" name="seoTitle" defaultValue={editingPost?.seoTitle} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="editor-seo-description">{m.admin_editor_seo_description()}</Label>
              <Input
                id="editor-seo-description"
                name="seoDescription"
                defaultValue={editingPost?.seoDescription}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="editor-tags">{m.admin_editor_tags()}</Label>
              <Input
                id="editor-tags"
                name="tags"
                defaultValue={editingPost?.tags.map((tag) => tag.name).join(", ")}
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="commentsEnabled"
                defaultChecked={editingPost?.commentsEnabled ?? true}
                className="size-4 rounded border-[#26312c]/20"
              />
              {m.admin_editor_comments_enabled()}
            </label>
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
            {editorState === "saved" ? (
              <p className="text-sm text-[#1f6f5b] dark:text-[#75c5ad]">{m.admin_editor_saved()}</p>
            ) : null}
            {editorState === "error" ? (
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
              className="prose prose-neutral dark:prose-invert min-h-96 max-w-none rounded-md border border-[#26312c]/10 bg-[#f8f5ef] p-5 dark:border-white/10 dark:bg-white/5"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          ) : null}
        </div>
      </form>
    </section>
  );
}

function parseTagNames(value: string) {
  return value
    .split(/[,\n]/)
    .map((name) => name.trim())
    .filter(Boolean);
}
