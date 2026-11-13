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
  head: () => seoHead("/services", "Content, Podcast & IP Building Services in Hyderabad | Kathanika", "Explore Kathanika Media services in Hyderabad: podcast as a service, content production, IP building, YouTube, reels, distribution, brand building and personal branding."),
  component: ServicesPage,
});

function ServicesPage() {
  const { content } = useContent();
  const services = sortActive(content.services);

  return (
    <SiteLayout>
      <PageHead eyebrow="Services" title="Every IP has an audience, purpose and identity." intro="Kathanika Media is a Hyderabad content company offering productised podcast, content production and IP-building systems for brands, founders, creators and institutions." />

      <section className="v75-intent-hub" aria-labelledby="v75-intent-title">
        <div className="v41-section-head compact">
          <span>01</span>
          <div><p>Productised media services</p><h2 id="v75-intent-title">Start with the outcome you want to own.</h2></div>
          <p className="v41-section-note">Dedicated service pages explain the scope, operating model and deliverables behind Kathanika’s core offers.</p>
        </div>
        <div className="v75-intent-grid">
          <a href={withBasePath("/podcast-as-a-service/")}><span>01</span><h3>Podcast as a Service</h3><p>Strategy, production, post-production, clips, publishing and distribution for an owned recurring show.</p><ArrowUpRight /></a>
          <a href={withBasePath("/content-production/")}><span>02</span><h3>Content Production</h3><p>Long-form, YouTube, podcast and short-form production systems from a Hyderabad content company.</p><ArrowUpRight /></a>
          <a href={withBasePath("/ip-building/")}><span>03</span><h3>IP Building</h3><p>Audience, format, identity, production and distribution architecture for long-term brand-owned media.</p><ArrowUpRight /></a>
        </div>
      </section>

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
        <a className="v41-outline-cta" href={withBasePath("/contact/")}>Start Business Inquiry <ArrowUpRight /></a>
      </section>
    </SiteLayout>
  );
}
