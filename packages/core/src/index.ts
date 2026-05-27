import {
  assets,
  comments,
  dashboardMetrics,
  posts,
  siteSettings,
  tags,
} from "./cms-store";
import type {
  CmsPage,
  Comment,
  DashboardMetric,
  Post,
  SiteSettings,
  SupportedLocale,
  Tag,
} from "./types";

export {
  apiTokens,
  createApiToken,
  createAsset,
  createComment,
  createPost,
  deleteAsset,
  deletePost,
  findPost,
  listPosts,
  moderateComment,
  revokeApiToken,
  searchPosts,
  updatePost,
  updateSiteSettings,
} from "./cms-store";
export { assets, comments, dashboardMetrics, posts, siteSettings, tags };
export {
  defaultCommentBlockedKeywords,
  findBlockedCommentKeyword,
  getCommentInitialStatus,
  normalizeCommentBlockedKeywords,
} from "./comment-moderation";
export { htmlToText, markdownToText, renderMarkdownToHtml, sanitizeHtml } from "./markdown";
export {
  assertPassword,
  authErrorMessage,
  cleanStringList,
  countLinks,
  digestText,
  escapeHtml,
  extractSetCookieHeaders,
  normalizeDateInput,
  normalizeEmail,
  parseJson,
  slugify,
  toIsoString,
} from "./utils";
export type {
  ApiToken,
  ApiTokenScope,
  Asset,
  CmsPage,
  Comment,
  CommentStatus,
  ContentSource,
  ContentStatus,
  DashboardMetric,
  LayoutPreset,
  Post,
  SiteSettings,
  SupportedLocale,
  Tag,
  ThemePreset,
} from "./types";

export function resolveLocale(locale?: string): SupportedLocale {
  return locale === "zh" ? "zh" : "en";
}

export function localizeText(
  fallback: string,
  translations: Partial<Record<SupportedLocale, string>> | undefined,
  locale: SupportedLocale,
) {
  return translations?.[locale] ?? translations?.en ?? fallback;
}

export function localizeTag(tag: Tag, locale: SupportedLocale): Tag {
  return {
    ...tag,
    name: localizeText(tag.name, tag.i18n?.name, locale),
    description: localizeText(tag.description, tag.i18n?.description, locale),
  };
}

export function localizePost(post: Post, locale: SupportedLocale): Post {
  return {
    ...post,
    title: localizeText(post.title, post.i18n?.title, locale),
    excerpt: localizeText(post.excerpt, post.i18n?.excerpt, locale),
    contentMarkdown: localizeText(post.contentMarkdown, post.i18n?.contentMarkdown, locale),
    contentHtml: localizeText(post.contentHtml, post.i18n?.contentHtml, locale),
    contentText: localizeText(post.contentText, post.i18n?.contentText, locale),
    seoTitle: localizeText(post.seoTitle, post.i18n?.seoTitle, locale),
    seoDescription: localizeText(post.seoDescription, post.i18n?.seoDescription, locale),
    tags: post.tags.map((tag) => localizeTag(tag, locale)),
  };
}

export function localizePage(page: CmsPage, locale: SupportedLocale): CmsPage {
  return {
    ...page,
    title: localizeText(page.title, page.i18n?.title, locale),
    contentMarkdown: localizeText(page.contentMarkdown, page.i18n?.contentMarkdown, locale),
    contentHtml: localizeText(page.contentHtml, page.i18n?.contentHtml, locale),
    seoTitle: localizeText(page.seoTitle, page.i18n?.seoTitle, locale),
    seoDescription: localizeText(page.seoDescription, page.i18n?.seoDescription, locale),
  };
}

export function localizeComment(comment: Comment, locale: SupportedLocale): Comment {
  return {
    ...comment,
    body: localizeText(comment.body, comment.i18n?.body, locale),
  };
}

export function localizeSiteSettings(
  settings: SiteSettings,
  locale: SupportedLocale,
): SiteSettings {
  return {
    ...settings,
    name: localizeText(settings.name, settings.i18n?.name, locale),
    description: localizeText(settings.description, settings.i18n?.description, locale),
    authorBio: localizeText(settings.authorBio, settings.i18n?.authorBio, locale),
  };
}

export function localizeDashboardMetric(
  metric: DashboardMetric,
  locale: SupportedLocale,
): DashboardMetric {
  return {
    ...metric,
    label: localizeText(metric.label, metric.i18n?.label, locale),
    detail: localizeText(metric.detail, metric.i18n?.detail, locale),
  };
}

export function getPublishedPosts() {
  return posts
    .filter((post) => post.status === "published")
    .sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return a.pinned ? -1 : 1;
      }

      return b.publishedAt.localeCompare(a.publishedAt);
    });
}

export function getFeaturedPosts() {
  return getPublishedPosts().filter((post) => post.featured);
}

export function getPostBySlug(slug: string) {
  return getPublishedPosts().find((post) => post.slug === slug);
}

export function getTagBySlug(slug: string) {
  return tags.find((tag) => tag.slug === slug);
}

export function getTagsForLocale(locale: SupportedLocale) {
  return tags.map((tag) => localizeTag(tag, locale));
}

export function getApprovedCommentsForPost(postId: string) {
  return comments.filter((comment) => comment.postId === postId && comment.status === "approved");
}

export function getApprovedCommentsForPostForLocale(postId: string, locale: SupportedLocale) {
  return getApprovedCommentsForPost(postId).map((comment) => localizeComment(comment, locale));
}

export function getRelatedPosts(postId: string) {
  const post = posts.find((candidate) => candidate.id === postId);

  if (!post) {
    return [];
  }

  const postTagSlugs = new Set(post.tags.map((tag) => tag.slug));

  return getPublishedPosts()
    .filter((candidate) => candidate.id !== post.id)
    .filter((candidate) => candidate.tags.some((tag) => postTagSlugs.has(tag.slug)))
    .slice(0, 3);
}

export function getSiteSettingsForLocale(locale: SupportedLocale) {
  return localizeSiteSettings(siteSettings, locale);
}

export function getDashboardMetricsForLocale(locale: SupportedLocale) {
  return dashboardMetrics.map((metric) => localizeDashboardMetric(metric, locale));
}

export function formatDate(date: string, locale: SupportedLocale = "en") {
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
