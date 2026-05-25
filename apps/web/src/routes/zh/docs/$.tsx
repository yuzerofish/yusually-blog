import { createFileRoute } from "@tanstack/react-router";

import { docsClientLoader, DocsRouteView } from "#/components/docs-route";
import { docsServerLoader } from "#/lib/docs-data";

export const Route = createFileRoute("/zh/docs/$")({
  component: DocsRoute,
  loader: async ({ params }) => {
    const slugs = params._splat?.split("/").filter(Boolean) ?? [];
    const data = await docsServerLoader({ data: { locale: "zh", slugs } });
    await docsClientLoader.preload(data.path);

    return data;
  },
});

function DocsRoute() {
  return <DocsRouteView data={Route.useLoaderData()} />;
}
