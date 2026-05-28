import { type ContentStatus, type Post } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AdminPageHeader } from "#/components/admin/admin-ui";
import { type BatchAction } from "#/components/admin/post-batch-actions";
import { PostList } from "#/components/admin/post-list";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/admin/posts/")({
  component: AdminPostsPage,
});

function AdminPostsPage() {
  const locale = getCurrentLocale();
  const [rows, setRows] = useState<Post[]>([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ContentStatus>("all");
  const [seriesFilter, setSeriesFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [selectedPostIds, setSelectedPostIds] = useState<string[]>([]);

  const visiblePosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return rows.filter(
      (post) =>
        (statusFilter === "all" || post.status === statusFilter) &&
        (seriesFilter === "all" || post.series?.slug === seriesFilter) &&
        (tagFilter === "all" || post.tags.some((tag) => tag.slug === tagFilter)) &&
        (!normalizedQuery ||
          [
            post.title,
            post.excerpt,
            post.status,
            post.source,
            post.series?.name ?? "",
            ...post.tags.map((tag) => tag.name),
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery)),
    );
  }, [rows, query, statusFilter, seriesFilter, tagFilter]);

  const seriesOptions = useMemo(() => {
    const seriesBySlug = new Map<string, NonNullable<Post["series"]>>();

    for (const post of rows) {
      if (post.series) {
        seriesBySlug.set(post.series.slug, post.series);
      }
    }

    return Array.from(seriesBySlug.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [rows]);

  const tagOptions = useMemo(() => {
    const tagsBySlug = new Map<string, Post["tags"][number]>();

    for (const post of rows) {
      for (const tag of post.tags) {
        tagsBySlug.set(tag.slug, tag);
      }
    }

    return Array.from(tagsBySlug.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [rows]);
  const allVisibleSelected =
    visiblePosts.length > 0 && visiblePosts.every((post) => selectedPostIds.includes(post.id));

  useEffect(() => {
    let ignore = false;

    void fetch(`/api/posts?status=all&lang=${locale}`)
      .then((response) => (response.ok ? response.json() : undefined))
      .then((payload) => {
        const data = (payload as { data?: Post[] } | undefined)?.data;

        if (!ignore && data) {
          setRows(data);
        }
      });

    return () => {
      ignore = true;
    };
  }, [locale]);

  const upsertPost = (post: Post) => {
    setRows((current) => {
      if (current.some((row) => row.id === post.id)) {
        return current.map((row) => (row.id === post.id ? post : row));
      }

      return [post, ...current];
    });
  };

  const changePostStatus = async (post: Post, status: ContentStatus) => {
    const response = await fetch(`/api/posts/${post.id}?lang=${locale}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      return;
    }

    setRows((current) => current.filter((row) => row.id !== post.id));
    setSelectedPostIds((current) => current.filter((id) => id !== post.id));
  };

  const deletePost = async (post: Post) => {
    const response = await fetch(`/api/posts/${post.id}?lang=${locale}`, { method: "DELETE" });

    if (!response.ok) {
      return;
    }

    const payload = (await response.json()) as { data: Post };
    upsertPost(payload.data);
  };

  const toggleAllVisiblePosts = (checked: boolean) => {
    const visibleIds = visiblePosts.map((post) => post.id);

    setSelectedPostIds((current) =>
      checked
        ? Array.from(new Set([...current, ...visibleIds]))
        : current.filter((id) => !visibleIds.includes(id)),
    );
  };

  const togglePostSelection = (postId: string, checked: boolean) => {
    setSelectedPostIds((current) =>
      checked ? Array.from(new Set([...current, postId])) : current.filter((id) => id !== postId),
    );
  };

  const applyBatchAction = async (action: BatchAction) => {
    if (!selectedPostIds.length) {
      return;
    }

    const response = await fetch(`/api/posts/batch?lang=${locale}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ids: selectedPostIds, action, locale }),
    });

    if (!response.ok) {
      return;
    }

    const payload = (await response.json()) as { data: Post[] };

    for (const post of payload.data) {
      upsertPost(post);
    }

    setSelectedPostIds([]);
  };

  return (
    <section className="grid gap-5">
      <AdminPageHeader
        title={m.admin_posts_title()}
        description={m.admin_posts_description()}
        actions={
          <Button render={<Link to="/admin/posts/new" />} nativeButton={false}>
            <PlusIcon />
            {m.admin_new_post()}
          </Button>
        }
      />

      <PostList
        visiblePosts={visiblePosts}
        selectedPostIds={selectedPostIds}
        allVisibleSelected={allVisibleSelected}
        query={query}
        statusFilter={statusFilter}
        seriesFilter={seriesFilter}
        tagFilter={tagFilter}
        seriesOptions={seriesOptions}
        tagOptions={tagOptions}
        onQueryChange={setQuery}
        onStatusFilterChange={setStatusFilter}
        onSeriesFilterChange={setSeriesFilter}
        onTagFilterChange={setTagFilter}
        onToggleAll={toggleAllVisiblePosts}
        onTogglePost={togglePostSelection}
        onChangePostStatus={(post, status) => void changePostStatus(post, status)}
        onDeletePost={(post) => void deletePost(post)}
        onBatchAction={(action) => void applyBatchAction(action)}
      />
    </section>
  );
}
