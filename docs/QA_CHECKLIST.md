# V30 Production QA Checklist

## Frontend
- [ ] Desktop: 1440×900 and 1920×1080
- [ ] Tablet: 768×1024 and 1024×1366
- [ ] Mobile: 360×800, 390×844 and 430×932
- [ ] No horizontal page overflow
- [ ] Header/menu works on all breakpoints
- [ ] Kathanika logo renders on home page
- [ ] All 9 channel rails render
- [ ] Each channel has ranks 1–10
- [ ] Manual left/right controls wrap at both ends
- [ ] Touch/trackpad scrolling works
- [ ] Each cover opens the exact YouTube URL in a new tab
- [ ] Services, Work, Career Inquiry, Business Inquiry, Privacy and Terms routes load directly

## Database self-setup

- [ ] Create a new standalone Apps Script project.
- [ ] Run `setupDatabase()` once and authorize it.
- [ ] Confirm `Kathanika_Website_DB` is created in My Drive.
- [ ] Confirm all 8 database tabs exist.
- [ ] Confirm Channels has 9 seeded channels and Video_Content has 90 seeded videos.
- [ ] Run `verifyProductionSetup()` and confirm `ok: true` with no issues.
- [ ] Run `getDatabaseStatus()` and confirm it returns the same Spreadsheet URL.

## Backend
- [ ] `?action=health` returns `ok: true`
- [ ] `?action=content` returns 9 channels and 90 videos
- [ ] Business Inquiry creates exactly one `Business_Inquiries` row
- [ ] Career Inquiry creates exactly one `Career_Inquiries` row
- [ ] Duplicate immediate submissions are rejected
- [ ] Invalid email/profile URL is rejected server-side
- [ ] Honeypot submissions do not create rows
- [ ] Notification email reaches the configured mailbox
- [ ] Error cases appear in `Error_Log`

## Data
- [ ] Phone: +91 90638 54291
- [ ] Email: kathanikamedia@gmail.com
- [ ] Banjara Hills office address is correct
- [ ] Services match approved client list
- [ ] All 90 `Video_URL` cells are populated
- [ ] All `Cover_URL` paths resolve

## Release
- [ ] Production `.env.production` contains only the Apps Script `/exec` URL
- [ ] No credentials or Spreadsheet ID are exposed in frontend files
- [ ] `npm run verify` passes on deployment machine
- [ ] `npm run build:production` passes on deployment machine
- [ ] Production deployment uses `/exec`, not `/dev`
- [ ] Custom domain/HTTPS is working
