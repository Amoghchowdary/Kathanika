function jsonOutput_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function parseJsonBody_(e) {
  if (!e || !e.postData || !e.postData.contents) throw new Error('Request body is required.');
  if (Number(e.postData.length || e.contentLength || 0) > 20000) throw new Error('Request is too large.');
  try {
    return JSON.parse(e.postData.contents);
  } catch (error) {
    throw new Error('Invalid JSON request.');
  }
}

function newRequestId_(prefix) {
  return String(prefix || 'REQ') + '-' + Utilities.getUuid();
}

function normalizeText_(value, maxLength) {
  const normalized = String(value == null ? '' : value)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim();
  return normalized.slice(0, maxLength || 1000);
}

function normalizeEmail_(value) {
  return normalizeText_(value, 180).toLowerCase();
}

function isEmail_(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function isPhone_(value) {
  if (!value) return true;
  const digits = String(value).replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

function isHttpUrl_(value) {
  return /^https?:\/\//i.test(value || '');
}

function bool_(value) {
  if (typeof value === 'boolean') return value;
  return ['true', '1', 'yes', 'y'].indexOf(String(value).toLowerCase()) >= 0;
}

function number_(value, fallback) {
  const parsed = Number(value);
  return isFinite(parsed) ? parsed : fallback;
}

function hash_(value) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value, Utilities.Charset.UTF_8);
  return bytes.map(function(byte) {
    const v = (byte < 0 ? byte + 256 : byte).toString(16);
    return v.length === 1 ? '0' + v : v;
  }).join('');
}

function publicError_(error) {
  const message = error && error.message ? String(error.message) : 'Unexpected server error.';
  if (/required|valid|duplicate|busy|configured|missing/i.test(message)) return message;
  return 'We could not process the request. Please try again.';
}

function safeCell_(value) {
  if (typeof value !== 'string') return value;
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function enforceRateLimit_(identity, scope) {
  const key = 'rate:' + String(scope || 'generic') + ':' + hash_(String(identity || '').toLowerCase());
  const cache = CacheService.getScriptCache();
  const current = Number(cache.get(key) || '0');
  if (current >= 5) throw new Error('Too many submissions. Please try again later.');
  cache.put(key, String(current + 1), 3600);
}
