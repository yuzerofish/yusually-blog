import type { Asset } from "@repo/core";
import { env } from "cloudflare:workers";

import { createD1Asset } from "#/lib/cms-d1";

type AssetUploadInput = {
  filename: string;
  contentType: string;
  data: ArrayBuffer | Uint8Array | Blob;
  attachedPostId?: string | null;
};

export async function readAssetUpload(request: Request): Promise<AssetUploadInput> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      throw new Error("Upload requires a file field.");
    }

    return {
      filename: file.name,
      contentType: file.type || "application/octet-stream",
      data: file,
      attachedPostId: valueOrNull(formData.get("attachedPostId")),
    };
  }

  const body = (await request.json().catch(() => ({}))) as Partial<{
    filename: string;
    contentType: string;
    contentBase64: string;
    dataUrl: string;
    attachedPostId: string | null;
  }>;

  const parsedDataUrl = body.dataUrl ? parseDataUrl(body.dataUrl) : undefined;
  const contentBase64 = parsedDataUrl?.contentBase64 ?? body.contentBase64;

  if (!contentBase64) {
    throw new Error("Upload requires contentBase64, dataUrl, or multipart file data.");
  }

  return {
    filename: body.filename?.trim() || "upload.bin",
    contentType:
      parsedDataUrl?.contentType ?? body.contentType?.trim() ?? "application/octet-stream",
    data: decodeBase64(contentBase64),
    attachedPostId: body.attachedPostId ?? null,
  };
}

export async function uploadAssetToR2(input: AssetUploadInput) {
  const filename = safeFilename(input.filename);
  const key = objectKey("uploads", filename);
  const url = `/uploads/${key.replace(/^uploads\//, "")}`;
  const sizeBytes = await byteLength(input.data);

  await env.CMS_ASSETS.put(key, input.data, {
    httpMetadata: {
      contentType: input.contentType,
      cacheControl: "public, max-age=31536000, immutable",
    },
  });

  return createD1Asset({
    key,
    url,
    filename,
    contentType: input.contentType,
    sizeBytes,
    attachedPostId: input.attachedPostId,
  });
}

export async function getR2Asset(key: string) {
  return env.CMS_ASSETS.get(key);
}

export async function storeImportPackage(input: {
  filename: string;
  contentType: string;
  contentBase64?: string;
  attachedPostId?: string | null;
}) {
  const filename = safeFilename(input.filename);
  const key = objectKey("imports", filename);
  const data = input.contentBase64 ? decodeBase64(input.contentBase64) : new Uint8Array();

  await env.CMS_BACKUPS.put(key, data, {
    httpMetadata: {
      contentType: input.contentType,
    },
  });

  return {
    id: `asset_${crypto.randomUUID()}`,
    key,
    url: `r2://CMS_BACKUPS/${key}`,
    filename,
    contentType: input.contentType,
    sizeBytes: data.byteLength,
    attachedPostId: input.attachedPostId ?? null,
    createdAt: new Date().toISOString(),
  } satisfies Asset;
}

export async function storeExportBackup(payload: unknown) {
  const content = JSON.stringify(payload, null, 2);
  const createdAt = new Date().toISOString();
  const key = objectKey("exports", `cloud-blog-cms-${createdAt.replace(/[:.]/g, "-")}.json`);

  await env.CMS_BACKUPS.put(key, content, {
    httpMetadata: {
      contentType: "application/json; charset=utf-8",
    },
  });

  return {
    key,
    url: `r2://CMS_BACKUPS/${key}`,
    contentType: "application/json",
    sizeBytes: new TextEncoder().encode(content).byteLength,
    createdAt,
  };
}

export async function storeExportZipBackup(data: Uint8Array, filename: string) {
  const createdAt = new Date().toISOString();
  const key = objectKey("exports", filename);

  await env.CMS_BACKUPS.put(key, data, {
    httpMetadata: {
      contentType: "application/zip",
    },
  });

  return {
    key,
    url: `r2://CMS_BACKUPS/${key}`,
    contentType: "application/zip",
    sizeBytes: data.byteLength,
    createdAt,
  };
}

export async function pruneExportBackups(retentionDays: number) {
  const cutoff = Date.now() - retentionDays * 24 * 60 * 60 * 1000;
  const deletedKeys: string[] = [];
  let cursor: string | undefined;

  do {
    const result = await env.CMS_BACKUPS.list({
      prefix: "exports/",
      cursor,
      limit: 100,
    });

    for (const object of result.objects) {
      if (object.uploaded.getTime() >= cutoff) {
        continue;
      }

      await env.CMS_BACKUPS.delete(object.key);
      deletedKeys.push(object.key);
    }

    cursor = result.truncated ? result.cursor : undefined;
  } while (cursor);

  return { deletedKeys, retentionDays };
}

function objectKey(prefix: "uploads" | "imports" | "exports", filename: string) {
  const now = new Date();
  const yyyy = String(now.getUTCFullYear());
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  return `${prefix}/${yyyy}/${mm}/${crypto.randomUUID()}-${filename}`;
}

function safeFilename(filename: string) {
  const lastSegment = filename.split(/[\\/]/).pop() || "upload.bin";
  return lastSegment
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function parseDataUrl(value: string) {
  const match = /^data:([^;,]+)?;base64,(.+)$/i.exec(value);

  if (!match) {
    return undefined;
  }

  return {
    contentType: match[1] || "application/octet-stream",
    contentBase64: match[2],
  };
}

function decodeBase64(value: string) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

async function byteLength(data: ArrayBuffer | Uint8Array | Blob) {
  if (data instanceof Blob) {
    return data.size;
  }

  return data.byteLength;
}

function valueOrNull(value: FormDataEntryValue | null) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}
