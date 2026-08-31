import { createFileRoute } from "@tanstack/react-router";

import { PageHead, SiteLayout } from "@/components/site/SiteLayout";
import { seoHead } from "@/lib/seo";
import {
  BrandStrip,
  ClosingCta,
  ServicesWall,
} from "@/components/site/sections";

const title = "For Brands and Leaders — Kathanika Media";
const description = "Content strategy, production, podcasts, social and personal branding.";

export const Route = createFileRoute("/brands")({
  head: () => seoHead("/brands", title, description),
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
