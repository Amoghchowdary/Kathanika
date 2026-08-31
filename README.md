# Kathanika Media V57 — Production Stable

V57 is the consolidated production release for `https://www.kathanika.in/`. It preserves the V54/V55 performance work, the V55 Google Tag Manager integration, the V56 direct Google Analytics 4 tag, the complete frontend source, all 90 episode assets, optimized media, SEO metadata, custom-domain configuration, GitHub Pages deployment, and Google Apps Script backend source.

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
