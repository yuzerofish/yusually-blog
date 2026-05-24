import { comments, posts, tags } from "./demo-data";

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
  Tag,
} from "./types";

export function getPublishedPosts() {
  return posts
    .filter((post) => post.status === "published")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getFeaturedPosts() {
  return getPublishedPosts().filter((post) => post.featured);
}

export function getPostBySlug(slug: string) {
  return getPublishedPosts().find((post) => post.slug === slug);
}

export function getPostsByTag(tagSlug: string) {
  return getPublishedPosts().filter((post) => post.tags.some((tag) => tag.slug === tagSlug));
}

export function getTagBySlug(slug: string) {
  return tags.find((tag) => tag.slug === slug);
}

export function getApprovedCommentsForPost(postId: string) {
  return comments.filter((comment) => comment.postId === postId && comment.status === "approved");
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

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
