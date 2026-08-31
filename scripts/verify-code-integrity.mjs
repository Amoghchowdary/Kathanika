import fs from "node:fs";
import path from "node:path";

let failures = 0;
const pass = (m) => console.log(`PASS  ${m}`);
const fail = (m) => { failures += 1; console.error(`FAIL  ${m}`); };
const check = (c, m) => c ? pass(m) : fail(m);
const exists = (p) => fs.existsSync(p);
const read = (p) => fs.readFileSync(p, "utf8");
const countFiles = (dir) => {
  let count = 0;
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p); else count += 1;
    }
  };
  if (exists(dir)) walk(dir);
  return count;
};

console.log("\nKathanika Media V57 — Code + Production Integrity Verification\n");

const pkg = JSON.parse(read("package.json"));
check(pkg.name === "kathanika-media-v57-production-stable", "V57 package identity is correct");
check(pkg.version === "57.0.0", "V57 package version is correct");
check(read("VERSION.txt").trim() === "57.0.0", "VERSION.txt matches package version");

const criticalSource = [
  "src/routes/__root.tsx", "src/routes/index.tsx", "src/routes/about.tsx", "src/routes/work.tsx",
  "src/routes/services.tsx", "src/routes/creators.tsx", "src/routes/contact.tsx", "src/routes/brands.tsx",
  "src/components/site/HeroOrbit.tsx", "src/components/site/SiteHeader.tsx", "src/components/site/SiteFooter.tsx",
  "src/components/site/InquiryModal.tsx", "src/components/site/DeferredEpisodeLibrary.tsx",
  "src/components/site/EpisodeLibrary.tsx", "src/components/site/ProductionMediaShowcase.tsx",
  "src/content/store.tsx", "src/content/top-ten-defaults.ts", "src/lib/api.ts", "src/lib/seo.ts",
  "src/styles.css", "vite.config.ts", "tsconfig.json"
];
for (const f of criticalSource) check(exists(f), `Critical source retained: ${f}`);

const backend = [
  "google-apps-script/Code.gs", "google-apps-script/Config.gs", "google-apps-script/Content.gs",
  "google-apps-script/Database.gs", "google-apps-script/Inquiries.gs", "google-apps-script/Seed.gs",
  "google-apps-script/SeedData.gs", "google-apps-script/Utils.gs", "google-apps-script/appsscript.json",
  "apps-script-deploy/Kathanika_V30_Production_Backend.gs", "apps-script-deploy/appsscript.json"
];
for (const f of backend) check(exists(f), `Backend source retained: ${f}`);

const srcCount = countFiles("src");
const publicCount = countFiles("public");
const gasCount = countFiles("google-apps-script");
const deployCount = countFiles("apps-script-deploy");
check(srcCount >= 117, `Frontend source file set is intact (${srcCount} files)`);
check(publicCount >= 388, `Public/media asset set is intact (${publicCount} files)`);
check(gasCount >= 10, `Google Apps Script source set is intact (${gasCount} files)`);
check(deployCount >= 3, `Apps Script deployment source set is intact (${deployCount} files)`);

const envPages = read(".env.github-pages");
const envProd = read(".env.production");
const api = "https://script.google.com/macros/s/AKfycbzvaMEaiUNv0JvWslsraGHpf2Zc53IfYvj86vab5yU-Ve4VeQCItEGl63S6xgBSue_ZXw/exec";
for (const [name, txt] of [["GitHub Pages", envPages], ["production", envProd]]) {
  check(txt.includes(`VITE_KATHANIKA_API_URL=${api}`), `${name} environment keeps the production Apps Script endpoint`);
  check(txt.includes("VITE_SITE_BASE=/"), `${name} environment uses custom-domain root base`);
  check(txt.includes("VITE_PUBLIC_SITE_URL=https://www.kathanika.in/"), `${name} environment uses production canonical URL`);
}

const workflow = read(".github/workflows/deploy-pages.yml");
check(workflow.includes("name: Deploy Kathanika V57"), "GitHub Pages workflow identifies V57");
check(workflow.includes("npm install --no-audit --no-fund"), "GitHub Actions installs production dependencies");
check(workflow.includes("npm run preflight:pages"), "GitHub Actions runs the full production preflight");
check(workflow.includes("path: .output/public"), "GitHub Pages uploads the verified static artifact");
check(workflow.includes("actions/deploy-pages@v4"), "GitHub Pages deploy action remains configured");

for (const script of ["verify:integrity", "verify:source", "verify:seo", "verify:performance", "verify:lighthouse", "verify:domain", "verify:gtm", "verify:ga4", "verify:tracking:build", "verify:artifact", "preflight:pages", "git:preflight"]) {
  check(Boolean(pkg.scripts?.[script]), `Production script configured: ${script}`);
}

const root = read("src/routes/__root.tsx");
check(root.includes("GTM-PZF49MGL") && root.includes("G-Y94QFK4PZZ"), "Both production tracking IDs remain in the root document");
check(root.includes("kathanika-critical-css") && root.includes('media="print"'), "Critical CSS / non-blocking stylesheet optimization remains intact");
check(read("public/CNAME").trim() === "www.kathanika.in", "Custom-domain CNAME remains intact");
check(exists("public/sitemap.xml") && exists("public/robots.txt") && exists("public/site.webmanifest"), "Core SEO discovery files remain intact");
check(!exists(".lovable"), "No Lovable production artifact is present");

if (failures) {
  console.error(`\nV57 integrity verification failed with ${failures} issue(s).`);
  process.exit(1);
}
console.log("\nV57 code + production integrity verification passed.");
