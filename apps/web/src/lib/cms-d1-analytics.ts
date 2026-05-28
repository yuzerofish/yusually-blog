import "@tanstack/react-start/server-only";
import * as schema from "@repo/db/schema/cms";
import { env } from "cloudflare:workers";
import { and, asc, desc, eq, gte, inArray, isNotNull, ne, sql } from "drizzle-orm";

import type { AnalyticsDayMetric, AnalyticsOverview } from "./analytics-types";
import { getCmsDb } from "./cms-db";
import { getClientIp } from "./comment-guard";

const ANALYTICS_DEFAULT_DAYS = 7;
const ANALYTICS_MAX_DAYS = 30;
const MAX_PATH_LENGTH = 300;
const MAX_SLUG_LENGTH = 180;
const MAX_REFERRER_HOST_LENGTH = 180;
const BOT_USER_AGENT_PATTERN =
  /bot|crawler|spider|preview|slurp|bingpreview|facebookexternalhit|whatsapp|telegrambot|curl|wget|python-requests|uptime|monitor/i;

type TrackAnalyticsInput = {
  path: string;
  postSlug?: string | null;
  referrer?: string | null;
  request: Request;
};

export async function trackD1PageView(input: TrackAnalyticsInput) {
  const path = normalizeAnalyticsPath(input.path);

  if (!path || shouldIgnoreAnalyticsRequest(input.request, path)) {
    return false;
  }

  const now = new Date();
  const occurredDate = toDateKey(now);
  const postSlug = normalizePostSlug(input.postSlug) ?? getPostSlugFromPath(path);
  const db = getCmsDb();

  await db.insert(schema.analyticsEvents).values({
    id: `view_${crypto.randomUUID()}`,
    eventType: "page_view",
    path,
    postSlug,
    referrerHost: normalizeReferrerHost(input.referrer, input.request.url),
    visitorHash: await createAnalyticsVisitorHash(input.request),
    occurredDate,
    occurredAt: now.toISOString(),
  });

  return true;
}

export async function getD1AnalyticsOverview(
  days = ANALYTICS_DEFAULT_DAYS,
): Promise<AnalyticsOverview> {
  const windowDays = Math.min(
    Math.max(Math.trunc(days) || ANALYTICS_DEFAULT_DAYS, 1),
    ANALYTICS_MAX_DAYS,
  );
  const todayDate = startOfUtcDay(new Date());
  const startDate = toDateKey(addUtcDays(todayDate, 1 - windowDays));
  const endDate = toDateKey(todayDate);
  const dateKeys = listDateKeys(startDate, endDate);
  const db = getCmsDb();

  const [totalsRow] = await db
    .select({
      views: sql<number>`count(*)`,
      visitors: sql<number>`count(distinct ${schema.analyticsEvents.visitorHash})`,
      postViews: sql<number>`coalesce(sum(case when ${schema.analyticsEvents.postSlug} is not null and ${schema.analyticsEvents.postSlug} <> '' then 1 else 0 end), 0)`,
    })
    .from(schema.analyticsEvents)
    .where(gte(schema.analyticsEvents.occurredDate, startDate));

  const dailyRows = await db
    .select({
      date: schema.analyticsEvents.occurredDate,
      views: sql<number>`count(*)`,
      visitors: sql<number>`count(distinct ${schema.analyticsEvents.visitorHash})`,
      postViews: sql<number>`coalesce(sum(case when ${schema.analyticsEvents.postSlug} is not null and ${schema.analyticsEvents.postSlug} <> '' then 1 else 0 end), 0)`,
    })
    .from(schema.analyticsEvents)
    .where(gte(schema.analyticsEvents.occurredDate, startDate))
    .groupBy(schema.analyticsEvents.occurredDate)
    .orderBy(asc(schema.analyticsEvents.occurredDate));

  const topPostRows = await db
    .select({
      slug: schema.analyticsEvents.postSlug,
      title: schema.posts.title,
      views: sql<number>`count(*)`,
      visitors: sql<number>`count(distinct ${schema.analyticsEvents.visitorHash})`,
    })
    .from(schema.analyticsEvents)
    .leftJoin(schema.posts, eq(schema.analyticsEvents.postSlug, schema.posts.slug))
    .where(
      and(
        gte(schema.analyticsEvents.occurredDate, startDate),
        isNotNull(schema.analyticsEvents.postSlug),
        ne(schema.analyticsEvents.postSlug, ""),
      ),
    )
    .groupBy(schema.analyticsEvents.postSlug, schema.posts.title)
    .orderBy(desc(sql`count(*)`))
    .limit(5);

  const topSlugs = topPostRows
    .map((row) => row.slug)
    .filter((slug): slug is string => typeof slug === "string" && slug.length > 0);
  const commentRows = topSlugs.length
    ? await db
        .select({
          slug: schema.posts.slug,
          comments: sql<number>`count(${schema.comments.id})`,
        })
        .from(schema.posts)
        .leftJoin(
          schema.comments,
          and(eq(schema.comments.postId, schema.posts.id), eq(schema.comments.status, "approved")),
        )
        .where(inArray(schema.posts.slug, topSlugs))
        .groupBy(schema.posts.slug)
    : [];
  const commentsBySlug = new Map(
    commentRows.map((row) => [row.slug, normalizeCount(row.comments)] as const),
  );
  const dailyByDate = new Map(
    dailyRows.map(
      (row) =>
        [
          row.date,
          {
            date: row.date,
            views: normalizeCount(row.views),
            visitors: normalizeCount(row.visitors),
            postViews: normalizeCount(row.postViews),
          },
        ] as const,
    ),
  );
  const daily = dateKeys.map((date) => dailyByDate.get(date) ?? emptyDayMetric(date));

  return {
    days: windowDays,
    startDate,
    endDate,
    totals: {
      views: normalizeCount(totalsRow?.views),
      visitors: normalizeCount(totalsRow?.visitors),
      postViews: normalizeCount(totalsRow?.postViews),
    },
    today: daily[daily.length - 1] ?? emptyDayMetric(endDate),
    yesterday: daily[daily.length - 2] ?? emptyDayMetric(startDate),
    daily,
    topPosts: topPostRows.map((row) => {
      const slug = row.slug ?? "";

      return {
        slug,
        title: row.title?.trim() || slug,
        views: normalizeCount(row.views),
        visitors: normalizeCount(row.visitors),
        comments: commentsBySlug.get(slug) ?? 0,
      };
    }),
  };
}

function normalizeAnalyticsPath(value: string) {
  const path = value.trim();

  if (!path.startsWith("/")) {
    return null;
  }

  return path.split("#")[0].slice(0, MAX_PATH_LENGTH);
}

function normalizePostSlug(value: string | null | undefined) {
  const slug = value?.trim();

  return slug ? slug.slice(0, MAX_SLUG_LENGTH) : null;
}

function getPostSlugFromPath(path: string) {
  const pathname = path.split("?")[0];
  const match = /^\/blog\/([^/?#]+)/.exec(pathname);

  return match ? decodeURIComponent(match[1]).slice(0, MAX_SLUG_LENGTH) : null;
}

function normalizeReferrerHost(value: string | null | undefined, requestUrl: string) {
  const referrer = value?.trim();

  if (!referrer) {
    return null;
  }

  try {
    const requestOrigin = new URL(requestUrl).origin;
    const referrerUrl = new URL(referrer);

    if (referrerUrl.origin === requestOrigin) {
      return null;
    }

    return referrerUrl.hostname.slice(0, MAX_REFERRER_HOST_LENGTH);
  } catch {
    return null;
  }
}

function shouldIgnoreAnalyticsRequest(request: Request, path: string) {
  const pathname = path.split("?")[0];
  const userAgent = request.headers.get("user-agent") ?? "";
  const origin = request.headers.get("origin");

  return (
    (origin !== null && origin !== new URL(request.url).origin) ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/uploads") ||
    BOT_USER_AGENT_PATTERN.test(userAgent)
  );
}

async function createAnalyticsVisitorHash(request: Request) {
  const salt = env.BETTER_AUTH_SECRET?.trim() || env.CMS_PUBLIC_SITE_URL?.trim() || "blog-starter";
  const source = [salt, getClientIp(request), request.headers.get("user-agent") ?? ""].join("\n");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(source));

  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function normalizeCount(value: unknown) {
  const count = Number(value ?? 0);

  return Number.isFinite(count) ? count : 0;
}

function emptyDayMetric(date: string): AnalyticsDayMetric {
  return { date, views: 0, visitors: 0, postViews: 0 };
}

function listDateKeys(startDate: string, endDate: string) {
  const keys: string[] = [];
  let current = new Date(`${startDate}T00:00:00.000Z`);
  const end = new Date(`${endDate}T00:00:00.000Z`);

  while (current <= end) {
    keys.push(toDateKey(current));
    current = addUtcDays(current, 1);
  }

  return keys;
}

function startOfUtcDay(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function addUtcDays(date: Date, days: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);

  return next;
}

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}
