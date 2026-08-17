import { createFileRoute } from "@tanstack/react-router";

import { PageHead, SiteLayout } from "@/components/site/SiteLayout";

const title = "Privacy Policy — Kathanika Media";
const description = "We collect only what you send us through our enquiry forms, and we never sell it.";

export const Route = createFileRoute("/privacy")({
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
      <PageHead eyebrow="Privacy Policy" title="How we handle your data." intro={description} />
      
    </SiteLayout>
  );
}
