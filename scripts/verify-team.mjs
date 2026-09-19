import fs from "node:fs";

let failures = 0;
function check(condition, label) {
  if (condition) console.log(`PASS  ${label}`);
  else { console.error(`FAIL  ${label}`); failures += 1; }
}
function read(path) { return fs.readFileSync(path, "utf8"); }
function exists(path) { return fs.existsSync(path); }

console.log("\nKathanika Media V67 — Team Layout Refinement Verification\n");

const about = read("src/routes/about.tsx");
const css = read("src/styles.css");
const pkg = JSON.parse(read("package.json"));

check(pkg.name === "kathanika-media-v67-team-layout-refinement", "V67 package identity is correct");
check(pkg.version === "67.0.0", "V67 package version is correct");
check(about.includes("Team behind Kathanika Media"), "About page retains Team behind Kathanika heading");
check(about.includes("Nikhil Dintakurthi"), "Nikhil Dintakurthi profile is retained");
check(about.includes("Sai Prudvi"), "Sai Prudvi profile is retained");
check(about.includes("Manikanta Kandikatla"), "Manikanta Kandikatla profile is retained");
check(about.includes('file="founding-team-01"') && about.includes('className="v67-team-hero-photo"'), "Only the requested intact founders-together image is used as the team hero");
check(!about.includes('file="founding-team-02"'), "Second founders-together image is removed from the page layout");
check(about.includes('file={index === 0 ? "founder-portrait-01" : "founder-portrait-02"}'), "Both founder portraits are attached to their profile cards");
check((about.match(/className="v67-founder-avatar"/g) || []).length === 1, "Circular founder portrait component is defined in the mapped founder cards");
check(css.includes(".v67-founder-avatar") && css.includes("border-radius: 50%"), "Founder portraits render as circles");
check(css.includes(".v67-team-hero-photo img") && css.includes("object-fit: contain"), "Shared founders image is displayed intact without crop");
check(css.includes(".v67-founder-card") && css.includes("grid-template-rows: auto auto auto auto 1fr auto"), "Founder portrait is positioned above profile content");
check(about.includes("7+ years") && about.includes("100+ content shows"), "Nikhil profile details are retained");
check(about.includes("Foundation for Democratic Reforms") && about.includes("creator economics"), "Sai profile details are retained");
check(about.includes('loading=\"lazy\"') && about.includes('decoding=\"async\"'), "Team photography remains lazy-loaded and async-decoded");
check(about.includes("image/avif") && about.includes("image/webp"), "AVIF/WebP delivery is preserved");
for (const file of [
  "public/team/founding-team-01.avif",
  "public/team/founding-team-01.webp",
  "public/team/founding-team-01.jpg",
  "public/team/founder-portrait-01.avif",
  "public/team/founder-portrait-01.webp",
  "public/team/founder-portrait-01.jpg",
  "public/team/founder-portrait-02.avif",
  "public/team/founder-portrait-02.webp",
  "public/team/founder-portrait-02.jpg",
]) check(exists(file), `Required team asset exists: ${file}`);
check(css.includes("@media (max-width: 760px)"), "Team section retains mobile responsive treatment");
check(about.includes("About Kathanika Media & Founding Team — Hyderabad"), "About SEO title remains intact");

if (failures) {
  console.error(`\nV67 team verification failed with ${failures} issue(s).`);
  process.exit(1);
}
console.log("\nV67 Team Layout Refinement verification passed.");
