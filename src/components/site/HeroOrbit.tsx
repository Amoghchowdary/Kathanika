import { useEffect, useMemo, useState } from "react";

import { ClientProductionImage } from "./ClientProductionImage";

const SLIDE_MS = 6200;

const STORIES = [
  {
    number: "01",
    eyebrow: "Kathanika Media",
    title: "Building the next generation of media.",
    body: "Original IPs, content systems and distribution built for repeat attention.",
    media: [
      { src: "/media/production/stills/IMG_4711.webp", alt: "Kathanika production set" },
      { src: "/media/production/stills/IMG_5530.webp", alt: "Kathanika conversation production" },
      { src: "/media/production/stills/IMG_5147.webp", alt: "Kathanika on-location interview" },
    ],
  },
  {
    number: "02",
    eyebrow: "IP Building",
    title: "We build IPs. Not just content.",
    body: "Every IP is built with a distinct audience, purpose and identity — then grown through consistent content and distribution.",
    media: [
      { src: "/media/production/stills/IMG_20260722_204442.webp", alt: "Behind the scenes at a Kathanika shoot" },
      { src: "/media/production/stills/IMG_4711.webp", alt: "Kathanika production set" },
      { src: "/media/production/stills/IMG_5530.webp", alt: "Kathanika conversation production" },
    ],
  },
  {
    number: "03",
    eyebrow: "Scale",
    title: "12+ IPs. 3 Cr+ monthly reach.",
    body: "A growing Telugu and English portfolio shaped around distinct communities and viewing habits.",
    media: [
      { src: "/media/production/stills/IMG_5147.webp", alt: "Kathanika on-location interview" },
      { src: "/media/production/stills/IMG_20260722_204442.webp", alt: "Behind the scenes at a Kathanika shoot" },
      { src: "/media/production/stills/IMG_4711.webp", alt: "Kathanika production set" },
    ],
  },
  {
    number: "04",
    eyebrow: "What comes next",
    title: "Content, community, distribution and marketing — together.",
    body: "Kathanika brings the pieces together to build media properties that can grow with their audiences over time.",
    media: [
      { src: "/media/production/stills/IMG_5530.webp", alt: "Kathanika conversation production" },
      { src: "/media/production/stills/IMG_5147.webp", alt: "Kathanika on-location interview" },
      { src: "/media/production/stills/IMG_20260722_204442.webp", alt: "Behind the scenes at a Kathanika shoot" },
    ],
  },
] as const;

export function HeroOrbit() {
  const [active, setActive] = useState(0);
  const reducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % STORIES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  return (
    <section className="v41-hero v48-hero" aria-label="Kathanika Media highlights">
      <div
        className="v41-hero-track"
        style={{ transform: `translate3d(-${active * 100}%, 0, 0)` }}
      >
        {STORIES.map((story) => (
          <article className="v41-hero-slide v48-hero-slide" key={story.number}>
            <div className="v41-hero-slide-grid" aria-hidden="true" />
            <div className="v48-hero-layout">
              <div className="v41-hero-copy v48-hero-copy">
                <div className="v41-hero-eyebrow">
                  <span>{story.number}</span>
                  <span>{story.eyebrow}</span>
                </div>
                <h1>{story.title}</h1>
                <p>{story.body}</p>
              </div>

              <div className="v48-hero-media" aria-label="Featured Kathanika shows">
                {story.media.map((item, index) => (
                  <figure className={`v48-hero-media-card card-${index + 1}`} key={item.alt}>
                    <ClientProductionImage
                      file={item.src.split("/").pop() ?? "IMG_4711.webp"}
                      alt={item.alt}
                      eager={story.number === "01" && index === 0}
                      sizes="(max-width: 640px) 92vw, (max-width: 1100px) 66vw, 38vw"
                    />
                    <figcaption>{item.alt}</figcaption>
                  </figure>
                ))}
                <div className="v48-hero-media-ring ring-one" aria-hidden="true" />
                <div className="v48-hero-media-ring ring-two" aria-hidden="true" />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="v41-hero-progress" aria-label={`Slide ${active + 1} of ${STORIES.length}`}>
        {STORIES.map((story, index) => (
          <span key={story.number} className={index === active ? "is-active" : ""}>
            <i key={`${active}-${index}`} />
          </span>
        ))}
      </div>
    </section>
  );
}
