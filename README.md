# Kathanika Media V69 — Founder Identity Correction

V69 preserves the complete V68/V67/V65 production website and changes only the founder identity/order mapping confirmed by the client.

- First founder card: **Nikhil Dintakurthi — Founder**, using the **one-hand portrait** (`founder-portrait-02`).
- Second founder card: **Sai Prudvi — Co-Founder & COO**, using the **two-hands portrait** (`founder-portrait-01`).
- The large founders-together image remains intact and unchanged.
- The extra founders gallery remains removed.
- All biographies, Manikanta Kandikatla profile, Career Inquiry fix, backend, analytics, SEO, performance, media, custom domain and deployment safeguards are retained.

Run `npm install --include=dev`, `npm run typecheck`, `npm run verify:team`, `npm run verify`, `npm run preflight:pages`, and `npm run git:preflight` before deployment.

## V84 — GitHub Pages custom 404 artifact fix
V84 preserves V82 Search Console hardening and adds a post-build artifact finalizer that explicitly copies `public/404.html` to `.output/public/404.html`. Both Pages-build and production-artifact verification now fail if the branded Kathanika 404 is missing from the deployed artifact root.


## V84 — cumulative release lineage fix
V84 is rebuilt cumulatively from the latest complete source. It includes all V82 Search Console hardening, the V83 final 404 artifact protection, and fixes every TanStack typed internal link to the canonical trailing-slash route so repeated `preflight:pages` / `git:preflight` runs remain deterministic.
