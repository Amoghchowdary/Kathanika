# V70 Production QA Checklist

- Confirm Courses appears in desktop and mobile navigation.
- Confirm `/courses` contains native course information and no brochure/poster presentation.
- Submit a Course Inquiry and confirm a new row in `Course_Inquiries`.
- Open Career Inquiry and confirm the form is visible directly on the page, not hidden behind a modal.
- Submit a Career Inquiry and confirm a new row in `Career_Inquiries_V70`.
- Confirm Business Inquiry continues to submit normally.
- Confirm success/error states are readable on desktop, tablet and mobile.
- Run `npm run verify`, `npm run preflight:pages`, and `npm run git:preflight` before push.
