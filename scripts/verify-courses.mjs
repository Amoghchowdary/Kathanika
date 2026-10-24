import fs from "node:fs";
let failures = 0;
const check = (condition, message) => condition ? console.log(`PASS  ${message}`) : (console.error(`FAIL  ${message}`), failures++);
const read = (path) => fs.readFileSync(path, "utf8");
const exists = (path) => fs.existsSync(path);

console.log("\nKathanika Media V70 — Courses + Course Inquiry Verification\n");
const route = read("src/routes/courses.tsx");
const header = read("src/components/site/SiteHeader.tsx");
const footer = read("src/components/site/SiteFooter.tsx");
const css = read("src/styles.css");
const sitemap = read("public/sitemap.xml");
const about = read("src/routes/about.tsx");
const api = read("src/lib/api.ts");
const backend = read("google-apps-script/Inquiries.gs");
const config = read("google-apps-script/Config.gs");
const database = read("google-apps-script/Database.gs");
const code = read("google-apps-script/Code.gs");
const bundled = read("apps-script-deploy/Kathanika_V31_Production_Backend.gs");
const pkg = JSON.parse(read("package.json"));

check(pkg.name === "kathanika-media-v70-inquiries" && pkg.version === "70.0.0", "V70 package identity is correct");
check(header.includes('["Courses", "/courses"]'), "Courses tab is present in primary/mobile navigation");
check(footer.includes('["Courses", "/courses"]'), "Courses link is present in footer navigation");
check(route.includes('createFileRoute("/courses")'), "Dedicated /courses route exists");
check(route.includes("Learn Video Editing from Scratch") && route.includes("Beginner to Pro"), "Course name and level are present");
check(route.includes("₹5,000") && route.includes("5 weeks · 2 classes a week") && route.includes("10 sessions"), "Fee and duration details are present");
for (const tool of ["CapCut", "Premiere Pro", "DaVinci Resolve"]) check(route.includes(tool), `Course includes ${tool}`);
for (const topic of ["Cutting, pacing and storytelling", "Reels with auto-captions", "Colour correction and lighting fixes", "Sound design and effects", "Export for YouTube and Instagram", "Freelancing, pricing and first clients"]) check(route.includes(topic), `Course curriculum includes: ${topic}`);
check(route.includes("Certificate on completion"), "Certificate-on-completion promise is present");
check(route.includes('type="application/ld+json"') && route.includes('"@type": "Course"'), "Course structured data is present");
check(route.includes("Video Editing Course in Hyderabad") && route.includes("seoHead("), "Course has location-aware SEO metadata");
check(sitemap.includes("https://www.kathanika.in/courses"), "Courses route is included in sitemap");
check(!route.includes("v69-course-poster") && !route.includes("video-editing-from-scratch.jpg"), "Course content remains native with no brochure/poster UI");
for (const ext of ["jpg","webp","avif"]) check(!exists(`public/courses/video-editing-from-scratch.${ext}`), `Course brochure ${ext.toUpperCase()} is not shipped`);
check(route.includes('id="course-inquiry-title"') && route.includes('Send Course Inquiry'), "Native Course Inquiry form is embedded on the course page");
check(route.includes('inquiryType: "course"') && route.includes('sourcePage: "/courses"'), "Course form sends a dedicated course inquiry payload");
for (const field of ['name="experienceLevel"', 'name="preferredSoftware"', 'name="preferredContact"', 'name="message"']) check(route.includes(field), `Course Inquiry includes ${field}`);
check(api.includes('payload.inquiryType === "course"') && api.includes('"courseInquiry"'), "Frontend API routes course submissions to courseInquiry");
check(config.includes("COURSE: 'Course_Inquiries'"), "Backend defines the Course_Inquiries sheet");
check(database.includes("Course_Inquiries") && database.includes("'Preferred_Software'") && database.includes("'Preferred_Contact'"), "Course inquiry database schema is present");
check(backend.includes("function createCourseInquiry_") && backend.includes("appendInquiryLocked_(KATHANIKA.SHEETS.COURSE, 14"), "Backend creates and stores course inquiries");
check(code.includes("action === 'courseInquiry'"), "Modular Apps Script route handles courseInquiry");
check(bundled.includes("function createCourseInquiry_") && bundled.includes("Course_Inquiries"), "Bundled production backend contains Course Inquiry support");
check(css.includes(".v70-inquiry-shell") && css.includes(".v70-course-inquiry"), "V70 inquiry forms have responsive production styling");
check(about.indexOf('name: "Nikhil Dintakurthi"') < about.indexOf('name: "Sai Prudvi"'), "Latest founder order correction is retained: Nikhil first, Sai second");

if (failures) { console.error(`\nV70 Courses verification failed with ${failures} issue(s).`); process.exit(1); }
console.log("\nV70 Courses + Course Inquiry verification passed.");
