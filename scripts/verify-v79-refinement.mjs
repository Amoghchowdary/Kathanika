import fs from "node:fs";
let failures=0; const check=(ok,label)=>{console.log(`${ok?"PASS":"FAIL"}  ${label}`); if(!ok) failures++;};
const read=(p)=>fs.readFileSync(p,"utf8");
const pkg=JSON.parse(read("package.json")); const about=read("src/routes/about.tsx"); const faq=read("src/components/site/FaqAssistant.tsx"); const css=read("src/styles.css");
console.log("\nKathanika Media V79 — Assistant + Founder Portrait Exit Control\n");
check(pkg.name==="kathanika-media-v79-css-build-fix"&&pkg.version==="79.0.0","V79 package identity/version are correct");
check(read("VERSION.txt").trim()==="79.0.0","VERSION.txt matches V79");
check(faq.includes("ChevronDown")&&faq.includes("v79-faq-chevron"),"Ask Kathanika has a clear V/chevron dropdown cue");
check(faq.includes("is-selected")&&css.includes(".v79-faq-actions button.is-selected"),"Assistant option boxes have highlighted selected state");
check(css.includes(".v79-faq-handoff")&&css.includes("background: var(--card-text)"),"Assistant handoff boxes have highlighted interaction states");
check(about.includes('portrait: "founder-portrait-01"')&&about.includes('portrait: "founder-portrait-02"'),"Founder and Co-Founder portrait assets are restored");
check(about.includes("v79-founder-avatar")&&about.includes("v77-about-founders-opening"),"Profile portraits coexist with the founders-together opening image");
check(!about.includes("Manikanta")&&!about.includes("Operations & Communications"),"Operations profile remains removed");
if(failures){console.error(`\nV79 refinement failed with ${failures} issue(s).`);process.exit(1)}
console.log("\nV79 assistant + founder portrait refinement passed.");
