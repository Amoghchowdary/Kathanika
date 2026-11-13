import { createFileRoute } from "@tanstack/react-router";
import { ServiceSeoLanding } from "@/components/site/ServiceSeoLanding";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/social-media-management")({
  head: () => seoHead(
    "/social-media-management",
    "Social Media Management in Hyderabad | Kathanika Media",
    "Social media management in Hyderabad for brands and founders: editorial calendars, publishing, creative systems, community response and content performance reporting.",
  ),
  component: Page,
});

function Page() {
  return <ServiceSeoLanding
    eyebrow="Social Media Management"
    title="Run social channels like a media system, not a posting checklist."
    intro="Kathanika Media manages social content systems for Hyderabad brands and founders through editorial planning, platform-specific creative, publishing, community response and reporting."
    slug="/social-media-management"
    serviceType="Social media management and content operations"
    audience="Brands and founders that need consistent, platform-specific social communication"
    problem="Social channels lose clarity when posting frequency is separated from content strategy, production quality and audience learning."
    outcome="A consistent social presence with clear editorial themes, reliable publishing and stronger feedback loops."
    deliverables={[
      "Platform and audience role definition",
      "Editorial calendars and recurring content pillars",
      "Creative planning across posts, reels and video formats",
      "Publishing and scheduling workflows",
      "Community response coordination",
      "Performance reporting and content observations",
      "Iteration around channel and audience behaviour",
    ]}
    process={[
      { title: "Set the channel roles", copy: "Decide what each platform should do for the brand instead of publishing the same message everywhere." },
      { title: "Build the calendar", copy: "Create recurring themes and a practical publishing cadence around business and audience priorities." },
      { title: "Produce and publish", copy: "Coordinate creative production, packaging and scheduled delivery across the selected channels." },
      { title: "Review and refine", copy: "Use response and engagement patterns to improve future creative decisions." },
    ]}
    faq={[
      { q: "Does social media management include content creation?", a: "It can. Kathanika can connect editorial planning with production, reels, long-form repurposing and publishing depending on the project scope." },
      { q: "Which platforms can be included?", a: "The final platform mix is defined around the audience and business goal rather than applying one identical plan to every network." },
      { q: "Is social media management different from IP building?", a: "Yes. Social media management operates channels. IP building develops the recurring media property or format that audiences return to." },
    ]}
    related={[
      { label: "Content as a Service", href: "/content-as-a-service/" },
      { label: "Reels as a Service", href: "/reels-as-a-service/" },
      { label: "Personal Branding", href: "/personal-branding/" },
    ]}
  />;
}
