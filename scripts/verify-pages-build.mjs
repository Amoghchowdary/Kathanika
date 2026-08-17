import fs from "node:fs";
import path from "node:path";

const out = path.resolve(".output/public");
const envFile = fs.readFileSync(path.resolve(".env.github-pages"), "utf8");
const configuredBase = process.env["VITE_SITE_BASE"] || envFile.match(/^VITE_SITE_BASE=(.+)$/m)?.[1]?.trim() || "/";
const expectedBase = configuredBase === "/" ? "/" : `/${configuredBase.replace(/^\/+|\/+$/g, "")}/`;
const errors = [];
const ok = (cond, msg) => { console.log(`${cond ? "PASS" : "FAIL"}  ${msg}`); if (!cond) errors.push(msg); };
const exists = (rel) => fs.existsSync(path.join(out, rel));

console.log("\nKathanika Media V30 - GitHub Pages Build Verification\n");
ok(exists("index.html"), "index.html exists");
for (const route of ["work", "services", "contact", "creators", "privacy", "terms"]) {
  ok(exists(`${route}/index.html`) || exists(`${route}.html`), `${route} prerender exists`);
}
ok(exists("top-ten"), "Top 10 assets exist in Pages artifact");

if (exists("index.html")) {
  const html = fs.readFileSync(path.join(out, "index.html"), "utf8");
  ok(html.includes(expectedBase), `index.html contains GitHub project base path ${expectedBase}`);
  ok(!/(?:src|href)=["']\/assets\//.test(html), "index.html has no root-only /assets references");
}

if (errors.length) {
  console.error(`\nGitHub Pages build verification failed with ${errors.length} issue(s).`);
  process.exit(1);
}
console.log("\nGitHub Pages build verification passed.");
