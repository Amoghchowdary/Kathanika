import { useEffect, useRef, useState } from "react";

import { withBasePath } from "@/lib/base-path";

type DeferredVideoProps = {
  src: string;
  poster: string;
  label: string;
  className?: string;
};

export function DeferredVideo({ src, poster, label, className }: DeferredVideoProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setNearViewport(Boolean(entry?.isIntersecting)),
      { rootMargin: "320px 0px", threshold: 0.01 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (nearViewport) {
      video.load();
      if (!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        void video.play().catch(() => undefined);
      }
    } else {
      video.pause();
    }
  }, [nearViewport]);

  return (
    <div className={className} ref={frameRef}>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster={withBasePath(poster)}
        aria-label={label}
      >
        {nearViewport ? <source src={withBasePath(src)} type="video/mp4" /> : null}
      </video>
    </div>
  );
}
