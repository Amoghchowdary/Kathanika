import { createFileRoute } from "@tanstack/react-router";
import { ServiceSeoLanding } from "@/components/site/ServiceSeoLanding";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/content-production")({
  head: () => seoHead(
    "/content-production",
    "Content Production Company in Hyderabad | Kathanika Media",
    "Kathanika Media is a Hyderabad content production company for podcasts, YouTube, long-form video, reels and repeatable brand content systems in Telugu and English.",
  ),
  component: Page,
});

function Page() {
  return <ServiceSeoLanding
    eyebrow="Content Production"
    title="A content production company built for repeat attention."
    intro="From long-form conversations to YouTube, podcasts and short-form reels, Kathanika Media builds production systems for brands, creators and media IPs in Hyderabad across Telugu and English."
    slug="/content-production"
    serviceType="Content production, video production and social content systems"
    audience="Brands, founders, creators and media properties that need consistent high-quality content"
    problem="One-off production can create assets, but without an editorial and distribution system it rarely builds sustained audience attention."
    outcome="A repeatable content engine connecting strategy, production, post-production, packaging and distribution."
    deliverables={[
      "Content and format strategy before production begins",
      "Pre-production, research, scripting and shoot planning",
      "Long-form video, podcast and interview production",
      "Editing, colour, sound and platform-ready final delivery",
      "Short-form reels and cut-downs from long-form content",
      "Thumbnail, title and packaging support",
      "Publishing rhythm and content performance iteration",
    ]}
    process={[
      { title: "Plan", copy: "Define the audience, format, editorial calendar and production requirements before cameras roll." },
      { title: "Produce", copy: "Run the shoot or recording with the required crew, camera, sound and direction workflow." },
      { title: "Package", copy: "Edit and finish the long-form asset, then create platform-specific derivatives and packaging." },
      { title: "Publish and improve", copy: "Distribute consistently and use audience behaviour to sharpen future content." },
    ]}
    faq={[
      { q: "What content does Kathanika produce?", a: "Kathanika works across podcasts, YouTube, long-form conversations, short-form reels and recurring content systems for brands and owned media IPs." },
      { q: "Is Kathanika a Hyderabad content company?", a: "Yes. Kathanika Media is based in Hyderabad, Telangana and works across Telugu and English content, production, distribution and media IP development." },
      { q: "Can one long-form shoot become multiple content assets?", a: "Yes. The production model can include short-form cut-downs, clips and platform-specific packaging so a long-form production can support a wider content system." },
    ]}
    related={[
      { label: "Podcast as a Service", href: "/podcast-as-a-service" },
      { label: "IP Building", href: "/ip-building" },
      { label: "Courses", href: "/courses" },
    ]}
  />;
}
