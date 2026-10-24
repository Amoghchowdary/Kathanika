function getPublicContent_() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get(KATHANIKA.CACHE_KEY);
  if (cached) {
    try { return JSON.parse(cached); } catch (error) { /* rebuild */ }
  }

  const settingsRows = readObjects_(KATHANIKA.SHEETS.SETTINGS).filter(function(row) { return bool_(row.Active); });
  const settingsMap = {};
  settingsRows.forEach(function(row) {
    const type = String(row.Value_Type || 'string').toLowerCase();
    let value = row.Value;
    if (type === 'json') {
      try { value = JSON.parse(String(row.Value || 'null')); } catch (error) { value = null; }
    } else if (type === 'number') {
      value = number_(row.Value, 0);
    } else if (type === 'boolean') {
      value = bool_(row.Value);
    } else {
      value = String(row.Value == null ? '' : row.Value);
    }
    settingsMap[String(row.Key)] = value;
  });

  const services = readObjects_(KATHANIKA.SHEETS.SERVICES)
    .filter(function(row) { return bool_(row.Active); })
    .map(function(row) {
      return {
        id: String(row.Service_ID),
        active: true,
        order: number_(row.Display_Order, 999),
        title: String(row.Title || ''),
        description: String(row.Description || ''),
      };
    })
    .sort(function(a, b) { return a.order - b.order; });

  const videoRows = readObjects_(KATHANIKA.SHEETS.VIDEOS).filter(function(row) { return bool_(row.Active); });
  const channels = readObjects_(KATHANIKA.SHEETS.CHANNELS)
    .filter(function(row) { return bool_(row.Active); })
    .map(function(row) {
      const channelId = String(row.Channel_ID);
      return {
        id: channelId,
        name: String(row.Channel_Name || ''),
        slug: String(row.Slug || ''),
        active: true,
        order: number_(row.Display_Order, 999),
        videos: videoRows
          .filter(function(video) { return String(video.Channel_ID) === channelId; })
          .map(function(video) {
            return {
              rank: number_(video.Rank, 999),
              coverUrl: String(video.Cover_URL || ''),
              videoUrl: String(video.Video_URL || ''),
              active: true,
              order: number_(video.Display_Order, number_(video.Rank, 999)),
            };
          })
          .sort(function(a, b) { return a.order - b.order; }),
      };
    })
    .sort(function(a, b) { return a.order - b.order; });

  const payload = {
    settings: {
      whatsappNumber: settingsMap.whatsappNumber || '',
      email: settingsMap.email || '',
      phone: settingsMap.phone || '',
      addressLine: settingsMap.addressLine || '',
      mapsUrl: settingsMap.mapsUrl || '',
      cities: settingsMap.cities || [],
      metrics: settingsMap.metrics || [],
    },
    social: {
      youtube: settingsMap.youtube || '',
      instagram: settingsMap.instagram || '',
      linkedin: settingsMap.linkedin || '',
    },
    services: services,
    topTenChannels: channels,
  };

  const serialized = JSON.stringify(payload);
  if (serialized.length < 95000) cache.put(KATHANIKA.CACHE_KEY, serialized, KATHANIKA.CACHE_SECONDS);
  return payload;
}

function invalidatePublicContentCache() {
  CacheService.getScriptCache().remove(KATHANIKA.CACHE_KEY);
  return { ok: true };
}
