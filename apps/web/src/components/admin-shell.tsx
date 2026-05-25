import {
  getDashboardMetricsForLocale,
  getSiteSettingsForLocale,
  type SiteSettings,
} from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Link, Outlet } from "@tanstack/react-router";
import {
  FileTextIcon,
  ImageIcon,
  LayersIcon,
  MessageSquareIcon,
  NotebookTabsIcon,
  SettingsIcon,
  SquareLibraryIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { LanguageToggle } from "#/components/language-toggle";
import { SignOutButton } from "#/components/sign-out-button";
import { ThemeToggle } from "#/components/theme-toggle";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

const adminNav = [
  { label: m.admin_nav_overview, href: "/admin", icon: SquareLibraryIcon },
  { label: m.admin_nav_posts, href: "/admin/posts", icon: FileTextIcon },
  { label: m.admin_nav_pages, href: "/admin/pages", icon: NotebookTabsIcon },
  { label: m.admin_nav_projects, href: "/admin/projects", icon: LayersIcon },
  { label: m.admin_nav_assets, href: "/admin/assets", icon: ImageIcon },
  { label: m.admin_nav_comments, href: "/admin/comments", icon: MessageSquareIcon },
  { label: m.admin_nav_settings, href: "/admin/settings", icon: SettingsIcon },
];

export function AdminShell() {
  const locale = getCurrentLocale();
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(getSiteSettingsForLocale(locale));
  const metrics = getDashboardMetricsForLocale(locale);

  useEffect(() => {
    let ignore = false;
    const handleSettingsUpdate = (event: Event) => {
      const nextSettings = (event as CustomEvent<SiteSettings>).detail;

      if (nextSettings) {
        setSiteSettings(nextSettings);
      }
    };

    void fetch(`/api/site?lang=${locale}`)
      .then((response) => (response.ok ? response.json() : undefined))
      .then((payload) => {
        const data = (payload as { data?: SiteSettings } | undefined)?.data;

        if (!ignore && data) {
          setSiteSettings(data);
        }
      });

    window.addEventListener("blogcms:site-settings-updated", handleSettingsUpdate);

    return () => {
      ignore = true;
      window.removeEventListener("blogcms:site-settings-updated", handleSettingsUpdate);
    };
  }, [locale]);

  return (
    <div
      data-theme-preset={siteSettings.themePreset}
      className="min-h-svh bg-background text-foreground"
    >
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-4 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
        <aside className="rounded-lg border border-border/80 bg-card p-3 shadow-xs">
          <div className="flex items-center justify-between gap-3 px-2 py-2">
            <Link to="/" className="text-sm font-semibold">
              {siteSettings.name}
            </Link>
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
          <nav className="mt-4 grid gap-1">
            {adminNav.map((item) => (
              <Button
                key={item.href}
                render={<Link to={item.href} />}
                variant="ghost"
                nativeButton={false}
                className="justify-start rounded-md text-muted-foreground hover:text-foreground"
              >
                <item.icon className="size-4" />
                {item.label()}
              </Button>
            ))}
          </nav>
          <div className="mt-5 border-t border-border/80 pt-4">
            <SignOutButton />
          </div>
        </aside>

        <section className="min-w-0">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-lg border border-border/80 bg-card p-4 shadow-xs"
              >
                <p className="text-xs font-medium text-muted-foreground uppercase">
                  {metric.label}
                </p>
                <p className="mt-3 text-3xl font-semibold">{metric.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{metric.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
}
