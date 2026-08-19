import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { PageHead, SiteLayout } from "@/components/site/SiteLayout";
import { sortActive, useContent } from "@/content/store";
import { withBasePath } from "@/lib/base-path";
import { seoHead } from "@/lib/seo";

const title = "Services — Kathanika Media";
const description = "The exact content, production, IP, distribution and brand capabilities Kathanika offers.";

const SERVICE_DELIVERABLES: Record<string, readonly string[]> = {
  "Content as a Service": [
    "Content strategy and recurring format design",
    "Editorial calendar, scripting and production workflow",
    "Publishing system built around a defined audience",
  ],
  "Reels as a Service": [
    "Short-form concepts and hook development",
    "Editing, captions, packaging and platform formatting",
    "High-frequency reel pipeline for consistent discovery",
  ],
  "Podcast as a Service": [
    "Format, guest and episode planning",
    "Studio production, editing and audio finishing",
    "Episode packaging, clips and publishing support",
  ],
  "YouTube as a Service": [
    "Channel architecture and repeatable show formats",
    "Thumbnail, title and packaging strategy",
    "Publishing rhythm and performance-led iteration",
  ],
  "End-to-End Production": [
    "Pre-production, crew planning and direction",
    "Camera, sound, art, lighting and on-ground production",
    "Editing, colour, sound mix and final delivery",
  ],
  "Social Media Management": [
    "Platform-specific editorial calendars",
    "Publishing, community response and reporting",
    "Creative systems designed for each social channel",
  ],
  "Distribution & Audience Growth": [
    "Content packaging for reach and retention",
    "Publishing and cross-platform distribution",
    "Audience insight loops to improve repeat attention",
  ],
  "IP Development": [
    "Audience, purpose and positioning definition",
    "Format, identity and recurring content architecture",
    "Launch roadmap and long-term property development",
  ],
  "Brand Building": [
    "Brand narrative and communication architecture",
    "Visual and editorial content language",
    "Consistent media presence across priority platforms",
  ],
  "Personal Branding": [
    "Positioning for founders, doctors, CEOs and investors",
    "Thought-leadership themes and repeatable content formats",
    "Content systems that build trust and category authority",
  ],
};

export const Route = createFileRoute("/services")({
  head: () => seoHead("/services", "Services — Kathanika Media Content, Podcast & Production", "Content strategy, podcast production, YouTube, reels, IP development, distribution, brand building and personal branding from Kathanika Media."),
  component: ServicesPage,
});

function ServicesPage() {
  const { content } = useContent();
  const services = sortActive(content.services);

  return (
    <SiteLayout>
      <PageHead eyebrow="Services" title="Every IP has an audience, purpose and identity." intro="That principle also governs our client work: we define what the media property is for before we decide what to publish." />

      <section className="v41-services-principle">
        <div className="v41-services-principle-grid">
          <article><span>Audience</span><strong>Who must choose to return?</strong></article>
          <article><span>Purpose</span><strong>What job should this property do?</strong></article>
          <article><span>Identity</span><strong>Why should it feel unmistakably its own?</strong></article>
        </div>
      </section>

      <section className="v41-billable-services">
        <div className="v41-section-head compact">
          <span>02</span>
          <div><p>Billable capabilities</p><h2>What Kathanika delivers.</h2></div>
          <p className="v41-section-note">Each capability is built as an end-to-end operating system, not a single deliverable.</p>
        </div>
        <div className="v41-service-list v48-service-list">
          {services.map((service, index) => {
            const deliverables = SERVICE_DELIVERABLES[service.title] ?? [service.description];
            return (
              <article key={service.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div className="v48-service-title">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <ul className="v48-service-points" aria-label={`${service.title} deliverables`}>
                  {deliverables.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            );
          })}
        </div>
        <a className="v41-outline-cta" href={withBasePath("/contact")}>Start Business Inquiry <ArrowUpRight /></a>
      </section>
    </SiteLayout>
  );
}
