import { useEffect, useState } from "react";

import { sortActive, useContent } from "@/content/store";
import { cn } from "@/lib/utils";

export function HeroSlider() {
  const { content } = useContent();
  const slides = sortActive(content.heroSlides);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 7500);
    return () => window.clearInterval(id);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <section
      className="relative h-[92svh] min-h-[560px] w-full overflow-hidden bg-background"
      aria-label="Kathanika Media visual showcase"
    >
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1200ms] ease-out",
            i === index ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <picture>
            <source media="(max-width: 767px)" srcSet={slide.mobileImage} />
            <img
              src={slide.image}
              alt=""
              width={1920}
              height={1088}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
              className={cn(
                "size-full object-cover transition-transform duration-[9000ms] ease-out",
                i === index ? "scale-105" : "scale-100",
              )}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-background/55 via-background/10 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/35 via-transparent to-background/10" />
        </div>
      ))}

      {slides.length > 1 ? (
        <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to visual ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                "h-[3px] w-9 rounded-full transition-colors",
                i === index ? "bg-foreground" : "bg-foreground/25 hover:bg-foreground/50",
              )}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
