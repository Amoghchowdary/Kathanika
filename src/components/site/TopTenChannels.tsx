import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import { sortActive, useContent } from "@/content/store";
import type { TopTenChannel } from "@/content/types";
import { withBasePath } from "@/lib/base-path";

function ChannelRail({ channel }: { channel: TopTenChannel }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const videos = sortActive(channel.videos).sort((a, b) => a.rank - b.rank);

  const scroll = (direction: -1 | 1) => {
    const node = scrollerRef.current;
    if (!node) return;

    const maxScroll = Math.max(0, node.scrollWidth - node.clientWidth);
    const threshold = 32;
    const distance = Math.max(280, Math.min(node.clientWidth * 0.88, 1320));

    if (direction === 1 && node.scrollLeft >= maxScroll - threshold) {
      node.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    if (direction === -1 && node.scrollLeft <= threshold) {
      node.scrollTo({ left: maxScroll, behavior: "smooth" });
      return;
    }

    node.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  if (!videos.length) return null;

  return (
    <article className="top-ten-channel-row">
      <div className="mx-auto flex max-w-[1600px] items-end justify-between gap-5 px-5 pb-4 sm:px-8 lg:pb-5">
        <h2 className="font-display text-[clamp(1.45rem,3vw,2.65rem)] leading-none font-semibold tracking-tight text-foreground">
          {channel.name}
        </h2>
        <span className="hidden shrink-0 text-[10px] font-medium tracking-[0.24em] text-muted-foreground uppercase sm:block">
          Top 10
        </span>
      </div>

      <div className="top-ten-rail-shell">
        <div
          ref={scrollerRef}
          className="top-ten-scroller"
          role="group"
          aria-label={`${channel.name} top ten videos`}
        >
          <div className="top-ten-manual-track">
            {videos.map((video) => (
              <a
                key={`${channel.slug}-${video.rank}`}
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="top-ten-item group/cover"
                aria-label={`Watch ${channel.name} — Top ${video.rank} on YouTube`}
              >
                <span
                  className={`top-ten-rank${video.rank === 10 ? " top-ten-rank--double" : ""}`}
                  aria-hidden="true"
                >
                  {video.rank}
                </span>
                <figure className="top-ten-cover">
                  <img
                    src={withBasePath(video.coverUrl)}
                    alt={`${channel.name} — Top ${video.rank}`}
                    width={1280}
                    height={720}
                    loading={channel.order === 1 && video.rank <= 3 ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/cover:scale-[1.035]"
                  />
                  <span className="top-ten-play" aria-hidden="true">▶</span>
                </figure>
              </a>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => scroll(-1)}
          className="top-ten-edge-control top-ten-edge-control--left"
          aria-label={`Previous ${channel.name} videos`}
        >
          <ChevronLeft aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          className="top-ten-edge-control top-ten-edge-control--right"
          aria-label={`Next ${channel.name} videos`}
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export function TopTenChannels() {
  const { content } = useContent();
  const channels = sortActive(content.topTenChannels);

  return (
    <section id="showcase" className="top-ten-page" aria-label="Kathanika channel top ten covers">
      <div className="space-y-10 pb-16 sm:space-y-12 sm:pb-20 lg:space-y-14 lg:pb-24">
        {channels.map((channel) => (
          <ChannelRail key={channel.id} channel={channel} />
        ))}
      </div>
    </section>
  );
}
