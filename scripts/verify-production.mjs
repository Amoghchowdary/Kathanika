import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const checks = [];
const pass = (message) => checks.push({ ok: true, message });
const fail = (message) => { checks.push({ ok: false, message }); failures.push(message); };
const assert = (condition, message) => condition ? pass(message) : fail(message);
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const exists = (rel) => fs.existsSync(path.join(root, rel));

const required = [
  "package.json", "vite.config.ts", "tsconfig.json", ".env.example",
  ".env.production", ".env.github-pages", ".gitattributes", ".gitignore",
  ".github/workflows/deploy-pages.yml",
  "src/lib/api.ts", "src/lib/base-path.ts", "src/router.tsx", "src/content/store.tsx",
  "google-apps-script/Code.gs", "google-apps-script/Config.gs",
  "google-apps-script/Database.gs", "google-apps-script/SeedData.gs",
  "google-apps-script/appsscript.json", "public/kathanika-logo-original.png",
  "scripts/verify-pages-build.mjs", "scripts/git-preflight.ps1",
];
for (const rel of required) assert(exists(rel), `Required file exists: ${rel}`);

const packageJson = JSON.parse(read("package.json"));
assert(packageJson.version === "30.0.0", "package.json version is 30.0.0");
assert(packageJson.scripts?.typecheck === "tsc --noEmit", "Typecheck script is configured");
assert(Boolean(packageJson.scripts?.["build:pages"]), "GitHub Pages build script is configured");
assert(Boolean(packageJson.scripts?.["preflight:pages"]), "GitHub Pages preflight is configured");

const envPages = read(".env.github-pages");
assert(envPages.includes("VITE_SITE_BASE=/kathanika/"), "GitHub Pages base is /kathanika/");
assert(/VITE_KATHANIKA_API_URL=https:\/\/script\.google\.com\/macros\/s\/.+\/exec/.test(envPages), "GitHub Pages Apps Script URL is configured");

const vite = read("vite.config.ts");
assert(vite.includes("VITE_SITE_BASE"), "Vite base is environment-driven");
assert(vite.includes("tsconfigPaths: true"), "Vite native tsconfig path resolution is enabled");
assert(!vite.includes("vite-tsconfig-paths"), "Legacy vite-tsconfig-paths plugin is not loaded");

const basePath = read("src/lib/base-path.ts");
assert(basePath.includes("import.meta.env.BASE_URL"), "Runtime base-path helper uses Vite BASE_URL");
const router = read("src/router.tsx");
assert(router.includes("basepath: routerBasePath()"), "TanStack Router uses the deployment base path");
const header = read("src/components/site/SiteHeader.tsx");
assert(header.includes("withBasePath"), "Header links are base-path aware");
const rails = read("src/components/site/TopTenChannels.tsx");
assert(rails.includes("src={withBasePath(video.coverUrl)}"), "Top 10 cover URLs are base-path aware");

const api = read("src/lib/api.ts");
assert(api.includes('import.meta.env["VITE_KATHANIKA_API_URL"]'), "Strict env index access fix is present");
assert(api.includes('url.searchParams.set("v", "30")'), "Frontend content API requests V30");
const store = read("src/content/store.tsx");
assert(store.includes("...(profileUrl !== undefined ? { profileUrl } : {})"), "exactOptionalPropertyTypes payload fix is present");

const config = read("google-apps-script/Config.gs");
assert(config.includes("API_VERSION: '30.0.0'"), "Apps Script package API version is 30.0.0");
assert(config.includes("kathanika_public_content_v30"), "Apps Script cache key is V30");
const database = read("google-apps-script/Database.gs");
assert(database.includes("function setupDatabase()"), "Self-provisioning setupDatabase() exists");
assert(database.includes("function verifyProductionSetup()"), "Production verification function exists");
assert(database.includes("SpreadsheetApp.create(KATHANIKA.DATABASE_NAME)"), "Database is created automatically");
assert(database.includes("function appendInquiryLocked_"), "Duplicate check + inquiry append are serialized");
const code = read("google-apps-script/Code.gs");
assert(code.includes("function doGet(e)"), "Apps Script doGet() exists");
assert(code.includes("function doPost(e)"), "Apps Script doPost() exists");
JSON.parse(read("google-apps-script/appsscript.json"));
pass("appsscript.json is valid JSON");

const workflow = read(".github/workflows/deploy-pages.yml");
assert(workflow.includes("pages: write"), "Pages workflow has pages: write permission");
assert(workflow.includes("id-token: write"), "Pages workflow has id-token: write permission");
assert(workflow.includes("actions/upload-pages-artifact@v4"), "Pages artifact upload action is configured");
assert(workflow.includes("actions/deploy-pages@v4"), "Pages deployment action is configured");
assert(workflow.includes("npm run build:pages"), "Pages workflow uses the /kathanika/ build mode");

const seedSource = read("google-apps-script/SeedData.gs");
const seed = vm.runInNewContext(`(() => { ${seedSource}; return KATHANIKA_SEED; })()`, {}, { timeout: 1000 });
assert(Array.isArray(seed.channels) && seed.channels.length === 9, "Seed contains 9 channels");
assert(Array.isArray(seed.services) && seed.services.length === 10, "Seed contains 10 services");
const videos = seed.channels.flatMap((channel) => channel.videos.map((video) => ({ channel, video })));
assert(videos.length === 90, "Seed contains 90 video records");
for (const channel of seed.channels) {
  const ranks = channel.videos.map((video) => Number(video.rank)).sort((a,b) => a-b);
  assert(JSON.stringify(ranks) === JSON.stringify([1,2,3,4,5,6,7,8,9,10]), `${channel.name}: ranks 1-10 complete`);
  for (const video of channel.videos) {
    const localCover = String(video.coverUrl || "").replace(/^\/+/, "");
    assert(exists(path.join("public", localCover)), `${channel.name} #${video.rank}: cover asset exists`);
    assert(/^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(String(video.videoUrl || "")), `${channel.name} #${video.rank}: YouTube URL valid`);
  }
}

const topTenDir = path.join(root, "public", "top-ten");
let coverCount = 0;
if (fs.existsSync(topTenDir)) {
  for (const dirent of fs.readdirSync(topTenDir, { withFileTypes: true })) {
    if (!dirent.isDirectory()) continue;
    coverCount += fs.readdirSync(path.join(topTenDir, dirent.name)).filter((name) => /\.jpe?g$/i.test(name)).length;
  }
}
assert(coverCount === 90, "Exactly 90 bundled Top 10 cover images are present");

let sourceText = "";
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) sourceText += "\n" + fs.readFileSync(full, "utf8");
  }
}
walk(path.join(root, "src"));
assert(!sourceText.includes("localStorage"), "No localStorage persistence in production source");

// .git and .github are valid/required once the project is a real Git deployment.
assert(!exists(".lovable"), "No .lovable artifact included");

console.log("\nKathanika Media V30 - Source Verification\n");
for (const check of checks) console.log(`${check.ok ? "PASS" : "FAIL"}  ${check.message}`);
if (failures.length) {
  console.error(`\nVerification failed with ${failures.length} issue(s).`);
  process.exit(1);
}
console.log(`\nVerification passed: ${checks.length} checks.`);
