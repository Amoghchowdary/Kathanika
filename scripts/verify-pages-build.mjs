import fs from "node:fs";
import path from "node:path";

const out = path.resolve(".output/public");
const envFile = path.resolve(".env.github-pages");
const errors = [];
const ok = (condition, message) => {
  console.log(`${condition ? "PASS" : "FAIL"}  ${message}`);
  if (!condition) errors.push(message);
};
const exists = (rel) => fs.existsSync(path.join(out, rel));
const read = (rel) => fs.readFileSync(path.join(out, rel), "utf8");
const routeFile = (route) => {
  if (!route) return "index.html";
  if (exists(`${route}/index.html`)) return `${route}/index.html`;
  if (exists(`${route}.html`)) return `${route}.html`;
  return null;
};

const envText = fs.existsSync(envFile) ? fs.readFileSync(envFile, "utf8") : "";
const baseMatch = envText.match(/^VITE_SITE_BASE=(.+)$/m);
const siteBase = baseMatch?.[1]?.trim() || "/";

console.log("\nKathanika Media V50 - GitHub Pages Build + SEO Verification\n");
const routes = ["", "about", "work", "services", "creators", "contact", "privacy", "terms"];
for (const route of routes) ok(Boolean(routeFile(route)), `${route || "home"} prerender exists`);
ok(exists("top-ten"), "Episode assets exist in Pages artifact");
ok(exists("media/production/stills"), "Client production stills exist in Pages artifact");
ok(exists("media/production/responsive"), "Responsive client media exists in Pages artifact");
ok(exists("media/production/video"), "Client production video previews exist in Pages artifact");
ok(exists("sitemap.xml"), "sitemap.xml exists in Pages artifact");
ok(exists("robots.txt"), "robots.txt exists in Pages artifact");
ok(exists("site.webmanifest"), "site.webmanifest exists in Pages artifact");
ok(exists("og/kathanika-og.jpg"), "Open Graph image exists in Pages artifact");

for (const route of routes.slice(0, 6)) {
  const file = routeFile(route);
  if (!file) continue;
  const html = read(file);
  const label = route || "home";
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const titleText = titleMatch?.[1]?.replace(/\s+/g, " ").trim() || "";
  ok(titleText.length >= 20 && /Kathanika/i.test(titleText), `${label} has descriptive title`);
  ok(/<meta[^>]+name=["']description["'][^>]+content=["'][^"']{40,}["']/i.test(html) || /<meta[^>]+content=["'][^"']{40,}["'][^>]+name=["']description["']/i.test(html), `${label} has substantive meta description`);
  ok(html.includes('rel="canonical"') || html.includes("rel='canonical'"), `${label} contains canonical URL`);
  ok(html.includes('name="robots"') || html.includes("name='robots'"), `${label} contains robots metadata`);
  ok(html.includes('property="og:image"') || html.includes("property='og:image'"), `${label} contains Open Graph image metadata`);
  ok(/<h1[\s>]/i.test(html), `${label} prerender includes an H1`);
  ok(!/(?:src|href)=["']\/assets\//.test(html), `${label} has no root-only /assets references`);
}

if (exists("index.html")) {
  const html = read("index.html");
  ok(html.includes(siteBase), `index.html contains project base path ${siteBase}`);
  ok(html.includes('application/ld+json'), "index.html contains structured data");
  ok(html.includes('WebSite') && html.includes('Organization'), "index.html contains Organization + WebSite schema");
  ok(html.includes('site.webmanifest'), "index.html links the site manifest");
  ok(html.includes('IMG_4711-960.webp'), "index.html preloads the primary hero image");
}

if (exists("sitemap.xml")) {
  const sitemap = read("sitemap.xml");
  ok(sitemap.includes('xmlns:image=') && sitemap.includes('<image:image>'), "sitemap.xml includes image discovery entries");
}

if (errors.length) {
  console.error(`\nGitHub Pages build verification failed with ${errors.length} issue(s).`);
  process.exit(1);
}
console.log("\nGitHub Pages build verification passed.");
