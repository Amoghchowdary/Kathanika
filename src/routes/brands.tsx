import { createFileRoute } from "@tanstack/react-router";

import { PageHead, SiteLayout } from "@/components/site/SiteLayout";
import {
  BrandStrip,
  ClosingCta,
  ServicesWall,
} from "@/components/site/sections";

const title = "For Brands and Leaders — Kathanika Media";
const description = "Content strategy, production, podcasts, social and personal branding.";

export const Route = createFileRoute("/brands")({
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
      <PageHead eyebrow="For Brands and Leaders" title="Turn expertise into audience." intro={description} />
      <ServicesWall /><BrandStrip /><ClosingCta />
    </SiteLayout>
  );
}
