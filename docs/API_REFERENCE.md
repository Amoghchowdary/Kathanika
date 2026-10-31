# Kathanika V30 API Reference

Base URL: the deployed Google Apps Script Web App `/exec` URL.

## GET `?action=health`

Returns service version and server timestamp.

## GET `?action=content`

Returns public dynamic data used by the website:

- `settings`
- `social`
- `services`
- `topTenChannels`

The frontend falls back to bundled defaults if this request fails.

## POST business inquiry

Use `Content-Type: text/plain;charset=UTF-8` with JSON body:

```json
{
  "action": "businessInquiry",
  "payload": {
    "name": "...",
    "email": "...",
    "phone": "...",
    "company": "...",
    "designation": "...",
    "city": "...",
    "service": "...",
    "message": "...",
    "sourcePage": "/contact",
    "website": ""
  }
}
```

## POST career inquiry

```json
{
  "action": "careerInquiry",
  "payload": {
    "name": "...",
    "email": "...",
    "phone": "...",
    "city": "...",
    "category": "...",
    "platform": "...",
    "profileUrl": "https://...",
    "audienceStage": "...",
    "message": "...",
    "sourcePage": "/creators",
    "website": ""
  }
}
```

## Response envelope

Success:

```json
{ "ok": true, "data": {}, "requestId": "..." }
```

Validation/backend error:

```json
{ "ok": false, "error": "...", "requestId": "..." }
```
