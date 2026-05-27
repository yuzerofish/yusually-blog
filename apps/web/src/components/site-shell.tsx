import { SiGithub } from "@icons-pack/react-simple-icons";
import { getSiteSettingsForLocale, type SiteSettings } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Link } from "@tanstack/react-router";
import { BookOpenIcon, ExternalLinkIcon, RssIcon, SettingsIcon } from "lucide-react";

import { LanguageToggle } from "#/components/language-toggle";
import {
  getNextStylePreset,
  resolveStylePreset,
  StylePresetCycleButton,
  StylePresetRuntimeScript,
} from "#/components/style-preset-switcher";
import { ThemeToggle } from "#/components/theme-toggle";
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
  const preset = resolveStylePreset(siteSettings.themePreset, siteSettings.layoutPreset);
  const nextPreset = getNextStylePreset(preset);
  const footerCopy = getFooterCopy(locale);
  const navigation = [
    { label: m.nav_blog(), href: "/blog" },
    { label: "Docs", href: "/docs" },
    { label: m.nav_tags(), href: "/tags" },
    { label: m.nav_archive(), href: "/archive" },
    { label: m.nav_about(), href: "/about" },
  ];

  return (
    <div
      data-theme-preset={preset.themePreset}
      data-layout-preset={preset.layoutPreset}
      className="min-h-svh bg-background text-foreground"
    >
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-3" aria-label={siteSettings.name}>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-xs">
              <BookOpenIcon className="size-5" />
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block text-sm leading-5 font-semibold">{siteSettings.name}</span>
              <span className="hidden text-xs text-muted-foreground sm:block">
                {m.site_subtitle()}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              render={<Link to="/rss.xml" />}
              variant="ghost"
              size="icon-sm"
              nativeButton={false}
              aria-label={m.rss_feed()}
            >
              <RssIcon />
            </Button>
            <Button
              render={
                <a
                  href="https://github.com/01mvp/blog-starter"
                  aria-label={m.github_repository()}
                />
              }
              variant="ghost"
              size="icon-sm"
              nativeButton={false}
              aria-label={m.github_repository()}
            >
              <SiGithub className="size-4" />
            </Button>
            <Button render={<Link to="/admin" />} variant="outline" size="sm" nativeButton={false}>
              <SettingsIcon />
              {m.admin()}
            </Button>
            <StylePresetCycleButton locale={locale} nextPreset={nextPreset} />
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <StylePresetRuntimeScript initialPreset={preset} locale={locale} />

      <main>{children}</main>

      <footer className="border-t border-border/80 bg-muted/45">
        <div className="mx-auto grid max-w-7xl gap-7 px-4 py-8 sm:px-6 md:grid-cols-[1fr_1.1fr] lg:grid-cols-[1.05fr_1.1fr_0.75fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold">{siteSettings.name}</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {siteSettings.description}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">{footerCopy.title}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
              {footerCopy.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-lg border border-border bg-background p-3 transition hover:border-foreground"
                >
                  <span className="flex items-center justify-between gap-3 text-sm font-semibold">
                    {link.label}
                    <ExternalLinkIcon className="size-3.5 shrink-0 text-muted-foreground transition group-hover:text-foreground" />
                  </span>
                  <span className="mt-2 block text-xs leading-5 text-muted-foreground">
                    {link.description}
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-start gap-2 lg:justify-end">
            {siteSettings.socialLinks.map((link) => (
              <Button
                key={link.href}
                render={<a href={link.href} aria-label={link.label} />}
                variant="outline"
                size="sm"
                nativeButton={false}
              >
                {link.label}
              </Button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function getFooterCopy(locale: string) {
  if (locale === "zh") {
    return {
      title: "更多 01MVP 内容",
      links: [
        {
          label: "makerjackie.com",
          href: "https://makerjackie.com",
          description: "Jackie 的个人博客，记录产品、写作和构建过程。",
        },
        {
          label: "01mvp.com",
          href: "https://01mvp.com",
          description: "01MVP 教程网站，整理从想法到上线的实战方法。",
        },
      ],
    };
  }

  return {
    title: "More from 01MVP",
    links: [
      {
        label: "makerjackie.com",
        href: "https://makerjackie.com",
        description: "Jackie's personal blog for product notes, essays, and build logs.",
      },
      {
        label: "01mvp.com",
        href: "https://01mvp.com",
        description: "01MVP tutorials for taking ideas from first draft to launch.",
      },
    ],
  };
}
