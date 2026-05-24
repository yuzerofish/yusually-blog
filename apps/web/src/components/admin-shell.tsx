import { dashboardMetrics } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Link, Outlet } from "@tanstack/react-router";
import {
  FileTextIcon,
  ImageIcon,
  MessageSquareIcon,
  SettingsIcon,
  SquareLibraryIcon,
} from "lucide-react";

import { SignOutButton } from "#/components/sign-out-button";
import { ThemeToggle } from "#/components/theme-toggle";

const adminNav = [
  { label: "Overview", href: "/admin", icon: SquareLibraryIcon },
  { label: "Posts", href: "/admin/posts", icon: FileTextIcon },
  { label: "Assets", href: "/admin/assets", icon: ImageIcon },
  { label: "Comments", href: "/admin/comments", icon: MessageSquareIcon },
  { label: "Settings", href: "/admin/settings", icon: SettingsIcon },
];

export function AdminShell() {
  return (
    <div className="min-h-svh bg-[#f4f1ea] text-[#26312c] dark:bg-[#101412] dark:text-[#f5f1e8]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-4 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
        <aside className="rounded-lg border border-[#26312c]/10 bg-white p-3 dark:border-white/10 dark:bg-[#171d1a]">
          <div className="flex items-center justify-between gap-3 px-2 py-2">
            <Link to="/" className="text-sm font-semibold">
              Cloud Blog CMS
            </Link>
            <ThemeToggle />
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
                {item.label}
              </Button>
            ))}
          </nav>
          <div className="mt-5 border-t border-[#26312c]/10 pt-4 dark:border-white/10">
            <SignOutButton />
          </div>
        </aside>

        <section className="min-w-0">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardMetrics.map((metric) => (
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
