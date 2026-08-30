import { withBasePath } from "@/lib/base-path";

type ClientProductionImageProps = {
  file: string;
  alt: string;
  className?: string;
  eager?: boolean;
  sizes?: string;
};

const DIMENSIONS: Record<string, readonly [number, number]> = {
  IMG_20260608_150001: [960, 1280],
  IMG_20260615_121742: [960, 1280],
  IMG_20260616_193240: [960, 1280],
  IMG_20260704_114854: [960, 1280],
  IMG_20260704_124955: [960, 720],
  IMG_20260722_204442: [960, 720],
  IMG_3735: [960, 720],
  IMG_4711: [960, 720],
  IMG_4809: [960, 540],
  IMG_4921: [960, 720],
  IMG_5144: [960, 720],
  IMG_5147: [960, 720],
  IMG_5444: [960, 720],
  IMG_5460: [960, 720],
  IMG_5530: [960, 551],
  IMG_5554: [960, 720],
  IMG_5584: [960, 1280],
  IMG_5719: [960, 720],
};

function stemOf(file: string) {
  return file.replace(/\.(webp|jpe?g|png|avif)$/i, "");
}

export function ClientProductionImage({
  file,
  alt,
  className,
  eager = false,
  sizes = "(max-width: 640px) 88vw, (max-width: 1100px) 68vw, 42vw",
}: ClientProductionImageProps) {
  const stem = stemOf(file);
  const src480 = withBasePath(`/media/production/responsive/${stem}-480.webp`);
  const src960 = withBasePath(`/media/production/responsive/${stem}-960.webp`);
  const src1280 = withBasePath(`/media/production/responsive/${stem}-1280.webp`);
  const avif480 = withBasePath(`/media/production/responsive/${stem}-480.avif`);
  const avif640 = withBasePath(`/media/production/responsive/${stem}-640.avif`);
  const avif800 = withBasePath(`/media/production/responsive/${stem}-800.avif`);
  const avif960 = withBasePath(`/media/production/responsive/${stem}-960.avif`);
  const avif1024 = withBasePath(`/media/production/responsive/${stem}-1024.avif`);
  const avif1280 = withBasePath(`/media/production/responsive/${stem}-1280.avif`);
  const [width, height] = DIMENSIONS[stem] ?? [960, 720];

  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`${avif480} 480w, ${avif640} 640w, ${avif800} 800w, ${avif960} 960w, ${avif1024} 1024w, ${avif1280} 1280w`}
        sizes={sizes}
      />
      <img
        className={className}
        src={src960}
        srcSet={`${src480} 480w, ${src960} 960w, ${src1280} 1280w`}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding={eager ? "sync" : "async"}
      />
    </picture>
  );
}
