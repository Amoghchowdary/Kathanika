import { lazy, Suspense, useEffect, useRef, useState } from "react";

const EpisodeLibrary = lazy(() =>
  import("./EpisodeLibrary").then((module) => ({ default: module.EpisodeLibrary })),
);

export function DeferredEpisodeLibrary({ limitChannels = 9 }: { limitChannels?: number }) {
  const [ready, setReady] = useState(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ready) return;
    const node = anchorRef.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setReady(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "280px 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ready]);

  return (
    <div ref={anchorRef} className="v54-episode-defer-anchor">
      {ready ? (
        <Suspense fallback={<section className="v54-library-placeholder" aria-hidden="true" />}>
          <EpisodeLibrary limitChannels={limitChannels} />
        </Suspense>
      ) : (
        <section className="v54-library-placeholder" aria-hidden="true" />
      )}
    </div>
  );
}
