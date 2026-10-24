import fs from "node:fs";
let failures = 0;
const read = (path) => fs.readFileSync(path, "utf8");
const check = (condition, message) => condition ? console.log(`PASS  ${message}`) : (console.error(`FAIL  ${message}`), failures++);

console.log("\nKathanika Media V70 — Career Inquiry Contract Verification\n");
const career = read("src/routes/creators.tsx");
const api = read("src/lib/api.ts");
const backend = read("google-apps-script/Inquiries.gs");
const config = read("google-apps-script/Config.gs");
const database = read("google-apps-script/Database.gs");
const code = read("google-apps-script/Code.gs");
const bundled = read("apps-script-deploy/Kathanika_V31_Production_Backend.gs");
const env = read(".env.github-pages");

check(career.includes('aria-labelledby="career-inquiry-title"') && career.includes('<form className="v41-form"'), "Career Inquiry form is visibly embedded on the Careers page");
check(!career.includes("InquiryModal"), "Career Inquiry is no longer hidden behind a modal");
for (const field of ['name="name"', 'name="email"', 'name="phone"', 'name="city"', 'name="role"', 'name="experienceLevel"', 'name="availability"', 'name="portfolioUrl"', 'name="message"']) check(career.includes(field), `Career form includes ${field}`);
check(career.includes('inquiryType: "career"') && career.includes('sourcePage: "/creators"'), "Career payload is explicitly routed as a career inquiry");
check(api.includes('payload.inquiryType === "career"') && api.includes('"careerInquiry"'), "Frontend API routes career submissions to careerInquiry");
check(config.includes("CAREER: 'Career_Inquiries_V70'"), "V70 career submissions use a dedicated new sheet without repurposing legacy career data");
check(database.includes("Career_Inquiries_V70") && database.includes("'Role'") && database.includes("'Experience_Level'") && database.includes("'Availability'"), "V70 career sheet has recruitment-oriented columns");
check(backend.includes("function createCareerInquiry_") && backend.includes("raw.role") && backend.includes("raw.experienceLevel") && backend.includes("raw.availability"), "Backend validates V70 recruitment fields");
check(backend.includes("appendInquiryLocked_(KATHANIKA.SHEETS.CAREER, 14"), "Career database 14-column write contract is intact");
check(code.includes("action === 'careerInquiry'"), "Modular Apps Script route handles careerInquiry");
check(bundled.includes("Career_Inquiries_V70") && bundled.includes("function createCareerInquiry_"), "Bundled production backend contains V70 Career Inquiry support");
check(api.includes('Content-Type": "text/plain;charset=UTF-8"'), "Apps Script CORS-safe POST contract remains intact");
check(env.includes("VITE_KATHANIKA_API_URL="), "Production frontend retains an Apps Script API endpoint setting");
check(read("src/routes/__root.tsx").includes("GTM-PZF49MGL"), "Google Tag Manager remains intact");
check(read("src/routes/__root.tsx").includes("G-Y94QFK4PZZ"), "Google Analytics 4 remains intact");

if (failures) { console.error(`\nV70 career inquiry verification failed with ${failures} issue(s).`); process.exit(1); }
console.log("\nV70 Career Inquiry verification passed.");
