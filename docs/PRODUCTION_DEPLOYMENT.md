# Kathanika Media V30 — Production Deployment

## 1. Apps Script backend

The single-file backend is:

`apps-script-deploy/Kathanika_V30_Production_Backend.gs`

For a fresh Apps Script project, paste it into `Code.gs`, run `setupDatabase()`, then run `verifyProductionSetup()`. Deploy the project as a Web App and copy the `/exec` URL.

If the existing Kathanika Apps Script deployment is already working, V30's frontend remains endpoint-compatible with it. You do not need to recreate the Google Sheet merely to fix GitHub hosting.

## 2. Environment

The package includes:

- `.env.production` — root/custom-domain build
- `.env.github-pages` — GitHub project Pages build using `/kathanika/`

To regenerate them:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\configure-production.ps1
```

## 3. Local verification

```powershell
npm install
npm run verify
npm run dev
```

Test Home, Work, Services, Business Inquiry, Career Inquiry, all nine manual Top 10 rails, and the footer. Confirm one test submission reaches each inquiry sheet.

## 4. GitHub Pages preflight

Before committing:

```powershell
npm run preflight:pages
```

This performs:

1. strict TypeScript typecheck;
2. V30 source/data checks;
3. build using `/kathanika/`;
4. verification of the generated `.output/public` Pages artifact.

Optional helper:

```powershell
npm run git:preflight
```

## 5. Git commit/push

For a new local repository:

```powershell
git init
git branch -M main
git remote add origin https://github.com/Amoghchowdary/kathanika.git
git add .
git commit -m "Kathanika Media V30 production"
git push -u origin main
```

If `origin` already exists:

```powershell
git remote set-url origin https://github.com/Amoghchowdary/kathanika.git
git add .
git commit -m "Kathanika Media V30 production"
git push origin main
```

`.git` is valid and must not be deleted. `.github` is also valid and required because it contains the Pages workflow.

## 6. GitHub Pages setting

In the repository:

**Settings → Pages → Build and deployment → Source → GitHub Actions**

Then open **Actions**. The workflow `Deploy Kathanika V30 to GitHub Pages` runs automatically on pushes to `main`.

The workflow builds `.output/public`, verifies it, uploads the Pages artifact, and deploys it.

Expected staging URL:

`https://amoghchowdary.github.io/kathanika/`

## 7. Custom domain later

For a custom root domain, use the normal production build with `VITE_SITE_BASE=/`. Do not use `/kathanika/` for the final custom-domain build.

## 8. Post-launch checks

- staging URL loads without GitHub 404;
- Home/Work/Services/Contact/Creators direct routes load;
- images and CSS resolve under `/kathanika/`;
- all manual rail controls work;
- one Business Inquiry reaches Sheets;
- one Career Inquiry reaches Sheets;
- mobile/tablet/desktop layouts remain correct.
