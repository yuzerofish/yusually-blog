import "@tanstack/react-start/server-only";
import {
  htmlToText,
  markdownToText,
  renderMarkdownToHtml,
  sanitizeHtml,
  type CmsPage,
  slugify,
} from "@repo/core";
import * as schema from "@repo/db/schema/cms";
import { eq, and, or, desc } from "drizzle-orm";

import {
  MAX_SEO_DESCRIPTION_LENGTH,
  type PageInput,
  drizzleRowToPage,
  entityVisibilityFilter,
  normalizeContentRecordStatus,
} from "./cms-d1-shared";
import { getCmsDb } from "./cms-db";

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

export async function listD1Pages({ includeUnpublished = false } = {}) {
  const db = getCmsDb();
  const rows = await db
    .select()
    .from(schema.pages)
    .where(entityVisibilityFilter(schema.pages, includeUnpublished))
    .orderBy(desc(schema.pages.updatedAt));

  return rows.map(drizzleRowToPage);
}

export async function getD1PageBySlug(slug: string, includeUnpublished = false) {
  const db = getCmsDb();
  const rows = await db
    .select()
    .from(schema.pages)
    .where(
      and(eq(schema.pages.slug, slug), entityVisibilityFilter(schema.pages, includeUnpublished)),
    )
    .limit(1);

  return rows[0] ? drizzleRowToPage(rows[0]) : undefined;
}

export async function getD1PageByIdOrSlug(idOrSlug: string, includeUnpublished = true) {
  const db = getCmsDb();
  const rows = await db
    .select()
    .from(schema.pages)
    .where(
      and(
        or(eq(schema.pages.id, idOrSlug), eq(schema.pages.slug, idOrSlug)),
        entityVisibilityFilter(schema.pages, includeUnpublished),
      ),
    )
    .limit(1);

  return rows[0] ? drizzleRowToPage(rows[0]) : undefined;
}

export async function createD1Page(input: PageInput) {
  const title = input.title?.trim() || "Untitled page";
  const slug = await uniqueD1PageSlug(input.slug?.trim() || slugify(title));
  const now = new Date().toISOString();
  const contentMarkdown = input.contentMarkdown?.trim() || `# ${title}\n`;
  const contentHtml = input.contentHtml
    ? sanitizeHtml(input.contentHtml)
    : renderMarkdownToHtml(contentMarkdown);
  const status = normalizeContentRecordStatus(input.status, "draft");
  const page: CmsPage = {
    id: `page_${crypto.randomUUID()}`,
    title,
    slug,
    contentMarkdown,
    contentHtml,
    status,
    seoTitle: input.seoTitle?.trim() || title,
    seoDescription:
      input.seoDescription?.trim() ||
      markdownToText(contentMarkdown).slice(0, MAX_SEO_DESCRIPTION_LENGTH),
    createdAt: now,
    updatedAt: now,
    i18n: input.i18n,
  };

  if (input.locale === "zh") {
    page.i18n = {
      ...page.i18n,
      title: { ...page.i18n?.title, zh: title },
      contentMarkdown: { ...page.i18n?.contentMarkdown, zh: contentMarkdown },
      contentHtml: { ...page.i18n?.contentHtml, zh: contentHtml },
      seoTitle: { ...page.i18n?.seoTitle, zh: page.seoTitle },
      seoDescription: { ...page.i18n?.seoDescription, zh: page.seoDescription },
    };
  }

  const db = getCmsDb();
  await db.insert(schema.pages).values({
    id: page.id,
    title: page.title,
    slug: page.slug,
    contentMarkdown: page.contentMarkdown,
    contentHtml: page.contentHtml,
    status: page.status,
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    i18n: page.i18n ?? null,
    createdAt: page.createdAt,
    updatedAt: page.updatedAt,
  });

  return (await getD1PageByIdOrSlug(page.id)) ?? page;
}

export async function updateD1Page(idOrSlug: string, input: PageInput) {
  const page = await getD1PageByIdOrSlug(idOrSlug);

  if (!page) {
    return undefined;
  }

  const localizedUpdate = input.locale === "zh";
  const inputTitle = input.title?.trim();
  const inputMarkdown = input.contentMarkdown?.trim();
  const inputHtml = input.contentHtml !== undefined ? sanitizeHtml(input.contentHtml) : undefined;
  const title = localizedUpdate ? page.title : inputTitle || page.title;
  const contentMarkdown = localizedUpdate
    ? page.contentMarkdown
    : (inputMarkdown ?? page.contentMarkdown);
  const contentHtml = localizedUpdate
    ? page.contentHtml
    : inputHtml !== undefined
      ? inputHtml
      : inputMarkdown !== undefined
        ? renderMarkdownToHtml(contentMarkdown)
        : page.contentHtml;
  const i18n = buildPageI18n(page, input, {
    contentHtml: inputHtml,
    contentMarkdown: inputMarkdown,
    title: inputTitle,
  });
  const seoTitle = localizedUpdate ? page.seoTitle : input.seoTitle?.trim() || title;
  const seoDescription = localizedUpdate
    ? page.seoDescription
    : input.seoDescription !== undefined
      ? input.seoDescription.trim()
      : page.seoDescription;
  const now = new Date().toISOString();

  const db = getCmsDb();
  await db
    .update(schema.pages)
    .set({
      title,
      contentMarkdown,
      contentHtml,
      status: normalizeContentRecordStatus(input.status, page.status),
      seoTitle,
      seoDescription,
      i18n: i18n ?? null,
      updatedAt: now,
    })
    .where(eq(schema.pages.id, page.id));

  return getD1PageByIdOrSlug(page.id);
}

export async function deleteD1Page(idOrSlug: string) {
  const page = await getD1PageByIdOrSlug(idOrSlug);

  if (!page) {
    return undefined;
  }

  const now = new Date().toISOString();
  const db = getCmsDb();

  await db
    .update(schema.pages)
    .set({ status: "deleted", updatedAt: now })
    .where(eq(schema.pages.id, page.id));

  return {
    ...page,
    status: "deleted" as const,
    updatedAt: now,
  };
}

// ---------------------------------------------------------------------------
// i18n builder (private to pages)
// ---------------------------------------------------------------------------

function buildPageI18n(
  page: CmsPage,
  input: PageInput,
  normalized: {
    contentHtml?: string;
    contentMarkdown?: string;
    title?: string;
  },
) {
  if (input.i18n) {
    return input.i18n;
  }

  if (input.locale !== "zh") {
    return page.i18n ?? null;
  }

  const next = { ...page.i18n };
  const localizedHtml =
    normalized.contentHtml ??
    (normalized.contentMarkdown !== undefined
      ? renderMarkdownToHtml(normalized.contentMarkdown)
      : undefined);
  const localizedText =
    normalized.contentHtml !== undefined
      ? htmlToText(normalized.contentHtml)
      : normalized.contentMarkdown !== undefined
        ? markdownToText(normalized.contentMarkdown)
        : undefined;

  if (normalized.title !== undefined) {
    next.title = { ...next.title, zh: normalized.title };
  }

  if (normalized.contentMarkdown !== undefined) {
    next.contentMarkdown = { ...next.contentMarkdown, zh: normalized.contentMarkdown };
  }

  if (localizedHtml !== undefined) {
    next.contentHtml = { ...next.contentHtml, zh: localizedHtml };
  }

  if (input.seoTitle !== undefined || normalized.title !== undefined) {
    next.seoTitle = {
      ...next.seoTitle,
      zh: input.seoTitle?.trim() || normalized.title || page.seoTitle,
    };
  }

  if (input.seoDescription !== undefined || localizedText !== undefined) {
    next.seoDescription = {
      ...next.seoDescription,
      zh: input.seoDescription?.trim() || localizedText || page.seoDescription,
    };
  }

  return next;
}

// ---------------------------------------------------------------------------
// Slug uniqueness
// ---------------------------------------------------------------------------

async function uniqueD1PageSlug(base: string) {
  const normalized = base || "untitled-page";
  let candidate = normalized;
  let index = 2;

  while (await getD1PageBySlug(candidate, true)) {
    candidate = `${normalized}-${index}`;
    index += 1;
  }

  return candidate;
}
