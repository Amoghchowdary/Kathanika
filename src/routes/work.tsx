import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Play } from "lucide-react";

import { PageHead, SiteLayout } from "@/components/site/SiteLayout";
import { sortActive, useContent } from "@/content/store";
import { withBasePath } from "@/lib/base-path";

const title = "Work — Kathanika Media";
const description = "Kathanika's active content properties and the episodes shaping their audiences.";

export const Route = createFileRoute("/work")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }] }),
  component: WorkPage,
});

function WorkPage() {
  const { content } = useContent();
  const channels = sortActive(content.topTenChannels);

  return (
    <SiteLayout>
      <PageHead eyebrow="Work" title="The channels we're building." intro="Each property is built for a distinct audience, purpose and point of view." />

      <section className="v41-work-list">
        {channels.map((channel, channelIndex) => {
          const videos = sortActive(channel.videos).slice(0, 3);
          return (
            <article className="v41-work-channel" key={channel.id}>
              <div className="v41-work-channel-head">
                <span>{String(channelIndex + 1).padStart(2, "0")}</span>
                <h2>{channel.name}</h2>
                <a href={videos[0]?.videoUrl} target="_blank" rel="noreferrer">Watch latest <ArrowUpRight /></a>
              </div>
              <div className="v41-work-covers">
                {videos.map((video) => (
                  <a key={video.rank} href={video.videoUrl} target="_blank" rel="noreferrer" aria-label={`${channel.name} top ${video.rank}`}>
                    <img src={withBasePath(video.coverUrl)} alt={`${channel.name} episode ${video.rank}`} loading="lazy" />
                    <span>{String(video.rank).padStart(2, "0")}<Play fill="currentColor" /></span>
                  </a>
                ))}
              </div>
            </article>
          );
        })}
      </section>
    </SiteLayout>
  );
}
