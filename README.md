# Kathanika Media V52 — Custom Domain Production

Production build for **https://www.kathanika.in/**.

## Custom-domain configuration

- Canonical site: `https://www.kathanika.in/`
- Vite/base path: `/`
- GitHub Pages custom domain: `www.kathanika.in`
- `public/CNAME`: `www.kathanika.in`
- Sitemap: `https://www.kathanika.in/sitemap.xml`
- Robots: `https://www.kathanika.in/robots.txt`
- Existing Google Apps Script API remains connected.

The old GitHub project path `/Kathanika/` is intentionally removed from production URL generation.

## Run locally

```powershell
npm install
npm run verify
npm run preflight:pages
npm run dev
```

## Git deployment gate

```powershell
npm run git:preflight
```

After GitHub issues the TLS certificate for `www.kathanika.in`, enable **Enforce HTTPS** in Repository → Settings → Pages.

See `GOOGLE_INDEXING_STEPS.txt` for Search Console handoff.
