import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checks = [];
const failures = [];
const exists = (rel) => fs.existsSync(path.join(root, rel));
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const assert = (condition, message) => {
  checks.push({ ok: Boolean(condition), message });
  if (!condition) failures.push(message);
};

const required = [
  "package.json", "vite.config.ts", "src/styles.css", "src/lib/seo.ts",
  "src/routes/index.tsx", "src/routes/about.tsx", "src/routes/work.tsx",
  "src/routes/services.tsx", "src/routes/creators.tsx", "src/routes/contact.tsx",
  "src/components/site/HeroOrbit.tsx", "src/components/site/EpisodeLibrary.tsx",
  "src/components/site/InquiryModal.tsx", "src/components/site/SiteHeader.tsx",
  "src/components/site/SiteFooter.tsx", "src/components/site/SiteLayout.tsx",
  "src/components/site/ProductionMediaShowcase.tsx", "src/components/site/ClientProductionImage.tsx",
  "src/components/site/DeferredVideo.tsx",
  "src/assets/kathanika-logo-client.png", "src/assets/kathanika-logo-dark.png",
  ".env.github-pages", ".github/workflows/deploy-pages.yml",
  "scripts/verify-pages-build.mjs", "scripts/git-preflight.ps1", "scripts/verify-responsive.mjs",
  "scripts/generate-seo.mjs", "scripts/verify-seo.mjs", "scripts/verify-client-media.mjs", "scripts/verify-performance.mjs",
  "public/og/kathanika-og.jpg", "public/sitemap.xml", "public/robots.txt", "public/site.webmanifest", "public/CNAME",
];
for (const file of required) assert(exists(file), `Required V51 file exists: ${file}`);

const pkg = JSON.parse(read("package.json"));
assert(pkg.name === "kathanika-media-v51-custom-domain-production", "Package name is V51 custom-domain production build");
assert(pkg.version === "51.0.0", "Package version is 51.0.0");
assert(pkg.scripts?.typecheck === "tsc --noEmit", "Strict TypeScript verification is configured");
assert(Boolean(pkg.scripts?.["preflight:pages"]), "GitHub Pages preflight is configured");
assert(Boolean(pkg.scripts?.["verify:performance"]), "Performance verification is configured");
assert(Boolean(pkg.scripts?.["verify:seo"]), "SEO verification is configured");
assert(Boolean(pkg.scripts?.["verify:domain"]), "Custom-domain verification is configured");
const envPages = read(".env.github-pages");
assert(envPages.includes("VITE_SITE_BASE=/"), "Custom-domain Pages build uses root base path");
assert(envPages.includes("VITE_PUBLIC_SITE_URL=https://www.kathanika.in/"), "Canonical production URL is www.kathanika.in");
assert(read("public/CNAME").trim() === "www.kathanika.in", "CNAME targets www.kathanika.in");

const css = read("src/styles.css");
const cssLower = css.toLowerCase();
for (const hex of ["#8a5f41", "#a77f60", "#f3e4c9", "#ccd67f", "#f3e5ca", "#4a2f20"]) {
  assert(cssLower.includes(hex), `Confirmed design colour ${hex.toUpperCase()}`);
}
assert(css.includes('font-family: "Inter"'), "Inter remains body/interface typography");
assert(css.includes('font-family: "Montserrat"'), "Montserrat remains display/show typography");
assert(css.includes(".v50-production-wall"), "Continuous mixed production media wall is present");
assert(css.includes(".v50-about-visual") && css.includes(".v50-about-pillars"), "About page visual and icon system is styled");
assert(css.includes("content-visibility: auto"), "Below-fold rendering is optimized");
assert(css.includes("@media (max-width: 1100px)"), "Small-laptop/tablet bridge responsiveness is present");

const rootRoute = read("src/routes/__root.tsx");
assert(rootRoute.includes("application/ld+json") && rootRoute.includes("@graph"), "Structured data graph is included");
assert(rootRoute.includes("Organization") && rootRoute.includes("WebSite"), "Organization and WebSite schema are included");
assert(rootRoute.includes("kathanika-font-css"), "Fonts are loaded asynchronously instead of blocking first paint");
assert(rootRoute.includes("IMG_4711-960.webp"), "Primary hero image is preloaded");

const hero = read("src/components/site/HeroOrbit.tsx");
assert(hero.includes("ClientProductionImage"), "Hero uses responsive client image component");
assert(hero.includes("eager={story.number === \"01\" && index === 0}"), "Only the primary hero image is eager/high priority");
assert(hero.includes("setInterval") && hero.includes("SLIDE_MS = 6200"), "Hero remains automatic");
assert(!hero.includes("onPointer") && !hero.includes("ArrowLeft") && !hero.includes("ArrowRight"), "Hero has no manual controls");

const about = read("src/routes/about.tsx");
assert(about.includes("ClientProductionImage") && about.includes("v50-about-pillars"), "About page includes client photography and icon-led content");
for (const icon of ["Film", "UsersRound", "Share2", "Megaphone"]) assert(about.includes(icon), `About page includes ${icon} visual icon`);

const services = read("src/routes/services.tsx");
assert(services.includes("SERVICE_DELIVERABLES"), "Services retain explicit deliverable mappings");
assert(services.includes("Positioning for founders, doctors, CEOs and investors"), "Personal Branding audience detail remains explicit");

const mediaShowcase = read("src/components/site/ProductionMediaShowcase.tsx");
assert(mediaShowcase.includes("DeferredVideo") && mediaShowcase.includes("ClientProductionImage"), "Production media uses deferred video and responsive images");
assert(mediaShowcase.includes("v50-production-wall"), "Images and videos are merged into one media wall");
assert(!mediaShowcase.includes("autoPlay"), "Production page does not eagerly autoplay all videos");

const footer = read("src/components/site/SiteFooter.tsx");
for (const icon of ["Youtube", "Instagram", "Linkedin", "Mail", "Phone", "MapPin"]) assert(footer.includes(icon), `Footer includes ${icon} icon`);
assert(footer.includes("rel=\"me noopener noreferrer\""), "Social backlinks carry identity relationship metadata");

const topTenDir = path.join(root, "public", "top-ten");
let coverCount = 0;
if (fs.existsSync(topTenDir)) {
  for (const channel of fs.readdirSync(topTenDir, { withFileTypes: true })) {
    if (!channel.isDirectory()) continue;
    coverCount += fs.readdirSync(path.join(topTenDir, channel.name)).filter((name) => /\.jpe?g$/i.test(name)).length;
  }
}
assert(coverCount === 90, "All 90 supplied episode covers are preserved");
assert(!exists(".lovable"), "No .lovable artifact is included in production source");

console.log("\nKathanika Media V51 — Custom Domain Production Verification\n");
for (const check of checks) console.log(`${check.ok ? "PASS" : "FAIL"}  ${check.message}`);
if (failures.length) {
  console.error(`\nVerification failed with ${failures.length} issue(s).`);
  process.exit(1);
}
console.log(`\nVerification passed: ${checks.length} checks.`);
