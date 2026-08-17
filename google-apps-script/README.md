# Kathanika Apps Script API — V30 Self-Setup

This backend is designed for a standalone Google Apps Script project. No spreadsheet or Excel upload is required.

## Recommended deployment

For a simple deployment, use the generated single file:

`../apps-script-deploy/Kathanika_V30_Production_Backend.gs`

Paste it into `Code.gs`.

The split `.gs` files in this folder contain the same backend and are provided for maintainability.

## One-time setup

Run:

```javascript
setupDatabase()
```

Authorize the Google account that should own the production database.

The function creates `Kathanika_Website_DB`, creates all eight tabs, applies schema/validation/formatting, seeds the approved site settings, 10 services, 9 channels and 90 videos, and stores the generated Spreadsheet ID in Script Properties.

Running it again is safe: the configured database is reused.

## Production verification

Run:

```javascript
verifyProductionSetup()
```

The initial seeded database should return `ok: true` and no issues.

To retrieve the database URL:

```javascript
getDatabaseStatus()
```

## Deploy the API

- Deploy → New deployment → Web app
- Execute as: Me
- choose the public access level required for the website
- deploy
- copy the `/exec` URL

## Public endpoints

- `GET ?action=health`
- `GET ?action=content`
- `POST { action: "businessInquiry", payload: {...} }`
- `POST { action: "careerInquiry", payload: {...} }`

## Content refresh

After urgent Google Sheets content edits:

```javascript
invalidatePublicContentCache()
```
