import { type Comment, type Post, type SiteSettings, type Tag } from "@repo/core";
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

export type AboutPageData = {
  siteSettings: SiteSettings;
};

export const $getBlogPostPage = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }): Promise<BlogPostPageData | null> => {
    const { getD1PostBySlug, getD1SiteSettings, listD1ApprovedComments } = await import("./cms-d1");
    const [siteSettings, post] = await Promise.all([
      getD1SiteSettings(),
      getD1PostBySlug(data.slug),
    ]);

    if (!post) {
      return null;
    }

    return {
      post,
      comments: await listD1ApprovedComments(post.id),
      relatedPosts: [],
      siteSettings,
    };
  });

export const $getHomePageData = createServerFn({ method: "GET" }).handler(
  async (): Promise<HomePageData> => {
    const { getD1SiteSettings, listD1Posts, listD1Tags } = await import("./cms-d1");
    const [siteSettings, posts, tags] = await Promise.all([
      getD1SiteSettings(),
      listD1Posts(),
      listD1Tags(),
    ]);
    const featuredPosts = posts.filter((post) => post.featured);

    return {
      posts,
      featuredPosts,
      siteSettings,
      tags,
    };
  },
);

export const $getBlogIndexPage = createServerFn({ method: "GET" })
  .inputValidator((data: { query?: string; tagSlug?: string }) => data)
  .handler(async ({ data }): Promise<BlogIndexPageData> => {
    const { getD1SiteSettings, listD1Posts, listD1Tags } = await import("./cms-d1");
    const [allPosts, siteSettings, tags] = await Promise.all([
      listD1Posts(),
      getD1SiteSettings(),
      listD1Tags(),
    ]);
    const posts = filterPosts(allPosts, {
      query: data.query,
      tagSlug: data.tagSlug,
    });

    return {
      posts,
      siteSettings,
      tags,
    };
  });

export const $getTagPage = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }): Promise<TagPageData | null> => {
    const { getD1SiteSettings, listD1Posts, listD1Tags } = await import("./cms-d1");
    const [allPosts, siteSettings, tags] = await Promise.all([
      listD1Posts(),
      getD1SiteSettings(),
      listD1Tags(),
    ]);
    const tag = tags.find((candidate) => candidate.slug === data.slug);

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
    const { getD1SiteSettings, listD1Posts, listD1Tags } = await import("./cms-d1");
    const [posts, siteSettings, tags] = await Promise.all([
      listD1Posts(),
      getD1SiteSettings(),
      listD1Tags(),
    ]);

    return {
      siteSettings,
      posts,
      tags,
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

export const $getAboutPageData = createServerFn({ method: "GET" }).handler(
  async (): Promise<AboutPageData> => {
    const { getD1SiteSettings } = await import("./cms-d1");

    return {
      siteSettings: await getD1SiteSettings(),
    };
  },
);

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
