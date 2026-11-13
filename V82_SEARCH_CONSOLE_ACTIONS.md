# Kathanika Media V82 — Search Console hardening

## What V82 fixes in code
- Standardizes router output to trailing-slash URLs (`/about/`, `/work/`, etc.) to match GitHub Pages final URLs.
- Generates trailing-slash canonical URLs for indexable pages.
- Generates sitemap entries using the same final URLs.
- Adds a branded Kathanika 404 page at `public/404.html` while preserving a true HTTP 404 response on GitHub Pages.
- Replaces the generic SPA not-found screen with the same Kathanika recovery experience.
- Adds a V82 verifier that fails if route sources accidentally introduce `noindex`.

## Search Console interpretation
- `Page with redirect`: expected for HTTP and non-www variants; those should remain redirects. The avoidable path redirects are reduced by using the final trailing-slash URL everywhere.
- `Not found (404)`: only redirect a missing URL when a real replacement exists. Otherwise a real 404 is correct; V82 makes that 404 useful to visitors.
- `Blocked due to other 4xx`: requires the exact affected URL from Search Console to diagnose.
- `Crawled - currently not indexed` / `Discovered - currently not indexed`: V82 improves discovery consistency, but Google still decides whether a valid page is indexed.
- `Excluded by noindex`: current V82 indexable route source contains no `noindex`; inspect the exact historical URLs in Search Console and run Live URL Inspection before revalidation.

## After deployment
1. Submit `https://www.kathanika.in/sitemap.xml` in Search Console.
2. Inspect `/about/`, `/work/`, `/services/`, `/courses/`, `/creators/`, and `/contact/` and confirm the user-declared canonical is the same final trailing-slash URL.
3. Request indexing for the important pages after a successful live test.
4. For the 9 listed 404s and 1 blocked 4xx, export/copy the exact URLs before adding any redirects.
5. Start validation only after the live URL tests reflect the deployed V82 behavior.
