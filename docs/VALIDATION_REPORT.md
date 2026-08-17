# Kathanika Media V30 — Validation Report

Validated on 2026-08-17 before release packaging.

## Passed in the packaging environment

- V30 source/data verifier passed **246 checks**.
- GitHub deployment files are intentionally present: `.github/workflows/deploy-pages.yml` is required and `.git` is allowed after repository initialization.
- `.gitattributes` enforces LF line endings for text files to avoid Windows/Linux line-ending churn.
- GitHub Pages base configuration is `/kathanika/`.
- TanStack Router uses the runtime deployment base path.
- Header, favicon, error links and Top 10 cover paths are deployment-base aware.
- GitHub Pages workflow includes `pages: write` and `id-token: write`.
- GitHub Pages workflow uses `actions/upload-pages-artifact@v4` and `actions/deploy-pages@v4`.
- Workflow uses `npm install`, so a fresh package does not fail merely because `package-lock.json` has not yet been generated.
- Vite 8 native `resolve.tsconfigPaths` is used, so the legacy `vite-tsconfig-paths` plugin is not loaded.
- Apps Script split files and the single-file deployment backend pass JavaScript syntax checks.
- Apps Script package version is `30.0.0`.
- `setupDatabase()` self-provisions and remembers the Google Sheets database.
- `verifyProductionSetup()` is included.
- Inquiry duplicate detection + append execute inside one script lock.
- 9 seeded channels and 10 services are present.
- 90 seeded video records are present.
- Every channel contains ranks 1 through 10 exactly once.
- All 90 bundled Top 10 cover paths resolve locally.
- All 90 video destinations are valid YouTube URL shapes.
- No `localStorage` persistence remains.
- No `.lovable` artifact is present.

## Dependency-resolved build checkpoint

This packaging runtime does not have the project's npm dependency tree installed, so the final dependency-resolved TypeScript/build check must run on the deployment machine or GitHub Actions. V30 includes both commands:

```powershell
npm install
npm run preflight:pages
```

The Pages workflow repeats those checks on Ubuntu before deployment. If source verification, build, or Pages artifact verification fails, the deploy job does not run.
