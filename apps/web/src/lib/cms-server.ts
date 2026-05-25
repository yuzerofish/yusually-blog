import {
  getApprovedCommentsForPost,
  getFeaturedPosts,
  getPublishedPosts,
  getPostBySlug,
  getRelatedPosts,
  getTagBySlug,
  localizePost,
  resolveLocale,
  tags as seedTags,
  type Comment,
  type Post,
  type SiteSettings,
  type SupportedLocale,
  type Tag,
} from "@repo/core";
import { createServerFn } from "@tanstack/react-start";

export type BlogPostPageData = {
  post: Post;
  comments: Comment[];
  relatedPosts: Post[];
  siteSettings: SiteSettings;
};

export type HomePageData = {
  posts: Post[];
  featuredPosts: Post[];
  siteSettings: SiteSettings;
  tags: Tag[];
};

export type BlogIndexPageData = {
  posts: Post[];
  siteSettings: SiteSettings;
  tags: Tag[];
};

export type ArchiveGroup = {
  key: string;
  label: string;
  posts: Post[];
};

export type ArchivePageData = {
  groups: ArchiveGroup[];
  siteSettings: SiteSettings;
};

export type TagPageData = {
  siteSettings: SiteSettings;
  tag: Tag;
  posts: Post[];
};

export type TagsPageData = {
  siteSettings: SiteSettings;
  tags: Tag[];
  posts: Post[];
};

export type SiteSettingsPageData = {
  siteSettings: SiteSettings;
};

export const $getBlogPostPage = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }): Promise<BlogPostPageData | null> => {
    const { getD1PostBySlug, getD1SiteSettings, listD1ApprovedComments } = await import("./cms-d1");
    const siteSettings = await getD1SiteSettings();
    const persistedPost = await getD1PostBySlug(data.slug);

    if (persistedPost) {
      return {
        post: persistedPost,
        comments: await listD1ApprovedComments(persistedPost.id),
        relatedPosts: [],
        siteSettings,
      };
    }

    const seededPost = getPostBySlug(data.slug);

    if (!seededPost) {
      return null;
    }

    return {
      post: seededPost,
      comments: getApprovedCommentsForPost(seededPost.id),
      relatedPosts: getRelatedPosts(seededPost.id),
      siteSettings,
    };
  });

export const $getHomePageData = createServerFn({ method: "GET" }).handler(
  async (): Promise<HomePageData> => {
    const { getD1SiteSettings } = await import("./cms-d1");
    const [siteSettings, posts] = await Promise.all([
      getD1SiteSettings(),
      getMergedPublishedPosts(),
    ]);
    const seededFeaturedSlugs = new Set(getFeaturedPosts().map((post) => post.slug));
    const featuredPosts = posts.filter(
      (post) => post.featured || seededFeaturedSlugs.has(post.slug),
    );

    return {
      posts,
      featuredPosts,
      siteSettings,
      tags: await getMergedTags(posts),
    };
  },
);

export const $getBlogIndexPage = createServerFn({ method: "GET" })
  .inputValidator((data: { query?: string; tagSlug?: string }) => data)
  .handler(async ({ data }): Promise<BlogIndexPageData> => {
    const { getD1SiteSettings } = await import("./cms-d1");
    const [allPosts, siteSettings] = await Promise.all([
      getMergedPublishedPosts(),
      getD1SiteSettings(),
    ]);
    const posts = filterPosts(allPosts, {
      query: data.query,
      tagSlug: data.tagSlug,
    });

    return {
      posts,
      siteSettings,
      tags: await getMergedTags(allPosts),
    };
  });

export const $getArchivePage = createServerFn({ method: "GET" })
  .inputValidator((data: { locale?: string }) => data)
  .handler(async ({ data }): Promise<ArchivePageData> => {
    const { getD1SiteSettings } = await import("./cms-d1");
    const locale = resolveLocale(data.locale);
    const [siteSettings, mergedPosts] = await Promise.all([
      getD1SiteSettings(),
      getMergedPublishedPosts(),
    ]);
    const posts = mergedPosts.map((post) => localizePost(post, locale));

    return {
      groups: archivePosts(posts, locale),
      siteSettings,
    };
  });

export const $getTagPage = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }): Promise<TagPageData | null> => {
    const { getD1SiteSettings } = await import("./cms-d1");
    const [allPosts, siteSettings] = await Promise.all([
      getMergedPublishedPosts(),
      getD1SiteSettings(),
    ]);
    const tags = await getMergedTags(allPosts);
    const tag = tags.find((candidate) => candidate.slug === data.slug) ?? getTagBySlug(data.slug);

    if (!tag) {
      return null;
    }

    return {
      siteSettings,
      tag,
      posts: filterPosts(allPosts, { tagSlug: tag.slug }),
    };
  });

export const $getTagsPage = createServerFn({ method: "GET" }).handler(
  async (): Promise<TagsPageData> => {
    const { getD1SiteSettings } = await import("./cms-d1");
    const [posts, siteSettings] = await Promise.all([
      getMergedPublishedPosts(),
      getD1SiteSettings(),
    ]);

    return {
      siteSettings,
      posts,
      tags: await getMergedTags(posts),
    };
  },
);

export const $getSiteSettingsPageData = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteSettingsPageData> => {
    const { getD1SiteSettings } = await import("./cms-d1");

    return {
      siteSettings: await getD1SiteSettings(),
    };
  },
);

async function getMergedPublishedPosts() {
  const { listD1Posts } = await import("./cms-d1");
  const persistedPosts = await listD1Posts().catch(() => []);
  const persistedSlugs = new Set(persistedPosts.map((post) => post.slug));

  return [
    ...persistedPosts,
    ...getPublishedPosts().filter((post) => !persistedSlugs.has(post.slug)),
  ];
}

async function getMergedTags(posts: Post[]) {
  const { listD1Tags } = await import("./cms-d1");
  const persistedTags = await listD1Tags().catch(() => []);
  const tagsBySlug = new Map<string, Tag>();

  for (const tag of [...persistedTags, ...posts.flatMap((post) => post.tags), ...seedTags]) {
    if (!tagsBySlug.has(tag.slug)) {
      tagsBySlug.set(tag.slug, tag);
    }
  }

  return Array.from(tagsBySlug.values()).sort((a, b) => a.name.localeCompare(b.name));
}

function filterPosts(posts: Post[], { query = "", tagSlug }: { query?: string; tagSlug?: string }) {
  const normalizedQuery = query.trim().toLowerCase();

  return posts.filter((post) => {
    const matchesTag = tagSlug ? post.tags.some((tag) => tag.slug === tagSlug) : true;
    const matchesQuery = normalizedQuery
      ? [post.title, post.excerpt, post.contentText, post.slug]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)
      : true;

    return matchesTag && matchesQuery;
  });
}

function archivePosts(posts: Post[], locale: SupportedLocale) {
  const formatter = new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    month: "long",
    year: "numeric",
  });
  const groups = new Map<string, ArchiveGroup>();

  for (const post of posts) {
    const date = new Date(post.publishedAt);
    const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;

    if (!groups.has(key)) {
      groups.set(key, {
        key,
        label: formatter.format(date),
        posts: [],
      });
    }

    groups.get(key)?.posts.push(post);
  }

  return Array.from(groups.values());
}
