import { createFileRoute } from "@tanstack/react-router";
import { Film, Megaphone, Share2, UsersRound } from "lucide-react";

import { PageHead, SiteLayout } from "@/components/site/SiteLayout";
import { withBasePath } from "@/lib/base-path";
import { seoHead } from "@/lib/seo";

const EVOLUTION = [
  ["1980s", "Print", "Trusted information moved through publications and print-led institutions."],
  ["2000s", "Satellite TV", "Broadcast networks became the dominant layer for mass media and public attention."],
  ["Post-COVID", "Independent Digital IPs", "Creators and media properties began building direct relationships with their audiences."],
  ["Now", "Kathanika", "A new-age media incubation hub building IPs across content, community, distribution and marketing."],
] as const;


const FOUNDING_TEAM = [
  {
    name: "Nikhil Dintakurthi",
    role: "Founder",
    bio: "Nikhil Dintakurthi is the founder and content strategist behind Kathanika Media. With 7+ years across Indian-language and English podcasting, production, partnerships and distribution, he has worked across IVM Podcasts, Spotify’s Awaaz program, TeluguOne, UPSC Radio and independent productions. His focus is building long-term content IPs around a clear audience, purpose and identity — combining creative instinct with commercial sustainability.",
    note: "100+ content shows · Audience-first IP building · Telugu & English media",
    portrait: "founder-portrait-02",
  },
  {
    name: "Sai Prudvi",
    role: "Co-Founder",
    bio: "Sai Prudvi is Co-Founder of Kathanika Media. He brings a research-led operating mindset shaped by more than three years at the Foundation for Democratic Reforms into media entrepreneurship, strategy and execution. At Kathanika, he works across original Indian media IPs, creator economics, brand-owned media, long-term storytelling and content monetisation, and also co-hosts Curious, a show exploring media, business, policy and emerging trends.",
    note: "Research-led strategy · Creator economics · Brand-owned media",
    portrait: "founder-portrait-01",
  },
] as const;

function TeamPhoto({ file, alt, width, height, className = "" }: { file: string; alt: string; width: number; height: number; className?: string }) {
  const base = `/team/${file}`;
  return (
    <picture className={className}>
      <source srcSet={withBasePath(`${base}.avif`)} type="image/avif" />
      <source srcSet={withBasePath(`${base}.webp`)} type="image/webp" />
      <img src={withBasePath(`${base}.jpg`)} alt={alt} loading="lazy" decoding="async" width={width} height={height} />
    </picture>
  );
}

const PILLARS = [
  { icon: Film, title: "Content", copy: "Formats and stories built to earn repeat attention." },
  { icon: UsersRound, title: "Community", copy: "Audience understanding shapes every media property." },
  { icon: Share2, title: "Distribution", copy: "Packaging and publishing designed around how people discover." },
  { icon: Megaphone, title: "Marketing", copy: "Brand and media thinking brought into one operating system." },
] as const;

export const Route = createFileRoute("/about")({
  head: () => seoHead(
    "/about",
    "About Kathanika Media | Hyderabad Content & Podcast Company",
    "Meet Kathanika Media, a Hyderabad content and podcast company building original IPs, brand-owned media, production systems, distribution and audience communities.",
  ),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHead
        eyebrow="About"
        title="Media changed before. It is changing again."
        intro="Kathanika is building for the shift from centralised media distribution to independent, audience-owned content IPs."
      />

      <section className="v77-about-opening" aria-labelledby="v77-about-opening-title">
        <div className="v77-about-opening-copy">
          <span>Founders · Kathanika Media</span>
          <h2 id="v77-about-opening-title">Built together, close to the work.</h2>
          <p>Kathanika began with a shared belief: meaningful media is built by staying close to the audience, the creator and the craft. The founders work across strategy, production and distribution as one operating team.</p>
        </div>
        <TeamPhoto
          file="founding-team-01"
          alt="Kathanika Media founders Nikhil Dintakurthi and Sai Prudvi together"
          width={1600}
          height={1066}
          className="v77-about-founders-opening"
        />
      </section>

      <section className="v77-about-pillars" aria-label="How Kathanika builds media">
        {PILLARS.map(({ icon: Icon, title, copy }, index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <Icon aria-hidden="true" />
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section className="v66-team" aria-labelledby="v66-team-title">
        <div className="v41-section-head compact v66-team-head">
          <span>02</span>
          <div><p>Team behind Kathanika Media</p><h2 id="v66-team-title">Built by people who think in stories, systems and audiences.</h2></div>
          <p className="v41-section-note">Kathanika’s founding team combines content craft, research, business thinking and operating discipline to build media properties designed to last.</p>
        </div>

        <div className="v66-founder-grid v67-founder-grid">
          {FOUNDING_TEAM.map((member, index) => (
            <article key={member.name} className="v66-founder-card v67-founder-card v79-founder-card">
              <TeamPhoto
                file={member.portrait}
                alt={`${member.name}, ${member.role} of Kathanika Media`}
                width={480}
                height={480}
                className="v67-founder-avatar v79-founder-avatar"
              />
              <div className="v66-founder-index">{String(index + 1).padStart(2, "0")}</div>
              <div className="v66-founder-role">{member.role}</div>
              <h3>{member.name}</h3>
              <p>{member.bio}</p>
              <div className="v66-founder-note">{member.note}</div>
            </article>
          ))}
        </div>

      </section>

      <section className="v41-about-map">
        <div className="v41-section-head compact">
          <span>03</span>
          <div><p>Evolution map</p><h2>Four media eras.</h2></div>
          <p className="v41-section-note">From centralised distribution to audience-owned media properties.</p>
        </div>
        <div className="v44-evolution-flow" role="group" aria-label="Evolution of media">
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
        <div className="v41-section-head compact"><span>04</span><div><p>How Kathanika grows</p><h2>A compounding media loop.</h2></div></div>
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
