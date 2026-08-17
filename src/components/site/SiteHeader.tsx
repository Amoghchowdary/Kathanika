import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/utils";

const HEADER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open
          ? "border-b border-border/60 bg-background/88 backdrop-blur-xl"
          : "border-b border-transparent bg-background/68 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-center px-5 sm:px-8 lg:h-[68px]">
        <nav className="hidden items-center gap-7 lg:flex xl:gap-8">
          {HEADER_LINKS.map((link) => (
            <a
              key={link.label}
              href={withBasePath(link.href)}
              className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href={withBasePath("/creators")}
            className="rounded-full border border-foreground/30 px-5 py-2.5 text-[12px] font-semibold tracking-[0.08em] text-foreground uppercase transition-all hover:-translate-y-0.5 hover:border-foreground/60 hover:bg-foreground/5"
          >
            Career Inquiry
          </a>
          <a
            href={withBasePath("/contact")}
            className="rounded-full bg-primary px-5 py-2.5 text-[12px] font-semibold tracking-[0.08em] text-primary-foreground uppercase transition-all hover:-translate-y-0.5 hover:opacity-90"
          >
            Business Inquiry
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="ml-auto flex size-11 shrink-0 items-center justify-center text-foreground lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open ? (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col justify-between overflow-y-auto bg-background px-6 pt-8 pb-10 lg:hidden">
          <nav className="flex flex-col gap-1">
            {HEADER_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={withBasePath(link.href)}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${i * 45}ms` }}
                className="animate-fade-in border-b border-border/50 py-4 font-display text-[clamp(1.75rem,9vw,2.5rem)] font-semibold tracking-tight"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-10 grid gap-3">
            <a
              href={withBasePath("/creators")}
              onClick={() => setOpen(false)}
              className="flex h-14 items-center justify-center rounded-full border border-foreground/30 text-sm font-semibold tracking-[0.08em] text-foreground uppercase"
            >
              Career Inquiry
            </a>
            <a
              href={withBasePath("/contact")}
              onClick={() => setOpen(false)}
              className="flex h-14 items-center justify-center rounded-full bg-primary text-sm font-semibold tracking-[0.08em] text-primary-foreground uppercase"
            >
              Business Inquiry
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
