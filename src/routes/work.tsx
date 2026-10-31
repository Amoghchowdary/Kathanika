import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Play } from "lucide-react";

import { PageHead, SiteLayout } from "@/components/site/SiteLayout";
import { ProductionMediaShowcase } from "@/components/site/ProductionMediaShowcase";
import { sortActive, useContent } from "@/content/store";
import { topTenDefaults } from "@/content/top-ten-defaults";
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
  const channels = sortActive(content.topTenChannels.length ? content.topTenChannels : topTenDefaults);

  return (
    <SiteLayout>
      <PageHead eyebrow="Work" title="The channels we're building." intro="Each property is built for a distinct audience, purpose and point of view." />

      <ProductionMediaShowcase />

      <section className="v71-work-proof"><div><span>Selected work</span><h2>Few best teams we worked with.</h2></div><p>Each property below links to public episodes so visitors can inspect the work directly. Portfolio-wide, Kathanika reports 3 Cr+ monthly content reach; per-property views and impressions are intentionally shown only when verified from the respective channel.</p></section>

      <section className="v41-work-list">
        {channels.map((channel, channelIndex) => {
          const videos = sortActive(channel.videos).slice(0, 3);
          return (
            <article className="v41-work-channel v48-work-channel" key={channel.id}>
              <div className="v41-work-channel-head v48-work-channel-head">
                <span>{String(channelIndex + 1).padStart(2, "0")}</span>
                <div className="v71-work-title"><h2>{channel.name}</h2><p>Distinct audience, recurring format and distribution-led iteration. Open the latest episode to review the public-facing output and current performance.</p></div>
                <a href={videos[0]?.videoUrl} target="_blank" rel="noreferrer">Watch latest <ArrowUpRight /></a>
              </div>
              <div className="v41-work-covers">
                {videos.map((video) => (
                  <a key={video.rank} href={video.videoUrl} target="_blank" rel="noreferrer" aria-label={`${channel.name} top ${video.rank}`}>
                    <img src={withBasePath(video.coverUrl)} alt={`${channel.name} episode ${video.rank}`} width={1280} height={720} loading="lazy" decoding="async" />
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
