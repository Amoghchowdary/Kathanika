import fs from "node:fs";

let failures = 0;
function read(path){ return fs.readFileSync(path, "utf8"); }
function check(condition, message){ if(condition){ console.log(`PASS  ${message}`); } else { failures++; console.error(`FAIL  ${message}`); } }

console.log("\
Kathanika Media V65 — Career Inquiry Contract Verification\
");
const creator = read("src/routes/creators.tsx");
const api = read("src/lib/api.ts");
const backend = read("google-apps-script/Inquiries.gs");
const bundled = read("apps-script-deploy/Kathanika_V30_Production_Backend.gs");
const env = read(".env.github-pages");

check(creator.includes("inferPlatformFromProfileUrl"), "Career form derives primary platform from profile URL");
check(creator.includes("platform,"), "Career payload sends platform to backend");
check(creator.includes('name="profileUrl"') && creator.includes('type="url" required'), "Career profile URL is client-required");
check(creator.includes('return "LinkedIn"') && creator.includes('return "Instagram"') && creator.includes('return "YouTube"'), "Common creator platforms are detected client-side");
check(api.includes('action: payload.inquiryType === "career" ? "careerInquiry"'), "API still routes career requests to careerInquiry");
check(api.includes('Content-Type": "text/plain;charset=UTF-8"'), "Apps Script CORS-safe POST contract remains intact");
check(backend.includes("inferPlatformFromProfileUrl_"), "Modular Apps Script has server-side platform fallback");
check(backend.includes("raw.platform, 120) || inferPlatformFromProfileUrl_"), "Modular Apps Script accepts explicit platform or inferred fallback");
check(bundled.includes("inferPlatformFromProfileUrl_"), "Bundled production Apps Script has server-side platform fallback");
check(bundled.includes("raw.platform, 120) || inferPlatformFromProfileUrl_"), "Bundled Apps Script accepts explicit platform or inferred fallback");
check(backend.includes("Primary platform is required."), "Server validation remains enabled after fallback");
check(backend.includes("appendInquiryLocked_(KATHANIKA.SHEETS.CAREER, 14"), "Career database 14-column write contract remains intact");
check(env.includes("AKfycbzvaMEaiUNv0JvWslsraGHpf2Zc53IfYvj86vab5yU-Ve4VeQCItEGl63S6xgBSue_ZXw"), "Production Apps Script endpoint remains unchanged");
check(read("src/routes/__root.tsx").includes("GTM-PZF49MGL"), "Google Tag Manager remains intact");
check(read("src/routes/__root.tsx").includes("G-Y94QFK4PZZ"), "Google Analytics 4 remains intact");

if(failures){ console.error(`\
V65 career inquiry verification failed with ${failures} issue(s).`); process.exit(1); }
console.log("\
V65 Career Inquiry verification passed.");
