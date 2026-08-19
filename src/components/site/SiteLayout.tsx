import type { ReactNode } from "react";

import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function SiteLayout({ children }: { children: ReactNode }) {
  return <div className="v41-shell"><SiteHeader /><main>{children}</main><SiteFooter /></div>;
}

export function PageHead({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="v41-page-head v48-page-head">
      <div className="v48-page-head-lines" aria-hidden="true"><i /><i /><i /></div>
      <div className="v41-page-head-label"><span>01</span><span>{eyebrow}</span></div>
      <h1>{title}</h1>
      {intro ? <p>{intro}</p> : null}
    </section>
  );
}
