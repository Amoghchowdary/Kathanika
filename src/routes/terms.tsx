import { createFileRoute } from "@tanstack/react-router";

import { PageHead, SiteLayout } from "@/components/site/SiteLayout";
import { seoHead } from "@/lib/seo";

const title = "Terms — Kathanika Media";
const description = "All content on this site belongs to Kathanika Media unless stated otherwise.";

export const Route = createFileRoute("/terms")({
  head: () => seoHead("/terms", "Terms — Kathanika Media", "Read the website terms for Kathanika Media."),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <PageHead eyebrow="Terms" title="Terms of use." intro={description} />
      
    </SiteLayout>
  );
}
