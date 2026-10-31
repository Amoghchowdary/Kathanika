const KATHANIKA = Object.freeze({
  API_VERSION: '30.0.0',
  DATABASE_NAME: 'Kathanika_Website_DB',
  DEFAULT_NOTIFICATION_EMAIL: 'kathanikamedia@gmail.com',
  CACHE_KEY: 'kathanika_public_content_v30',
  CACHE_SECONDS: 300,
  DEFAULT_STATUS: 'New',
  SHEETS: Object.freeze({
    BUSINESS: 'Business_Inquiries',
    CAREER: 'Career_Inquiries',
    CHANNELS: 'Channels',
    VIDEOS: 'Video_Content',
    SETTINGS: 'Site_Settings',
    SERVICES: 'Services',
    ADMIN_LOG: 'Admin_Log',
    ERROR_LOG: 'Error_Log',
  }),
});

function getScriptConfig_() {
  const props = PropertiesService.getScriptProperties();
  return {
    spreadsheetId: props.getProperty('SPREADSHEET_ID') || '',
    notificationEmail: props.getProperty('NOTIFICATION_EMAIL') || KATHANIKA.DEFAULT_NOTIFICATION_EMAIL,
  };
}

/**
 * Optional operations helper if notification emails should go somewhere else.
 * The database itself is still created only by setupDatabase().
 */
function setNotificationEmail(email) {
  const normalized = String(email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalized)) {
    throw new Error('A valid notification email is required.');
  }
  PropertiesService.getScriptProperties().setProperty('NOTIFICATION_EMAIL', normalized);
  return { ok: true, notificationEmail: normalized };
}
