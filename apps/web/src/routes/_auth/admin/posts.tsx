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
import { CalendarClockIcon, PlusIcon, SearchIcon } from "lucide-react";
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
type BatchAction = "publish" | "draft" | "archive" | "delete";

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
  const [selectedPostIds, setSelectedPostIds] = useState<string[]>([]);
  const [fallbackPublishedAtIso] = useState(() =>
    new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  );
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
  const allVisibleSelected =
    visiblePosts.length > 0 && visiblePosts.every((post) => selectedPostIds.includes(post.id));

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
    const status = (submitter?.value as ContentStatus | undefined) ?? "draft";
    const endpoint = editingPost
      ? `/api/posts/${editingPost.id}?lang=${locale}`
      : `/api/posts?lang=${locale}`;
    const tagsValue = formData.get("tags");
    const publishedAtValue = formData.get("publishedAt");

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
        publishedAt:
          typeof publishedAtValue === "string" ? datetimeLocalToIso(publishedAtValue) : undefined,
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

  const toggleAllVisiblePosts = (checked: boolean) => {
    const visibleIds = visiblePosts.map((post) => post.id);

    setSelectedPostIds((current) =>
      checked
        ? Array.from(new Set([...current, ...visibleIds]))
        : current.filter((id) => !visibleIds.includes(id)),
    );
  };

  const togglePostSelection = (postId: string, checked: boolean) => {
    setSelectedPostIds((current) =>
      checked ? Array.from(new Set([...current, postId])) : current.filter((id) => id !== postId),
    );
  };

  const applyBatchAction = async (action: BatchAction) => {
    if (!selectedPostIds.length) {
      return;
    }

    const response = await fetch(`/api/posts/batch?lang=${locale}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ids: selectedPostIds, action, locale }),
    });

    if (!response.ok) {
      return;
    }

    const payload = (await response.json()) as { data: Post[] };

    for (const post of payload.data) {
      upsertPost(post);
    }

    setSelectedPostIds([]);
  };

  return (
    <section className="grid gap-6">
      <div className="rounded-lg border border-border/80 bg-card p-6 shadow-xs">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold">{m.admin_posts_title()}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{m.admin_posts_description()}</p>
          </div>
          <Button type="button" onClick={startNewPost}>
            <PlusIcon />
            {m.admin_new_post()}
          </Button>
        </div>

        <div className="mt-6 flex max-w-md items-center gap-2 rounded-md border border-input bg-background px-3 shadow-xs">
          <SearchIcon className="size-4 text-muted-foreground" />
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
            className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20"
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
            className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20"
          >
            <option value="all">{m.admin_posts_filter_all_tags()}</option>
            {tagOptions.map((tag) => (
              <option key={tag.slug} value={tag.slug}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <p className="text-sm text-muted-foreground">
            {m.admin_posts_selected({ count: selectedPostIds.length })}
          </p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={!selectedPostIds.length}
            onClick={() => void applyBatchAction("publish")}
          >
            {m.admin_publish_post()}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={!selectedPostIds.length}
            onClick={() => void applyBatchAction("draft")}
          >
            {m.admin_save_draft()}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={!selectedPostIds.length}
            onClick={() => void applyBatchAction("archive")}
          >
            {m.admin_posts_archive()}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="destructive"
            disabled={!selectedPostIds.length}
            onClick={() => void applyBatchAction("delete")}
          >
            {m.admin_posts_delete()}
          </Button>
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-border/80">
          <table className="w-full min-w-[940px] text-left text-sm">
            <thead className="bg-muted/55 text-xs text-muted-foreground uppercase">
              <tr>
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allVisibleSelected}
                    onChange={(event) => toggleAllVisiblePosts(event.currentTarget.checked)}
                    aria-label={m.admin_posts_select_all()}
                    className="size-4 rounded border-input"
                  />
                </th>
                <th className="px-4 py-3">{m.admin_posts_column_title()}</th>
                <th className="px-4 py-3">{m.admin_posts_status()}</th>
                <th className="px-4 py-3">{m.admin_posts_source()}</th>
                <th className="px-4 py-3">{m.admin_posts_updated()}</th>
                <th className="px-4 py-3">{m.admin_posts_public_url()}</th>
                <th className="px-4 py-3">{m.admin_posts_actions()}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/80">
              {visiblePosts.map((post) => (
                <tr key={post.id}>
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedPostIds.includes(post.id)}
                      onChange={(event) =>
                        togglePostSelection(post.id, event.currentTarget.checked)
                      }
                      aria-label={m.admin_posts_select_one({ title: post.title })}
                      className="size-4 rounded border-input"
                    />
                  </td>
                  <td className="px-4 py-4 font-medium">{post.title}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-sm bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">{post.source}</td>
                  <td className="px-4 py-4 text-muted-foreground">{post.updatedAt.slice(0, 10)}</td>
                  <td className="px-4 py-4">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="text-link hover:underline"
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
        className="rounded-lg border border-border/80 bg-card p-6 shadow-xs"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold">
              {editingPost ? m.admin_editor_edit_title() : m.admin_editor_title()}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{m.admin_editor_description()}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="submit" name="status" value="draft" variant="outline">
              {m.admin_save_draft()}
            </Button>
            <Button type="submit" name="status" value="scheduled" variant="outline">
              <CalendarClockIcon />
              {m.admin_schedule_post()}
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
            <div className="grid gap-2">
              <Label htmlFor="editor-published-at">{m.admin_editor_publish_at()}</Label>
              <Input
                id="editor-published-at"
                name="publishedAt"
                type="datetime-local"
                defaultValue={toDatetimeLocal(editingPost?.publishedAt ?? fallbackPublishedAtIso)}
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="commentsEnabled"
                defaultChecked={editingPost?.commentsEnabled ?? true}
                className="size-4 rounded border-input"
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
              <p className="text-sm text-success">{m.admin_editor_saved()}</p>
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
              className="prose prose-neutral prose-a:text-link dark:prose-invert min-h-96 max-w-none rounded-md border border-border bg-muted/45 p-5"
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

function toDatetimeLocal(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
}

function datetimeLocalToIso(value: string) {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}
