import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { getDocsUrl, type DocsLocale } from "#/lib/docs-i18n";

export function getDocsLayoutOptions(
  locale: DocsLocale = "en",
  slugs: string[] = [],
): BaseLayoutProps {
  return {
    nav: {
      title: "01mvp-blog-starter",
      url: getDocsUrl([], locale),
    },
    links: [
      {
        text: locale === "en" ? "中文" : "English",
        url: getDocsUrl(slugs, locale === "en" ? "zh" : "en"),
      },
      {
        text: "Blog",
        url: "/blog",
        active: "nested-url",
      },
      {
        text: "OpenAPI",
        url: "/openapi.json",
      },
      {
        text: "GitHub",
        url: "https://github.com/01mvp/blog-starter",
        external: true,
      },
    ],
  };
}
