import { ArrowUpRight, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";

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

const FALLBACK_SOCIALS = {
  youtube: "https://www.youtube.com/@kathanikamedia",
  instagram: "https://www.instagram.com/kathanikamedia/",
  linkedin: "https://www.linkedin.com/company/kathanikamedia/",
} as const;

export function SiteFooter() {
  const { content } = useContent();
  const socials = {
    youtube: content.social.youtube || FALLBACK_SOCIALS.youtube,
    instagram: content.social.instagram || FALLBACK_SOCIALS.instagram,
    linkedin: content.social.linkedin || FALLBACK_SOCIALS.linkedin,
  };

  return (
    <footer className="v41-footer v44-footer v48-footer v49-footer">
      <section className="v44-footer-lead v48-footer-lead v49-footer-lead">
        <div className="v44-footer-logo-wrap">
          <img src={logoDark} alt="Kathanika Media" width={1919} height={717} />
          <span>Hyderabad · India</span>
        </div>
        <div className="v44-footer-lead-copy">
          <p>Build a media property people choose to return to.</p>
          <a className="v44-footer-cta" href={withBasePath("/contact")}>
            Start Business Inquiry <ArrowUpRight />
          </a>
        </div>
      </section>

      <div className="v44-footer-grid v48-footer-grid v49-footer-grid">
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

        <section className="v44-footer-info-card v48-footer-contact-card v49-footer-contact-card">
          <span className="v41-card-kicker">Contact</span>
          <a className="v49-footer-contact-link v48-footer-email" href={`mailto:${content.settings.email}`}>
            <Mail aria-hidden="true" /> <span>{content.settings.email}</span>
          </a>
          <a className="v49-footer-contact-link" href={`tel:${content.settings.phone.replace(/\s/g, "")}`}>
            <Phone aria-hidden="true" /> <span>{content.settings.phone}</span>
          </a>
          <div className="v49-footer-social" role="group" aria-label="Kathanika Media social profiles">
            <a href={socials.youtube} target="_blank" rel="me noopener noreferrer" aria-label="Kathanika Media on YouTube"><Youtube aria-hidden="true" /><span>YouTube</span></a>
            <a href={socials.instagram} target="_blank" rel="me noopener noreferrer" aria-label="Kathanika Media on Instagram"><Instagram aria-hidden="true" /><span>Instagram</span></a>
            <a href={socials.linkedin} target="_blank" rel="me noopener noreferrer" aria-label="Kathanika Media on LinkedIn"><Linkedin aria-hidden="true" /><span>LinkedIn</span></a>
          </div>
        </section>

        <section className="v44-footer-info-card v49-footer-office-card">
          <span className="v41-card-kicker">Office</span>
          <div className="v49-footer-office-line"><MapPin aria-hidden="true" /><p>{content.settings.addressLine}</p></div>
          <a className="v48-footer-map" href={content.settings.mapsUrl} target="_blank" rel="noreferrer">Open in Maps <ArrowUpRight /></a>
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
