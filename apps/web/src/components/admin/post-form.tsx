import { type Asset, type Post, renderMarkdownToHtml } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { CalendarClockIcon } from "lucide-react";
import {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ComponentProps,
} from "react";

import {
  adminInputClassName,
  adminPanelClassName,
  adminSelectClassName,
  adminTextareaClassName,
} from "#/components/admin/admin-ui";
import { m } from "#/paraglide/messages.js";

const MdxEditorSurface = lazy(() =>
  import("#/components/mdx-editor-surface").then((m) => ({ default: m.MdxEditorSurface })),
);

type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;

interface PostFormProps {
  editingPost: Post | null;
  editorMode: "editor" | "source" | "preview";
  editorState: "idle" | "saving" | "saved" | "error";
  markdown: string;
  fallbackPublishedAtIso: string;
  onEditorModeChange: (mode: "editor" | "source" | "preview") => void;
  onMarkdownChange: (markdown: string) => void;
  onSubmit: FormSubmitHandler;
}

export function PostForm({
  editingPost,
  editorMode,
  editorState,
  markdown,
  fallbackPublishedAtIso,
  onEditorModeChange,
  onMarkdownChange,
  onSubmit,
}: PostFormProps) {
  const [assetRows, setAssetRows] = useState<Asset[]>([]);
  const [coverImage, setCoverImage] = useState(editingPost?.coverImage ?? "");
  const mounted = useClientMounted();
  const previewHtml = useMemo(() => renderMarkdownToHtml(markdown), [markdown]);
  const imageAssets = useMemo(
    () => assetRows.filter((asset) => asset.contentType.startsWith("image/")),
    [assetRows],
  );

  useEffect(() => {
    let ignore = false;

    void fetch("/api/assets")
      .then((response) => (response.ok ? response.json() : undefined))
      .then((payload) => {
        const data = (payload as { data?: Asset[] } | undefined)?.data;

        if (!ignore && data) {
          setAssetRows(data);
        }
      })
      .catch(() => undefined);

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <form
      key={editingPost?.id ?? "new-post"}
      id="post-editor"
      onSubmit={onSubmit}
      className={`${adminPanelClassName} grid gap-5`}
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-base font-semibold">
            {editingPost ? m.admin_editor_edit_title() : m.admin_editor_title()}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{m.admin_editor_description()}</p>
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

      <div className="grid gap-5 lg:grid-cols-[0.42fr_0.58fr]">
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
            <Label htmlFor="editor-cover-image">{m.admin_editor_cover_image()}</Label>
            <input
              id="editor-cover-image"
              name="coverImage"
              value={coverImage}
              onChange={(event) => setCoverImage(event.currentTarget.value)}
              placeholder="/uploads/cover.jpg"
              className={adminInputClassName}
            />
          </div>
          {imageAssets.length ? (
            <div className="grid gap-2">
              <Label htmlFor="editor-cover-asset">{m.admin_editor_cover_asset()}</Label>
              <select
                id="editor-cover-asset"
                value=""
                onChange={(event) => {
                  const nextCoverImage = event.currentTarget.value;

                  if (nextCoverImage) {
                    setCoverImage(nextCoverImage);
                  }
                }}
                className={adminSelectClassName}
              >
                <option value="">{m.admin_editor_cover_asset_placeholder()}</option>
                {imageAssets.map((asset) => (
                  <option key={asset.id} value={asset.url}>
                    {asset.filename}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
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
          <div className="grid gap-2 rounded-md border border-border bg-muted/35 p-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="pinned"
                defaultChecked={editingPost?.pinned ?? false}
                className="size-4 rounded border-input"
              />
              {m.admin_editor_pinned()}
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={editingPost?.featured ?? false}
                className="size-4 rounded border-input"
              />
              {m.admin_editor_featured()}
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant={editorMode === "editor" ? "default" : "outline"}
              onClick={() => onEditorModeChange("editor")}
            >
              {m.admin_editor_rich_mode()}
            </Button>
            <Button
              type="button"
              variant={editorMode === "source" ? "default" : "outline"}
              onClick={() => onEditorModeChange("source")}
            >
              {m.admin_editor_source_mode()}
            </Button>
            <Button
              type="button"
              variant={editorMode === "preview" ? "default" : "outline"}
              onClick={() => onEditorModeChange("preview")}
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

        {editorMode === "editor" && !mounted ? (
          <div className="h-96 animate-pulse rounded-md border border-border bg-muted/55" />
        ) : null}

        {editorMode === "editor" && mounted ? (
          <Suspense fallback={<div className="h-64 animate-pulse rounded bg-muted" />}>
            <MdxEditorSurface value={markdown} onChange={onMarkdownChange} />
          </Suspense>
        ) : null}

        {editorMode === "source" ? (
          <textarea
            value={markdown}
            onChange={(event) => onMarkdownChange(event.target.value)}
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
  );
}

function toDatetimeLocal(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
}

function useClientMounted() {
  return useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
}
