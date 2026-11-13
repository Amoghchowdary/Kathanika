import { ArrowUpRight, CheckCircle2 } from "lucide-react";

import { PageHead, SiteLayout } from "@/components/site/SiteLayout";
import { absoluteSiteUrl } from "@/lib/seo";
import { withBasePath } from "@/lib/base-path";

type ServiceSeoLandingProps = {
  eyebrow: string;
  title: string;
  intro: string;
  slug: string;
  serviceType: string;
  audience: string;
  problem: string;
  outcome: string;
  deliverables: readonly string[];
  process: readonly { title: string; copy: string }[];
  related: readonly { label: string; href: string }[];
  faq: readonly { q: string; a: string }[];
};

export function ServiceSeoLanding(props: ServiceSeoLandingProps) {
  const canonical = absoluteSiteUrl(props.slug);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: props.title,
        serviceType: props.serviceType,
        description: props.intro,
        url: canonical,
        areaServed: [
          { "@type": "City", name: "Hyderabad" },
          { "@type": "Country", name: "India" },
        ],
        provider: {
          "@type": "Organization",
          "@id": `${absoluteSiteUrl("/")}#organization`,
          name: "Kathanika Media",
          url: absoluteSiteUrl("/"),
        },
        audience: { "@type": "Audience", audienceType: props.audience },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteSiteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Services", item: absoluteSiteUrl("/services") },
          { "@type": "ListItem", position: 3, name: props.eyebrow, item: canonical },
        ],
      },
    ],
  };

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <PageHead eyebrow={props.eyebrow} title={props.title} intro={props.intro} />

      <section className="v75-seo-service" aria-label={`${props.eyebrow} overview`}>
        <div className="v75-seo-summary">
          <article><span>Who it is for</span><strong>{props.audience}</strong></article>
          <article><span>Problem</span><strong>{props.problem}</strong></article>
          <article><span>Outcome</span><strong>{props.outcome}</strong></article>
        </div>

        <div className="v75-seo-block">
          <div><span>What is included</span><h2>A productised service with a defined operating system.</h2></div>
          <ul className="v75-seo-deliverables">
            {props.deliverables.map((item) => <li key={item}><CheckCircle2 aria-hidden="true" />{item}</li>)}
          </ul>
        </div>

        <div className="v75-seo-block">
          <div><span>How it works</span><h2>From strategy to a repeatable media property.</h2></div>
          <div className="v75-seo-process">
            {props.process.map((step, index) => <article key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}
          </div>
        </div>

        <div className="v75-seo-block">
          <div><span>Questions</span><h2>What teams usually ask before starting.</h2></div>
          <div className="v75-seo-faq">
            {props.faq.map((item) => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}
          </div>
        </div>

        <div className="v75-seo-related" aria-label="Related Kathanika services">
          <span>Explore related capabilities</span>
          <div>{props.related.map((item) => <a key={item.href} href={withBasePath(item.href)}>{item.label}<ArrowUpRight aria-hidden="true" /></a>)}</div>
        </div>

        <a className="v41-outline-cta" href={withBasePath("/contact")}>Start Business Inquiry <ArrowUpRight /></a>
      </section>
    </SiteLayout>
  );
}
