import { SiGithub } from "@icons-pack/react-simple-icons";
import { useAuth } from "@repo/auth/tanstack/hooks";
import { getSiteSettingsForLocale, type SiteSettings } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Link, useLocation } from "@tanstack/react-router";
import { Loader2Icon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { LanguageToggle } from "#/components/language-toggle";
import { siteBrandLinkClassName, SiteBrandText } from "#/components/site-brand";
import {
  getNextStylePreset,
  resolveStylePreset,
  StylePresetCycleButton,
  StylePresetRuntimeScript,
} from "#/components/style-preset-switcher";
import { ThemeToggle } from "#/components/theme-toggle";
import { getLocalizedDocsHref } from "#/lib/docs-i18n";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export function SiteShell({
  children,
  siteSettings: providedSiteSettings,
}: {
  readonly children: React.ReactNode;
  readonly siteSettings?: SiteSettings;
}) {
  const locale = getCurrentLocale();
  const siteSettings = providedSiteSettings ?? getSiteSettingsForLocale(locale);
  const settingsPreset = resolveStylePreset(siteSettings.themePreset, siteSettings.layoutPreset);
  const [presetOverride, setPresetOverride] = useState<typeof settingsPreset | null>(null);
  const preset = presetOverride ?? settingsPreset;
  const nextPreset = getNextStylePreset(preset);
  const searchLabel = locale === "zh" ? "搜索" : "Search";
  const githubLink = siteSettings.socialLinks.find(isGitHubSocialLink);
  const footerSocialLinks = siteSettings.socialLinks.filter((link) => !isGitHubSocialLink(link));
  const navigation = siteSettings.navigation.length
    ? siteSettings.navigation
    : [
        { label: m.nav_blog(), href: "/blog" },
        { label: m.nav_docs(), href: "/docs" },
        { label: m.nav_series(), href: "/series" },
        { label: m.nav_tags(), href: "/tags" },
        { label: m.nav_about(), href: "/about" },
      ];
  const localizedNavigation = navigation.map((item) => ({
    ...item,
    href: getLocalizedDocsHref(item.href, locale),
  }));

  usePublicPageViewTracking();

  return (
    <div
      data-theme-preset={preset.themePreset}
      data-layout-preset={preset.layoutPreset}
      className="flex min-h-svh flex-col bg-background text-foreground"
    >
      <header className="sticky top-0 z-40 border-b-2 border-foreground bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-14 max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
          <Link to="/" className={siteBrandLinkClassName} aria-label={siteSettings.name}>
            <SiteBrandText name={siteSettings.name} />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {localizedNavigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-foreground transition hover:text-muted-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5">
            <Link
              to="/blog"
              search={{ q: "", tag: "", series: "", page: 1 }}
              className="hidden h-9 min-w-28 items-center gap-2 rounded-md px-2.5 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground lg:flex"
            >
              <SearchIcon className="size-4" />
              <span>{searchLabel}</span>
            </Link>
            <LanguageToggle />
            <StylePresetCycleButton
              locale={locale}
              nextPreset={nextPreset}
              onSelect={setPresetOverride}
            />
            <ThemeToggle />
            {githubLink ? <HeaderGitHubLink link={githubLink} /> : null}
            <HeaderAuthAction locale={locale} />
          </div>
        </div>
      </header>
      <StylePresetRuntimeScript initialPreset={preset} locale={locale} />

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/80 bg-muted/45">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold">{siteSettings.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{siteSettings.description}</p>
          </div>
          {footerSocialLinks.length ? (
            <div className="flex flex-wrap items-center gap-3">
              {footerSocialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs text-muted-foreground transition hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </footer>
    </div>
  );
}

let lastTrackedPageViewKey = "";

function usePublicPageViewTracking() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const path = `${location.pathname}${location.searchStr ?? ""}`;

    if (!shouldTrackPublicPath(path) || path === lastTrackedPageViewKey) {
      return;
    }

    lastTrackedPageViewKey = path;

    const payload = JSON.stringify({
      path,
      postSlug: getTrackedPostSlug(location.pathname),
      referrer: document.referrer || null,
    });

    if (navigator.sendBeacon) {
      const sent = navigator.sendBeacon(
        "/api/analytics/track",
        new Blob([payload], { type: "application/json" }),
      );

      if (sent) {
        return;
      }
    }

    void fetch("/api/analytics/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  }, [location.pathname, location.searchStr]);
}

function shouldTrackPublicPath(path: string) {
  const pathname = path.split("?")[0];

  return (
    pathname !== "/login" &&
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/uploads")
  );
}

function getTrackedPostSlug(pathname: string) {
  const match = /^\/blog\/([^/?#]+)/.exec(pathname);

  return match ? decodeURIComponent(match[1]) : null;
}

type SocialLink = SiteSettings["socialLinks"][number];

function isGitHubSocialLink(link: SocialLink) {
  return link.label.trim().toLowerCase() === "github" || link.href.includes("github.com");
}

function HeaderGitHubLink({ link }: { readonly link: SocialLink }) {
  return (
    <Button
      render={<a href={link.href} aria-label={m.github_repository()} />}
      variant="ghost"
      size="icon-sm"
      nativeButton={false}
      aria-label={m.github_repository()}
      title={link.label}
    >
      <SiGithub className="size-4" />
      <span className="sr-only">{link.label}</span>
    </Button>
  );
}

function HeaderAuthAction({ locale }: { readonly locale: string }) {
  const { user, isPending } = useAuth();
  const adminLabel = locale === "zh" ? "后台" : "Admin";

  if (isPending) {
    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled
        className="min-w-14"
        aria-label={m.login()}
      >
        <Loader2Icon className="animate-spin" />
      </Button>
    );
  }

  if (user) {
    return (
      <Button
        render={<Link to="/admin" />}
        variant="outline"
        size="sm"
        nativeButton={false}
        className="min-w-14 px-3 font-semibold"
        aria-label={adminLabel}
      >
        {adminLabel}
      </Button>
    );
  }

  return (
    <Button
      render={<Link to="/login" />}
      variant="outline"
      size="sm"
      nativeButton={false}
      className="min-w-14 px-3 font-semibold"
      aria-label={m.login()}
    >
      {m.login()}
    </Button>
  );
}
