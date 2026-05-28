import {
  localizeSiteSettings,
  type ApiToken,
  type Asset,
  type Comment,
  type Post,
  type SiteSettings,
  type SupportedLocale,
} from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRightIcon,
  DatabaseIcon,
  FileTextIcon,
  ImageIcon,
  KeyRoundIcon,
  MessageSquareIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { AdminPageHeader, AdminPanel } from "#/components/admin/admin-ui";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/admin/")({
  component: AdminOverviewPage,
});

function AdminOverviewPage() {
  const locale = getCurrentLocale();
  const defaultSettings: SiteSettings = {
    name: "Blog",
    description: "",
    url: "",
    authorName: "",
    authorBio: "",
    avatarUrl: "",
    defaultOgImage: "",
    socialLinks: [],
    navigation: [],
    rssEnabled: true,
    commentsEnabled: true,
    commentsRequireApproval: true,
    commentAutoBlockEnabled: false,
    commentBlockedKeywords: [],
    emailVerificationEnabled: false,
    indexingEnabled: true,
    themePreset: "maker",
    layoutPreset: "journal",
    locales: ["en", "zh"],
    primaryLanguage: "en",
  };
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSettings);
  const [stats, setStats] = useState<OverviewStats>(emptyOverviewStats);

  useEffect(() => {
    let ignore = false;

    void Promise.all([
      fetch(`/api/site?lang=${locale}`).then((r) => (r.ok ? r.json() : undefined)),
      fetch(`/api/posts?status=all&lang=${locale}`).then((r) => (r.ok ? r.json() : undefined)),
      fetch(`/api/comments?lang=${locale}`).then((r) => (r.ok ? r.json() : undefined)),
      fetch("/api/assets").then((r) => (r.ok ? r.json() : undefined)),
      fetch("/api/tokens").then((r) => (r.ok ? r.json() : undefined)),
    ]).then(([sitePayload, postPayload, commentPayload, assetPayload, tokenPayload]) => {
      const settings = (sitePayload as { data?: SiteSettings } | undefined)?.data;
      const posts = (postPayload as { data?: Post[] } | undefined)?.data ?? [];
      const comments = (commentPayload as { data?: Comment[] } | undefined)?.data ?? [];
      const assets = (assetPayload as { data?: Asset[] } | undefined)?.data ?? [];
      const tokens = (tokenPayload as { data?: ApiToken[] } | undefined)?.data ?? [];

      if (ignore) {
        return;
      }

      if (settings) {
        setSiteSettings(localizeSiteSettings(settings, locale));
      }
      setStats(getOverviewStats({ assets, comments, posts, tokens }));
    });

    return () => {
      ignore = true;
    };
  }, [locale]);

  const copy = getOverviewCopy(locale);
  const cards = [
    {
      icon: FileTextIcon,
      label: m.admin_posts_title(),
      value: stats.posts.total,
      detail: copy.postsDetail(stats.posts),
    },
    {
      icon: MessageSquareIcon,
      label: m.admin_comments_title(),
      value: stats.comments.total,
      detail: copy.commentsDetail(stats.comments),
    },
    {
      icon: ImageIcon,
      label: m.admin_assets_title(),
      value: stats.assets.total,
      detail: copy.assetsDetail(stats.assets),
    },
    {
      icon: KeyRoundIcon,
      label: m.admin_tokens_title(),
      value: stats.tokens.active,
      detail: copy.tokensDetail(stats.tokens),
    },
    {
      icon: DatabaseIcon,
      label: copy.recordsLabel,
      value: stats.records.total,
      detail: copy.recordsDetail(stats.records),
    },
  ];

  return (
    <div className="grid gap-5">
      <AdminPageHeader
        eyebrow={m.admin_overview_eyebrow()}
        title={m.admin_overview_title()}
        description={m.admin_metric_overview_description({ name: siteSettings.name })}
        actions={
          <Button render={<Link to="/admin/posts" />} nativeButton={false}>
            {m.admin_manage_posts()}
            <ArrowRightIcon />
          </Button>
        }
      />

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <AdminPanel key={card.label} className="min-h-32">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    {card.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-normal">{card.value}</p>
                </div>
                <Icon className="size-5 text-link" />
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.detail}</p>
            </AdminPanel>
          );
        })}
      </div>
    </div>
  );
}

type OverviewStats = {
  posts: {
    archived: number;
    draft: number;
    published: number;
    scheduled: number;
    total: number;
  };
  comments: {
    approved: number;
    pending: number;
    spam: number;
    total: number;
  };
  assets: {
    sizeBytes: number;
    total: number;
  };
  tokens: {
    active: number;
    total: number;
  };
  records: {
    content: number;
    total: number;
  };
};

const emptyOverviewStats: OverviewStats = {
  assets: { sizeBytes: 0, total: 0 },
  comments: { approved: 0, pending: 0, spam: 0, total: 0 },
  posts: { archived: 0, draft: 0, published: 0, scheduled: 0, total: 0 },
  records: { content: 0, total: 0 },
  tokens: { active: 0, total: 0 },
};

function getOverviewStats({
  assets,
  comments,
  posts,
  tokens,
}: {
  readonly assets: Asset[];
  readonly comments: Comment[];
  readonly posts: Post[];
  readonly tokens: ApiToken[];
}): OverviewStats {
  return {
    assets: {
      sizeBytes: assets.reduce((total, asset) => total + asset.sizeBytes, 0),
      total: assets.length,
    },
    comments: {
      approved: comments.filter((comment) => comment.status === "approved").length,
      pending: comments.filter((comment) => comment.status === "pending").length,
      spam: comments.filter((comment) => comment.status === "spam").length,
      total: comments.length,
    },
    posts: {
      archived: posts.filter((post) => post.status === "archived").length,
      draft: posts.filter((post) => post.status === "draft").length,
      published: posts.filter((post) => post.status === "published").length,
      scheduled: posts.filter((post) => post.status === "scheduled").length,
      total: posts.length,
    },
    records: {
      content: posts.length,
      total: posts.length + comments.length + assets.length,
    },
    tokens: {
      active: tokens.filter((token) => !token.revokedAt).length,
      total: tokens.length,
    },
  };
}

function getOverviewCopy(locale: SupportedLocale) {
  if (locale === "zh") {
    return {
      assetsDetail: (assets: OverviewStats["assets"]) =>
        `${formatBytes(assets.sizeBytes)} 已上传资源。`,
      commentsDetail: (comments: OverviewStats["comments"]) =>
        `${comments.pending} 条待审，${comments.approved} 条已通过，${comments.spam} 条垃圾评论。`,
      postsDetail: (posts: OverviewStats["posts"]) =>
        `${posts.published} 篇已发布，${posts.draft} 篇草稿，${posts.scheduled} 篇定时，${posts.archived} 篇归档。`,
      recordsDetail: (records: OverviewStats["records"]) =>
        `内容 ${records.content} 条，总记录 ${records.total} 条。`,
      recordsLabel: "内容记录",
      tokensDetail: (tokens: OverviewStats["tokens"]) =>
        `${tokens.active} 个可用 Token，共 ${tokens.total} 个。`,
    };
  }

  return {
    assetsDetail: (assets: OverviewStats["assets"]) => `${formatBytes(assets.sizeBytes)} uploaded.`,
    commentsDetail: (comments: OverviewStats["comments"]) =>
      `${comments.pending} pending, ${comments.approved} approved, ${comments.spam} spam.`,
    postsDetail: (posts: OverviewStats["posts"]) =>
      `${posts.published} published, ${posts.draft} drafts, ${posts.scheduled} scheduled, ${posts.archived} archived.`,
    recordsDetail: (records: OverviewStats["records"]) =>
      `Content ${records.content}. Total records ${records.total}.`,
    recordsLabel: "Content records",
    tokensDetail: (tokens: OverviewStats["tokens"]) =>
      `${tokens.active} active tokens, ${tokens.total} total.`,
  };
}

function formatBytes(value: number) {
  if (value < 1024) {
    return `${value} B`;
  }

  if (value < 1024 * 1024) {
    return `${(value / 1024).toFixed(1)} KB`;
  }

  return `${(value / 1024 / 1024).toFixed(1)} MB`;
}
