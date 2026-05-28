import { cn } from "@repo/ui/lib/utils";
import FumadocsLink from "fumadocs-core/link";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import type { ComponentProps } from "react";

import { siteBrandLinkClassName, SiteBrandText } from "#/components/site-brand";

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
    githubUrl: "https://github.com/01mvp/blog-starter",
  };
}
