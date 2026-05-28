import { type Comment, type Post, type Series, type SiteSettings, type Tag } from "@repo/core";
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
  series: Series[];
};

export type BlogIndexPageData = {
  posts: Post[];
  siteSettings: SiteSettings;
  tags: Tag[];
  series: Series[];
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

export type SeriesPageData = {
  siteSettings: SiteSettings;
  series: Series[];
  posts: Post[];
};

export type SeriesDetailPageData = {
  siteSettings: SiteSettings;
  currentSeries: Series;
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
    const { getD1SiteSettings, listD1Posts, listD1Series, listD1Tags } = await import("./cms-d1");
    const [siteSettings, posts, tags, series] = await Promise.all([
      getD1SiteSettings(),
      listD1Posts(),
      listD1Tags(),
      listD1Series(),
    ]);
    const featuredPosts = posts.filter((post) => post.featured);

    return {
      posts,
      featuredPosts,
      siteSettings,
      tags,
      series,
    };
  },
);

export const $getBlogIndexPage = createServerFn({ method: "GET" })
  .inputValidator((data: { query?: string; tagSlug?: string; seriesSlug?: string }) => data)
  .handler(async ({ data }): Promise<BlogIndexPageData> => {
    const { getD1SiteSettings, listD1Posts, listD1Series, listD1Tags } = await import("./cms-d1");
    const [allPosts, siteSettings, tags, series] = await Promise.all([
      listD1Posts(),
      getD1SiteSettings(),
      listD1Tags(),
      listD1Series(),
    ]);
    const posts = filterPosts(allPosts, {
      query: data.query,
      tagSlug: data.tagSlug,
      seriesSlug: data.seriesSlug,
    });

    return {
      posts,
      siteSettings,
      tags,
      series,
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

export const $getSeriesPage = createServerFn({ method: "GET" }).handler(
  async (): Promise<SeriesPageData> => {
    const { getD1SiteSettings, listD1Posts, listD1Series } = await import("./cms-d1");
    const [posts, siteSettings, series] = await Promise.all([
      listD1Posts(),
      getD1SiteSettings(),
      listD1Series(),
    ]);

    return {
      siteSettings,
      posts,
      series,
    };
  },
);

export const $getSeriesDetailPage = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }): Promise<SeriesDetailPageData | null> => {
    const { getD1SiteSettings, listD1Posts, listD1Series } = await import("./cms-d1");
    const [allPosts, siteSettings, allSeries] = await Promise.all([
      listD1Posts(),
      getD1SiteSettings(),
      listD1Series(),
    ]);
    const series = allSeries.find((candidate) => candidate.slug === data.slug);

    if (!series) {
      return null;
    }

    return {
      siteSettings,
      currentSeries: series,
      posts: filterPosts(allPosts, { seriesSlug: series.slug }),
    };
  });

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

function filterPosts(
  posts: Post[],
  { query = "", tagSlug, seriesSlug }: { query?: string; tagSlug?: string; seriesSlug?: string },
) {
  const normalizedQuery = query.trim().toLowerCase();

  return posts.filter((post) => {
    const matchesTag = tagSlug ? post.tags.some((tag) => tag.slug === tagSlug) : true;
    const matchesSeries = seriesSlug ? post.series?.slug === seriesSlug : true;
    const matchesQuery = normalizedQuery
      ? [post.title, post.excerpt, post.contentText, post.slug]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)
      : true;

    return matchesTag && matchesSeries && matchesQuery;
  });
}
