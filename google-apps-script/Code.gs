function doGet(e) {
  const requestId = newRequestId_('GET');
  const action = normalizeText_((e && e.parameter && e.parameter.action) || 'health', 40).toLowerCase();
  try {
    if (action === 'health') {
      return jsonOutput_({
        ok: true,
        data: {
          service: 'Kathanika Media API',
          version: KATHANIKA.API_VERSION,
          timestamp: new Date().toISOString(),
        },
        requestId,
      });
    }

    if (action === 'content') {
      return jsonOutput_({ ok: true, data: getPublicContent_(), requestId });
    }

    return jsonOutput_({ ok: false, error: 'Unknown action.', requestId });
  } catch (error) {
    logError_(requestId, action, error);
    return jsonOutput_({ ok: false, error: publicError_(error), requestId });
  }
}

function doPost(e) {
  const requestId = newRequestId_('POST');
  let action = 'unknown';
  try {
    const body = parseJsonBody_(e);
    action = normalizeText_(body.action || '', 40);
    const payload = body.payload || {};

    if (action === 'businessInquiry') {
      return jsonOutput_({ ok: true, data: createBusinessInquiry_(payload, requestId), requestId });
    }

    if (action === 'careerInquiry') {
      return jsonOutput_({ ok: true, data: createCareerInquiry_(payload, requestId), requestId });
    }

    return jsonOutput_({ ok: false, error: 'Unknown action.', requestId });
  } catch (error) {
    logError_(requestId, action, error);
    return jsonOutput_({ ok: false, error: publicError_(error), requestId });
  }
}
