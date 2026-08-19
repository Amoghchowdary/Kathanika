const DEFAULT_SITE_URL = "https://amoghchowdary.github.io/Kathanika/";

export function publicSiteUrl(): string {
  const raw = import.meta.env["VITE_PUBLIC_SITE_URL"] || DEFAULT_SITE_URL;
  return raw.endsWith("/") ? raw : `${raw}/`;
}

export function absoluteSiteUrl(path = "/"): string {
  const base = publicSiteUrl();
  const normalized = path.replace(/^\/+/, "");
  return normalized ? new URL(normalized, base).toString() : base;
}

export function seoHead(path: string, title: string, description: string) {
  const canonical = absoluteSiteUrl(path);
  const image = absoluteSiteUrl("og/kathanika-og.jpg");

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { property: "og:image", content: image },
      { property: "og:image:secure_url", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Kathanika Media — new-age content IPs and media production" },
      { property: "og:site_name", content: "Kathanika Media" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: "Kathanika Media — new-age content IPs and media production" },
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}
