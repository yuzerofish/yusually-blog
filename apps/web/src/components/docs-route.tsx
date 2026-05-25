import browserCollections from "collections/browser";
import type { Root } from "fumadocs-core/page-tree";
import { useFumadocsLoader } from "fumadocs-core/source/client";
import { I18nProvider } from "fumadocs-ui/contexts/i18n";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/layouts/docs/page";
import { createContext, Suspense, useContext } from "react";

import { useMDXComponents } from "#/components/mdx";
import { getDocsI18nProvider, getDocsUrl } from "#/lib/docs-i18n";
import { getDocsLayoutOptions } from "#/lib/docs-layout";

interface DocsRouteContextValue {
  alternateLabel: string;
  alternateUrl: string;
}

const DocsRouteContext = createContext<DocsRouteContextValue | null>(null);

function DocsLocaleLink() {
  const routeContext = useContext(DocsRouteContext);

  if (!routeContext) {
    return null;
  }

  return (
    <div className="mb-6 flex justify-end text-sm">
      <a
        className="text-fd-muted-foreground hover:text-fd-foreground font-medium transition-colors"
        href={routeContext.alternateUrl}
      >
        {routeContext.alternateLabel}
      </a>
    </div>
  );
}

export const docsClientLoader = browserCollections.docs.createClientLoader({
  component({ toc, frontmatter, default: MDX }) {
    return (
      <DocsPage toc={toc}>
        <DocsLocaleLink />
        <DocsTitle>{frontmatter.title}</DocsTitle>
        <DocsDescription>{frontmatter.description}</DocsDescription>
        <DocsBody>
          <MDX components={useMDXComponents()} />
        </DocsBody>
      </DocsPage>
    );
  },
});

interface DocsRouteData {
  locale: "en" | "zh";
  pageTree: Root;
  path: string;
  slugs: string[];
}

export function DocsRouteView({ data }: { readonly data: DocsRouteData }) {
  const loaderData = useFumadocsLoader(data);
  const alternateLocale = data.locale === "en" ? "zh" : "en";
  const alternateUrl = getDocsUrl(data.slugs, alternateLocale);
  const routeContext = {
    alternateLabel: alternateLocale === "zh" ? "中文" : "English",
    alternateUrl,
  };

  return (
    <I18nProvider
      {...getDocsI18nProvider(data.locale)}
      onLocaleChange={(locale) => {
        window.location.href = getDocsUrl(data.slugs, locale === "zh" ? "zh" : "en");
      }}
    >
      <DocsRouteContext.Provider value={routeContext}>
        <DocsLayout {...getDocsLayoutOptions(data.locale, data.slugs)} tree={loaderData.pageTree}>
          <Suspense>{docsClientLoader.useContent(data.path)}</Suspense>
        </DocsLayout>
      </DocsRouteContext.Provider>
    </I18nProvider>
  );
}
