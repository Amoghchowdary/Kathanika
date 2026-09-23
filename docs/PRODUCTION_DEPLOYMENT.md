# Kathanika Media V70 — Frontend-Only Production Deployment

## Repository scope

This Git repository contains the website/frontend and GitHub Pages deployment files only. Google Apps Script source is intentionally excluded from Git.

The frontend continues to use the already deployed Apps Script Web App through `VITE_KATHANIKA_API_URL` in the environment files.

## Environment

Both `.env.production` and `.env.github-pages` use:

- `VITE_SITE_BASE=/`
- `VITE_PUBLIC_SITE_URL=https://www.kathanika.in/`
- the deployed Apps Script `/exec` endpoint

To rewrite the environment files without a UTF-8 BOM:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\configure-production.ps1
```

## Local validation

```powershell
npm install
npm run typecheck
npm run verify
npm run preflight:pages
npm run git:preflight
```

`npm run verify` includes encoding normalization, strict TypeScript checking, frontend integrity, inquiry contract, team profile, responsive, SEO, analytics and performance checks.

## GitHub Pages

The workflow `.github/workflows/deploy-pages.yml` runs automatically on pushes to `main`.

It installs dependencies, runs `npm run preflight:pages`, uploads `.output/public`, and deploys through GitHub Pages.

GitHub repository:

```text
https://github.com/Amoghchowdary/Kathanika.git
```

Custom domain:

```text
https://www.kathanika.in/
```

## Git push

```powershell
git add .
git status
git commit -m "Deploy Kathanika Media V70 frontend-only production"
git push origin main
```

Before committing, verify that `google-apps-script/` and `apps-script-deploy/` are absent.
