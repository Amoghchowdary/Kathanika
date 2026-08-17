import { createFileRoute } from "@tanstack/react-router";

import { PageHead, SiteLayout } from "@/components/site/SiteLayout";

const title = "About — Kathanika Media";
const description = "Kathanika is building new-age media IPs at the intersection of content, community, distribution and marketing.";

const EVOLUTION = [
  ["1980s", "Print", "Trusted information moved through publications and print-led institutions."],
  ["2000s", "Satellite TV", "Broadcast networks became the dominant layer for mass media and public attention."],
  ["Post-COVID", "Independent Digital IPs", "Creators and media properties began building direct relationships with their audiences."],
  ["Now", "Kathanika", "A new-age media incubation hub building IPs across content, community, distribution and marketing."],
] as const;

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHead eyebrow="About" title="Media changed before. It is changing again." intro="Kathanika is building for the shift from centralised media distribution to independent, audience-owned content IPs." />

      <section className="v41-about-map">
        <div className="v41-section-head compact">
          <span>02</span>
          <div><p>Evolution map</p><h2>Four media eras.</h2></div>
          <p className="v41-section-note">From centralised distribution to audience-owned media properties.</p>
        </div>
        <div className="v44-evolution-flow" aria-label="Evolution of media">
          {EVOLUTION.map(([era, medium, copy], index) => (
            <div className="v44-evolution-step" key={medium}>
              <article className={index === EVOLUTION.length - 1 ? "is-current" : ""}>
                <span>{era}</span>
                <div className="v44-step-index">{String(index + 1).padStart(2, "0")}</div>
                <h3>{medium}</h3>
                <p>{copy}</p>
              </article>
              {index < EVOLUTION.length - 1 ? <div className="v44-flow-connector" aria-hidden="true"><span>→</span></div> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="v41-about-model">
        <div className="v41-section-head compact"><span>03</span><div><p>How Kathanika grows</p><h2>A compounding media loop.</h2></div></div>
        <div className="v41-model-loop">
          <article><span>01</span><strong>Build original IPs</strong></article>
          <article><span>02</span><strong>Learn from real audiences</strong></article>
          <article><span>03</span><strong>Apply the learning to brand work</strong></article>
          <article><span>04</span><strong>Reinvest into new IPs</strong></article>
        </div>
      </section>

      <section className="v41-about-stats">
        <article><strong>12+</strong><span>IPs across Telugu and English</span></article>
        <article><strong>3 Cr+</strong><span>Monthly content reach</span></article>
        <article><strong>24–25</strong><span>Average age of the young creative team</span></article>
      </section>
    </SiteLayout>
  );
}
