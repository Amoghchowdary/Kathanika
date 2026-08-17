import { useEffect, useMemo, useState } from "react";

const SLIDE_MS = 6200;

const STORIES = [
  {
    number: "01",
    eyebrow: "Kathanika Media",
    title: "Building the next generation of media.",
    body: "Original IPs, content systems and distribution built for repeat attention.",
    texture: "texture-one",
  },
  {
    number: "02",
    eyebrow: "IP Building",
    title: "We build IPs. Not just content.",
    body: "Every IP is built with a distinct audience, purpose and identity — then grown through consistent content and distribution.",
    texture: "texture-two",
  },
  {
    number: "03",
    eyebrow: "Scale",
    title: "12+ IPs. 3 Cr+ monthly reach.",
    body: "A growing Telugu and English portfolio shaped around distinct communities and viewing habits.",
    texture: "texture-three",
  },
  {
    number: "04",
    eyebrow: "What comes next",
    title: "Content, community, distribution and marketing — together.",
    body: "Kathanika brings the pieces together to build media properties that can grow with their audiences over time.",
    texture: "texture-four",
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
    <section className="v41-hero" aria-label="Kathanika Media highlights">
      <div
        className="v41-hero-track"
        style={{ transform: `translate3d(-${active * 100}%, 0, 0)` }}
      >
        {STORIES.map((story) => (
          <article className="v41-hero-slide" key={story.number}>
            <div className={`v41-hero-texture ${story.texture}`} aria-hidden="true" />
            <div className="v41-hero-slide-grid" aria-hidden="true" />
            <div className="v41-hero-copy">
              <div className="v41-hero-eyebrow">
                <span>{story.number}</span>
                <span>{story.eyebrow}</span>
              </div>
              <h1>{story.title}</h1>
              <p>{story.body}</p>
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
