import fs from "node:fs";

let failures = 0;
function check(condition, label) {
  if (condition) console.log(`PASS  ${label}`);
  else { console.error(`FAIL  ${label}`); failures += 1; }
}
function read(path) { return fs.readFileSync(path, "utf8"); }
function exists(path) { return fs.existsSync(path); }

console.log("\nKathanika Media V66 — Team Behind Kathanika Verification\n");

const about = read("src/routes/about.tsx");
const css = read("src/styles.css");
const pkg = JSON.parse(read("package.json"));

check(pkg.name === "kathanika-media-v66-team-behind-kathanika", "V66 package identity is correct");
check(pkg.version === "66.0.0", "V66 package version is correct");
check(about.includes("Team behind Kathanika Media"), "About page contains Team behind Kathanika heading");
check(about.includes("Nikhil Dintakurthi"), "Founder Nikhil Dintakurthi profile is present");
check(about.includes("Sai Prudvi"), "Co-Founder & COO Sai Prudvi profile is present");
check(about.includes("Manikanta Kandikatla"), "Operations & Communications profile is present");
check(about.includes("7+ years") && about.includes("100+ content shows"), "Founder experience context is retained");
check(about.includes("Foundation for Democratic Reforms") && about.includes("creator economics"), "Co-founder research and media-business context is retained");
check(about.includes("loading=\"lazy\"") && about.includes("decoding=\"async\""), "Team photography is lazy-loaded and async-decoded");
check(about.includes("image/avif") && about.includes("image/webp"), "Team photography uses AVIF and WebP delivery");
for (const file of [
  "public/team/founding-team-01.avif",
  "public/team/founding-team-01.webp",
  "public/team/founding-team-01.jpg",
  "public/team/founding-team-02.avif",
  "public/team/founding-team-02.webp",
  "public/team/founding-team-02.jpg",
  "public/team/founder-portrait-01.avif",
  "public/team/founder-portrait-01.webp",
  "public/team/founder-portrait-01.jpg",
  "public/team/founder-portrait-02.avif",
  "public/team/founder-portrait-02.webp",
  "public/team/founder-portrait-02.jpg",
]) check(exists(file), `Team asset exists: ${file}`);
check(css.includes(".v66-team") && css.includes(".v66-founder-grid"), "V66 team layout styles are present");
check(css.includes("@media (max-width: 760px)"), "Team section includes mobile responsive treatment");
check(about.includes("About Kathanika Media & Founding Team — Hyderabad"), "About SEO title includes founding team context");

if (failures) {
  console.error(`\nV66 team verification failed with ${failures} issue(s).`);
  process.exit(1);
}
console.log("\nV66 Team Behind Kathanika verification passed.");
