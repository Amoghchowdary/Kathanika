import { createFileRoute } from "@tanstack/react-router";
import { ServiceSeoLanding } from "@/components/site/ServiceSeoLanding";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/ip-building")({
  head: () => seoHead(
    "/ip-building",
    "Content IP Building & Brand-Owned Media | Kathanika Media",
    "Build original content IPs and brand-owned media properties with audience strategy, format development, production, distribution and long-term growth systems.",
  ),
  component: Page,
});

function Page() {
  return <ServiceSeoLanding
    eyebrow="IP Building"
    title="Build an ownable media IP, not another content campaign."
    intro="Kathanika develops original content IPs and brand-owned media properties by combining audience strategy, format development, production, distribution and repeatable growth systems."
    slug="/ip-building"
    serviceType="Content IP development and brand-owned media"
    audience="Brands, founders, creators and institutions that want a long-term media property"
    problem="Campaign content disappears when spending or posting stops. An IP needs a distinct audience, purpose, identity and recurring format."
    outcome="An ownable show, series or media property designed to compound through repeat attention."
    deliverables={[
      "Audience and category opportunity definition",
      "IP positioning, naming direction and format architecture",
      "Editorial pillars and repeatable episode / content system",
      "Pilot development and production roadmap",
      "Distribution and packaging strategy by platform",
      "Community and audience feedback loops",
      "Iteration framework for long-term content property growth",
    ]}
    process={[
      { title: "Find the gap", copy: "Study the audience, category and existing content environment to define a space worth owning." },
      { title: "Design the IP", copy: "Build the format, identity, editorial logic and repeatable structure that make the property recognisable." },
      { title: "Pilot and produce", copy: "Turn the concept into real episodes or content, then test how the audience responds." },
      { title: "Compound attention", copy: "Use distribution, packaging and audience learning to improve the property instead of restarting every campaign." },
    ]}
    faq={[
      { q: "What does IP building mean in content?", a: "It means developing an ownable, repeatable media property with a distinct audience, purpose, identity and format rather than producing disconnected posts." },
      { q: "Can a business own a content IP?", a: "Yes. A brand-owned podcast, YouTube property, interview series or recurring editorial format can be designed as a long-term media asset around a defined audience." },
      { q: "Is IP building different from social media management?", a: "Yes. Social media management focuses on channel operations. IP building starts with the media property itself: what it is, why it exists, whom it serves and why people should return." },
    ]}
    related={[
      { label: "Podcast as a Service", href: "/podcast-as-a-service" },
      { label: "Content Production", href: "/content-production" },
      { label: "Business Inquiry", href: "/contact" },
    ]}
  />;
}
