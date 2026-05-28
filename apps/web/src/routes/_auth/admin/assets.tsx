import type { Asset } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Label } from "@repo/ui/components/label";
import { createFileRoute } from "@tanstack/react-router";
import { CheckIcon, CopyIcon, FileTextIcon, Trash2Icon, UploadIcon } from "lucide-react";
import { useEffect, useState, type ComponentProps, type DragEventHandler } from "react";

import {
  AdminPageHeader,
  AdminPanel,
  adminInputClassName,
  adminPanelClassName,
} from "#/components/admin/admin-ui";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/admin/assets")({
  component: AdminAssetsPage,
});

type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;

function AdminAssetsPage() {
  const [state, setState] = useState<"idle" | "uploading" | "uploaded" | "error">("idle");
  const [rows, setRows] = useState<Asset[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [query, setQuery] = useState("");
  const [copiedAsset, setCopiedAsset] = useState<{
    id: string;
    type: "markdown" | "url";
  } | null>(null);

  useEffect(() => {
    let ignore = false;

    void fetch("/api/assets")
      .then((response) => (response.ok ? response.json() : undefined))
      .then((payload) => {
        const data = (payload as { data?: Asset[] } | undefined)?.data;

        if (!ignore && data) {
          setRows(data);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleSubmit: FormSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    await uploadFiles(formData.getAll("file").filter(isUploadFile));
    event.currentTarget.reset();
  };

  const uploadFiles = async (files: File[]) => {
    if (!files.length) {
      setState("error");
      return;
    }

    setState("uploading");
    const uploadedAssets: Asset[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/assets", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setState("error");
        return;
      }

      const payload = (await response.json()) as { data: Asset };
      uploadedAssets.push(payload.data);
    }

    setRows((current) => [...uploadedAssets, ...current]);
    setState("uploaded");
  };

  const handleDragOver: DragEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDrop: DragEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setIsDragging(false);

    void uploadFiles(Array.from(event.dataTransfer.files).filter((file) => file.type));
  };

  const copyAssetUrl = async (asset: Asset) => {
    await navigator.clipboard.writeText(getAbsoluteAssetUrl(asset.url)).catch(() => undefined);
    setCopiedAsset({ id: asset.id, type: "url" });
  };

  const copyAssetMarkdown = async (asset: Asset) => {
    await navigator.clipboard
      .writeText(`![${asset.filename}](${getAbsoluteAssetUrl(asset.url)})`)
      .catch(() => undefined);
    setCopiedAsset({ id: asset.id, type: "markdown" });
  };

  const deleteAsset = async (asset: Asset) => {
    const response = await fetch(`/api/assets/${asset.id}`, { method: "DELETE" });

    if (!response.ok) {
      return;
    }

    setRows((current) => current.filter((row) => row.id !== asset.id));
  };

  const normalizedQuery = query.trim().toLowerCase();
  const visibleRows = normalizedQuery
    ? rows.filter((asset) =>
        [asset.filename, asset.contentType, asset.key].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        ),
      )
    : rows;

  return (
    <section className="grid gap-5">
      <AdminPageHeader title={m.admin_assets_title()} description={m.admin_assets_description()} />

      <form
        onSubmit={handleSubmit}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`${adminPanelClassName} ${
          isDragging ? "border-link ring-3 ring-link/15" : "border-border/80"
        }`}
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-base font-semibold">{m.upload()}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{m.admin_assets_drop_hint()}</p>
          </div>
          <Button type="submit" disabled={state === "uploading"}>
            <UploadIcon />
            {state === "uploading" ? m.admin_assets_uploading() : m.upload()}
          </Button>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="asset-filename">{m.admin_assets_filename()}</Label>
            <input
              id="asset-filename"
              name="file"
              type="file"
              accept="image/*"
              multiple
              className={adminInputClassName}
              suppressHydrationWarning
            />
          </div>
        </div>
        {state === "uploaded" ? (
          <p className="mt-3 text-sm text-success">{m.admin_assets_uploaded()}</p>
        ) : null}
        {state === "error" ? (
          <p className="mt-3 text-sm text-destructive">{m.admin_assets_error()}</p>
        ) : null}
      </form>

      <AdminPanel>
        <div className="mb-4 grid gap-2 md:max-w-xs">
          <Label htmlFor="asset-search">{m.admin_assets_search()}</Label>
          <input
            id="asset-search"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder={m.admin_assets_search_placeholder()}
            className={adminInputClassName}
            suppressHydrationWarning
          />
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {visibleRows.map((asset) => (
            <article key={asset.id} className="rounded-md border border-border bg-muted/45 p-3">
              <img src={asset.url} alt="" className="h-36 w-full rounded-md object-cover" />
              <p className="mt-3 truncate font-medium">{asset.filename}</p>
              <p className="mt-1 text-xs text-muted-foreground">{asset.contentType}</p>
              <p className="mt-1 text-xs text-muted-foreground">{formatBytes(asset.sizeBytes)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => void copyAssetUrl(asset)}
                >
                  {copiedAsset?.id === asset.id && copiedAsset.type === "url" ? (
                    <CheckIcon />
                  ) : (
                    <CopyIcon />
                  )}
                  {copiedAsset?.id === asset.id && copiedAsset.type === "url"
                    ? m.admin_assets_copied()
                    : m.admin_assets_copy_url()}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => void copyAssetMarkdown(asset)}
                >
                  {copiedAsset?.id === asset.id && copiedAsset.type === "markdown" ? (
                    <CheckIcon />
                  ) : (
                    <FileTextIcon />
                  )}
                  {copiedAsset?.id === asset.id && copiedAsset.type === "markdown"
                    ? m.admin_assets_markdown_copied()
                    : m.admin_assets_copy_markdown()}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={() => void deleteAsset(asset)}
                >
                  <Trash2Icon />
                  {m.admin_assets_delete()}
                </Button>
              </div>
            </article>
          ))}
          {rows.length === 0 ? (
            <p className="text-sm text-muted-foreground">{m.admin_assets_empty()}</p>
          ) : null}
          {rows.length > 0 && visibleRows.length === 0 ? (
            <p className="text-sm text-muted-foreground">{m.admin_assets_no_matches()}</p>
          ) : null}
        </div>
      </AdminPanel>
    </section>
  );
}

function isUploadFile(value: FormDataEntryValue): value is File {
  return value instanceof File && value.size > 0;
}

function getAbsoluteAssetUrl(url: string) {
  return new URL(url, window.location.origin).toString();
}

function formatBytes(value: number) {
  if (value < 1024) {
    return `${value} B`;
  }

  if (value < 1024 * 1024) {
    return `${(value / 1024).toFixed(1)} KB`;
  }

  return `${(value / 1024 / 1024).toFixed(1)} MB`;
}
