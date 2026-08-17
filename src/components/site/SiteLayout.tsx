import type { ReactNode } from "react";

import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { WhatsAppDock } from "./WhatsAppDock";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppDock />
    </div>
  );
}

export function PageHead({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="border-b border-border/60 px-5 pt-32 pb-14 sm:px-8 lg:pt-40 lg:pb-20">
      <div className="mx-auto max-w-[1600px]">
        <p className="text-[11px] tracking-[0.28em] text-muted-foreground uppercase">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.25rem,7vw,5rem)] leading-[0.95] font-semibold">
          {title}
        </h1>
        {intro ? (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {intro}
          </p>
        ) : null}
      </div>
    </section>
  );
}