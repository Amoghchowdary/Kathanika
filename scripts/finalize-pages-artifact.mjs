import fs from "node:fs";
import path from "node:path";

const source = path.resolve("public/404.html");
const outDir = path.resolve(".output/public");
const target = path.join(outDir, "404.html");

if (!fs.existsSync(source)) {
  console.error("FAIL  public/404.html is missing; cannot finalize GitHub Pages artifact.");
  process.exit(1);
}
if (!fs.existsSync(outDir)) {
  console.error("FAIL  .output/public does not exist; run the Pages build first.");
  process.exit(1);
}

fs.copyFileSync(source, target);
const html = fs.readFileSync(target, "utf8");
if (!html.includes("Page not found — Kathanika Media") || !html.includes("THE STORY MOVED")) {
  console.error("FAIL  .output/public/404.html is not the branded Kathanika 404 artifact.");
  process.exit(1);
}

console.log("PASS  Branded Kathanika 404 copied to .output/public/404.html");
