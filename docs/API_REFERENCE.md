# Kathanika V70 Frontend API Contract

The website communicates with the existing deployed Google Apps Script Web App through the `/exec` URL configured in `VITE_KATHANIKA_API_URL`.

The backend implementation is intentionally not stored in this Git repository.

## GET `?action=health`

Returns backend health information when supported by the deployed endpoint.

## GET `?action=content`

Returns public dynamic website content. The frontend keeps bundled defaults as a fallback if the request is unavailable.

## POST business inquiry

The frontend sends JSON text with `action: "businessInquiry"` and the business inquiry payload.

## POST career inquiry

The frontend sends JSON text with `action: "careerInquiry"` and the career inquiry payload, including the detected platform and profile URL.

Requests use `Content-Type: text/plain;charset=UTF-8` for the deployed Apps Script CORS contract.
