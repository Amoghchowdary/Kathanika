const SHEET_HEADERS = Object.freeze({
  Business_Inquiries: [
    'Inquiry_ID', 'Created_At', 'Name', 'Work_Email', 'Phone', 'Company', 'Designation',
    'City', 'Service', 'Message', 'Source_Page', 'Status', 'Request_Hash'
  ],
  Career_Inquiries: [
    'Application_ID', 'Created_At', 'Creator_Name', 'Email', 'Phone', 'City', 'Creator_Category',
    'Primary_Platform', 'Profile_URL', 'Audience_Stage', 'Message', 'Source_Page', 'Status', 'Request_Hash'
  ],
  Channels: ['Channel_ID', 'Channel_Name', 'Slug', 'Active', 'Display_Order', 'Updated_At'],
  Video_Content: ['Video_ID', 'Channel_ID', 'Rank', 'Cover_URL', 'Video_URL', 'Active', 'Display_Order', 'Updated_At'],
  Site_Settings: ['Key', 'Value', 'Value_Type', 'Active', 'Updated_At'],
  Services: ['Service_ID', 'Active', 'Display_Order', 'Title', 'Description', 'Updated_At'],
  Admin_Log: ['Timestamp', 'Action', 'Entity', 'Entity_ID', 'Details'],
  Error_Log: ['Timestamp', 'Request_ID', 'Action', 'Error', 'Stack'],
});

/**
 * ONE-TIME PRODUCTION SETUP
 *
 * Run this function manually from a new standalone Apps Script project.
 * It creates the Google Sheets database automatically, stores its ID in
 * Script Properties, creates all tables, applies formatting/validation,
 * and seeds Kathanika's production content.
 *
 * Safe to run again: it reuses the configured database and does not
 * duplicate seed rows when tables already contain data.
 */
function setupDatabase() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) throw new Error('Database setup is already running. Please try again shortly.');

  try {
    const props = PropertiesService.getScriptProperties();
    let spreadsheet = null;
    let created = false;
    const existingId = props.getProperty('SPREADSHEET_ID') || '';

    if (existingId) {
      try {
        spreadsheet = SpreadsheetApp.openById(existingId);
      } catch (error) {
        // The stored file may have been deleted or access may have changed.
        props.deleteProperty('SPREADSHEET_ID');
      }
    }

    if (!spreadsheet) {
      spreadsheet = SpreadsheetApp.create(KATHANIKA.DATABASE_NAME);
      created = true;
      props.setProperty('SPREADSHEET_ID', spreadsheet.getId());
    }

    if (!props.getProperty('NOTIFICATION_EMAIL')) {
      props.setProperty('NOTIFICATION_EMAIL', KATHANIKA.DEFAULT_NOTIFICATION_EMAIL);
    }

    // Production-friendly spreadsheet defaults.
    try { spreadsheet.setSpreadsheetTimeZone('Asia/Kolkata'); } catch (error) { /* optional */ }
    try { spreadsheet.setSpreadsheetLocale('en_IN'); } catch (error) { /* optional */ }

    Object.keys(SHEET_HEADERS).forEach(function(name) {
      ensureSheet_(name);
    });

    removeDefaultBlankSheet_(spreadsheet);
    seedDatabase_();
    autoSizeDatabase_(spreadsheet);
    invalidatePublicContentCache();

    // setupDatabase already owns the script lock, so write this setup audit row directly.
    getSheet_(KATHANIKA.SHEETS.ADMIN_LOG).appendRow([
      new Date(),
      created ? 'DATABASE_CREATED' : 'DATABASE_VERIFIED',
      'Database',
      spreadsheet.getId(),
      created
        ? 'Database created, schema configured and seed data installed.'
        : 'Existing database verified; missing schema elements repaired and empty seed tables populated.'
    ]);

    const result = {
      ok: true,
      created: created,
      databaseName: spreadsheet.getName(),
      spreadsheetId: spreadsheet.getId(),
      spreadsheetUrl: spreadsheet.getUrl(),
      notificationEmail: props.getProperty('NOTIFICATION_EMAIL') || '',
      sheets: Object.keys(SHEET_HEADERS),
      message: created
        ? 'Kathanika production database created successfully.'
        : 'Kathanika production database is already configured and has been verified.',
    };

    console.log(JSON.stringify(result, null, 2));
    return result;
  } finally {
    lock.releaseLock();
  }
}

/**
 * Optional status helper. Run any time to see which database the API uses.
 */
function getDatabaseStatus() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('SPREADSHEET_ID') || '';
  if (!id) {
    return { ok: false, configured: false, message: 'Run setupDatabase() first.' };
  }

  try {
    const ss = SpreadsheetApp.openById(id);
    return {
      ok: true,
      configured: true,
      spreadsheetId: ss.getId(),
      spreadsheetUrl: ss.getUrl(),
      databaseName: ss.getName(),
      sheets: ss.getSheets().map(function(sheet) { return sheet.getName(); }),
    };
  } catch (error) {
    return {
      ok: false,
      configured: false,
      spreadsheetId: id,
      message: 'The stored database could not be opened. Run setupDatabase() to repair the configuration.',
    };
  }
}


/**
 * PRODUCTION VERIFICATION
 *
 * Run after setupDatabase() and after any major content/schema maintenance.
 * This performs read-only checks and returns a concise production status.
 */
function verifyProductionSetup() {
  const status = getDatabaseStatus();
  if (!status.ok || !status.configured) return status;

  const issues = [];
  const ss = SpreadsheetApp.openById(status.spreadsheetId);

  Object.keys(SHEET_HEADERS).forEach(function(name) {
    const sheet = ss.getSheetByName(name);
    if (!sheet) {
      issues.push('Missing sheet: ' + name);
      return;
    }

    const expected = SHEET_HEADERS[name];
    const actual = sheet.getRange(1, 1, 1, expected.length).getDisplayValues()[0];
    expected.forEach(function(header, index) {
      if (actual[index] !== header) {
        issues.push('Header mismatch in ' + name + ' column ' + (index + 1) + ': expected ' + header);
      }
    });
  });

  if (issues.length === 0) {
    const channels = readObjects_(KATHANIKA.SHEETS.CHANNELS).filter(function(row) { return bool_(row.Active); });
    const videos = readObjects_(KATHANIKA.SHEETS.VIDEOS).filter(function(row) { return bool_(row.Active); });
    const services = readObjects_(KATHANIKA.SHEETS.SERVICES).filter(function(row) { return bool_(row.Active); });
    const settings = readObjects_(KATHANIKA.SHEETS.SETTINGS).filter(function(row) { return bool_(row.Active); });

    if (channels.length !== 9) issues.push('Expected 9 active channels; found ' + channels.length + '.');
    if (videos.length !== 90) issues.push('Expected 90 active videos; found ' + videos.length + '.');
    if (services.length !== 10) issues.push('Expected 10 active services; found ' + services.length + '.');
    if (settings.length < 8) issues.push('Expected production site settings; found only ' + settings.length + ' active rows.');

    const videoKeys = {};
    videos.forEach(function(video) {
      const channelId = String(video.Channel_ID || '');
      const rank = number_(video.Rank, 0);
      const key = channelId + ':' + rank;
      if (!channelId) issues.push('Video row missing Channel_ID.');
      if (rank < 1 || rank > 10) issues.push('Invalid video rank for ' + String(video.Video_ID || key) + '.');
      if (videoKeys[key]) issues.push('Duplicate channel/rank: ' + key + '.');
      videoKeys[key] = true;
      if (!isHttpUrl_(String(video.Video_URL || ''))) issues.push('Invalid Video_URL for ' + String(video.Video_ID || key) + '.');
      if (!String(video.Cover_URL || '').trim()) issues.push('Missing Cover_URL for ' + String(video.Video_ID || key) + '.');
    });

    channels.forEach(function(channel) {
      const channelId = String(channel.Channel_ID || '');
      for (let rank = 1; rank <= 10; rank += 1) {
        if (!videoKeys[channelId + ':' + rank]) issues.push('Missing rank ' + rank + ' for channel ' + channelId + '.');
      }
    });
  }

  const result = {
    ok: issues.length === 0,
    configured: true,
    apiVersion: KATHANIKA.API_VERSION,
    spreadsheetId: status.spreadsheetId,
    spreadsheetUrl: status.spreadsheetUrl,
    databaseName: status.databaseName,
    issues: issues,
    message: issues.length === 0
      ? 'Kathanika V30 database verification passed.'
      : 'Kathanika V30 database verification found ' + issues.length + ' issue(s).',
  };

  console.log(JSON.stringify(result, null, 2));
  return result;
}

function getSpreadsheet_() {
  const config = getScriptConfig_();
  if (!config.spreadsheetId) {
    throw new Error('Database is not configured. Run setupDatabase() once from the Apps Script editor.');
  }

  try {
    return SpreadsheetApp.openById(config.spreadsheetId);
  } catch (error) {
    throw new Error('Configured database is unavailable. Run setupDatabase() to repair the setup.');
  }
}

function getSheet_(name) {
  const ss = getSpreadsheet_();
  const sheet = ss.getSheetByName(name);
  if (!sheet) throw new Error('Missing database sheet: ' + name);
  return sheet;
}

function ensureSheet_(name) {
  const ss = getSpreadsheet_();
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  const headers = SHEET_HEADERS[name];
  if (!headers) throw new Error('No schema registered for ' + name);

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  } else {
    const existing = sheet.getRange(1, 1, 1, headers.length).getDisplayValues()[0];
    headers.forEach(function(header, index) {
      if (existing[index] !== header) sheet.getRange(1, index + 1).setValue(header);
    });
  }

  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#412D15')
    .setFontColor('#E1DCC9');
  applySheetUx_(sheet, name);
  return sheet;
}

function applySheetUx_(sheet, name) {
  if (name === KATHANIKA.SHEETS.BUSINESS) {
    const rule = SpreadsheetApp.newDataValidation().requireValueInList(['New','Contacted','Follow-up','Qualified','Closed','Archived'], true).setAllowInvalid(false).build();
    sheet.getRange('L2:L1000').setDataValidation(rule);
  } else if (name === KATHANIKA.SHEETS.CAREER) {
    const rule = SpreadsheetApp.newDataValidation().requireValueInList(['New','Contacted','Follow-up','Qualified','Closed','Archived'], true).setAllowInvalid(false).build();
    sheet.getRange('M2:M1000').setDataValidation(rule);
  } else if (name === KATHANIKA.SHEETS.CHANNELS) {
    const checkbox = SpreadsheetApp.newDataValidation().requireCheckbox().build();
    sheet.getRange('D2:D500').setDataValidation(checkbox);
  } else if (name === KATHANIKA.SHEETS.VIDEOS) {
    const checkbox = SpreadsheetApp.newDataValidation().requireCheckbox().build();
    sheet.getRange('F2:F2000').setDataValidation(checkbox);
  } else if (name === KATHANIKA.SHEETS.SETTINGS) {
    const checkbox = SpreadsheetApp.newDataValidation().requireCheckbox().build();
    sheet.getRange('D2:D500').setDataValidation(checkbox);
  } else if (name === KATHANIKA.SHEETS.SERVICES) {
    const checkbox = SpreadsheetApp.newDataValidation().requireCheckbox().build();
    sheet.getRange('B2:B500').setDataValidation(checkbox);
  }
}

function removeDefaultBlankSheet_(ss) {
  const candidateNames = ['Sheet1', 'Sheet 1'];
  candidateNames.forEach(function(name) {
    const sheet = ss.getSheetByName(name);
    if (!sheet || ss.getSheets().length <= 1) return;
    if (sheet.getLastRow() <= 1 && sheet.getLastColumn() <= 1 && String(sheet.getRange('A1').getDisplayValue() || '').trim() === '') {
      ss.deleteSheet(sheet);
    }
  });
}

function autoSizeDatabase_(ss) {
  Object.keys(SHEET_HEADERS).forEach(function(name) {
    const sheet = ss.getSheetByName(name);
    if (!sheet) return;
    const columnCount = SHEET_HEADERS[name].length;
    try { sheet.autoResizeColumns(1, columnCount); } catch (error) { /* cosmetic only */ }
    // Keep long-content columns usable instead of excessively wide.
    if (name === KATHANIKA.SHEETS.BUSINESS) {
      sheet.setColumnWidth(10, 360);
    } else if (name === KATHANIKA.SHEETS.CAREER) {
      sheet.setColumnWidth(11, 360);
    } else if (name === KATHANIKA.SHEETS.VIDEOS) {
      sheet.setColumnWidth(4, 320);
      sheet.setColumnWidth(5, 320);
    } else if (name === KATHANIKA.SHEETS.SETTINGS) {
      sheet.setColumnWidth(2, 420);
    } else if (name === KATHANIKA.SHEETS.SERVICES) {
      sheet.setColumnWidth(5, 420);
    }
  });
}

function bootstrapProduction(notificationEmail) {
  const result = setupDatabase();
  if (notificationEmail) {
    PropertiesService.getScriptProperties().setProperty('NOTIFICATION_EMAIL', String(notificationEmail).trim());
    result.notificationEmail = String(notificationEmail).trim();
  }
  return result;
}

function appendRowLocked_(sheetName, row) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(7000)) throw new Error('The system is busy. Please try again.');
  try {
    const sheet = getSheet_(sheetName);
    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Serializes the duplicate check and append into one critical section.
 * This closes the race where two identical submissions arrive together.
 */
function appendInquiryLocked_(sheetName, hashColumn, hash, row) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(7000)) throw new Error('The system is busy. Please try again.');
  try {
    rejectDuplicate_(sheetName, hashColumn, hash);
    getSheet_(sheetName).appendRow(row);
    markDuplicate_(hash);
  } finally {
    lock.releaseLock();
  }
}

function readObjects_(sheetName) {
  const sheet = getSheet_(sheetName);
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map(String);
  return values.slice(1).filter(function(row) {
    return row.some(function(value) { return value !== '' && value !== null; });
  }).map(function(row) {
    const object = {};
    headers.forEach(function(header, index) { object[header] = row[index]; });
    return object;
  });
}

function isSheetEmpty_(name) {
  const sheet = getSheet_(name);
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return true;
  const keys = sheet.getRange(2, 1, lastRow - 1, 1).getDisplayValues();
  return !keys.some(function(row) { return String(row[0] || '').trim() !== ''; });
}

function logAdmin_(action, entity, entityId, details) {
  try {
    appendRowLocked_(KATHANIKA.SHEETS.ADMIN_LOG, [new Date(), action, entity, entityId, details]);
  } catch (error) {
    console.error('Admin log failed', error);
  }
}

function logError_(requestId, action, error) {
  console.error(requestId, action, error);
  try {
    const sheet = getSheet_(KATHANIKA.SHEETS.ERROR_LOG);
    sheet.appendRow([
      new Date(), requestId, action,
      error && error.message ? error.message : String(error),
      error && error.stack ? String(error.stack).slice(0, 5000) : '',
    ]);
  } catch (loggingError) {
    console.error('Error log failed', loggingError);
  }
}
