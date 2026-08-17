# Kathanika Media V46 — Verified Responsive Design

V46 fixes the desktop hero failure found in V45 and keeps the V44/V45 visual system intact.

Key corrections:
- each auto-hero story is hard-locked to exactly one viewport width (`flex: 0 0 100%`)
- display headlines cannot break words into letter fragments
- desktop hero typography is capped at a controlled editorial scale
- dedicated laptop, tablet, mobile, small-mobile, 320px and short-landscape rules remain in place
- six-page navigation, episode rails, Work, Services, inquiry modals and footer retain responsive fallbacks

Run locally:

```powershell
npm install
npm run verify
npm run preflight
npm run dev
```

Do not deploy to GitHub until visual approval.
