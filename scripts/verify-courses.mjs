import fs from "node:fs";

let failures = 0;
function check(condition, label) {
  if (condition) console.log(`PASS  ${label}`);
  else { console.error(`FAIL  ${label}`); failures += 1; }
}
const read = (path) => fs.readFileSync(path, "utf8");
const exists = (path) => fs.existsSync(path);

console.log("\nKathanika Media V74 — Courses Verification\n");
const courses = read("src/routes/courses.tsx");
const header = read("src/components/site/SiteHeader.tsx");
const footer = read("src/components/site/SiteFooter.tsx");
const tree = read("src/routeTree.gen.ts");

check(exists("src/routes/courses.tsx"), "Courses route file exists");
check(courses.includes('createFileRoute("/courses")'), "Courses route is registered at /courses");
check(tree.includes("CoursesRouteImport") && tree.includes("'/courses'"), "Generated route tree contains /courses");
check(header.includes('["Courses", "/courses"]'), "Courses is present in main navigation");
check(footer.includes('["Courses", "/courses"]'), "Courses is present in footer navigation");
check(courses.includes("₹5,000") && courses.includes("5 weeks") && courses.includes("10 sessions"), "Approved course fee and duration are retained");
check(courses.includes('service:"Course Inquiry — Video Editing"'), "Course inquiry uses the established enquiry backend path");

if (failures) {
  console.error(`\nV74 course verification failed with ${failures} issue(s).`);
  process.exit(1);
}
console.log("\nV74 Courses verification passed.");
