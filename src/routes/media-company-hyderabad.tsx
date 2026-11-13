import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, Mic2, PlaySquare, Sparkles } from "lucide-react";
import { PageHead, SiteLayout } from "@/components/site/SiteLayout";
import { absoluteSiteUrl, canonicalPageUrl, seoHead } from "@/lib/seo";
import { withBasePath } from "@/lib/base-path";

export const Route = createFileRoute("/media-company-hyderabad")({
  head: () => seoHead(
    "/media-company-hyderabad",
    "Media & Content Production Company in Hyderabad | Kathanika Media",
    "Kathanika Media is a Hyderabad media and content production company for podcasts, YouTube, reels, content IPs, brand-owned media, personal branding and recurring content systems.",
  ),
  component: Page,
});

function Page() {
  const canonical = canonicalPageUrl("/media-company-hyderabad");
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${canonical}#local-service`,
        name: "Kathanika Media",
        url: canonical,
        description: "Hyderabad media and content production company for podcasts, YouTube, short-form content, content IPs and brand-owned media.",
        telephone: "+91 90638 54291",
        email: "kathanikamedia@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "3rd Floor, Opp. Swathi Multi-speciality, Road No. 10, Gouri Shankar Nagar Colony, Banjara Hills",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          postalCode: "500034",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Hyderabad" },
          { "@type": "State", name: "Telangana" },
          { "@type": "Country", name: "India" },
        ],
        parentOrganization: { "@id": `${absoluteSiteUrl("/")}#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteSiteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Media Company Hyderabad", item: canonical },
        ],
      },
    ],
  };

  const services = [
    ["Podcast production", "End-to-end show strategy, recording, editing, clips and publishing.", "/podcast-as-a-service/", Mic2],
    ["Content production", "Long-form, short-form, YouTube and recurring production systems.", "/content-production/", PlaySquare],
    ["Content & IP building", "Ownable formats and brand-owned media designed for repeat attention.", "/ip-building/", Sparkles],
    ["Hyderabad production base", "Banjara Hills base with Telugu + English content capability and India-wide project conversations.", "/contact/", MapPin],
  ] as const;

  return <SiteLayout>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <PageHead eyebrow="Hyderabad" title="A media and content production company in Hyderabad built around repeat attention." intro="Kathanika Media works from Hyderabad across podcasts, YouTube, reels, content production, personal branding and original media IPs in Telugu and English." />

    <section className="v85-local-seo" aria-label="Kathanika Media Hyderabad services">
      <div className="v41-section-head compact">
        <span>01</span>
        <div><p>Local capability</p><h2>Hyderabad base. Media-system thinking.</h2></div>
        <p className="v41-section-note">Kathanika combines strategy, production, packaging and distribution instead of separating them into unrelated vendor tasks.</p>
      </div>

      <div className="v85-local-grid">
        {services.map(([title, copy, href, Icon]) => <a key={title} href={withBasePath(href)}><Icon aria-hidden="true"/><h3>{title}</h3><p>{copy}</p><span>Explore <ArrowUpRight aria-hidden="true"/></span></a>)}
      </div>

      <div className="v75-seo-block">
        <div><span>What teams can hire Kathanika for</span><h2>Productised media services from one operating partner.</h2></div>
        <div className="v75-seo-process">
          <article><span>01</span><h3>Podcast as a Service</h3><p>Show development, production, editing, clips and publishing support for recurring owned podcasts.</p></article>
          <article><span>02</span><h3>Content as a Service</h3><p>Editorial strategy, recurring formats, production and publishing systems for ongoing brand content.</p></article>
          <article><span>03</span><h3>YouTube & Reels</h3><p>Long-form and short-form systems designed around recognizable formats and consistent packaging.</p></article>
          <article><span>04</span><h3>IP & Personal Branding</h3><p>Ownable media properties and expert-led content systems that compound trust over time.</p></article>
        </div>
      </div>

      <div className="v75-seo-block">
        <div><span>Where Kathanika works</span><h2>Banjara Hills, Hyderabad · Telangana · India.</h2></div>
        <p className="v85-local-copy">Kathanika Media is based in Banjara Hills, Hyderabad and works across Telugu and English media. Local production can be discussed from Hyderabad, while strategy, post-production and broader project scopes can support teams beyond the city depending on the engagement.</p>
      </div>

      <a className="v41-outline-cta" href={withBasePath("/contact/")}>Discuss a Hyderabad project <ArrowUpRight /></a>
    </section>
  </SiteLayout>;
}
