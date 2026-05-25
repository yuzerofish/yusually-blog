import { Button } from "@repo/ui/components/button";
import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteShell } from "#/components/site-shell";
import { apiEndpoints, apiTokenScopes } from "#/lib/cms-api";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/docs/api")({
  component: ApiDocsPage,
});

function ApiDocsPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.16em] text-[#1f6f5b] uppercase dark:text-[#75c5ad]">
            {m.api_eyebrow()}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-[#1e2b25] sm:text-5xl dark:text-white">
            {m.api_title()}
          </h1>
          <p className="mt-4 text-base leading-7 text-[#64716a] dark:text-[#aeb8b1]">
            {m.api_description()}
          </p>
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
          <section className="overflow-hidden rounded-lg border border-[#26312c]/10 bg-white shadow-sm dark:border-white/10 dark:bg-[#171d1a]">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-[#f8f5ef] text-xs tracking-[0.12em] text-[#64716a] uppercase dark:bg-white/5 dark:text-[#aeb8b1]">
                <tr>
                  <th className="px-4 py-3">{m.api_method()}</th>
                  <th className="px-4 py-3">{m.api_path()}</th>
                  <th className="px-4 py-3">{m.api_scope()}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#26312c]/10 dark:divide-white/10">
                {apiEndpoints.map((endpoint) => (
                  <tr key={`${endpoint.method}-${endpoint.path}`}>
                    <td className="px-4 py-4 font-mono text-xs">{endpoint.method}</td>
                    <td className="px-4 py-4 font-mono text-xs">{endpoint.path}</td>
                    <td className="px-4 py-4 text-[#64716a] dark:text-[#aeb8b1]">
                      {endpoint.scope}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <aside className="rounded-lg border border-[#26312c]/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#171d1a]">
            <h2 className="text-lg font-semibold">{m.api_token_scopes()}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {apiTokenScopes.map((scope) => (
                <span
                  key={scope}
                  className="rounded-sm bg-[#e7d36a]/40 px-2 py-1 font-mono text-xs text-[#26312c] dark:text-[#f5f1e8]"
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
