import { getDashboardMetricsForLocale, getSiteSettingsForLocale } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Link, Outlet } from "@tanstack/react-router";
import {
  FileTextIcon,
  ImageIcon,
  MessageSquareIcon,
  SettingsIcon,
  SquareLibraryIcon,
} from "lucide-react";

import { LanguageToggle } from "#/components/language-toggle";
import { SignOutButton } from "#/components/sign-out-button";
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
  const siteSettings = getSiteSettingsForLocale(locale);
  const metrics = getDashboardMetricsForLocale(locale);

  return (
    <div className="min-h-svh bg-[#f4f1ea] text-[#26312c] dark:bg-[#101412] dark:text-[#f5f1e8]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-4 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
        <aside className="rounded-lg border border-[#26312c]/10 bg-white p-3 dark:border-white/10 dark:bg-[#171d1a]">
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
                className="justify-start rounded-md"
              >
                <item.icon className="size-4" />
                {item.label()}
              </Button>
            ))}
          </nav>
          <div className="mt-5 border-t border-[#26312c]/10 pt-4 dark:border-white/10">
            <SignOutButton />
          </div>
        </aside>

        <section className="min-w-0">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-lg border border-[#26312c]/10 bg-white p-4 dark:border-white/10 dark:bg-[#171d1a]"
              >
                <p className="text-xs font-medium tracking-[0.14em] text-[#64716a] uppercase dark:text-[#aeb8b1]">
                  {metric.label}
                </p>
                <p className="mt-3 text-3xl font-semibold">{metric.value}</p>
                <p className="mt-1 text-xs text-[#64716a] dark:text-[#aeb8b1]">{metric.detail}</p>
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
