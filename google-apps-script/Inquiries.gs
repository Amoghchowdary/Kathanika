function createBusinessInquiry_(raw, requestId) {
  if (normalizeText_(raw.website || '', 200)) return ignoredBotResponse_();

  const data = {
    name: normalizeText_(raw.name, 100),
    email: normalizeEmail_(raw.email),
    phone: normalizeText_(raw.phone, 40),
    company: normalizeText_(raw.company, 120),
    designation: normalizeText_(raw.designation, 100),
    city: normalizeText_(raw.city, 100),
    service: normalizeText_(raw.service, 160),
    message: normalizeText_(raw.message, 3000),
    sourcePage: normalizeText_(raw.sourcePage || '/contact', 120),
  };

  require_(data.name.length >= 2, 'Name is required.');
  require_(isEmail_(data.email), 'A valid email is required.');
  require_(isPhone_(data.phone), 'A valid phone number is required.');
  require_(data.company.length >= 2, 'Company / organisation is required.');
  require_(data.city.length >= 2, 'City is required.');
  require_(data.service.length >= 2, 'Service is required.');
  require_(data.message.length >= 10, 'Please add a little more detail about the inquiry.');

  enforceRateLimit_(data.email + '|' + data.phone, 'business');
  const hash = hash_(['business', data.email, data.phone, data.company, data.message].join('|').toLowerCase());
  const id = 'BI-' + Utilities.getUuid().split('-')[0].toUpperCase();
  const now = new Date();
  appendInquiryLocked_(KATHANIKA.SHEETS.BUSINESS, 13, hash, [
    id, now, safeCell_(data.name), safeCell_(data.email), safeCell_(data.phone), safeCell_(data.company), safeCell_(data.designation),
    safeCell_(data.city), safeCell_(data.service), safeCell_(data.message), safeCell_(data.sourcePage), KATHANIKA.DEFAULT_STATUS, hash,
  ]);
  notifyOwner_('New Kathanika Business Inquiry — ' + data.company,
    'Inquiry ID: ' + id + '\nName: ' + data.name + '\nEmail: ' + data.email + '\nPhone: ' + data.phone + '\nCompany: ' + data.company + '\nService: ' + data.service + '\n\n' + data.message);
  return { id: id, timestamp: now.toISOString() };
}

function createCareerInquiry_(raw, requestId) {
  if (normalizeText_(raw.website || '', 200)) return ignoredBotResponse_();

  const data = {
    name: normalizeText_(raw.name, 100),
    email: normalizeEmail_(raw.email),
    phone: normalizeText_(raw.phone, 40),
    city: normalizeText_(raw.city, 100),
    category: normalizeText_(raw.category || raw.designation, 120),
    platform: normalizeText_(raw.platform, 120),
    profileUrl: normalizeText_(raw.profileUrl || raw.company, 500),
    audienceStage: normalizeText_(raw.audienceStage, 160),
    message: normalizeText_(raw.message, 3000),
    sourcePage: normalizeText_(raw.sourcePage || '/creators', 120),
  };

  require_(data.name.length >= 2, 'Name is required.');
  require_(isEmail_(data.email), 'A valid email is required.');
  require_(isPhone_(data.phone), 'A valid phone number is required.');
  require_(data.city.length >= 2, 'City is required.');
  require_(data.category.length >= 2, 'Creator category is required.');
  require_(data.platform.length >= 2, 'Primary platform is required.');
  require_(isHttpUrl_(data.profileUrl), 'A valid channel / profile URL is required.');
  require_(data.audienceStage.length >= 2, 'Audience stage is required.');
  require_(data.message.length >= 10, 'Please add a little more detail about what you want to build.');

  enforceRateLimit_(data.email + '|' + data.phone, 'career');
  const hash = hash_(['career', data.email, data.phone, data.profileUrl, data.message].join('|').toLowerCase());
  const id = 'CI-' + Utilities.getUuid().split('-')[0].toUpperCase();
  const now = new Date();
  appendInquiryLocked_(KATHANIKA.SHEETS.CAREER, 14, hash, [
    id, now, safeCell_(data.name), safeCell_(data.email), safeCell_(data.phone), safeCell_(data.city), safeCell_(data.category), safeCell_(data.platform),
    safeCell_(data.profileUrl), safeCell_(data.audienceStage), safeCell_(data.message), safeCell_(data.sourcePage), KATHANIKA.DEFAULT_STATUS, hash,
  ]);
  notifyOwner_('New Kathanika Career Inquiry — ' + data.name,
    'Application ID: ' + id + '\nName: ' + data.name + '\nEmail: ' + data.email + '\nPhone: ' + data.phone + '\nCategory: ' + data.category + '\nPlatform: ' + data.platform + '\nProfile: ' + data.profileUrl + '\nAudience: ' + data.audienceStage + '\n\n' + data.message);
  return { id: id, timestamp: now.toISOString() };
}

function require_(condition, message) {
  if (!condition) throw new Error(message);
}

function ignoredBotResponse_() {
  return { id: 'ACCEPTED', timestamp: new Date().toISOString() };
}

function markDuplicate_(hash) {
  CacheService.getScriptCache().put('inquiry:' + hash, '1', 600);
}

function rejectDuplicate_(sheetName, hashColumn, hash) {
  if (CacheService.getScriptCache().get('inquiry:' + hash)) {
    throw new Error('This inquiry was already received recently.');
  }

  const sheet = getSheet_(sheetName);
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return;
  const startRow = Math.max(2, lastRow - 99);
  const rowCount = lastRow - startRow + 1;
  const createdValues = sheet.getRange(startRow, 2, rowCount, 1).getValues();
  const hashValues = sheet.getRange(startRow, hashColumn, rowCount, 1).getDisplayValues();
  const cutoff = Date.now() - (10 * 60 * 1000);

  const duplicate = hashValues.some(function(row, index) {
    if (row[0] !== hash) return false;
    const created = createdValues[index][0];
    const timestamp = created instanceof Date ? created.getTime() : new Date(created).getTime();
    return isFinite(timestamp) && timestamp >= cutoff;
  });

  if (duplicate) throw new Error('This inquiry was already received recently.');
}

function notifyOwner_(subject, body) {
  const email = getScriptConfig_().notificationEmail;
  if (!email) return;
  try {
    MailApp.sendEmail({ to: email, subject: subject, body: body, name: 'Kathanika Website' });
  } catch (error) {
    console.warn('Notification email failed', error);
  }
}
