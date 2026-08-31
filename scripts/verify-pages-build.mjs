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

console.log("\nKathanika Media V57 - Custom Domain Build + SEO Verification\n");
const routes = ["", "about", "work", "services", "creators", "contact", "brands", "privacy", "terms"];
for (const route of routes) ok(Boolean(routeFile(route)), `${route || "home"} prerender exists`);
ok(exists("top-ten"), "Episode assets exist in Pages artifact");
ok(exists("media/production/stills"), "Client production stills exist in Pages artifact");
ok(exists("media/production/responsive"), "Responsive client media exists in Pages artifact");
ok(exists("media/production/video"), "Client production video previews exist in Pages artifact");
ok(exists("sitemap.xml"), "sitemap.xml exists in Pages artifact");
ok(exists("robots.txt"), "robots.txt exists in Pages artifact");
ok(exists("site.webmanifest"), "site.webmanifest exists in Pages artifact");
ok(exists("og/kathanika-og.jpg"), "Open Graph image exists in Pages artifact");
ok(exists("CNAME"), "CNAME exists in Pages artifact");
if (exists("CNAME")) ok(read("CNAME").trim() === "www.kathanika.in", "CNAME targets www.kathanika.in");

for (const route of routes.slice(0, 7)) {
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
  // On a custom domain with VITE_SITE_BASE=/, root-relative /assets/* URLs are correct.
  // Reject only the legacy GitHub project-site base path.
  ok(!/(?:src|href)=["']\/Kathanika\/assets\//i.test(html), `${label} has no legacy /Kathanika/assets references`);
}

if (exists("index.html")) {
  const html = read("index.html");
  ok(siteBase === "/", "GitHub Pages build uses root base path for custom domain");
  ok(!html.includes("/Kathanika/"), "index.html contains no legacy /Kathanika/ project-base references");
  ok(html.includes("https://www.kathanika.in/"), "index.html SEO metadata references the custom domain");
  ok(html.includes('application/ld+json'), "index.html contains structured data");
  ok(html.includes('WebSite') && html.includes('Organization'), "index.html contains Organization + WebSite schema");
  ok(html.includes('site.webmanifest'), "index.html links the site manifest");
  ok(html.includes('IMG_4711-800.avif') && html.includes('imageSrcSet'), "index.html preloads responsive AVIF hero image");
  ok(!html.includes('fonts.googleapis.com'), "index.html has no external font dependency");
  ok(html.includes('kathanika-critical-css') && html.includes('media=\"print\"'), "index.html contains inline critical CSS with non-blocking full stylesheet");
}

if (exists("sitemap.xml")) {
  const sitemap = read("sitemap.xml");
  ok(sitemap.includes('xmlns:image=') && sitemap.includes('<image:image>'), "sitemap.xml includes image discovery entries");
  ok(sitemap.includes("https://www.kathanika.in/") && !sitemap.includes("amoghchowdary.github.io"), "sitemap.xml uses only the custom production domain");
}
if (exists("robots.txt")) {
  const robots = read("robots.txt");
  ok(robots.includes("Sitemap: https://www.kathanika.in/sitemap.xml"), "robots.txt advertises the custom-domain sitemap");
}

if (errors.length) {
  console.error(`\nGitHub Pages build verification failed with ${errors.length} issue(s).`);
  process.exit(1);
}
console.log("\nGitHub Pages build verification passed.");
