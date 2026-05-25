import { assets, type Asset } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { createFileRoute } from "@tanstack/react-router";
import { UploadIcon } from "lucide-react";
import { useEffect, useState, type ComponentProps } from "react";

import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/admin/assets")({
  component: AdminAssetsPage,
});

type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;

function AdminAssetsPage() {
  const [state, setState] = useState<"idle" | "uploading" | "uploaded" | "error">("idle");
  const [rows, setRows] = useState<Asset[]>(assets);

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
    setState("uploading");

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/assets", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      setState("error");
      return;
    }

    const payload = (await response.json()) as { data: Asset };
    setRows((current) => [payload.data, ...current]);
    setState("uploaded");
    event.currentTarget.reset();
  };

  return (
    <section className="grid gap-6">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg border border-[#26312c]/10 bg-white p-6 dark:border-white/10 dark:bg-[#171d1a]"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold tracking-normal">{m.admin_assets_title()}</h1>
            <p className="mt-2 text-sm text-[#64716a] dark:text-[#aeb8b1]">
              {m.admin_assets_description()}
            </p>
          </div>
          <Button type="submit" disabled={state === "uploading"}>
            <UploadIcon />
            {state === "uploading" ? m.admin_assets_uploading() : m.upload()}
          </Button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="asset-filename">{m.admin_assets_filename()}</Label>
            <Input id="asset-filename" name="file" type="file" accept="image/*" required />
          </div>
        </div>
        {state === "uploaded" ? (
          <p className="mt-3 text-sm text-[#1f6f5b] dark:text-[#75c5ad]">
            {m.admin_assets_uploaded()}
          </p>
        ) : null}
        {state === "error" ? (
          <p className="mt-3 text-sm text-destructive">{m.admin_assets_error()}</p>
        ) : null}
      </form>

      <div className="rounded-lg border border-[#26312c]/10 bg-white p-6 dark:border-white/10 dark:bg-[#171d1a]">
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rows.map((asset) => (
            <article
              key={asset.id}
              className="rounded-lg border border-[#26312c]/10 bg-[#f8f5ef] p-4 dark:border-white/10 dark:bg-white/5"
            >
              <img src={asset.url} alt="" className="h-36 w-full rounded-md object-cover" />
              <p className="mt-3 truncate font-medium">{asset.filename}</p>
              <p className="mt-1 text-xs text-[#64716a] dark:text-[#aeb8b1]">{asset.contentType}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
