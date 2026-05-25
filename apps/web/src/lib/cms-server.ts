import {
  getApprovedCommentsForPost,
  getPostBySlug,
  getRelatedPosts,
  type Comment,
  type Post,
} from "@repo/core";
import { createServerFn } from "@tanstack/react-start";

export type BlogPostPageData = {
  post: Post;
  comments: Comment[];
  relatedPosts: Post[];
};

export const $getBlogPostPage = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }): Promise<BlogPostPageData | null> => {
    const { getD1PostBySlug, listD1ApprovedComments } = await import("./cms-d1");
    const persistedPost = await getD1PostBySlug(data.slug);

    if (persistedPost) {
      return {
        post: persistedPost,
        comments: await listD1ApprovedComments(persistedPost.id),
        relatedPosts: [],
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
    };
  });
