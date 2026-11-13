import { createFileRoute } from "@tanstack/react-router";
import { ServiceSeoLanding } from "@/components/site/ServiceSeoLanding";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/content-as-a-service")({
  head: () => seoHead(
    "/content-as-a-service",
    "Content as a Service in Hyderabad | Kathanika Media",
    "Content as a Service for brands and founders in Hyderabad: strategy, editorial planning, scripting, production, publishing and repeatable audience-led content systems.",
  ),
  component: Page,
});

function Page() {
  return <ServiceSeoLanding
    eyebrow="Content as a Service"
    title="A recurring content engine, not a queue of disconnected posts."
    intro="Kathanika Media provides Content as a Service from Hyderabad for brands, founders and institutions that need a repeatable editorial, production and publishing system across long-form and short-form formats."
    slug="/content-as-a-service"
    serviceType="Content as a Service and recurring content production"
    audience="Brands, founders and institutions that need an always-on content system"
    problem="Publishing becomes inconsistent when strategy, scripting, production and distribution are handled as separate one-off tasks."
    outcome="A planned content operating system with recurring formats, production cadence and clear audience purpose."
    deliverables={[
      "Audience, positioning and editorial pillar definition",
      "Recurring format and series design",
      "Monthly or campaign-based editorial planning",
      "Research, scripting and production coordination",
      "Long-form and short-form asset creation",
      "Publishing and packaging support across priority channels",
      "Performance review and iteration around audience behaviour",
    ]}
    process={[
      { title: "Define the audience", copy: "Clarify who the content serves, what they should return for and how the brand should be remembered." },
      { title: "Design repeatable formats", copy: "Turn the strategy into practical recurring series, formats and editorial pillars." },
      { title: "Produce on cadence", copy: "Research, script, shoot, edit and package content through a defined production rhythm." },
      { title: "Learn and improve", copy: "Use retention, response and distribution signals to sharpen the next cycle instead of restarting from zero." },
    ]}
    faq={[
      { q: "What is Content as a Service?", a: "It is an ongoing content operating model that combines strategy, recurring formats, planning, production, packaging and publishing instead of commissioning isolated posts." },
      { q: "Is Content as a Service suitable for founders and companies?", a: "Yes. Kathanika structures the service for brands, founders and institutions that want consistency and a recognizable editorial point of view." },
      { q: "Can the same system include podcasts, YouTube and reels?", a: "Yes. The content system can connect long-form podcasts or YouTube with short-form clips and platform-specific publishing, depending on the scope agreed for the project." },
    ]}
    related={[
      { label: "Podcast as a Service", href: "/podcast-as-a-service/" },
      { label: "Reels as a Service", href: "/reels-as-a-service/" },
      { label: "YouTube as a Service", href: "/youtube-as-a-service/" },
    ]}
  />;
}
