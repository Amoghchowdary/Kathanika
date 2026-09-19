# Kathanika Media V66 — Team Behind Kathanika

V66 preserves the complete V65 production website and Career Inquiry fix, and adds a new “Team behind Kathanika Media” section to the About page using the supplied founder photography and approved founding-team profile information. GTM, GA4, SEO, performance optimizations, custom-domain deployment, Google Apps Script backend, episode assets and existing website behavior remain intact.

## Tracking kept intact

- Google Tag Manager: `GTM-PZF49MGL`
- Google Analytics 4: `G-Y94QFK4PZZ`
- GTM loader: document `<head>`
- GTM noscript fallback: first tracking block inside `<body>`
- GA4 `gtag.js`: async in document `<head>`

## Production verification

```powershell
npm ci
npm run verify
npm run preflight:pages
npm run git:preflight
```

`preflight:pages` now verifies source integrity, TypeScript, responsive behavior, client feedback coverage, media, SEO, performance, Lighthouse hardening, custom domain, GTM, GA4, the generated Pages HTML, tracking inside the built artifact, and local asset-reference integrity.

## Production architecture

Frontend: TanStack Start / React / Vite
Hosting: GitHub Pages custom domain
Domain: `https://www.kathanika.in/`
Backend: Google Apps Script
Database: Google Sheets

GitHub Pages uses the root base path `/` because the site is served from the custom domain. `public/CNAME`, sitemap, robots, canonical metadata and structured data must continue to use `www.kathanika.in`.

## Important analytics note

The direct GA4 tag is intentionally retained exactly alongside GTM because both were supplied for production. If the same GA4 property is later configured as a Google tag inside GTM, review Tag Manager settings to avoid duplicate GA4 page-view events.
