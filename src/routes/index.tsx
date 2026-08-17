import { createFileRoute } from "@tanstack/react-router";

import { Logo } from "@/components/site/Logo";
import { SiteLayout } from "@/components/site/SiteLayout";
import { TopTenChannels } from "@/components/site/TopTenChannels";

const title = "Kathanika Media";
const description =
  "Kathanika Media — original shows, conversations and creator-led media.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <section className="home-logo-stage" aria-label="Kathanika Media">
        <Logo className="home-logo-mark" />
      </section>
      <TopTenChannels />
    </SiteLayout>
  );
}
