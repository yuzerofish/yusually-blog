import { cn } from "@repo/ui/lib/utils";
import FumadocsLink from "fumadocs-core/link";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import type { ComponentProps } from "react";

import { siteBrandLinkClassName, SiteBrandText } from "#/components/site-brand";
import { ThemeToggle } from "#/components/theme-toggle";

function DocsThemeSwitch({ className }: ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center", className)}>
      <ThemeToggle className="text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground size-7 rounded-md" />
    </div>
  );
}

export function getDocsLayoutOptions(siteTitle = "01mvp-blog-starter"): BaseLayoutProps {
  return {
    nav: {
      title: ({ className, href = "/", ...props }: ComponentProps<"a">) => (
        <FumadocsLink
          href={href}
          {...props}
          className={cn(siteBrandLinkClassName, "inline-flex max-w-full items-center", className)}
        >
          <SiteBrandText name={siteTitle} />
        </FumadocsLink>
      ),
      url: "/",
    },
    slots: {
      themeSwitch: DocsThemeSwitch,
    },
    githubUrl: "https://github.com/01mvp/blog-starter",
  };
}
