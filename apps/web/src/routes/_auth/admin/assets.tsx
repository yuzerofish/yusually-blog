import { assets, type Asset } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { createFileRoute } from "@tanstack/react-router";
import { CheckIcon, CopyIcon, Trash2Icon, UploadIcon } from "lucide-react";
import { useEffect, useState, type ComponentProps, type DragEventHandler } from "react";

import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/admin/assets")({
  component: AdminAssetsPage,
});

type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;

function AdminAssetsPage() {
  const [state, setState] = useState<"idle" | "uploading" | "uploaded" | "error">("idle");
  const [rows, setRows] = useState<Asset[]>(assets);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedAssetId, setCopiedAssetId] = useState<string | null>(null);

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
    await navigator.clipboard
      .writeText(new URL(asset.url, window.location.origin).toString())
      .catch(() => undefined);
    setCopiedAssetId(asset.id);
  };

  const deleteAsset = async (asset: Asset) => {
    const response = await fetch(`/api/assets/${asset.id}`, { method: "DELETE" });

    if (!response.ok) {
      return;
    }

    setRows((current) => current.filter((row) => row.id !== asset.id));
  };

  return (
    <section className="grid gap-6">
      <form
        onSubmit={handleSubmit}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`rounded-lg border bg-card p-6 shadow-xs ${
          isDragging ? "border-link ring-3 ring-link/15" : "border-border/80"
        }`}
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold">{m.admin_assets_title()}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{m.admin_assets_description()}</p>
          </div>
          <Button type="submit" disabled={state === "uploading"}>
            <UploadIcon />
            {state === "uploading" ? m.admin_assets_uploading() : m.upload()}
          </Button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="asset-filename">{m.admin_assets_filename()}</Label>
            <Input id="asset-filename" name="file" type="file" accept="image/*" multiple />
            <p className="text-sm text-muted-foreground">{m.admin_assets_drop_hint()}</p>
          </div>
        </div>
        {state === "uploaded" ? (
          <p className="mt-3 text-sm text-success">{m.admin_assets_uploaded()}</p>
        ) : null}
        {state === "error" ? (
          <p className="mt-3 text-sm text-destructive">{m.admin_assets_error()}</p>
        ) : null}
      </form>

      <div className="rounded-lg border border-border/80 bg-card p-6 shadow-xs">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rows.map((asset) => (
            <article key={asset.id} className="rounded-lg border border-border bg-muted/45 p-4">
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
                  {copiedAssetId === asset.id ? <CheckIcon /> : <CopyIcon />}
                  {copiedAssetId === asset.id ? m.admin_assets_copied() : m.admin_assets_copy_url()}
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
        </div>
      </div>
    </section>
  );
}

function isUploadFile(value: FormDataEntryValue): value is File {
  return value instanceof File && value.size > 0;
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
