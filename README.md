# Kathanika Media — V30 Production

V30 is the consolidated production release with the approved client design, Google Apps Script + Google Sheets backend, and GitHub Pages deployment hardening.

## Backend

The existing Apps Script `/exec` endpoint remains API-compatible. The V30 backend is also included at:

`apps-script-deploy/Kathanika_V30_Production_Backend.gs`

For a fresh Apps Script project, paste it into `Code.gs`, run `setupDatabase()`, run `verifyProductionSetup()`, then deploy as a Web App.

## Environment

This build is preconfigured for the current Apps Script Web App and for the GitHub repository `Amoghchowdary/kathanika`:

- root/custom domain base: `/`
- GitHub Pages project base: `/kathanika/`

To reconfigure later:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\configure-production.ps1
```

## Local verification

```powershell
npm install
npm run verify
npm run dev
```

## GitHub Pages preflight

```powershell
npm run preflight:pages
```

This runs source verification, builds with `/kathanika/`, and verifies the generated `.output/public` Pages artifact.

## GitHub deployment

The workflow is already included at:

`.github/workflows/deploy-pages.yml`

After a successful preflight:

```powershell
git init
git branch -M main
git remote add origin https://github.com/Amoghchowdary/kathanika.git
git add .
git commit -m "Kathanika Media V30 production"
git push -u origin main
```

If `origin` already exists, use `git remote set-url origin ...` instead of `git remote add`.

In GitHub: **Settings → Pages → Source → GitHub Actions**.

The workflow builds and deploys `.output/public` to the project site.

## Important Git fixes in V30

- `.git` is no longer treated as a verification failure.
- `.github` is intentionally required because it contains the Pages workflow.
- `.gitattributes` normalizes repository line endings.
- GitHub Actions no longer requires a pre-existing `package-lock.json`; it uses `npm install`, so a fresh V30 package can deploy immediately.
- Root-only links/assets are converted to deployment-base-aware paths.
