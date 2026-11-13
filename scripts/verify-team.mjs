import fs from "node:fs";
let failures=0;
const check=(ok,label)=>{console.log(`${ok?"PASS":"FAIL"}  ${label}`);if(!ok)failures+=1;};
const read=(p)=>fs.readFileSync(p,"utf8");
console.log("\nKathanika Media V85 — Founders-Only About Verification\n");
const about=read("src/routes/about.tsx"); const pkg=JSON.parse(read("package.json"));
check(pkg.name==="kathanika-media-v85-seo-growth","V85 package identity is correct");
check(pkg.version==="85.0.0","V85 package version is correct");
check(!about.includes("Manikanta")&&!about.includes("Operations & Communications"),"Former operations profile remains removed");
check((about.match(/name: "/g)||[]).length===2,"Exactly two named founder profiles remain");
check(about.includes('role: "Founder"')&&about.includes('role: "Co-Founder"'),"Founder and Co-Founder roles remain");
check(about.includes('file="founding-team-01"')&&about.includes("v77-about-founders-opening"),"Founders-together image is the About opening image");
check(about.includes('portrait: "founder-portrait-02"')&&about.includes('portrait: "founder-portrait-01"'),"Individual founder portraits are restored in the two profile cards");
check(!about.includes("founding-team-02")&&!about.includes("ClientProductionImage"),"No unrelated About photography is rendered");
check(about.includes("7+ years")&&about.includes("100+ content shows"),"Nikhil profile details remain");
check(about.includes("Foundation for Democratic Reforms")&&about.includes("creator economics"),"Sai profile details remain");
if(failures){console.error(`\nV85 founders-only verification failed with ${failures} issue(s).`);process.exit(1)}
console.log("\nV85 Founders-Only About verification passed.");
