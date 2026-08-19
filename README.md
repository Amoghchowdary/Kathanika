# Kathanika Media V50

Client-media, footer, SEO and Google-indexing-ready build for the Kathanika Media website.

## What changed

- Client-provided production photography is used in the homepage hero.
- Work includes a production reel with optimized stills and video previews.
- Footer includes visible YouTube, Instagram and LinkedIn icons/backlinks plus email, phone and map actions.
- SEO includes page-specific metadata, canonical URLs, Open Graph/Twitter previews, Organization JSON-LD, sitemap.xml and robots.txt.
- `sitemap.yml` is included only as a human-readable manifest; Google uses `sitemap.xml`.
- Search Console HTML-tag verification is supported through `VITE_GOOGLE_SITE_VERIFICATION`.

## Run locally

```powershell
npm install
npm run verify
npm run preflight
npm run dev
```

## GitHub Pages production check

```powershell
npm run preflight:pages
npm run git:preflight
```

Production base path: `/Kathanika/`

Current canonical production URL: `https://amoghchowdary.github.io/Kathanika/`

If a custom domain is connected later, change `VITE_PUBLIC_SITE_URL` before rebuilding.

See `GOOGLE_INDEXING_STEPS.txt` for the Search Console handoff.
