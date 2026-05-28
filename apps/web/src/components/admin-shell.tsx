import { getSiteSettingsForLocale, type SiteSettings } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { Link, Outlet } from "@tanstack/react-router";
import {
  FileTextIcon,
  ImageIcon,
  MessageSquareIcon,
  SettingsIcon,
  SquareLibraryIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { LanguageToggle } from "#/components/language-toggle";
import { SignOutButton } from "#/components/sign-out-button";
import { siteBrandLinkClassName, SiteBrandText } from "#/components/site-brand";
import {
  getNextStylePreset,
  resolveStylePreset,
  StylePresetCycleButton,
  StylePresetRuntimeScript,
} from "#/components/style-preset-switcher";
import { ThemeToggle } from "#/components/theme-toggle";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

const adminNav = [
  { label: m.admin_nav_overview, href: "/admin", icon: SquareLibraryIcon },
  { label: m.admin_nav_posts, href: "/admin/posts", icon: FileTextIcon },
  { label: m.admin_nav_assets, href: "/admin/assets", icon: ImageIcon },
  { label: m.admin_nav_comments, href: "/admin/comments", icon: MessageSquareIcon },
  { label: m.admin_nav_settings, href: "/admin/settings", icon: SettingsIcon },
];

export function AdminShell() {
  const locale = getCurrentLocale();
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(getSiteSettingsForLocale(locale));
  const preset = resolveStylePreset(siteSettings.themePreset, siteSettings.layoutPreset);
  const nextPreset = getNextStylePreset(preset);

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
      data-theme-preset={preset.themePreset}
      data-layout-preset={preset.layoutPreset}
      className="min-h-svh bg-background text-foreground lg:pl-72"
    >
      <DesktopSidebar locale={locale} nextPreset={nextPreset} siteName={siteSettings.name} />
      <MobileAdminHeader locale={locale} nextPreset={nextPreset} siteName={siteSettings.name} />
      <StylePresetRuntimeScript initialPreset={preset} locale={locale} />

      <main className="min-w-0 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function DesktopSidebar({
  locale,
  nextPreset,
  siteName,
}: {
  readonly locale: ReturnType<typeof getCurrentLocale>;
  readonly nextPreset: ReturnType<typeof getNextStylePreset>;
  readonly siteName: string;
}) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
      <div className="border-b border-sidebar-border px-5 py-4">
        <Link to="/" className={cn(siteBrandLinkClassName, "block")} title={siteName}>
          <SiteBrandText name={siteName} />
        </Link>
        <div className="mt-3 flex items-center gap-1">
          <LanguageToggle />
          <StylePresetCycleButton locale={locale} nextPreset={nextPreset} />
          <ThemeToggle />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-3 py-4">
        <AdminNavItems />

        <div className="mt-auto border-t border-sidebar-border pt-4">
          <SignOutButton className="w-full justify-center" />
        </div>
      </div>
    </aside>
  );
}

function MobileAdminHeader({
  locale,
  nextPreset,
  siteName,
}: {
  readonly locale: ReturnType<typeof getCurrentLocale>;
  readonly nextPreset: ReturnType<typeof getNextStylePreset>;
  readonly siteName: string;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-sidebar-border bg-sidebar/95 text-sidebar-foreground backdrop-blur-xl lg:hidden">
      <div className="flex min-h-14 items-center justify-between gap-3 px-4">
        <Link to="/" className={siteBrandLinkClassName} title={siteName}>
          <SiteBrandText name={siteName} />
        </Link>
        <div className="flex shrink-0 items-center gap-1">
          <LanguageToggle />
          <StylePresetCycleButton locale={locale} nextPreset={nextPreset} />
          <ThemeToggle />
        </div>
      </div>
      <div className="overflow-x-auto border-t border-sidebar-border px-3 py-2">
        <AdminNavItems compact />
      </div>
    </header>
  );
}

function AdminNavItems({ compact = false }: { readonly compact?: boolean }) {
  return (
    <nav className={cn("grid gap-1", compact && "flex min-w-max")}>
      {adminNav.map((item) => {
        const Icon = item.icon;

        return (
          <Button
            key={item.href}
            render={
              <Link
                to={item.href}
                activeOptions={{ exact: item.href === "/admin" }}
                activeProps={{
                  className: "bg-sidebar-accent text-sidebar-accent-foreground",
                }}
                inactiveProps={{
                  className:
                    "text-sidebar-foreground/70 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground",
                }}
              />
            }
            variant="ghost"
            size={compact ? "sm" : "default"}
            nativeButton={false}
            className={cn("justify-start rounded-md px-3", compact ? "h-9 w-auto" : "h-10 w-full")}
          >
            <Icon className="size-4" />
            <span>{item.label()}</span>
          </Button>
        );
      })}
    </nav>
  );
}
