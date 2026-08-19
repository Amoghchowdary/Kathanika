import { Film, Image as ImageIcon, Play } from "lucide-react";

import { ClientProductionImage } from "./ClientProductionImage";
import { DeferredVideo } from "./DeferredVideo";

const STILLS = [
  ["IMG_4711.webp", "Studio interview production setup with lighting and cameras"],
  ["IMG_5147.webp", "Outdoor Kathanika interview production"],
  ["IMG_5530.webp", "Two guests in conversation at a Kathanika set"],
  ["IMG_5554.webp", "Kathanika conversation filmed on location"],
  ["IMG_20260616_193240.webp", "Podcast set with cameras, lighting and two speakers"],
  ["IMG_20260722_204442.webp", "Kathanika production team filming a seated interview"],
  ["IMG_4921.webp", "Behind the scenes production setup at a restaurant location"],
  ["IMG_5444.webp", "Multi-guest Kathanika recording setup"],
] as const;

const VIDEOS = [
  ["IMG_4053.mp4", "IMG_4053-poster.jpg", "On-location multi-camera production"],
  ["IMG_4517.mp4", "IMG_4517-poster.jpg", "Conversation production in progress"],
  ["IMG_5287.mp4", "IMG_5287-poster.jpg", "Behind the camera at a Kathanika shoot"],
  ["IMG_5581.mp4", "IMG_5581-poster.jpg", "Kathanika studio conversation preview"],
  ["IMG_4041.mp4", "IMG_4041-poster.jpg", "On-set production moments"],
  ["IMG_4602.mp4", "IMG_4602-poster.jpg", "Camera movement across a live conversation set"],
] as const;

type MediaItem =
  | { type: "image"; file: string; label: string; wide?: boolean }
  | { type: "video"; file: string; poster: string; label: string; wide?: boolean };

const WALL: readonly MediaItem[] = [
  { type: "image", file: STILLS[0][0], label: STILLS[0][1], wide: true },
  { type: "video", file: VIDEOS[1][0], poster: VIDEOS[1][1], label: VIDEOS[1][2] },
  { type: "image", file: STILLS[1][0], label: STILLS[1][1] },
  { type: "image", file: STILLS[2][0], label: STILLS[2][1] },
  { type: "video", file: VIDEOS[2][0], poster: VIDEOS[2][1], label: VIDEOS[2][2], wide: true },
  { type: "image", file: STILLS[3][0], label: STILLS[3][1] },
  { type: "video", file: VIDEOS[3][0], poster: VIDEOS[3][1], label: VIDEOS[3][2] },
  { type: "image", file: STILLS[4][0], label: STILLS[4][1] },
  { type: "image", file: STILLS[5][0], label: STILLS[5][1], wide: true },
  { type: "video", file: VIDEOS[4][0], poster: VIDEOS[4][1], label: VIDEOS[4][2] },
  { type: "image", file: STILLS[6][0], label: STILLS[6][1] },
  { type: "video", file: VIDEOS[5][0], poster: VIDEOS[5][1], label: VIDEOS[5][2] },
  { type: "image", file: STILLS[7][0], label: STILLS[7][1] },
];

export function ProductionMediaShowcase() {
  return (
    <section className="v49-production v50-production" aria-labelledby="v49-production-title">
      <div className="v49-production-head">
        <div>
          <span><Film /> Production reel</span>
          <h2 id="v49-production-title">Inside the work.</h2>
        </div>
        <p>Real sets, cameras, crews and conversations from Kathanika productions across studio and on-location shoots.</p>
      </div>

      <div className="v49-production-feature v50-production-feature">
        <DeferredVideo
          className="v50-feature-video"
          src={`/media/production/video/${VIDEOS[0][0]}`}
          poster={`/media/production/video/${VIDEOS[0][1]}`}
          label={VIDEOS[0][2]}
        />
        <div className="v49-production-feature-copy">
          <span><Play fill="currentColor" /> In production</span>
          <strong>Ideas become media properties on set.</strong>
          <p>From format planning and guest conversations to lighting, camera, sound and post-production, Kathanika operates across the full content pipeline.</p>
        </div>
      </div>

      <div className="v50-production-wall" aria-label="Kathanika production photography and video">
        {WALL.map((item, index) => (
          <figure key={`${item.type}-${item.file}`} className={item.wide ? "is-wide" : ""}>
            {item.type === "image" ? (
              <ClientProductionImage
                file={item.file}
                alt={item.label}
                sizes="(max-width: 640px) 94vw, (max-width: 900px) 48vw, (max-width: 1240px) 32vw, 24vw"
              />
            ) : (
              <DeferredVideo
                className="v50-wall-video"
                src={`/media/production/video/${item.file}`}
                poster={`/media/production/video/${item.poster}`}
                label={item.label}
              />
            )}
            <figcaption>
              {item.type === "image" ? <ImageIcon aria-hidden="true" /> : <Play fill="currentColor" aria-hidden="true" />}
              {String(index + 1).padStart(2, "0")}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
