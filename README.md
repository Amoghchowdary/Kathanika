# Kathanika Media V70 — Frontend-Only Production

V70 is the cleaned GitHub website release for Kathanika Media.

Key changes:

- Removes the **Manikanta Kandikatla / Operations & Communications** card from the About page.
- Keeps the founder order and portraits confirmed in V69.
- Keeps the existing deployed Google Apps Script Web App endpoint, but **does not include any Apps Script source files in Git**.
- Removes the `google-apps-script/` and `apps-script-deploy/` source folders from the website repository.
- Adds UTF-8/BOM normalization so Windows PowerShell BOMs cannot break Node JSON parsing again.
- Updates all production verifiers to V70 and makes the integrity/career checks frontend-only.
- Keeps SEO, sitemap, robots, structured data, GTM, GA4, custom domain and GitHub Pages deployment safeguards intact.
- Removes unused Recharts chart code and unused ESLint tooling from this production package.

Before deployment run:

```powershell
npm install
npm run typecheck
npm run verify
npm run preflight:pages
npm run git:preflight
```

The expected GitHub Pages artifact is `.output/public` and the production custom domain remains `https://www.kathanika.in/`.
