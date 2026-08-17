export function openExternal(url: string) {
  if (!url) return;
  if (typeof window === "undefined") return;
  if (url.startsWith("/")) {
    window.location.assign(url);
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

export function whatsappHref(number: string, message = "Hi Kathanika — I'd like to talk.") {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Know About Us", to: "/work" },
  { label: "Services", to: "/services" },
  { label: "Creators", to: "/creators" },
  { label: "Brands", to: "/brands" },
  { label: "About", to: "/about" },
] as const;
