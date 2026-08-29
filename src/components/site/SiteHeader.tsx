import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import logo from "@/assets/kathanika-logo-client.png";
import { withBasePath } from "@/lib/base-path";

const LINKS = [
  ["Home", "/"],
  ["About", "/about"],
  ["Work", "/work"],
  ["Services", "/services"],
  ["Career Inquiry", "/creators"],
  ["Business Inquiry", "/contact"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 1240) setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <>
      <header className={`v41-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="v41-brand" href={withBasePath("/")} aria-label="Kathanika Media home">
          <img src={logo} alt="Kathanika Media" width={1919} height={717} />
        </a>
        <nav className="v41-desktop-nav" aria-label="Primary navigation">
          {LINKS.map(([label, href]) => <a key={href} href={withBasePath(href)}>{label}</a>)}
        </nav>
        <button className="v41-menu-button" type="button" onClick={() => setOpen(true)} aria-label="Open navigation" aria-expanded={open}>
          <Menu />
        </button>
      </header>

      <div className={`v41-mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="v41-mobile-menu-top">
          <img src={logo} alt="Kathanika Media" width={1919} height={717} />
          <button type="button" onClick={() => setOpen(false)} aria-label="Close navigation"><X /></button>
        </div>
        <nav aria-label="Mobile navigation">
          {LINKS.map(([label, href], index) => (
            <a key={href} href={withBasePath(href)} onClick={() => setOpen(false)}>
              <span>{String(index + 1).padStart(2, "0")}</span>{label}
            </a>
          ))}
        </nav>
        <div className="v41-mobile-menu-foot">
          <span>Hyderabad · India</span>
          <span>Content · Community · Distribution · Marketing</span>
        </div>
      </div>
    </>
  );
}
