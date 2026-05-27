import { describe, it, expect } from "vitest";

import {
  getPublishedPosts,
  getFeaturedPosts,
  getPostBySlug,
  getTagBySlug,
  getRelatedPosts,
  formatDate,
} from "../index";

describe("getPublishedPosts", () => {
  it("returns only published posts", () => {
    const published = getPublishedPosts();
    for (const post of published) {
      expect(post.status).toBe("published");
    }
  });

  it("returns posts sorted by pinned first, then by date descending", () => {
    const published = getPublishedPosts();
    const pinnedIndex = published.findIndex((p) => p.pinned);
    const unpinnedIndex = published.findIndex((p) => !p.pinned);

    // Pinned posts should come before unpinned ones
    if (pinnedIndex !== -1 && unpinnedIndex !== -1) {
      expect(pinnedIndex).toBeLessThan(unpinnedIndex);
    }

    // Within the same pinned group, dates should be descending
    for (let i = 1; i < published.length; i++) {
      const prev = published[i - 1];
      const curr = published[i];
      if (prev.pinned === curr.pinned) {
        expect(prev.publishedAt >= curr.publishedAt).toBe(true);
      }
    }
  });

  it("returns the expected number of published posts from seed data", () => {
    // Seed data has 3 published posts
    expect(getPublishedPosts().length).toBe(3);
  });
});

describe("getFeaturedPosts", () => {
  it("returns only featured posts", () => {
    const featured = getFeaturedPosts();
    for (const post of featured) {
      expect(post.featured).toBe(true);
      expect(post.status).toBe("published");
    }
  });

  it("returns a subset of published posts", () => {
    const published = getPublishedPosts();
    const featured = getFeaturedPosts();
    expect(featured.length).toBeLessThanOrEqual(published.length);
  });

  it("returns expected count from seed data", () => {
    // Seed data has 2 featured posts
    expect(getFeaturedPosts().length).toBe(2);
  });
});

describe("getPostBySlug", () => {
  it("finds a post by its slug", () => {
    const post = getPostBySlug("designing-a-permanent-personal-cms-on-cloudflare");
    expect(post).toBeDefined();
    expect(post!.id).toBe("post-edge-cms");
  });

  it("returns undefined for a missing slug", () => {
    expect(getPostBySlug("nonexistent-slug")).toBeUndefined();
  });
});

describe("getTagBySlug", () => {
  it("finds a tag by its slug", () => {
    const tag = getTagBySlug("cloudflare");
    expect(tag).toBeDefined();
    expect(tag!.id).toBe("tag-cloudflare");
    expect(tag!.name).toBe("Cloudflare");
  });

  it("returns undefined for a missing slug", () => {
    expect(getTagBySlug("nonexistent")).toBeUndefined();
  });
});

describe("getRelatedPosts", () => {
  it("returns posts with shared tags, excluding the original", () => {
    // post-edge-cms has tags: cloudflare, cms, markdown
    const related = getRelatedPosts("post-edge-cms");
    for (const post of related) {
      expect(post.id).not.toBe("post-edge-cms");
    }
  });

  it("returns at most 3 related posts", () => {
    const related = getRelatedPosts("post-edge-cms");
    expect(related.length).toBeLessThanOrEqual(3);
  });

  it("returns empty array for a nonexistent post", () => {
    expect(getRelatedPosts("nonexistent")).toEqual([]);
  });

  it("returns related posts that share at least one tag", () => {
    // post-edge-cms has tags: cloudflare, cms, markdown
    const related = getRelatedPosts("post-edge-cms");
    const postTagSlugs = new Set(["cloudflare", "cms", "markdown"]);
    for (const post of related) {
      const hasSharedTag = post.tags.some((tag) => postTagSlugs.has(tag.slug));
      expect(hasSharedTag).toBe(true);
    }
  });
});

describe("formatDate", () => {
  it("formats a date string for en locale", () => {
    const result = formatDate("2024-01-15T10:30:00Z", "en");
    // Should contain month, day, and year
    expect(result).toContain("2024");
    expect(result).toContain("15");
    expect(result).toContain("Jan");
  });

  it("formats a date string for zh locale", () => {
    const result = formatDate("2024-01-15T10:30:00Z", "zh");
    // zh-CN format includes year, month, day
    expect(result).toContain("2024");
    expect(result).toContain("15");
  });

  it("defaults to en locale when not specified", () => {
    const result = formatDate("2024-06-01T00:00:00Z");
    expect(result).toContain("Jun");
    expect(result).toContain("2024");
  });
});
