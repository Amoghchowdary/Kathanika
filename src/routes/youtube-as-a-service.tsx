import { createFileRoute } from "@tanstack/react-router";
import { ServiceSeoLanding } from "@/components/site/ServiceSeoLanding";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/youtube-as-a-service")({
  head: () => seoHead(
    "/youtube-as-a-service",
    "YouTube as a Service in Hyderabad | Kathanika Media",
    "YouTube as a Service for brands and founders in Hyderabad: channel strategy, recurring show formats, production, editing, thumbnails, titles and publishing systems.",
  ),
  component: Page,
});

function Page() {
  return <ServiceSeoLanding
    eyebrow="YouTube as a Service"
    title="Build a YouTube property people know why to return to."
    intro="Kathanika Media provides YouTube as a Service from Hyderabad, combining channel architecture, recurring formats, production, editing, packaging and publishing for brands, founders and media properties."
    slug="/youtube-as-a-service"
    serviceType="YouTube as a Service and YouTube content production"
    audience="Brands, founders and media properties building a recurring YouTube presence"
    problem="Channels stall when every video is treated as a separate idea with no repeatable format, packaging discipline or publishing rhythm."
    outcome="A clearer channel identity with recurring shows, stronger packaging and an operating rhythm designed for repeat viewing."
    deliverables={[
      "Channel positioning and audience definition",
      "Recurring show and episode format architecture",
      "Research, scripting and production planning",
      "Video production and post-production",
      "Title, thumbnail and packaging direction",
      "Publishing cadence and channel organization",
      "Performance-led format iteration",
    ]}
    process={[
      { title: "Define the channel promise", copy: "Clarify what the channel repeatedly gives its audience and why that promise is worth subscribing to." },
      { title: "Design recurring shows", copy: "Create repeatable formats so viewers can recognize the content before they recognize the episode." },
      { title: "Produce and package", copy: "Shoot, edit and package each video with titles and thumbnails that accurately frame the value." },
      { title: "Build the library", copy: "Publish consistently and use audience behaviour to strengthen future episodes and series." },
    ]}
    faq={[
      { q: "Does YouTube as a Service include thumbnails and titles?", a: "Yes. Packaging strategy can include title and thumbnail direction alongside the production workflow." },
      { q: "Can a company build a YouTube channel through Kathanika?", a: "Yes. The service is designed for brands, founders and media properties that want a recurring channel rather than occasional uploads." },
      { q: "Can YouTube videos also become reels and shorts?", a: "Yes. Long-form production can be planned so selected moments are repurposed into short-form assets for wider distribution." },
    ]}
    related={[
      { label: "Content as a Service", href: "/content-as-a-service/" },
      { label: "Reels as a Service", href: "/reels-as-a-service/" },
      { label: "Content Production", href: "/content-production/" },
    ]}
  />;
}
