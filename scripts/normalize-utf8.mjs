import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const skippedDirs = new Set([".git", "node_modules", ".output", "dist", ".vite"]);
const textExtensions = new Set([
  ".json", ".mjs", ".js", ".cjs", ".ts", ".tsx", ".css", ".html", ".md", ".txt", ".yml", ".yaml", ".toml", ".ps1",
]);
const textNames = new Set([".gitignore", ".gitattributes", ".env.example", ".env.github-pages", ".env.production"]);
let normalized = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skippedDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (!textExtensions.has(ext) && !textNames.has(entry.name)) continue;
    const buf = fs.readFileSync(full);
    if (buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
      fs.writeFileSync(full, buf.subarray(3));
      normalized += 1;
    }
  }
}

walk(root);
console.log(`UTF-8 normalization complete. BOM removed from ${normalized} file(s).`);
