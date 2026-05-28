import { type Comment, type Post } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Label } from "@repo/ui/components/label";
import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckIcon, SearchIcon, ShieldAlertIcon, Trash2Icon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  AdminPageHeader,
  AdminPanel,
  adminInputClassName,
  adminSelectClassName,
} from "#/components/admin/admin-ui";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/admin/comments")({
  component: AdminCommentsPage,
});

type ModerationAction = "approve" | "delete" | "spam";

const commentStatuses: Array<Comment["status"]> = ["pending", "approved", "spam", "deleted"];

function AdminCommentsPage() {
  const locale = getCurrentLocale();
  const [rows, setRows] = useState<Comment[]>([]);
  const [postRows, setPostRows] = useState<Post[]>([]);
  const [statusFilter, setStatusFilter] = useState<Comment["status"] | "all">("pending");
  const [postFilter, setPostFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedCommentIds, setSelectedCommentIds] = useState<string[]>([]);

  useEffect(() => {
    let ignore = false;

    void Promise.all([
      fetch(`/api/comments?lang=${locale}`).then((response) =>
        response.ok ? response.json() : undefined,
      ),
      fetch(`/api/posts?status=all&lang=${locale}`).then((response) =>
        response.ok ? response.json() : undefined,
      ),
    ]).then(([commentPayload, postPayload]) => {
      const nextComments = (commentPayload as { data?: Comment[] } | undefined)?.data;
      const nextPosts = (postPayload as { data?: Post[] } | undefined)?.data;

      if (!ignore && nextComments) {
        setRows(nextComments);
      }

      if (!ignore && nextPosts) {
        setPostRows(nextPosts);
      }
    });

    return () => {
      ignore = true;
    };
  }, [locale]);

  const postById = useMemo(
    () => new Map(postRows.map((post) => [post.id, post] as const)),
    [postRows],
  );
  const counts = useMemo(
    () =>
      commentStatuses.reduce(
        (nextCounts, status) => ({
          ...nextCounts,
          [status]: rows.filter((comment) => comment.status === status).length,
        }),
        {} as Record<Comment["status"], number>,
      ),
    [rows],
  );

  const moderate = async (id: string, action: ModerationAction) => {
    const response = await fetch(`/api/comments/${id}/${action}`, { method: "POST" });

    if (!response.ok) {
      return false;
    }

    const payload = (await response.json()) as {
      data: Comment;
    };

    setRows((current) => current.map((comment) => (comment.id === id ? payload.data : comment)));
    return true;
  };

  const normalizedQuery = query.trim().toLowerCase();
  const filteredRows = rows.filter((comment) => {
    const localizedPost = postById.get(comment.postId);
    const statusMatches = statusFilter === "all" || comment.status === statusFilter;
    const postMatches = postFilter === "all" || comment.postId === postFilter;
    const queryMatches =
      !normalizedQuery ||
      [comment.authorName, comment.body, localizedPost?.title ?? ""].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      );

    return statusMatches && postMatches && queryMatches;
  });
  const visibleCommentIds = filteredRows.map((comment) => comment.id);
  const visibleCommentIdSet = new Set(visibleCommentIds);
  const selectedVisibleCount = selectedCommentIds.filter((id) =>
    visibleCommentIdSet.has(id),
  ).length;
  const allVisibleSelected =
    filteredRows.length > 0 && selectedVisibleCount === filteredRows.length;

  const toggleAllVisible = () => {
    setSelectedCommentIds((current) => {
      if (allVisibleSelected) {
        return current.filter((id) => !visibleCommentIdSet.has(id));
      }

      return Array.from(new Set([...current, ...visibleCommentIds]));
    });
  };

  const toggleCommentSelection = (id: string) => {
    setSelectedCommentIds((current) =>
      current.includes(id) ? current.filter((currentId) => currentId !== id) : [...current, id],
    );
  };

  const applyBatchAction = async (action: ModerationAction) => {
    const targetIds = selectedCommentIds.filter((id) => visibleCommentIdSet.has(id));

    for (const id of targetIds) {
      await moderate(id, action);
    }

    setSelectedCommentIds((current) => current.filter((id) => !targetIds.includes(id)));
  };

  return (
    <section className="grid gap-5">
      <AdminPageHeader
        title={m.admin_comments_title()}
        description={m.admin_comments_description()}
        actions={
          <span className="rounded-md border border-border bg-card px-3 py-2 text-sm font-medium">
            {m.admin_comments_pending_count({ count: counts.pending })}
          </span>
        }
      />

      <AdminPanel>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant={statusFilter === "all" ? "default" : "outline"}
            onClick={() => setStatusFilter("all")}
          >
            {m.admin_comments_status_all()} · {rows.length}
          </Button>
          {commentStatuses.map((status) => (
            <Button
              key={status}
              type="button"
              size="sm"
              variant={statusFilter === status ? "default" : "outline"}
              onClick={() => setStatusFilter(status)}
            >
              {commentStatusLabel(status)} · {counts[status]}
            </Button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_1.25fr]">
          <div className="grid gap-2">
            <Label htmlFor="comment-status-filter">{m.admin_posts_filter_status()}</Label>
            <select
              id="comment-status-filter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.currentTarget.value as Comment["status"] | "all")
              }
              className={adminSelectClassName}
            >
              <option value="all">{m.admin_comments_status_all()}</option>
              {commentStatuses.map((status) => (
                <option key={status} value={status}>
                  {commentStatusLabel(status)}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="comment-post-filter">{m.admin_comments_filter_post()}</Label>
            <select
              id="comment-post-filter"
              value={postFilter}
              onChange={(event) => setPostFilter(event.currentTarget.value)}
              className={adminSelectClassName}
            >
              <option value="all">{m.admin_comments_all_posts()}</option>
              {postRows.map((post) => (
                <option key={post.id} value={post.id}>
                  {post.title}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="comment-search">{m.admin_comments_search()}</Label>
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="comment-search"
                value={query}
                onChange={(event) => setQuery(event.currentTarget.value)}
                className={`${adminInputClassName} pl-9`}
                placeholder={m.admin_comments_search_placeholder()}
                suppressHydrationWarning
              />
            </div>
          </div>
        </div>

        {filteredRows.length ? (
          <label className="mt-4 flex w-fit items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={allVisibleSelected}
              onChange={toggleAllVisible}
              className="size-4 rounded border-input"
            />
            {m.admin_comments_select_all()}
          </label>
        ) : null}

        {selectedVisibleCount ? (
          <div className="mt-4 flex flex-col justify-between gap-3 rounded-md border border-border bg-muted/35 p-3 sm:flex-row sm:items-center">
            <p className="text-sm font-medium">
              {m.admin_comments_selected({ count: selectedVisibleCount })}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={() => void applyBatchAction("approve")}>
                <CheckIcon />
                {m.admin_comments_batch_approve()}
              </Button>
              <Button size="sm" variant="outline" onClick={() => void applyBatchAction("spam")}>
                <ShieldAlertIcon />
                {m.admin_comments_batch_spam()}
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => void applyBatchAction("delete")}
              >
                <Trash2Icon />
                {m.admin_comments_batch_delete()}
              </Button>
            </div>
          </div>
        ) : null}

        <div className="mt-4 grid gap-3">
          {filteredRows.length ? null : (
            <p className="rounded-md border border-border bg-muted/35 p-4 text-sm text-muted-foreground">
              {m.admin_comments_empty()}
            </p>
          )}
          {filteredRows.map((comment) => {
            const localizedPost = postById.get(comment.postId);
            const selected = selectedCommentIds.includes(comment.id);

            return (
              <article key={comment.id} className="rounded-md border border-border bg-muted/45 p-3">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <label className="flex min-w-0 items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleCommentSelection(comment.id)}
                      aria-label={m.admin_comments_select_one({
                        author: comment.authorName,
                      })}
                      className="mt-1 size-4 rounded border-input"
                    />
                    <span className="min-w-0">
                      <span className="block font-medium">{comment.authorName}</span>
                      {localizedPost ? (
                        <span className="mt-1 block truncate text-xs text-muted-foreground">
                          {localizedPost.title}
                        </span>
                      ) : null}
                    </span>
                  </label>
                  <span className="w-fit rounded-sm border border-border bg-card px-2 py-1 text-xs font-medium">
                    {commentStatusLabel(comment.status)}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{comment.body}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {localizedPost ? (
                    <Button
                      render={
                        <Link
                          to="/blog/$slug"
                          params={{ slug: localizedPost.slug }}
                          target="_blank"
                        />
                      }
                      nativeButton={false}
                      size="sm"
                      variant="outline"
                    >
                      {m.admin_comments_view_post()}
                    </Button>
                  ) : null}
                  <Button
                    size="sm"
                    onClick={() => void moderate(comment.id, "approve")}
                    disabled={comment.status === "approved"}
                  >
                    <CheckIcon className="size-4" />
                    {m.admin_comments_approve()}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => void moderate(comment.id, "spam")}
                    disabled={comment.status === "spam"}
                  >
                    <ShieldAlertIcon className="size-4" />
                    {m.admin_comments_mark_spam()}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => void moderate(comment.id, "delete")}
                    disabled={comment.status === "deleted"}
                  >
                    <Trash2Icon className="size-4" />
                    {m.admin_comments_delete()}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </AdminPanel>
    </section>
  );
}

function commentStatusLabel(status: Comment["status"]) {
  switch (status) {
    case "approved":
      return m.admin_comments_status_approved();
    case "deleted":
      return m.admin_comments_status_deleted();
    case "pending":
      return m.admin_comments_status_pending();
    case "spam":
      return m.admin_comments_status_spam();
  }
}
