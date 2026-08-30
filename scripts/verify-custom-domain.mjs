import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const exists = (rel) => fs.existsSync(path.join(root, rel));
const failures = [];
const check = (condition, message) => {
  console.log(`${condition ? "PASS" : "FAIL"}  ${message}`);
  if (!condition) failures.push(message);
};

const domain = "https://www.kathanika.in/";
const envPages = read(".env.github-pages");
const envProduction = read(".env.production");
const seo = read("src/lib/seo.ts");
const generator = read("scripts/generate-seo.mjs");
const sitemap = read("public/sitemap.xml");
const robots = read("public/robots.txt");
const yaml = read("public/sitemap.yml");

console.log("\nKathanika Media V55 — Custom Domain Verification\n");
check(exists("public/CNAME"), "public/CNAME exists");
check(read("public/CNAME").trim() === "www.kathanika.in", "CNAME is www.kathanika.in");
check(/VITE_SITE_BASE=\/\s*$/m.test(envPages), "GitHub Pages base path is root /");
check(envPages.includes(`VITE_PUBLIC_SITE_URL=${domain}`), "GitHub Pages canonical URL uses www.kathanika.in");
check(/VITE_SITE_BASE=\/\s*$/m.test(envProduction), "Production base path is root /");
check(envProduction.includes(`VITE_PUBLIC_SITE_URL=${domain}`), "Production canonical URL uses www.kathanika.in");
check(seo.includes('const DEFAULT_SITE_URL = "https://www.kathanika.in/"'), "SEO fallback uses custom domain");
check(generator.includes('"https://www.kathanika.in/"'), "SEO generator fallback uses custom domain");
check(sitemap.includes("https://www.kathanika.in/") && !sitemap.includes("amoghchowdary.github.io"), "XML sitemap uses custom domain only");
check(yaml.includes("site: https://www.kathanika.in/") && !yaml.includes("amoghchowdary.github.io"), "YAML sitemap manifest uses custom domain only");
check(robots.includes("Sitemap: https://www.kathanika.in/sitemap.xml"), "robots.txt points to custom-domain sitemap");
check(!envPages.includes("/Kathanika/"), "Pages environment contains no legacy /Kathanika/ base");
check(!envPages.includes("amoghchowdary.github.io"), "Pages environment contains no legacy GitHub canonical URL");

if (failures.length) {
  console.error(`\nCustom-domain verification failed with ${failures.length} issue(s).`);
  process.exit(1);
}
console.log("\nCustom-domain verification passed.");
