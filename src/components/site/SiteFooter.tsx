import { Link } from "@tanstack/react-router";

import { Logo } from "./Logo";
import { useContent } from "@/content/store";

export function SiteFooter() {
  const { content } = useContent();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 lg:py-18">
        <div className="grid items-start gap-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.7fr_0.9fr_1.35fr] lg:gap-12">
          <div className="min-w-0">
            <Logo className="h-11 w-auto" />
            <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
              Original media properties, creator incubation and end-to-end content systems for businesses, creators and leaders.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-[11px] tracking-[0.16em] uppercase">
              <a
                href={content.social.youtube}
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline-offset-4 hover:underline"
              >
                YouTube
              </a>
              <a
                href={content.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Instagram
              </a>
              <a
                href={content.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="text-[11px] tracking-[0.22em] text-muted-foreground uppercase">Explore</h3>
            <ul className="mt-5 space-y-3">
              <li><Link to="/" className="text-sm text-foreground/80 hover:text-foreground">Home</Link></li>
              <li><Link to="/work" className="text-sm text-foreground/80 hover:text-foreground">Work</Link></li>
              <li><Link to="/services" className="text-sm text-foreground/80 hover:text-foreground">Services</Link></li>
            </ul>
          </div>

          <div className="min-w-0">
            <h3 className="text-[11px] tracking-[0.22em] text-muted-foreground uppercase">Inquiries</h3>
            <ul className="mt-5 space-y-3">
              <li><Link to="/contact" className="text-sm text-foreground/80 hover:text-foreground">Business Inquiry</Link></li>
              <li><Link to="/creators" className="text-sm text-foreground/80 hover:text-foreground">Career Inquiry</Link></li>
              <li><Link to="/privacy" className="text-sm text-foreground/80 hover:text-foreground">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-foreground/80 hover:text-foreground">Terms</Link></li>
            </ul>
          </div>

          <div className="min-w-0">
            <h3 className="text-[11px] tracking-[0.22em] text-muted-foreground uppercase">Contact</h3>
            <div className="mt-5 grid gap-3 text-sm leading-6 text-muted-foreground">
              <a
                href={`mailto:${content.settings.email}`}
                className="break-all text-foreground/85 transition-colors hover:text-foreground"
              >
                {content.settings.email}
              </a>
              <a
                href={`tel:${content.settings.phone.replace(/\s/g, "")}`}
                className="text-foreground/85 transition-colors hover:text-foreground"
              >
                {content.settings.phone}
              </a>
              <a
                href={content.settings.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="max-w-sm text-foreground/70 transition-colors hover:text-foreground"
              >
                {content.settings.addressLine}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 border-t border-border/60 pt-7 text-[10px] tracking-[0.16em] text-muted-foreground uppercase sm:grid-cols-2 sm:items-center">
          <p className="sm:text-left">Kathanika Media · Hyderabad</p>
          <p className="sm:text-right">© {year} Kathanika Media. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
