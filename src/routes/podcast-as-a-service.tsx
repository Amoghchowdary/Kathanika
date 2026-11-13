import { createFileRoute } from "@tanstack/react-router";
import { ServiceSeoLanding } from "@/components/site/ServiceSeoLanding";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/podcast-as-a-service")({
  head: () => seoHead(
    "/podcast-as-a-service",
    "Podcast as a Service in Hyderabad | Kathanika Media",
    "End-to-end podcast strategy, production, editing, clips, publishing and distribution for brands, founders and institutions in Hyderabad and across India.",
  ),
  component: Page,
});

function Page() {
  return <ServiceSeoLanding
    eyebrow="Podcast as a Service"
    title="Build a podcast people choose to return to."
    intro="Kathanika Media provides end-to-end podcast-as-a-service for brands, founders and institutions: format strategy, production, post-production, short-form repurposing, publishing and distribution from Hyderabad."
    slug="/podcast-as-a-service"
    serviceType="Podcast production and podcast-as-a-service"
    audience="Brands, founders, institutions and experts building an owned show"
    problem="A podcast should be more than recording episodes; it needs a clear format, editorial system, production quality and repeatable distribution."
    outcome="A recurring, ownable podcast property with a consistent production and publishing engine."
    deliverables={[
      "Show positioning, audience definition and repeatable episode format",
      "Guest and episode planning, research and production preparation",
      "Multi-camera / audio production support and recording workflows",
      "Editing, sound finishing, packaging, thumbnails and episode assets",
      "Short-form clips and social cut-downs from long-form conversations",
      "Publishing and distribution support across priority platforms",
      "Performance review and iteration around audience behaviour",
    ]}
    process={[
      { title: "Define the show", copy: "Clarify audience, purpose, identity, format and the role the podcast plays in the wider brand or media strategy." },
      { title: "Build the system", copy: "Create the editorial calendar, production workflow, episode architecture and visual/audio packaging." },
      { title: "Produce consistently", copy: "Record, edit, finish and package long-form episodes and the short-form content around them." },
      { title: "Distribute and learn", copy: "Publish across selected channels, observe audience signals and refine the format over time." },
    ]}
    faq={[
      { q: "Is this only a podcast studio rental?", a: "No. Kathanika positions the service as an end-to-end podcast operating system covering strategy, production, post-production, packaging and distribution support." },
      { q: "Can Kathanika build a podcast for a founder or company?", a: "Yes. The service is structured for founders, brands, institutions and experts who want an owned recurring show rather than a one-off recording." },
      { q: "Does Kathanika work only in Hyderabad?", a: "Kathanika is based in Hyderabad and works on Telugu and English media properties. Project scope and production logistics can be discussed through the business inquiry." },
    ]}
    related={[
      { label: "IP Building", href: "/ip-building" },
      { label: "Content Production", href: "/content-production" },
      { label: "All Services", href: "/services" },
    ]}
  />;
}
