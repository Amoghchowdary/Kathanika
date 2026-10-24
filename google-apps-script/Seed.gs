function seedDatabase_() {
  seedSettings_();
  seedServices_();
  seedChannelsAndVideos_();
}

function seedSettings_() {
  if (!isSheetEmpty_(KATHANIKA.SHEETS.SETTINGS)) return;
  const now = new Date();
  const rows = KATHANIKA_SEED.settings.map(function(item) {
    return [item.key, item.value, item.type, true, now];
  });
  getSheet_(KATHANIKA.SHEETS.SETTINGS).getRange(2, 1, rows.length, 5).setValues(rows);
}

function seedServices_() {
  if (!isSheetEmpty_(KATHANIKA.SHEETS.SERVICES)) return;
  const now = new Date();
  const rows = KATHANIKA_SEED.services.map(function(item) {
    return [item.id, true, item.order, item.title, item.description, now];
  });
  getSheet_(KATHANIKA.SHEETS.SERVICES).getRange(2, 1, rows.length, 6).setValues(rows);
}

function seedChannelsAndVideos_() {
  const now = new Date();
  if (isSheetEmpty_(KATHANIKA.SHEETS.CHANNELS)) {
    const channelRows = KATHANIKA_SEED.channels.map(function(channel) {
      return [channel.id, channel.name, channel.slug, true, channel.order, now];
    });
    getSheet_(KATHANIKA.SHEETS.CHANNELS).getRange(2, 1, channelRows.length, 6).setValues(channelRows);
  }

  if (isSheetEmpty_(KATHANIKA.SHEETS.VIDEOS)) {
    const rows = [];
    KATHANIKA_SEED.channels.forEach(function(channel) {
      channel.videos.forEach(function(video) {
        rows.push([
          channel.id + '-' + video.rank,
          channel.id,
          video.rank,
          video.coverUrl,
          video.videoUrl,
          true,
          video.order,
          now,
        ]);
      });
    });
    getSheet_(KATHANIKA.SHEETS.VIDEOS).getRange(2, 1, rows.length, 8).setValues(rows);
  }
}
