/** Runtime-safe URL helpers for root domains and GitHub project Pages. */
export function siteBasePath(): string {
  const raw = import.meta.env.BASE_URL || "/";
  if (raw === "/") return "";
  return `/${raw.replace(/^\/+|\/+$/g, "")}`;
}

export function withBasePath(path: string): string {
  if (!path) return siteBasePath() ? `${siteBasePath()}/` : "/";
  if (/^[a-z][a-z0-9+.-]*:/i.test(path) || path.startsWith("//") || path.startsWith("#")) {
    return path;
  }

  const base = siteBasePath();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (base && (normalized === base || normalized.startsWith(`${base}/`))) return normalized;
  if (normalized === "/") return base ? `${base}/` : "/";
  return `${base}${normalized}` || normalized;
}

export function routerBasePath(): string {
  return siteBasePath() || "/";
}
