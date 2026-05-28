import { type ContentStatus, type Post } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState, type ComponentProps } from "react";

import { AdminPageHeader, adminPanelClassName } from "#/components/admin/admin-ui";
import { PostForm } from "#/components/admin/post-form";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;

const defaultMarkdown = "# New post\n\nStart writing in Markdown.";

interface PostEditorPageProps {
  postId?: string;
}

type PostLoadResult =
  | { postId: string; state: "ready"; post: Post }
  | { postId: string; state: "error" | "not-found" };

export function PostEditorPage({ postId }: PostEditorPageProps) {
  const locale = getCurrentLocale();
  const navigate = useNavigate();
  const [loadResult, setLoadResult] = useState<PostLoadResult | null>(null);
  const [editorMode, setEditorMode] = useState<"editor" | "source" | "preview">("editor");
  const [editorState, setEditorState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [fallbackPublishedAtIso] = useState(() =>
    new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  );

  useEffect(() => {
    if (!postId) {
      return;
    }

    let ignore = false;

    void fetch(`/api/posts/${encodeURIComponent(postId)}?lang=${locale}`)
      .then(async (response) => {
        if (response.status === 404) {
          return { state: "not-found" as const };
        }

        if (!response.ok) {
          return { state: "error" as const };
        }

        const payload = (await response.json()) as { data?: Post };

        return payload.data
          ? { state: "ready" as const, post: payload.data }
          : { state: "error" as const };
      })
      .then((result) => {
        if (ignore) {
          return;
        }

        if (result.state === "ready" && "post" in result) {
          setLoadResult({ postId, state: "ready", post: result.post });
          setMarkdown(result.post.contentMarkdown);
          setEditorState("idle");
          return;
        }

        setLoadResult({ postId, state: result.state });
      })
      .catch(() => {
        if (!ignore) {
          setLoadResult({ postId, state: "error" });
        }
      });

    return () => {
      ignore = true;
    };
  }, [locale, postId]);

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
        coverImage: formData.get("coverImage"),
        seoTitle: formData.get("seoTitle"),
        seoDescription: formData.get("seoDescription"),
        contentMarkdown: markdown,
        status,
        publishedAt:
          typeof publishedAtValue === "string" ? datetimeLocalToIso(publishedAtValue) : undefined,
        featured: formData.get("featured") === "on",
        pinned: formData.get("pinned") === "on",
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

    setMarkdown(payload.data.contentMarkdown);
    setEditorState("saved");

    if (postId) {
      setLoadResult({ postId, state: "ready", post: payload.data });
    } else {
      void navigate({
        to: "/admin/posts/$postId",
        params: { postId: payload.data.id },
        replace: true,
      });
    }
  };

  const currentLoadResult = postId && loadResult?.postId === postId ? loadResult : null;
  const editingPost =
    currentLoadResult?.state === "ready" && "post" in currentLoadResult
      ? currentLoadResult.post
      : null;
  const loadState = postId ? (currentLoadResult?.state ?? "loading") : "ready";
  const pageTitle = postId ? m.admin_editor_edit_title() : m.admin_new_post();

  return (
    <section className="grid gap-5">
      <AdminPageHeader
        title={pageTitle}
        description={m.admin_editor_description()}
        actions={
          <Button
            render={<Link to="/admin/posts" />}
            nativeButton={false}
            size="sm"
            variant="ghost"
          >
            <ArrowLeftIcon />
            {m.admin_nav_posts()}
          </Button>
        }
      />

      {loadState === "loading" ? (
        <div
          aria-label={locale === "zh" ? "正在加载文章" : "Loading post"}
          className={`${adminPanelClassName} h-96 animate-pulse`}
        />
      ) : null}

      {loadState === "error" ? (
        <p className={`${adminPanelClassName} text-sm text-destructive`}>
          {m.admin_editor_error()}
        </p>
      ) : null}

      {loadState === "not-found" ? (
        <p className={`${adminPanelClassName} text-sm text-muted-foreground`}>
          {locale === "zh" ? "找不到这篇文章。" : "Post not found."}
        </p>
      ) : null}

      {loadState === "ready" ? (
        <PostForm
          editingPost={editingPost}
          editorMode={editorMode}
          editorState={editorState}
          markdown={markdown}
          fallbackPublishedAtIso={fallbackPublishedAtIso}
          onEditorModeChange={setEditorMode}
          onMarkdownChange={setMarkdown}
          onSubmit={handleEditorSubmit}
        />
      ) : null}
    </section>
  );
}

function parseTagNames(value: string) {
  return value
    .split(/[,\n]/)
    .map((name) => name.trim())
    .filter(Boolean);
}

function datetimeLocalToIso(value: string) {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}
