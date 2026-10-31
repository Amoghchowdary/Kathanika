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
      <section className="v71-legal"><article><h2>Website use</h2><p>This website is provided for information about Kathanika Media, its work, services, careers and courses. Do not misuse the site, interfere with its operation or attempt unauthorised access.</p></article><article><h2>Content and intellectual property</h2><p>Unless otherwise stated, site copy, branding, original media, layouts and other Kathanika materials are owned by or licensed to Kathanika Media. Third-party names and media remain the property of their respective owners.</p></article><article><h2>Enquiries and course information</h2><p>Submitting an enquiry does not create a contract or guarantee acceptance. Course schedules, instructors, delivery mode and other batch details may be updated before enrolment and should be confirmed with Kathanika Media.</p></article><article><h2>External links</h2><p>Links to external platforms are provided for convenience. Kathanika Media is not responsible for third-party content, availability or privacy practices.</p></article></section>
    </SiteLayout>
  );
}
