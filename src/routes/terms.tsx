import { createFileRoute } from "@tanstack/react-router";

import { PageHead, SiteLayout } from "@/components/site/SiteLayout";

const title = "Terms — Kathanika Media";
const description = "All content on this site belongs to Kathanika Media unless stated otherwise.";

export const Route = createFileRoute("/terms")({
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
      <PageHead eyebrow="Terms" title="Terms of use." intro={description} />
      
    </SiteLayout>
  );
}
