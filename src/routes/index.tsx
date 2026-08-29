import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { HeroOrbit } from "@/components/site/HeroOrbit";
import { SiteLayout } from "@/components/site/SiteLayout";
import { seoHead } from "@/lib/seo";

const EpisodeLibrary = lazy(() => import("@/components/site/EpisodeLibrary").then((module) => ({ default: module.EpisodeLibrary })));

const title = "Kathanika Media — Building the next generation of media";
const description =
  "Kathanika Media builds new-age content IPs, communities and distribution ecosystems across Telugu and English.";

const METRICS = [
  ["12+", "Content IPs built"],
  ["3 Cr+", "Monthly content reach"],
  ["2", "Languages · Telugu + English"],
  ["1", "New-age media incubation hub"],
] as const;

const EVOLUTION = [
  ["1980s", "Print", "Public attention was shaped by publications and print-led institutions."],
  ["2000s", "Satellite TV", "Broadcast networks became the dominant layer for mass audiences."],
  ["Post-COVID", "Independent Digital IPs", "Creators and media properties began building direct audience relationships."],
  ["Now", "Kathanika", "Content, community, distribution and marketing come together around strong media IPs."],
] as const;

export const Route = createFileRoute("/")({
  head: () => seoHead("/", "Kathanika Media — Building the next generation of media", "Kathanika Media builds original content IPs, production systems and audience-led media properties across Telugu and English."),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <HeroOrbit />

      <section className="v41-why" id="why-kathanika">
        <div className="v41-section-head">
          <span>02</span>
          <div>
            <p>Why Kathanika / What we do</p>
            <h2>Media changed before.<br />It is changing again.</h2>
          </div>
          <p className="v41-section-note">We build and operate media IPs, learn directly from audiences and bring that understanding into brand work.</p>
        </div>

        <div className="v44-evolution-flow v44-home-evolution" role="group" aria-label="Evolution of media">
          {EVOLUTION.map(([era, name, copy], index) => (
            <div className="v44-evolution-step" key={name}>
              <article className={index === EVOLUTION.length - 1 ? "is-current" : ""}>
                <span>{era}</span>
                <div className="v44-step-index">{String(index + 1).padStart(2, "0")}</div>
                <h3>{name}</h3>
                <p>{copy}</p>
              </article>
              {index < EVOLUTION.length - 1 ? <div className="v44-flow-connector" aria-hidden="true"><span>→</span></div> : null}
            </div>
          ))}
        </div>

        <div className="v41-what-grid">
          <article><span>01</span><strong>Build IPs</strong><p>Ownable formats with a distinct point of view.</p></article>
          <article><span>02</span><strong>Create content</strong><p>Long-form, short-form, podcast and YouTube systems.</p></article>
          <article><span>03</span><strong>Distribute</strong><p>Packaging and publishing built around audience behaviour.</p></article>
          <article><span>04</span><strong>Grow audience</strong><p>Repeat attention, not one-off reach.</p></article>
        </div>

        <div className="v41-metric-bars" role="group" aria-label="Kathanika scale">
          {METRICS.map(([value, label], index) => (
            <article key={label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{value}</strong>
              <p>{label}</p>
              <i aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <Suspense fallback={<section className="v53-library-placeholder" aria-hidden="true" />}><EpisodeLibrary limitChannels={9} /></Suspense>
    </SiteLayout>
  );
}
