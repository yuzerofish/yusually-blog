import { localizeSiteSettings } from "@repo/core";
import { portfolioItems, type PortfolioItem } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3Icon,
  BookOpenIcon,
  CameraIcon,
  ExternalLinkIcon,
  GlobeIcon,
  MapIcon,
  type LucideIcon,
} from "lucide-react";

import { SiteShell } from "#/components/site-shell";
import { $getSiteSettingsPageData } from "#/lib/cms-server";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/works")({
  loader: () => $getSiteSettingsPageData(),
  head: () => {
    const locale = getCurrentLocale();
    return {
      meta: [
        {
          title: locale === "zh" ? "作品集" : "Works",
        },
        {
          name: "description",
          content:
            locale === "zh"
              ? "Yusually 亲手搭建的作品集 — TravelTrace、Shape of World、自媒体研究等项目和探索。"
              : "Portfolio of projects by Yusually — TravelTrace, Shape of World, self-media research, and more.",
        },
      ],
    };
  },
  component: WorksPage,
});

const iconMap: Record<string, LucideIcon> = {
  MapIcon,
  GlobeIcon,
  BookOpenIcon,
  CameraIcon,
  BarChart3Icon,
};

function WorksPage() {
  const data = Route.useLoaderData();
  const locale = getCurrentLocale();
  const siteSettings = localizeSiteSettings(data.siteSettings, locale);
  const isZh = locale === "zh";

  return (
    <SiteShell siteSettings={siteSettings}>
      <div className="bg-background">
        <section className="border-b border-border">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
            <h1 className="text-4xl font-semibold sm:text-5xl">{m.works_title()}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              {m.works_subtitle()}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item) => (
              <WorksCard key={item.id} item={item} isZh={isZh} />
            ))}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

function WorksCard({ item, isZh }: { readonly item: PortfolioItem; readonly isZh: boolean }) {
  const Icon = iconMap[item.iconName] ?? ExternalLinkIcon;
  const openInNewTab = item.newTab || item.href.startsWith("http");

  return (
    <a
      href={item.href}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      className="group flex flex-col rounded-lg border border-border bg-card p-5 shadow-xs transition hover:border-ring/45 hover:shadow-sm"
    >
      <span className="flex size-10 items-center justify-center rounded-md bg-muted text-foreground">
        <Icon className="size-5" />
      </span>
      <span className="mt-4 block text-lg leading-tight font-semibold group-hover:text-link">
        {isZh ? item.titleZh : item.title}
      </span>
      <span className="mt-2 block text-xs font-medium text-link">
        {isZh ? item.categoryZh : item.category}
      </span>
      <span className="mt-2 block flex-1 text-sm leading-6 text-muted-foreground">
        {isZh ? item.descriptionZh : item.description}
      </span>
      <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-link">
        {isZh ? item.ctaZh : item.cta}
        <ExternalLinkIcon className="size-4" />
      </span>
    </a>
  );
}
