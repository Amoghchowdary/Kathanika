# Kathanika V31 API Reference

Frontend companion: Kathanika Media V70.

## GET

- `?action=health` — API status/version.
- `?action=content` — public website content.

## POST

Send JSON as `text/plain;charset=UTF-8` so the public Apps Script web app remains compatible with browser CORS simple-request behavior.

- `businessInquiry` — existing business inquiry flow.
- `careerInquiry` — V70 recruitment inquiry flow, stored in `Career_Inquiries_V70`.
- `courseInquiry` — V70 course lead flow, stored in `Course_Inquiries`.

Each endpoint returns the standard `{ ok, data, requestId }` envelope or `{ ok: false, error, requestId }`.
