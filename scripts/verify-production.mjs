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
  "package.json", "vite.config.ts", "src/styles.css",
  "src/routes/index.tsx", "src/routes/about.tsx", "src/routes/work.tsx",
  "src/routes/services.tsx", "src/routes/creators.tsx", "src/routes/contact.tsx",
  "src/components/site/HeroOrbit.tsx", "src/components/site/EpisodeLibrary.tsx",
  "src/components/site/InquiryModal.tsx", "src/components/site/SiteHeader.tsx",
  "src/components/site/SiteFooter.tsx", "src/assets/kathanika-logo-client.png",
  "src/assets/kathanika-logo-dark.png", "public/watercolor-orbit.svg",
  ".env.github-pages", ".github/workflows/deploy-pages.yml",
  "scripts/verify-pages-build.mjs", "scripts/git-preflight.ps1",
];
for (const file of required) assert(exists(file), `Required V46 file exists: ${file}`);

const pkg = JSON.parse(read("package.json"));
assert(pkg.name === "kathanika-media-v47-git-production", "Package name is V47 Git production");
assert(pkg.version === "47.0.0", "Package version is 47.0.0");
assert(pkg.scripts?.typecheck === "tsc --noEmit", "Strict TypeScript verification is configured");
assert(Boolean(pkg.scripts?.preflight), "Local production preflight is configured");
assert(Boolean(pkg.scripts?.["build:pages"]), "GitHub Pages build script is configured");
assert(Boolean(pkg.scripts?.["verify:pages"]), "GitHub Pages artifact verification is configured");
assert(Boolean(pkg.scripts?.["preflight:pages"]), "GitHub Pages preflight is configured");

const envPages = read(".env.github-pages");
assert(envPages.includes("VITE_SITE_BASE=/Kathanika/"), "GitHub Pages base matches repository case: /Kathanika/");
assert(/VITE_KATHANIKA_API_URL=https:\/\/script\.google\.com\/macros\/s\/.+\/exec/.test(envPages), "GitHub Pages Apps Script URL is configured");
const workflow = read(".github/workflows/deploy-pages.yml");
assert(workflow.includes("pages: write") && workflow.includes("id-token: write"), "Pages deployment permissions are configured");
assert(workflow.includes("actions/upload-pages-artifact@v4"), "Pages artifact upload action is configured");
assert(workflow.includes("actions/deploy-pages@v4"), "Pages deploy action is configured");
assert(workflow.includes("npm run build:pages") && workflow.includes("npm run verify:pages"), "Workflow builds and verifies the Pages artifact");

const css = read("src/styles.css").toLowerCase();
for (const hex of ["#8a5f41", "#a77f60", "#f3e4c9", "#ccd67f", "#f3e5ca", "#4a2f20"]) {
  assert(css.includes(hex), `Confirmed V44 design colour ${hex.toUpperCase()}`);
}
assert(css.includes("--card-bg: #f3e5ca"), "Card surface uses client-provided #F3E5CA");
assert(!css.includes("--card-bg: #d7a277"), "Old V43 orange card surface is removed");
assert(css.includes(".v44-evolution-flow") && css.includes(".v44-flow-connector"), "Evolution uses a stepped visual flow with connectors");
assert(css.includes(".v44-evolution-step:nth-child(4)") && css.includes("margin-top: 204px"), "Desktop evolution creates progressive variation instead of one flat row");
assert(css.includes(".v41-service-list p") && css.includes("font-size: clamp(14px"), "Service descriptions have presentation-scale typography");
assert(css.includes(".v41-outline-cta") && css.includes("min-height: 62px"), "Primary inquiry CTA is large and prominent");
assert(css.includes("translate(4px, -4px)"), "Primary inquiry CTA has animated hover movement");
assert(css.includes(".v44-footer-lead") && css.includes(".v44-footer-grid"), "Footer uses the V44 premium lead + compact information structure");
assert(css.includes("100dvh"), "Mobile navigation/modal keep dynamic viewport behavior");

assert(css.includes("V45 RESPONSIVE HARDENING".toLowerCase()), "V45 responsive hardening layer is present");
for (const breakpoint of ["max-width: 1240px", "max-width: 900px", "max-width: 640px", "max-width: 420px", "max-width: 360px"]) {
  assert(css.includes(breakpoint), `Responsive breakpoint is defined: ${breakpoint}`);
}
assert(css.includes("max-height: 620px") && css.includes("orientation: landscape"), "Short landscape devices have a dedicated layout");
assert(css.includes("overflow-x: clip"), "Global horizontal overflow is prevented");
assert(css.includes("font-size: 16px; /* prevents ios auto zoom */"), "Mobile form inputs prevent iOS focus zoom");
assert(css.includes("width: 100vw") && css.includes("height: 100dvh"), "Mobile inquiry modal can use the full dynamic viewport");
assert(css.includes("touch devices do not depend on hover"), "Touch controls do not depend on hover interactions");
assert(css.includes("grid-template-columns: 1fr") && css.includes("very small phones / 320px safety"), "320px phones receive single-column safety rules");
assert(css.includes("V46 VERIFIED RESPONSIVE HERO".toLowerCase()), "V46 desktop hero containment layer is present");
assert(css.includes("flex: 0 0 100%"), "Hero slides cannot shrink into multiple desktop columns");
assert(css.includes("max-width: 1120px"), "Desktop hero title has a controlled editorial line length");
assert(css.includes("overflow-wrap: normal") && css.includes("hyphens: none"), "Display headlines never split words into fragments");
assert(css.includes("font-size: clamp(58px, 5.35vw, 102px)"), "Desktop hero typography is capped for readability");

const header = read("src/components/site/SiteHeader.tsx");
assert(header.includes('kathanika-logo-client.png'), "Header uses cropped Kathanika logo");
for (const label of ["Home", "About", "Work", "Services", "Career Inquiry", "Business Inquiry"]) {
  assert(header.includes(`"${label}"`), `Navbar includes ${label}`);
}
assert(header.includes('document.body.style.overflow = "hidden"'), "Mobile menu locks body scroll");
assert(header.includes('event.key === "Escape"'), "Mobile menu closes with Escape");
assert(header.includes("window.innerWidth > 1240"), "Mobile menu closes automatically when resizing to desktop");

const hero = read("src/components/site/HeroOrbit.tsx");
assert(hero.includes("setInterval") && hero.includes("SLIDE_MS"), "Hero auto-advances");
assert(!hero.includes("Auto sequence"), "Hero exposes no technical auto-sequence label");
assert(hero.includes("We build IPs. Not just content."), "Hero copy reflects Kathanika IP positioning");
assert(!hero.includes("onPointerDown") && !hero.includes("ArrowLeft") && !hero.includes("ArrowRight"), "Hero has no manual controls");

const home = read("src/routes/index.tsx");
assert(home.includes("v44-evolution-flow"), "Homepage media shift uses V44 evolution flow");
assert(home.includes("<EpisodeLibrary"), "Homepage retains episode discovery section");

const about = read("src/routes/about.tsx");
assert(about.includes("v44-evolution-flow"), "About page uses V44 evolution flow");
assert(!about.includes("visual map instead of an essay"), "About page contains no implementation/meta commentary");

const episodes = read("src/components/site/EpisodeLibrary.tsx");
assert(episodes.includes("Original shows, conversations and ideas from the Kathanika network."), "Episode section uses audience-facing editorial copy");
assert(!episodes.includes("Continuous rails") && !episodes.includes("curated episode covers"), "Episode section exposes no technical rail/dump wording");

const work = read("src/routes/work.tsx");
assert(work.includes("distinct audience, purpose and point of view"), "Work page uses editorial positioning rather than implementation wording");
assert(work.includes("video.coverUrl") && work.includes("video.videoUrl"), "Work page retains supplied episode art and links");

const services = read("src/routes/services.tsx");
assert(services.includes("content.services") && services.includes("sortActive"), "Services page renders production service catalogue");
assert(services.includes("Every IP has an audience, purpose and identity."), "Audience / purpose / identity principle remains in Services");
assert(!services.includes("used by the backend"), "Services page contains no backend implementation wording");
assert(services.includes("Start Business Inquiry"), "Services page uses stronger Business Inquiry CTA");

const defaults = read("src/content/defaults.ts");
assert(defaults.includes("founders, doctors, CEOs and investors"), "Personal Branding explicitly covers founders, doctors, CEOs and investors");
assert(defaults.includes("distinct brand narrative, content language and media presence"), "Brand Building copy is specific and client-facing");

for (const route of ["creators", "contact"]) {
  const src = read(`src/routes/${route}.tsx`);
  assert(src.includes("InquiryModal"), `${route} inquiry stays closed until requested`);
}
const contact = read("src/routes/contact.tsx");
assert(contact.includes("Start Business Inquiry"), "Business Inquiry page uses strong CTA label");

const footer = read("src/components/site/SiteFooter.tsx");
assert(footer.includes("kathanika-logo-dark.png"), "Footer uses a dark Kathanika logo suitable for the light card");
assert(footer.includes("v44-footer-cta"), "Footer includes a prominent Business Inquiry CTA");
assert(footer.includes("FOOTER_LINKS") && footer.includes("as const"), "Footer links remain strongly typed");

const visibleSources = [
  "src/components/site/HeroOrbit.tsx",
  "src/components/site/EpisodeLibrary.tsx",
  "src/routes/index.tsx", "src/routes/about.tsx", "src/routes/work.tsx",
  "src/routes/services.tsx", "src/routes/creators.tsx", "src/routes/contact.tsx",
  "src/components/site/SiteFooter.tsx",
].map(read).join("\n").toLowerCase();
for (const phrase of ["continuous rails", "curated episode covers", "used by the backend", "visual map instead of an essay", "auto sequence"]) {
  assert(!visibleSources.includes(phrase), `No user-facing technical/meta phrase: ${phrase}`);
}

const topTenDir = path.join(root, "public", "top-ten");
let coverCount = 0;
if (fs.existsSync(topTenDir)) {
  for (const channel of fs.readdirSync(topTenDir, { withFileTypes: true })) {
    if (!channel.isDirectory()) continue;
    coverCount += fs.readdirSync(path.join(topTenDir, channel.name))
      .filter((name) => /\.jpe?g$/i.test(name)).length;
  }
}
assert(coverCount === 90, "All 90 supplied episode covers are preserved");
assert(exists(".github/workflows/deploy-pages.yml"), "GitHub Pages deployment workflow is included");
// .git is expected in a cloned deployment repository; only builder-specific artifacts are forbidden.
assert(!exists(".lovable"), "No .lovable artifact is included in production source");

console.log("\nKathanika Media V47 — Git Production + Verified Responsive Design\n");
for (const check of checks) console.log(`${check.ok ? "PASS" : "FAIL"}  ${check.message}`);
if (failures.length) {
  console.error(`\nVerification failed with ${failures.length} issue(s).`);
  process.exit(1);
}
console.log(`\nVerification passed: ${checks.length} checks.`);
