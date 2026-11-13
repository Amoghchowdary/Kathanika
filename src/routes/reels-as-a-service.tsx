import { createFileRoute } from "@tanstack/react-router";
import { ServiceSeoLanding } from "@/components/site/ServiceSeoLanding";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/reels-as-a-service")({
  head: () => seoHead(
    "/reels-as-a-service",
    "Reels as a Service & Short-Form Video in Hyderabad | Kathanika",
    "Reels as a Service in Hyderabad for brands and founders: short-form strategy, hooks, scripting, editing, captions, packaging and recurring publishing systems.",
  ),
  component: Page,
});

function Page() {
  return <ServiceSeoLanding
    eyebrow="Reels as a Service"
    title="Short-form built as a repeatable discovery system."
    intro="Kathanika Media builds Reels as a Service for Hyderabad brands and founders that need a consistent short-form pipeline: concepts, hooks, scripting, editing, packaging and platform-ready delivery."
    slug="/reels-as-a-service"
    serviceType="Reels as a Service and short-form video production"
    audience="Brands, founders and creators that need consistent short-form discovery content"
    problem="Short-form output often becomes random, repetitive or trend-led when there is no recurring format system behind it."
    outcome="A recognizable short-form content pipeline with stronger hooks, packaging and publishing consistency."
    deliverables={[
      "Short-form content pillars and recurring reel formats",
      "Hook, concept and script development",
      "Shoot planning or long-form content repurposing",
      "Editing, captions and visual packaging",
      "Platform-specific aspect ratios and exports",
      "Publishing-ready content batches",
      "Iteration around retention and response signals",
    ]}
    process={[
      { title: "Choose the content lanes", copy: "Define the subjects, audience problems and recurring formats worth repeating." },
      { title: "Build strong openings", copy: "Develop hooks, scripts and edit structures that earn attention without depending on clickbait." },
      { title: "Produce in batches", copy: "Shoot or repurpose efficiently so the output can sustain a consistent publishing rhythm." },
      { title: "Refine from behaviour", copy: "Use watch patterns and audience response to improve future hooks, pacing and formats." },
    ]}
    faq={[
      { q: "Does Reels as a Service include editing?", a: "Yes. The service can include concepts, scripting, production or repurposing, editing, captions and platform-ready packaging depending on scope." },
      { q: "Can Kathanika create reels from a podcast or YouTube shoot?", a: "Yes. Long-form recordings can be repurposed into short-form clips so one production session supports a broader content system." },
      { q: "Is this only for Instagram?", a: "No. Short-form assets can be prepared for Instagram Reels, YouTube Shorts and other priority channels where the format is appropriate." },
    ]}
    related={[
      { label: "Content as a Service", href: "/content-as-a-service/" },
      { label: "YouTube as a Service", href: "/youtube-as-a-service/" },
      { label: "Personal Branding", href: "/personal-branding/" },
    ]}
  />;
}
