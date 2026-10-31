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
      <section className="v71-legal"><article><h2>Information we collect</h2><p>We collect the information you voluntarily submit through business, career and course inquiry forms, such as your name, email, phone number, city, organisation or profile details, and your message.</p></article><article><h2>How we use it</h2><p>We use submitted information to respond to enquiries, assess applications, provide course or service information, operate the website and improve our enquiry workflows.</p></article><article><h2>Sharing and retention</h2><p>We do not sell enquiry data. Information may be processed through service providers used to operate the website and communications, and retained only as reasonably necessary for the relevant enquiry or legal obligations.</p></article><article><h2>Your choices</h2><p>You may contact Kathanika Media using the details on the website to request correction or deletion of information you previously submitted, subject to legal and operational requirements.</p></article></section>
    </SiteLayout>
  );
}
