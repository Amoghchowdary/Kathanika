import fs from "node:fs";
import path from "node:path";

const out = path.resolve(".output/public");
let failures = 0;
const check = (c, m) => c ? console.log(`PASS  ${m}`) : (console.error(`FAIL  ${m}`), failures++);
const existsAbs = (p) => fs.existsSync(p);
const exists = (rel) => existsAbs(path.join(out, rel));
const read = (rel) => fs.readFileSync(path.join(out, rel), "utf8");
const routeFile = (route) => {
  if (!route) return exists("index.html") ? "index.html" : null;
  if (exists(`${route}/index.html`)) return `${route}/index.html`;
  if (exists(`${route}.html`)) return `${route}.html`;
  return null;
};

console.log("\nKathanika Media V57 — Production Artifact Integrity Verification\n");
check(existsAbs(out), ".output/public exists");

for (const f of ["CNAME", "robots.txt", "sitemap.xml", "sitemap.yml", "site.webmanifest", "og/kathanika-og.jpg", "favicon.png"]) {
  check(exists(f), `Production artifact includes ${f}`);
}
if (exists("CNAME")) check(read("CNAME").trim() === "www.kathanika.in", "Built CNAME targets www.kathanika.in");

const routes = ["", "about", "work", "services", "creators", "contact", "privacy", "terms", "brands"];
const htmlFiles = [];
for (const route of routes) {
  const f = routeFile(route);
  check(Boolean(f), `${route || "home"} prerender is present`);
  if (f) htmlFiles.push(f);
}

const broken = [];
for (const file of htmlFiles) {
  const html = read(file);
  check(!html.includes("/Kathanika/"), `${file} contains no legacy GitHub project base`);
  check(!html.includes("amoghchowdary.github.io"), `${file} contains no legacy GitHub canonical domain`);
  check(!/https?:\/\/(?:localhost|127\.0\.0\.1)/i.test(html), `${file} contains no localhost production URL`);
  check(html.includes("https://www.kathanika.in/"), `${file} contains production-domain metadata`);
  check(/<title>[^<]{20,}<\/title>/i.test(html), `${file} contains a descriptive title`);
  check(html.includes('name="description"'), `${file} contains meta description`);
  check(html.includes('rel="canonical"'), `${file} contains canonical metadata`);
  check(html.includes('application/ld+json'), `${file} contains structured data`);

  for (const m of html.matchAll(/(?:src|href)=["'](\/[^"'#?]+)(?:[?#][^"']*)?["']/g)) {
    const url = decodeURIComponent(m[1]);
    // Protocol-relative URLs (for example //www.googletagmanager.com) are external, not local files.
    if (url.startsWith("//")) continue;
    if (url === "/" || url.endsWith("/")) continue;
    const rel = url.replace(/^\//, "");
    // Route links without extensions are handled by prerender checks; verify file-like references.
    if (!path.extname(rel)) continue;
    if (!exists(rel)) broken.push(`${file} -> ${url}`);
  }
}
check(broken.length === 0, `All local built asset references resolve${broken.length ? `: ${broken.slice(0, 8).join(", ")}` : ""}`);

const assetDir = path.join(out, "assets");
check(existsAbs(assetDir), "Hashed Vite assets directory exists");
if (existsAbs(assetDir)) {
  const assets = fs.readdirSync(assetDir);
  check(assets.some((n) => n.endsWith(".js")), "Built JavaScript bundle exists");
  check(assets.some((n) => n.endsWith(".css")), "Built CSS bundle exists");
}

check(exists("top-ten") && exists("top-ten-optimized"), "Original and optimized episode asset trees are deployed");
check(exists("media/production/responsive") && exists("media/production/video"), "Optimized production media trees are deployed");

if (failures) {
  console.error(`\nV57 production artifact verification failed with ${failures} issue(s).`);
  process.exit(1);
}
console.log("\nV57 production artifact integrity verification passed.");
