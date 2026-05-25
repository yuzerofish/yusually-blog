import { localizeSiteSettings } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteShell } from "#/components/site-shell";
import { apiEndpoints, apiTokenScopes } from "#/lib/cms-api";
import { $getSiteSettingsPageData } from "#/lib/cms-server";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/docs/api")({
  loader: () => $getSiteSettingsPageData(),
  component: ApiDocsPage,
});

function ApiDocsPage() {
  const data = Route.useLoaderData();
  const siteSettings = localizeSiteSettings(data.siteSettings, getCurrentLocale());

  return (
    <SiteShell siteSettings={siteSettings}>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-link uppercase">{m.api_eyebrow()}</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{m.api_title()}</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">{m.api_description()}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              render={<a href="/openapi.json" aria-label={m.api_open_openapi()} />}
              nativeButton={false}
            >
              {m.api_open_openapi()}
            </Button>
            <Button render={<Link to="/admin/settings" />} variant="outline" nativeButton={false}>
              {m.api_manage_settings()}
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <section className="overflow-hidden rounded-lg border border-border/80 bg-card shadow-xs">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-muted/55 text-xs text-muted-foreground uppercase">
                <tr>
                  <th className="px-4 py-3">{m.api_method()}</th>
                  <th className="px-4 py-3">{m.api_path()}</th>
                  <th className="px-4 py-3">{m.api_scope()}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/80">
                {apiEndpoints.map((endpoint) => (
                  <tr key={`${endpoint.method}-${endpoint.path}`}>
                    <td className="px-4 py-4 font-mono text-xs">{endpoint.method}</td>
                    <td className="px-4 py-4 font-mono text-xs">{endpoint.path}</td>
                    <td className="px-4 py-4 text-muted-foreground">{endpoint.scope}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <aside className="rounded-lg border border-border/80 bg-card p-5 shadow-xs">
            <h2 className="text-lg font-semibold">{m.api_token_scopes()}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {apiTokenScopes.map((scope) => (
                <span
                  key={scope}
                  className="rounded-sm bg-accent px-2 py-1 font-mono text-xs text-accent-foreground"
                >
                  {scope}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
