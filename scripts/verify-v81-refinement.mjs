import fs from "node:fs";

const read=(p)=>fs.readFileSync(p,"utf8");
const pkg=JSON.parse(read("package.json"));
const version=read("VERSION.txt").trim();
const faq=read("src/components/site/FaqAssistant.tsx");
const css=read("src/styles.css");
const about=read("src/routes/about.tsx");
let failures=0;
const check=(ok,label)=>{console.log(`${ok?"PASS":"FAIL"}  ${label}`);if(!ok)failures++;};

console.log("\nKathanika Media V81 — Refinement + Founder Identity Exit Control\n");
check(pkg.name==="kathanika-media-v81-verification-gate-fix"&&pkg.version==="81.0.0","V81 package identity/version are correct");
check(version==="81.0.0","VERSION.txt matches V81");
check(faq.includes("ChevronDown")&&faq.includes("v79-faq-chevron"),"Ask Kathanika retains the V/chevron dropdown cue");
check(faq.includes("is-selected")&&css.includes(".v79-faq-actions button.is-selected"),"Assistant option boxes retain highlighted selected state");
check(css.includes(".v79-faq-handoff")&&css.includes("background: var(--card-text)"),"Assistant handoff boxes retain highlighted interaction states");
check(about.includes("founder-portrait-02")&&about.includes("Nikhil Dintakurthi"),"Nikhil Dintakurthi is mapped to founder-portrait-02");
check(about.includes("founder-portrait-01")&&about.includes("Sai Prudvi"),"Sai Prudvi is mapped to founder-portrait-01");
check(about.includes("v77-about-founders-opening"),"Founders-together opening image remains present");
check(!about.includes("Manikanta"),"Operations profile remains removed");
if(failures){console.error(`\nV81 refinement verification failed with ${failures} issue(s).`);process.exit(1);}
console.log("\nV81 refinement + founder identity verification passed.");
