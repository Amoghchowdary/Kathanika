import { Play } from "lucide-react";
import type { CSSProperties } from "react";

import { sortActive, useContent } from "@/content/store";
import { topTenDefaults } from "@/content/top-ten-defaults";
import type { TopTenChannel } from "@/content/types";
import { withBasePath } from "@/lib/base-path";

export function EpisodeLibrary({ limitChannels }: { limitChannels?: number }) {
  const { content } = useContent();
  const sourceChannels = content.topTenChannels.length ? content.topTenChannels : topTenDefaults;
  const channels = sortActive(sourceChannels).slice(0, limitChannels ?? 9);

  return (
    <section className="v41-library" id="episodes">
      <div className="v41-section-head">
        <span>03</span>
        <div>
          <p>Episodes</p>
          <h2>Watch Kathanika.</h2>
        </div>
        <p className="v41-section-note">Original shows, conversations and ideas from the Kathanika network.</p>
      </div>

      <div className="v41-library-rails">
        {channels.map((channel, index) => (
          <EpisodeRail key={channel.id} channel={channel} reverse={index % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function EpisodeRail({ channel, reverse }: { channel: TopTenChannel; reverse: boolean }) {
  const videos = sortActive(channel.videos);
  const duration = Math.max(30, videos.length * 5.2);

  return (
    <section className="v41-episode-rail" aria-label={`${channel.name} episodes`}>
      <div className="v41-rail-title">
        <span>{String(channel.order).padStart(2, "0")}</span>
        <h3>{channel.name}</h3>
      </div>
      <div className="v41-rail-window">
        <div
          className={`v41-rail-track ${reverse ? "is-reverse" : ""}`}
          style={{ "--rail-duration": `${duration}s` } as CSSProperties}
        >
          <div className="v41-rail-group">
            {videos.map((video) => <EpisodeCard key={`a-${video.rank}`} channel={channel} video={video} />)}
          </div>
          <div className="v41-rail-group" aria-hidden="true">
            {videos.map((video) => <EpisodeCard key={`b-${video.rank}`} channel={channel} video={video} tabIndex={-1} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function EpisodeCard({
  channel,
  video,
  tabIndex,
}: {
  channel: TopTenChannel;
  video: TopTenChannel["videos"][number];
  tabIndex?: number;
}) {
  return (
    <a
      className="v41-episode-card"
      href={video.videoUrl}
      target="_blank"
      rel="noreferrer"
      tabIndex={tabIndex}
      aria-label={`${channel.name} — Top ${video.rank}`}
    >
      <img src={withBasePath(video.coverUrl)} alt="" width={1280} height={720} loading="lazy" decoding="async" />
      <span className="v41-episode-rank">{String(video.rank).padStart(2, "0")}</span>
      <span className="v41-episode-play"><Play fill="currentColor" /></span>
    </a>
  );
}
