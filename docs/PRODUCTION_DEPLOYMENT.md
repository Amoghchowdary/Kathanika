# Kathanika Media V70 — Production Deployment

## 1. Upgrade the Apps Script backend first

Use `apps-script-deploy/Kathanika_V31_Production_Backend.gs` in the existing Kathanika Apps Script project.

1. Replace the deployed Apps Script source with the V31 bundle and Save.
2. Run `setupDatabase()` once. It reuses the configured Kathanika database and creates missing V70 tables without deleting legacy inquiry data.
3. Run `verifyProductionSetup()` and confirm `ok: true` with no issues.
4. Deploy a new version of the existing Web App deployment so the current `/exec` URL can remain unchanged.
5. Test one Career Inquiry and one Course Inquiry and confirm rows appear in `Career_Inquiries_V70` and `Course_Inquiries`.

## 2. Verify the V70 frontend

```powershell
npm install --include=dev
npm run typecheck
npm run verify:courses
npm run verify:team
npm run verify:career
npm run verify
npm run preflight:pages
npm run git:preflight
```

## 3. GitHub Pages deployment

The production workflow is `.github/workflows/deploy-pages.yml` and runs the full V70 Pages preflight before deployment. The custom domain remains `www.kathanika.in`.
