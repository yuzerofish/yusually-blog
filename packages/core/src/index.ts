import { comments, dashboardMetrics, posts, projects, siteSettings, tags } from "./demo-data";
import type {
  Comment,
  DashboardMetric,
  Post,
  Project,
  SiteSettings,
  SupportedLocale,
  Tag,
} from "./types";

export {
  assets,
  comments,
  dashboardMetrics,
  posts,
  projects,
  siteSettings,
  tags,
} from "./demo-data";
export type {
  Asset,
  Comment,
  CommentStatus,
  ContentSource,
  ContentStatus,
  DashboardMetric,
  Post,
  Project,
  SiteSettings,
  SupportedLocale,
  Tag,
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

export function localizeProject(project: Project, locale: SupportedLocale): Project {
  return {
    ...project,
    title: localizeText(project.title, project.i18n?.title, locale),
    excerpt: localizeText(project.excerpt, project.i18n?.excerpt, locale),
    tags: project.tags.map((tag) => localizeTag(tag, locale)),
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
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPublishedPostsForLocale(locale: SupportedLocale) {
  return getPublishedPosts().map((post) => localizePost(post, locale));
}

export function getFeaturedPosts() {
  return getPublishedPosts().filter((post) => post.featured);
}

export function getFeaturedPostsForLocale(locale: SupportedLocale) {
  return getFeaturedPosts().map((post) => localizePost(post, locale));
}

export function getPostBySlug(slug: string) {
  return getPublishedPosts().find((post) => post.slug === slug);
}

export function getPostBySlugForLocale(slug: string, locale: SupportedLocale) {
  const post = getPostBySlug(slug);
  return post ? localizePost(post, locale) : undefined;
}

export function getPostsByTag(tagSlug: string) {
  return getPublishedPosts().filter((post) => post.tags.some((tag) => tag.slug === tagSlug));
}

export function getPostsByTagForLocale(tagSlug: string, locale: SupportedLocale) {
  return getPostsByTag(tagSlug).map((post) => localizePost(post, locale));
}

export function getTagBySlug(slug: string) {
  return tags.find((tag) => tag.slug === slug);
}

export function getTagsForLocale(locale: SupportedLocale) {
  return tags.map((tag) => localizeTag(tag, locale));
}

export function getTagBySlugForLocale(slug: string, locale: SupportedLocale) {
  const tag = getTagBySlug(slug);
  return tag ? localizeTag(tag, locale) : undefined;
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

export function getRelatedPostsForLocale(postId: string, locale: SupportedLocale) {
  return getRelatedPosts(postId).map((post) => localizePost(post, locale));
}

export function getArchiveGroups() {
  const groups = new Map<string, typeof posts>();

  for (const post of getPublishedPosts()) {
    const date = new Date(post.publishedAt);
    const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
    const group = groups.get(key) ?? [];
    group.push(post);
    groups.set(key, group);
  }

  return Array.from(groups.entries()).map(([key, groupPosts]) => ({
    key,
    label: key.replace("-", " / "),
    posts: groupPosts,
  }));
}

export function getArchiveGroupsForLocale(locale: SupportedLocale) {
  return getArchiveGroups().map((group) => ({
    ...group,
    posts: group.posts.map((post) => localizePost(post, locale)),
  }));
}

export function getProjectsForLocale(locale: SupportedLocale) {
  return projects.map((project) => localizeProject(project, locale));
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
