import fs from "node:fs"; import path from "node:path";
const read=(p)=>fs.readFileSync(p,"utf8"); let failures=0; const check=(ok,label)=>{console.log(`${ok?"PASS":"FAIL"}  ${label}`); if(!ok) failures+=1;};
console.log("\nKathanika Media V76 — Human-Finish Polish Exit Control\n");
const about=read("src/routes/about.tsx"); const css=read("src/styles.css"); const pkg=JSON.parse(read("package.json"));
check(pkg.name==="kathanika-media-v76-polished-human-finish"&&pkg.version==="76.0.0","V76 package identity/version are correct");
check(read("VERSION.txt").trim()==="76.0.0","VERSION.txt matches V76");
check(!about.includes("Manikanta")&&!about.includes("Operations"),"Former Operations profile/title remains absent from About");
check((about.match(/role: "Founder"/g)||[]).length===1&&(about.match(/role: "Co-Founder"/g)||[]).length===1,"About retains Founder and Co-Founder roles only");
const imgs=["IMG_5584","IMG_5444","IMG_4809","IMG_5144","IMG_5719","IMG_20260704_114854"];
for(const stem of imgs){check(about.includes(stem),`About uses authentic production image ${stem}`);for(const ext of ["avif","webp"]){check(fs.existsSync(path.join("public/media/production/responsive",`${stem}-960.${ext}`)),`${stem} responsive ${ext.toUpperCase()} asset exists`)}}
check(css.includes("v76-about-story-grid"),"About production-life gallery styling is present");check(css.includes("prefers-reduced-motion"),"Motion respects reduced-motion accessibility preference");check(css.includes("content-visibility:auto"),"Below-the-fold rendering optimization is enabled");check(css.includes(".v41-header.is-scrolled"),"Scrolled-header polish is present");check(css.includes('a[aria-current="page"]::after'),"Active-route underline styling follows aria-current state");
if(failures){console.error(`\nV76 polish exit control failed with ${failures} issue(s).`);process.exit(1)} console.log("\nV76 human-finish polish exit control passed.");
