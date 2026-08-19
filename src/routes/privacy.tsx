import { createFileRoute } from "@tanstack/react-router";

import { PageHead, SiteLayout } from "@/components/site/SiteLayout";
import { seoHead } from "@/lib/seo";

const title = "Privacy Policy — Kathanika Media";
const description = "We collect only what you send us through our enquiry forms, and we never sell it.";

export const Route = createFileRoute("/privacy")({
  head: () => seoHead("/privacy", "Privacy — Kathanika Media", "Read Kathanika Media privacy information for website visitors and inquiry submissions."),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <PageHead eyebrow="Privacy Policy" title="How we handle your data." intro={description} />
      
    </SiteLayout>
  );
}
