import { SiGithub } from "@icons-pack/react-simple-icons";
import { getSiteSettingsForLocale, type SiteSettings } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Link } from "@tanstack/react-router";
import { BookOpenIcon, RssIcon, SettingsIcon } from "lucide-react";

import { LanguageToggle } from "#/components/language-toggle";
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
  const navigation = [
    { label: m.nav_blog(), href: "/blog" },
    { label: "Docs", href: "/docs" },
    { label: m.nav_tags(), href: "/tags" },
    { label: m.nav_archive(), href: "/archive" },
    { label: m.nav_projects(), href: "/projects" },
    { label: m.nav_about(), href: "/about" },
  ];

  return (
    <div
      data-theme-preset={siteSettings.themePreset}
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
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-border/80 bg-muted/45">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold">{siteSettings.name}</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {siteSettings.description}
            </p>
          </div>
          <div className="flex flex-wrap items-start gap-2 md:justify-end">
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
