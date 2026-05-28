import { type CmsUser, type CommentUserStatus, type UserRole } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Label } from "@repo/ui/components/label";
import { createFileRoute } from "@tanstack/react-router";
import {
  type LucideIcon,
  SearchIcon,
  ShieldIcon,
  UserRoundIcon,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  AdminPageHeader,
  AdminPanel,
  adminInputClassName,
  adminSelectClassName,
} from "#/components/admin/admin-ui";
import { getResponseErrorMessage } from "#/lib/admin-notifications";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/admin/users")({
  component: AdminUsersPage,
});

type RoleFilter = UserRole | "all";
type CommentStatusFilter = CommentUserStatus | "all";

function AdminUsersPage() {
  const locale = getCurrentLocale();
  const copy = getUsersActionCopy(locale);
  const [rows, setRows] = useState<CmsUser[]>([]);
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [statusFilter, setStatusFilter] = useState<CommentStatusFilter>("all");
  const [query, setQuery] = useState("");
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
  const [actionStatus, setActionStatus] = useState<"idle" | "saved" | "error">("idle");

  useEffect(() => {
    let ignore = false;

    void fetch("/api/admin/users")
      .then((response) => (response.ok ? response.json() : undefined))
      .then((payload) => {
        const users = (payload as { data?: CmsUser[] } | undefined)?.data;

        if (!ignore && users) {
          setRows(users);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const stats = useMemo(
    () => ({
      active: rows.filter((user) => user.commentStatus === "active").length,
      admin: rows.filter((user) => user.role === "admin").length,
      muted: rows.filter((user) => user.commentStatus === "muted").length,
      reader: rows.filter((user) => user.role === "reader").length,
      total: rows.length,
    }),
    [rows],
  );

  const normalizedQuery = query.trim().toLowerCase();
  const filteredRows = rows.filter((user) => {
    const roleMatches = roleFilter === "all" || user.role === roleFilter;
    const statusMatches = statusFilter === "all" || user.commentStatus === statusFilter;
    const queryMatches =
      !normalizedQuery ||
      [user.name, user.email, user.providers.join(" ")].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      );

    return roleMatches && statusMatches && queryMatches;
  });

  const updateCommentStatus = async (user: CmsUser, commentStatus: CommentUserStatus) => {
    setPendingUserId(user.id);
    setActionStatus("idle");

    const response = await fetch(`/api/admin/users/${user.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ commentStatus }),
    }).catch(() => null);

    setPendingUserId(null);

    if (!response?.ok) {
      setActionStatus("error");
      toast.error(copy.updateError, {
        description: response
          ? await getResponseErrorMessage(response, copy.updateError)
          : copy.networkError,
      });
      return;
    }

    const payload = (await response.json()) as { data: CmsUser };
    setRows((current) =>
      current.map((currentUser) => (currentUser.id === user.id ? payload.data : currentUser)),
    );
    setActionStatus("saved");
    toast.success(copy.updateSuccess(payload.data.name, payload.data.commentStatus));
  };

  return (
    <section className="grid gap-5">
      <AdminPageHeader
        title={m.admin_users_title()}
        description={m.admin_users_description()}
        actions={
          actionStatus !== "idle" ? (
            <p
              className={`self-center text-sm ${
                actionStatus === "saved" ? "text-success" : "text-destructive"
              }`}
            >
              {actionStatus === "saved" ? m.admin_users_saved() : m.admin_users_error()}
            </p>
          ) : null
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <UserMetric label={m.admin_users_total()} value={stats.total} icon={UserRoundIcon} />
        <UserMetric label={m.admin_users_role_reader()} value={stats.reader} icon={UserRoundIcon} />
        <UserMetric label={m.admin_users_role_admin()} value={stats.admin} icon={ShieldIcon} />
        <UserMetric label={m.admin_users_status_muted()} value={stats.muted} icon={VolumeXIcon} />
      </div>

      <AdminPanel>
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_1.35fr]">
          <div className="grid gap-2">
            <Label htmlFor="user-role-filter">{m.admin_users_filter_role()}</Label>
            <select
              id="user-role-filter"
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.currentTarget.value as RoleFilter)}
              className={adminSelectClassName}
            >
              <option value="all">{m.admin_users_role_all()}</option>
              <option value="reader">{m.admin_users_role_reader()}</option>
              <option value="admin">{m.admin_users_role_admin()}</option>
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="user-status-filter">{m.admin_users_filter_status()}</Label>
            <select
              id="user-status-filter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.currentTarget.value as CommentStatusFilter)
              }
              className={adminSelectClassName}
            >
              <option value="all">{m.admin_users_status_all()}</option>
              <option value="active">{m.admin_users_status_active()}</option>
              <option value="muted">{m.admin_users_status_muted()}</option>
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="user-search">{m.admin_users_search()}</Label>
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="user-search"
                value={query}
                onChange={(event) => setQuery(event.currentTarget.value)}
                className={`${adminInputClassName} pl-9`}
                placeholder={m.admin_users_search_placeholder()}
                suppressHydrationWarning
              />
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3">
          {filteredRows.length ? null : (
            <p className="rounded-md border border-border bg-muted/35 p-4 text-sm text-muted-foreground">
              {m.admin_users_empty()}
            </p>
          )}
          {filteredRows.map((user) => {
            const muted = user.commentStatus === "muted";

            return (
              <article key={user.id} className="rounded-md border border-border bg-muted/45 p-3">
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate font-medium">{user.name}</h2>
                      <StatusBadge tone={muted ? "muted" : "active"}>
                        {commentStatusLabel(user.commentStatus)}
                      </StatusBadge>
                      <StatusBadge tone="neutral">{roleLabel(user.role)}</StatusBadge>
                    </div>
                    <p className="mt-1 truncate text-sm text-muted-foreground">{user.email}</p>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                      <span>{providerLabel(user.providers)}</span>
                      <span>
                        {user.emailVerified
                          ? m.admin_users_email_verified()
                          : m.admin_users_email_unverified()}
                      </span>
                      <span>
                        {m.admin_users_joined({ date: formatDate(user.createdAt, locale) })}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant={muted ? "outline" : "destructive"}
                      disabled={pendingUserId === user.id}
                      onClick={() => void updateCommentStatus(user, muted ? "active" : "muted")}
                    >
                      {muted ? (
                        <Volume2Icon className="size-4" />
                      ) : (
                        <VolumeXIcon className="size-4" />
                      )}
                      {muted ? m.admin_users_unmute() : m.admin_users_mute()}
                    </Button>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 border-t border-border/80 pt-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
                  <UserFact
                    label={m.admin_users_comments()}
                    value={m.admin_users_comments_count({ count: user.commentCount })}
                  />
                  <UserFact
                    label={m.admin_users_last_comment()}
                    value={
                      user.lastCommentAt
                        ? formatDate(user.lastCommentAt, locale)
                        : m.admin_users_no_comments()
                    }
                  />
                  <UserFact
                    label={m.admin_users_status_updated()}
                    value={
                      user.commentStatusUpdatedAt
                        ? formatDate(user.commentStatusUpdatedAt, locale)
                        : m.admin_users_status_not_changed()
                    }
                  />
                </div>
              </article>
            );
          })}
        </div>
      </AdminPanel>
    </section>
  );
}

function UserMetric({
  icon: Icon,
  label,
  value,
}: {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly value: number;
}) {
  return (
    <AdminPanel className="min-h-28">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {label}
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-normal">{value}</p>
        </div>
        <Icon className="size-5 text-link" />
      </div>
    </AdminPanel>
  );
}

function UserFact({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <div>
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</p>
      <p className="mt-1 text-foreground">{value}</p>
    </div>
  );
}

function StatusBadge({
  children,
  tone,
}: {
  readonly children: string;
  readonly tone: "active" | "muted" | "neutral";
}) {
  const className =
    tone === "muted"
      ? "border-destructive/30 bg-destructive/10 text-destructive"
      : tone === "active"
        ? "border-success/30 bg-success/10 text-success"
        : "border-border bg-card text-muted-foreground";

  return (
    <span className={`rounded-sm border px-2 py-1 text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}

function roleLabel(role: UserRole) {
  return role === "admin" ? m.admin_users_role_admin() : m.admin_users_role_reader();
}

function commentStatusLabel(status: CommentUserStatus) {
  return status === "muted" ? m.admin_users_status_muted() : m.admin_users_status_active();
}

function providerLabel(providers: CmsUser["providers"]) {
  const labels = providers.map((provider) => {
    if (provider === "github") {
      return "GitHub";
    }

    if (provider === "email") {
      return m.admin_users_provider_email();
    }

    return m.admin_users_provider_unknown();
  });

  return labels.join(" · ");
}

function getUsersActionCopy(locale: "en" | "zh") {
  if (locale === "zh") {
    return {
      networkError: "网络异常，请稍后再试。",
      updateError: "用户状态更新失败",
      updateSuccess: (name: string, status: CommentUserStatus) =>
        status === "muted" ? `“${name}”已禁言` : `“${name}”已恢复评论`,
    };
  }

  return {
    networkError: "Network error. Try again in a moment.",
    updateError: "User status could not be updated",
    updateSuccess: (name: string, status: CommentUserStatus) =>
      status === "muted" ? `"${name}" muted` : `"${name}" can comment again`,
  };
}

function formatDate(value: string, locale: ReturnType<typeof getCurrentLocale>) {
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
