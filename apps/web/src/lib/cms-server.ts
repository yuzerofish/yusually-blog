import {
  getApprovedCommentsForPost,
  getFeaturedPosts,
  getPublishedPosts,
  getPostBySlug,
  getRelatedPosts,
  tags,
  type Comment,
  type Post,
  type SiteSettings,
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
    const { getD1SiteSettings, listD1Posts } = await import("./cms-d1");
    const [siteSettings, persistedPosts] = await Promise.all([
      getD1SiteSettings(),
      listD1Posts().catch(() => []),
    ]);
    const persistedSlugs = new Set(persistedPosts.map((post) => post.slug));
    const posts = [
      ...persistedPosts,
      ...getPublishedPosts().filter((post) => !persistedSlugs.has(post.slug)),
    ];
    const seededFeaturedSlugs = new Set(getFeaturedPosts().map((post) => post.slug));
    const featuredPosts = posts.filter(
      (post) => post.featured || seededFeaturedSlugs.has(post.slug),
    );

    return {
      posts,
      featuredPosts,
      siteSettings,
      tags,
    };
  },
);
