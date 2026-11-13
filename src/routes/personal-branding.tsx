import { createFileRoute } from "@tanstack/react-router";
import { ServiceSeoLanding } from "@/components/site/ServiceSeoLanding";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/personal-branding")({
  head: () => seoHead(
    "/personal-branding",
    "Personal Branding for Founders & CEOs in Hyderabad | Kathanika",
    "Personal branding in Hyderabad for founders, CEOs, doctors, investors and experts through positioning, thought-leadership formats, podcasts, video and recurring content systems.",
  ),
  component: Page,
});

function Page() {
  return <ServiceSeoLanding
    eyebrow="Personal Branding"
    title="Turn expertise into a body of work people can recognize and trust."
    intro="Kathanika Media builds personal-brand content systems in Hyderabad for founders, CEOs, doctors, investors and experts using positioning, thought-leadership formats, podcasts, video and recurring publishing."
    slug="/personal-branding"
    serviceType="Personal branding and thought-leadership content"
    audience="Founders, CEOs, doctors, investors and experts building category authority"
    problem="Expertise is hard to discover when communication is occasional, generic or disconnected from a clear point of view."
    outcome="A recognizable personal media presence built around expertise, recurring themes and consistent long-form and short-form content."
    deliverables={[
      "Positioning and point-of-view definition",
      "Thought-leadership themes and recurring content pillars",
      "Podcast, interview or YouTube format development where relevant",
      "Long-form and short-form production",
      "Reels, clips and platform-specific repurposing",
      "Publishing rhythm and content calendar",
      "Iteration around audience questions and response",
    ]}
    process={[
      { title: "Clarify the expertise", copy: "Define the topics, audience and point of view that the personal brand can credibly own." },
      { title: "Create recurring formats", copy: "Turn expertise into repeatable series and content structures rather than isolated opinions." },
      { title: "Produce consistently", copy: "Capture long-form and short-form content with a practical rhythm that fits the individual." },
      { title: "Compound trust", copy: "Build a searchable body of work that becomes more useful as the library grows." },
    ]}
    faq={[
      { q: "Who is Kathanika personal branding for?", a: "The service is designed for founders, CEOs, doctors, investors and experts who have real knowledge to communicate and want a structured media presence around it." },
      { q: "Is personal branding only short-form reels?", a: "No. Depending on the person and audience, the system can include long-form conversations, podcasts, YouTube, written themes and short-form repurposing." },
      { q: "Can Kathanika help define what I should talk about?", a: "Yes. Positioning, recurring themes and format design are part of building a coherent personal-media system." },
    ]}
    related={[
      { label: "Podcast as a Service", href: "/podcast-as-a-service/" },
      { label: "YouTube as a Service", href: "/youtube-as-a-service/" },
      { label: "Reels as a Service", href: "/reels-as-a-service/" },
    ]}
  />;
}
