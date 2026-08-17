import { createFileRoute } from "@tanstack/react-router";

import { PageHead, SiteLayout } from "@/components/site/SiteLayout";
import {
  ClosingCta,
  Philosophy,
  Presence,
} from "@/components/site/sections";

const title = "About — Kathanika Media";
const description = "We build audiences, authority, distribution and intellectual property.";

export const Route = createFileRoute("/about")({
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
      <PageHead eyebrow="About" title="A content ecosystem company." intro={description} />
      <Philosophy /><Presence /><ClosingCta />
    </SiteLayout>
  );
}
