# V70 Frontend Production QA Checklist

## Build and source
- [ ] `npm install` completes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run verify` passes.
- [ ] `npm run preflight:pages` passes.
- [ ] `npm run git:preflight` passes on Windows PowerShell.
- [ ] `google-apps-script/` is absent.
- [ ] `apps-script-deploy/` is absent.
- [ ] No `.gs` backend source is committed.

## About page
- [ ] Founder team hero remains intact.
- [ ] Nikhil Dintakurthi remains the first founder profile.
- [ ] Sai Prudvi remains the second founder profile.
- [ ] Manikanta Kandikatla / Operations & Communications card is absent.

## Frontend
- [ ] Home, About, Work, Services, Creators, Brands, Contact, Privacy and Terms routes load directly.
- [ ] Header/menu works on desktop, tablet and mobile.
- [ ] Kathanika logo renders correctly.
- [ ] Episode rails and media assets load correctly.
- [ ] No horizontal overflow appears on common mobile widths.

## API connectivity
- [ ] Business Inquiry reaches the existing deployed backend endpoint.
- [ ] Career Inquiry reaches the existing deployed backend endpoint.
- [ ] Frontend uses `/exec`, never `/dev`.
- [ ] No backend source or credentials are exposed in Git.

## SEO and analytics
- [ ] `public/CNAME` is `www.kathanika.in`.
- [ ] `sitemap.xml`, `robots.txt`, manifest and OG image exist.
- [ ] Canonicals use `https://www.kathanika.in/`.
- [ ] GTM and GA4 production IDs are intact.
