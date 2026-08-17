import { ArrowUpRight } from "lucide-react";

import logoDark from "@/assets/kathanika-logo-dark.png";
import { useContent } from "@/content/store";
import { withBasePath } from "@/lib/base-path";

const FOOTER_LINKS = [
  ["Home", "/"],
  ["About", "/about"],
  ["Work", "/work"],
  ["Services", "/services"],
  ["Career Inquiry", "/creators"],
  ["Business Inquiry", "/contact"],
] as const;

export function SiteFooter() {
  const { content } = useContent();

  return (
    <footer className="v41-footer v44-footer">
      <section className="v44-footer-lead">
        <div className="v44-footer-logo-wrap">
          <img src={logoDark} alt="Kathanika Media" />
          <span>Hyderabad · India</span>
        </div>
        <div className="v44-footer-lead-copy">
          <p>Build a media property people choose to return to.</p>
          <a className="v44-footer-cta" href={withBasePath("/contact")}>
            Start Business Inquiry <ArrowUpRight />
          </a>
        </div>
      </section>

      <div className="v44-footer-grid">
        <section className="v44-footer-nav-card">
          <span className="v41-card-kicker">Explore</span>
          <nav aria-label="Footer navigation">
            {FOOTER_LINKS.map(([label, href], index) => (
              <a key={href} href={withBasePath(href)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{label}</strong>
                <ArrowUpRight />
              </a>
            ))}
          </nav>
        </section>

        <section className="v44-footer-info-card">
          <span className="v41-card-kicker">Contact</span>
          <a className="v44-footer-contact-line" href={`mailto:${content.settings.email}`}>{content.settings.email}</a>
          <a className="v44-footer-contact-line" href={`tel:${content.settings.phone.replace(/\s/g, "")}`}>{content.settings.phone}</a>
        </section>

        <section className="v44-footer-info-card">
          <span className="v41-card-kicker">Office</span>
          <p>{content.settings.addressLine}</p>
        </section>
      </div>

      <div className="v41-footer-bottom v44-footer-bottom">
        <span>© {new Date().getFullYear()} Kathanika Media</span>
        <span>Content · Community · Distribution · Marketing</span>
        <div><a href={withBasePath("/privacy")}>Privacy</a><a href={withBasePath("/terms")}>Terms</a></div>
      </div>
    </footer>
  );
}
