import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { sortActive, useContent } from "@/content/store";
import { openExternal } from "@/lib/site";

export function TopFiveRail() {
  const { content } = useContent();
  const items = sortActive(content.topFive).slice(0, 5);
  const railRef = useRef<HTMLUListElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    sync();
    const el = railRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollByCards = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.7), behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <section className="border-t border-border/60 py-16 lg:py-24">
      <div className="mx-auto flex max-w-[1600px] items-end justify-between gap-6 px-5 sm:px-8">
        <div>
          <p className="text-[11px] tracking-[0.28em] text-muted-foreground uppercase">
            Trending right now
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,5vw,3.25rem)] leading-none font-semibold">
            Top 5 at Kathanika
          </h2>
        </div>
        <div className="hidden gap-2 lg:flex">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            disabled={atStart}
            aria-label="Previous"
            className="flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary disabled:opacity-30"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            disabled={atEnd}
            aria-label="Next"
            className="flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary disabled:opacity-30"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      <ul
        ref={railRef}
        className="rail mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 sm:px-8 lg:gap-8"
      >
        {items.map((item) => (
          <li
            key={item.id}
            className="w-[74vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw] xl:w-[24vw]"
          >
            <button
              type="button"
              onClick={() => openExternal(item.youtubeUrl)}
              className="group flex w-full items-end gap-1 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <span
                aria-hidden
                className="numeral -mr-3 shrink-0 text-[clamp(6rem,17vw,11rem)] select-none"
              >
                {item.rank}
              </span>
              <span className="relative block min-w-0 flex-1 overflow-hidden rounded-sm">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  width={1280}
                  height={720}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 p-4">
                  <span className="block text-[10px] tracking-[0.22em] text-foreground/70 uppercase">
                    {item.badge}
                  </span>
                  <span className="mt-1 block font-display text-base leading-tight font-semibold text-foreground sm:text-lg">
                    {item.title}
                  </span>
                  <span className="mt-2 flex items-center gap-2 text-[11px] tracking-[0.14em] text-foreground/0 uppercase transition-colors duration-300 group-hover:text-foreground/85">
                    <Play className="size-3 fill-current" />
                    Watch now
                    <ArrowRight className="size-3" />
                  </span>
                </span>
              </span>
            </button>
            <p className="mt-3 pl-1 text-xs text-muted-foreground">{item.category}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}