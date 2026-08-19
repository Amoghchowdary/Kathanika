import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Play } from "lucide-react";

import { PageHead, SiteLayout } from "@/components/site/SiteLayout";
import { ProductionMediaShowcase } from "@/components/site/ProductionMediaShowcase";
import { sortActive, useContent } from "@/content/store";
import { withBasePath } from "@/lib/base-path";
import { seoHead } from "@/lib/seo";

const title = "Work — Kathanika Media";
const description = "Kathanika's active content properties and the episodes shaping their audiences.";

export const Route = createFileRoute("/work")({
  head: () => seoHead("/work", "Work — Kathanika Media Shows & Productions", "Explore Kathanika Media shows, original IPs, episode artwork and behind-the-scenes production across studio and on-location shoots."),
  component: WorkPage,
});

function WorkPage() {
  const { content } = useContent();
  const channels = sortActive(content.topTenChannels);

  return (
    <SiteLayout>
      <PageHead eyebrow="Work" title="The channels we're building." intro="Each property is built for a distinct audience, purpose and point of view." />

      <ProductionMediaShowcase />

      <section className="v41-work-list">
        {channels.map((channel, channelIndex) => {
          const videos = sortActive(channel.videos).slice(0, 3);
          return (
            <article className="v41-work-channel v48-work-channel" key={channel.id}>
              <div className="v41-work-channel-head v48-work-channel-head">
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
