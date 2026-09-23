import fs from "node:fs";

let failures = 0;
const read = (p) => fs.readFileSync(p, "utf8").replace(/^\uFEFF/, "");
const check = (condition, message) => {
  if (condition) console.log(`PASS  ${message}`);
  else { failures += 1; console.error(`FAIL  ${message}`); }
};

console.log("\nKathanika Media V70 — Frontend Career Inquiry Contract Verification\n");
const creator = read("src/routes/creators.tsx");
const api = read("src/lib/api.ts");
const envPages = read(".env.github-pages");
const envProd = read(".env.production");
const root = read("src/routes/__root.tsx");
const endpoint = "AKfycbzvaMEaiUNv0JvWslsraGHpf2Zc53IfYvj86vab5yU-Ve4VeQCItEGl63S6xgBSue_ZXw";

check(creator.includes("inferPlatformFromProfileUrl"), "Career form derives primary platform from profile URL");
check(creator.includes("platform,"), "Career payload sends platform to backend");
check(creator.includes('name="profileUrl"') && creator.includes('type="url" required'), "Career profile URL is client-required");
check(creator.includes('return "LinkedIn"') && creator.includes('return "Instagram"') && creator.includes('return "YouTube"'), "Common creator platforms are detected client-side");
check(api.includes('action: payload.inquiryType === "career" ? "careerInquiry"'), "API routes career requests to careerInquiry");
check(api.includes('Content-Type": "text/plain;charset=UTF-8"'), "Apps Script CORS-safe POST contract remains intact");
check(envPages.includes(endpoint) && envProd.includes(endpoint), "Frontend environments retain the deployed backend endpoint");
check(!fs.existsSync("google-apps-script") && !fs.existsSync("apps-script-deploy"), "Backend source is intentionally excluded from Git while deployed API connectivity is retained");
check(root.includes("GTM-PZF49MGL"), "Google Tag Manager remains intact");
check(root.includes("G-Y94QFK4PZZ"), "Google Analytics 4 remains intact");

if (failures) {
  console.error(`\nV70 career inquiry verification failed with ${failures} issue(s).`);
  process.exit(1);
}
console.log("\nV70 Career Inquiry frontend verification passed.");
