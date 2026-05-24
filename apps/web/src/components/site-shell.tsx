import { SiGithub } from "@icons-pack/react-simple-icons";
import { siteSettings } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Link } from "@tanstack/react-router";
import { BookOpenIcon, RssIcon, SettingsIcon } from "lucide-react";

import { ThemeToggle } from "#/components/theme-toggle";

export function SiteShell({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-[#f8f5ef] text-[#26312c] dark:bg-[#111614] dark:text-[#f5f1e8]">
      <header className="sticky top-0 z-40 border-b border-[#26312c]/10 bg-[#f8f5ef]/92 backdrop-blur dark:border-white/10 dark:bg-[#111614]/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#1f6f5b] text-white">
              <BookOpenIcon className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold tracking-[0.14em] uppercase">
                {siteSettings.name}
              </span>
              <span className="hidden text-xs text-[#64716a] sm:block dark:text-[#aeb8b1]">
                Cloudflare-native publishing
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {siteSettings.navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="rounded-md px-3 py-2 text-sm text-[#46524c] transition hover:bg-white hover:text-[#14201a] dark:text-[#d8ded8] dark:hover:bg-white/10 dark:hover:text-white"
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
              aria-label="RSS feed"
            >
              <RssIcon />
            </Button>
            <Button
              render={<a href="https://github.com/01mvp/blog-starter" />}
              variant="ghost"
              size="icon-sm"
              nativeButton={false}
              aria-label="GitHub repository"
            >
              <SiGithub className="size-4" />
            </Button>
            <Button render={<Link to="/admin" />} variant="outline" size="sm" nativeButton={false}>
              <SettingsIcon />
              Admin
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-[#26312c]/10 bg-[#eee8da] dark:border-white/10 dark:bg-[#171d1a]">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold">{siteSettings.name}</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64716a] dark:text-[#aeb8b1]">
              {siteSettings.description}
            </p>
          </div>
          <div className="flex flex-wrap items-start gap-2 md:justify-end">
            {siteSettings.socialLinks.map((link) => (
              <Button
                key={link.href}
                render={<a href={link.href} />}
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
