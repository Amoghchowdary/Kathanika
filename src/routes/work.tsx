import { createFileRoute } from "@tanstack/react-router";

import { PageHead, SiteLayout } from "@/components/site/SiteLayout";
import {
  BrandStrip,
  ClosingCta,
  ProofOfWork,
} from "@/components/site/sections";

const title = "Know About Us — Kathanika Media";
const description = "A selection of productions, podcasts and campaigns from across the ecosystem.";

export const Route = createFileRoute("/work")({
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
      <PageHead eyebrow="Know About Us" title="The work speaks first." intro={description} />
      <ProofOfWork /><BrandStrip /><ClosingCta />
    </SiteLayout>
  );
}
