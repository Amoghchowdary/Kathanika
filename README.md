# Kathanika Media V55 — Google Tag Manager Production Revision

Production domain: https://www.kathanika.in/

V55 targets the remaining mobile Lighthouse bottlenecks observed after V53:
- Episode rails are now intersection-gated and are not mounted during the initial page trace.
- All 90 supplied episode covers retain their original JPGs and also receive compact 720px AVIF delivery variants.
- The initial Apps Script content refresh is moved outside the first 12 seconds so it does not compete with LCP/hydration.
- The primary hero image gains a 640px AVIF candidate and uses synchronous decode when high-priority.
- The first hero slide remains stable for 9 seconds before the automatic carousel begins, preventing early slide churn during LCP measurement.
- Existing custom-domain SEO, client media, inquiry flows, sitemap, robots and social links are preserved.

Important: GitHub Pages controls static-asset Cache-Control TTLs. The 10-minute browser TTL reported by Lighthouse cannot be changed from repository code. V55 reduces the amount of content affected by deferring the episode library and using much smaller episode images.
