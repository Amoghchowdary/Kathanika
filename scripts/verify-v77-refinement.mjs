import fs from "node:fs";
let failures=0;
const read=(p)=>fs.readFileSync(p,"utf8");
const check=(ok,label)=>{console.log(`${ok?"PASS":"FAIL"}  ${label}`);if(!ok)failures+=1;};
console.log("\nKathanika Media V84 — Client Refinement Exit Control\n");
const about=read("src/routes/about.tsx");
const courses=read("src/routes/courses.tsx");
const creators=read("src/routes/creators.tsx");
const faq=read("src/components/site/FaqAssistant.tsx");
const css=read("src/styles.css");
const header=read("src/components/site/SiteHeader.tsx");
const pkg=JSON.parse(read("package.json"));
check(pkg.name==="kathanika-media-v84-cumulative-release-fix"&&pkg.version==="84.0.0","V84 package identity/version are correct");
check(read("VERSION.txt").trim()==="84.0.0","VERSION.txt matches V84");
check(header.includes('activeOptions={{ exact: true }}')&&header.includes('aria-current": "page"'),"Navbar keeps router-native exact active state");
check(faq.includes("Quick answers")&&css.includes(".v71-faq-launch:hover"),"Ask Kathanika is visually highlighted and descriptive");
check(about.includes('file="founding-team-01"')&&about.includes("v77-about-founders-opening"),"About opens with founders-together image");
check(!about.includes("ClientProductionImage")&&!about.includes("founding-team-02")&&about.includes("founder-portrait-01")&&about.includes("founder-portrait-02"),"About keeps only founders-together opening plus the two approved founder portraits");
check((about.match(/name: "/g)||[]).length===2,"About retains exactly two founder profiles");
check(courses.includes("v71-course-shell")&&css.includes(".v71-course-form-wrap .v41-field"),"Courses uses opaque high-contrast form treatment");
check(css.includes("background: var(--card-bg)")&&css.includes("box-shadow: 0 20px 60px"),"Courses has solid premium card surfaces");
for(const role of ["Creators","Writers","Editors","Researchers","Designers","Producers","Strategists"]){check(creators.includes(`title: \"${role}\"`),`Career Inquiry explains ${role}`)}
check(creators.includes("v77-career-role-grid"),"Career role explanation grid is rendered");
check(css.includes("@media (max-width: 1180px)")&&css.includes("@media (max-width: 760px)")&&css.includes("@media (max-width: 420px)"),"Desktop/tablet/mobile responsive gates are present");
if(failures){console.error(`\nV84 client refinement failed with ${failures} issue(s).`);process.exit(1)}
console.log("\nV84 client refinement exit control passed.");
