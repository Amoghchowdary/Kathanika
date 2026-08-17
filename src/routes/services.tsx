import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { PageHead, SiteLayout } from "@/components/site/SiteLayout";
import { sortActive, useContent } from "@/content/store";
import { withBasePath } from "@/lib/base-path";

const title = "Services — Kathanika Media";
const description = "The exact content, production, IP, distribution and brand capabilities Kathanika offers.";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }] }),
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
          <p className="v41-section-note">Capabilities designed to build, operate and grow media properties with a clear audience and identity.</p>
        </div>
        <div className="v41-service-list">
          {services.map((service, index) => (
            <article key={service.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
        <a className="v41-outline-cta" href={withBasePath("/contact")}>Start Business Inquiry <ArrowUpRight /></a>
      </section>
    </SiteLayout>
  );
}
