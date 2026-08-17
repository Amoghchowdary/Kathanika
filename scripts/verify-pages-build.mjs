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

const envText = fs.existsSync(envFile) ? fs.readFileSync(envFile, "utf8") : "";
const baseMatch = envText.match(/^VITE_SITE_BASE=(.+)$/m);
const siteBase = baseMatch?.[1]?.trim() || "/";

console.log("\nKathanika Media V47 - GitHub Pages Build Verification\n");
ok(exists("index.html"), "index.html exists");
for (const route of ["about", "work", "services", "creators", "contact"]) {
  ok(exists(`${route}/index.html`) || exists(`${route}.html`), `${route} prerender exists`);
}
ok(exists("top-ten"), "Episode assets exist in Pages artifact");

if (exists("index.html")) {
  const html = fs.readFileSync(path.join(out, "index.html"), "utf8");
  ok(html.includes(siteBase), `index.html contains project base path ${siteBase}`);
  ok(!/(?:src|href)=["']\/assets\//.test(html), "index.html has no root-only /assets references");
}

if (errors.length) {
  console.error(`\nGitHub Pages build verification failed with ${errors.length} issue(s).`);
  process.exit(1);
}
console.log("\nGitHub Pages build verification passed.");
