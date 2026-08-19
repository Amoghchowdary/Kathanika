import { withBasePath } from "@/lib/base-path";

type ClientProductionImageProps = {
  file: string;
  alt: string;
  className?: string;
  eager?: boolean;
  sizes?: string;
};

function stemOf(file: string) {
  return file.replace(/\.(webp|jpe?g|png)$/i, "");
}

export function ClientProductionImage({
  file,
  alt,
  className,
  eager = false,
  sizes = "(max-width: 640px) 94vw, (max-width: 1100px) 72vw, 42vw",
}: ClientProductionImageProps) {
  const stem = stemOf(file);
  const src480 = withBasePath(`/media/production/responsive/${stem}-480.webp`);
  const src960 = withBasePath(`/media/production/responsive/${stem}-960.webp`);
  const src1280 = withBasePath(`/media/production/responsive/${stem}-1280.webp`);

  return (
    <img
      className={className}
      src={src960}
      srcSet={`${src480} 480w, ${src960} 960w, ${src1280} 1280w`}
      sizes={sizes}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
    />
  );
}
