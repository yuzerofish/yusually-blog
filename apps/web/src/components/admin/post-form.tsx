import { type Asset, type Post, renderMarkdownToHtml } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { CalendarClockIcon, Code2Icon, EyeIcon, PencilLineIcon } from "lucide-react";
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
      className={`${adminPanelClassName} grid gap-6 lg:p-6`}
    >
      <div className="grid gap-4 border-b border-border/80 pb-5 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
        <div className="grid min-w-0 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="editor-title">{m.admin_posts_column_title()}</Label>
            <Input
              id="editor-title"
              name="title"
              required
              defaultValue={editingPost?.title ?? m.admin_editor_default_title()}
              className="h-12 text-lg font-semibold md:text-lg"
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
        </div>
        <div className="flex flex-wrap gap-2 xl:justify-end">
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

      <div className="grid gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant={editorMode === "editor" ? "default" : "outline"}
              onClick={() => onEditorModeChange("editor")}
            >
              <PencilLineIcon />
              {m.admin_editor_rich_mode()}
            </Button>
            <Button
              type="button"
              variant={editorMode === "source" ? "default" : "outline"}
              onClick={() => onEditorModeChange("source")}
            >
              <Code2Icon />
              {m.admin_editor_source_mode()}
            </Button>
            <Button
              type="button"
              variant={editorMode === "preview" ? "default" : "outline"}
              onClick={() => onEditorModeChange("preview")}
            >
              <EyeIcon />
              {m.admin_editor_preview_mode()}
            </Button>
          </div>
          <div className="min-h-5 text-sm">
            {editorState === "saved" ? (
              <p className="text-success">{m.admin_editor_saved()}</p>
            ) : null}
            {editorState === "error" ? (
              <p className="text-destructive">{m.admin_editor_error()}</p>
            ) : null}
          </div>
        </div>

        {editorMode === "editor" && !mounted ? (
          <div className="min-h-[560px] animate-pulse rounded-md border border-border bg-muted/55" />
        ) : null}

        {editorMode === "editor" && mounted ? (
          <Suspense fallback={<div className="min-h-[560px] animate-pulse rounded bg-muted" />}>
            <MdxEditorSurface
              value={markdown}
              onChange={onMarkdownChange}
              className="min-h-[560px]"
              editorClassName="min-h-[560px]"
              contentEditableClassName="min-h-[500px] px-5 py-5 text-base leading-8"
            />
          </Suspense>
        ) : null}

        {editorMode === "source" ? (
          <textarea
            value={markdown}
            onChange={(event) => onMarkdownChange(event.target.value)}
            className={`${adminTextareaClassName} min-h-[560px] resize-y font-mono leading-6 focus-visible:ring-[3px] focus-visible:ring-ring/50`}
          />
        ) : null}

        {editorMode === "preview" ? (
          <div
            className="prose prose-neutral prose-a:text-link dark:prose-invert min-h-[560px] max-w-none rounded-md border border-border bg-muted/45 p-5"
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        ) : null}
      </div>

      <div className="grid gap-4 border-t border-border/80 pt-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="grid gap-2">
          <Label htmlFor="editor-cover-image">{m.admin_editor_cover_image()}</Label>
          <input
            id="editor-cover-image"
            name="coverImage"
            value={coverImage}
            onChange={(event) => setCoverImage(event.currentTarget.value)}
            placeholder="/uploads/cover.jpg"
            className={adminInputClassName}
            suppressHydrationWarning
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
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 md:col-span-2">
          <label className="flex min-h-9 items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="commentsEnabled"
              defaultChecked={editingPost?.commentsEnabled ?? true}
              className="size-4 rounded border-input"
            />
            {m.admin_editor_comments_enabled()}
          </label>
          <label className="flex min-h-9 items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="pinned"
              defaultChecked={editingPost?.pinned ?? false}
              className="size-4 rounded border-input"
            />
            {m.admin_editor_pinned()}
          </label>
          <label className="flex min-h-9 items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={editingPost?.featured ?? false}
              className="size-4 rounded border-input"
            />
            {m.admin_editor_featured()}
          </label>
        </div>
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
