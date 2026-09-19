import fs from "node:fs";

let failures = 0;
function check(condition, label) {
  if (condition) console.log(`PASS  ${label}`);
  else { console.error(`FAIL  ${label}`); failures += 1; }
}
function read(path) { return fs.readFileSync(path, "utf8"); }
function exists(path) { return fs.existsSync(path); }

console.log("\nKathanika Media V68 — Founder Order Correction Verification\n");

const about = read("src/routes/about.tsx");
const css = read("src/styles.css");
const pkg = JSON.parse(read("package.json"));

check(pkg.name === "kathanika-media-v68-founder-order-correction", "V68 package identity is correct");
check(pkg.version === "68.0.0", "V68 package version is correct");
check(about.includes("Team behind Kathanika Media"), "About page retains Team behind Kathanika heading");
check(about.includes("Manikanta Kandikatla"), "Manikanta Kandikatla profile is retained");
check(about.includes('file="founding-team-01"') && about.includes('className="v67-team-hero-photo"'), "Requested intact founders-together image remains the single team hero");
check(!about.includes('file="founding-team-02"'), "Extra founders-together image remains removed from page layout");
const saiPos = about.indexOf('name: "Sai Prudvi"');
const nikhilPos = about.indexOf('name: "Nikhil Dintakurthi"');
check(saiPos >= 0 && nikhilPos >= 0 && saiPos < nikhilPos, "Sai Prudvi is the first founder profile and Nikhil Dintakurthi is second");
const saiBlock = about.slice(saiPos, nikhilPos);
const nikhilBlock = about.slice(nikhilPos, about.indexOf('] as const;', nikhilPos));
check(saiBlock.includes('portrait: "founder-portrait-02"'), "First profile uses Sai Prudvi's correct portrait");
check(saiBlock.includes('role: "Co-Founder & COO'), "First profile labels Sai Prudvi as Co-Founder & COO");
check(nikhilBlock.includes('portrait: "founder-portrait-01"'), "Second profile uses Nikhil Dintakurthi's correct portrait");
check(nikhilBlock.includes('role: "Founder · Content Strategy'), "Second profile labels Nikhil Dintakurthi as Founder");
check(about.includes('file={member.portrait}') && about.includes('alt={member.portraitAlt}'), "Founder cards bind each name to explicit portrait metadata rather than array-index guessing");
check(css.includes(".v67-founder-avatar") && css.includes("border-radius: 50%"), "Founder portraits remain circular");
check(css.includes(".v67-team-hero-photo img") && css.includes("object-fit: contain"), "Shared founders image remains intact without crop");
check(about.includes("7+ years") && about.includes("100+ content shows"), "Nikhil profile details are retained");
check(about.includes("Foundation for Democratic Reforms") && about.includes("creator economics"), "Sai profile details are retained");
check(about.includes('loading="lazy"') && about.includes('decoding="async"'), "Team photography remains lazy-loaded and async-decoded");
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
  console.error(`\nV68 founder order verification failed with ${failures} issue(s).`);
  process.exit(1);
}
console.log("\nV68 Founder Order Correction verification passed.");
