import { createFileRoute } from "@tanstack/react-router";

import { PageHead, SiteLayout } from "@/components/site/SiteLayout";
import {
  ClosingCta,
  Lifecycle,
  ServicesWall,
} from "@/components/site/sections";

const title = "Services — Kathanika Media";
const description = "Strategy, production, post, publishing, distribution and growth.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <PageHead eyebrow="Services" title="Everything content." intro={description} />
      <ServicesWall /><Lifecycle /><ClosingCta />
    </SiteLayout>
  );
}
