import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const css = read("src/styles.css");
const hero = read("src/components/site/HeroOrbit.tsx");
const services = read("src/routes/services.tsx");
const work = read("src/routes/work.tsx");
const about = read("src/routes/about.tsx");
const footer = read("src/components/site/SiteFooter.tsx");
const layout = read("src/components/site/SiteLayout.tsx");
const checks=[]; const failures=[]; const check=(ok,msg)=>{checks.push([!!ok,msg]); if(!ok) failures.push(msg)};

check(!hero.includes("v41-hero-texture") && hero.includes("v48-hero-media"), "Client feedback: unexplained hero blob remains removed");
check(root && css.includes('font-family: "Montserrat"') && css.includes('font-family: "Inter"'), "Client feedback: preferred strong typography remains active");
check(services.includes("v48-service-points") && services.includes("SERVICE_DELIVERABLES"), "Client feedback: services retain multi-point deliverables");
check(css.includes(".v48-service-title h3 { font-size: clamp(36px, 3vw, 54px)"), "Latest feedback: service typography is increased");
check(css.includes(".v41-page-head.v48-page-head") && css.includes("grid-template-columns: minmax(0, 1.35fr)"), "Latest feedback: page-head copy is responsively contained");
check(work.includes("ProductionMediaShowcase") && css.includes(".v50-production-wall"), "Latest feedback: client images and videos render as one continuous wall");
check(about.includes("v50-about-visual") && about.includes("ClientProductionImage"), "Latest feedback: About page now includes client imagery");
check(about.includes("Film") && about.includes("UsersRound") && about.includes("Share2") && about.includes("Megaphone"), "Latest feedback: About page includes relevant visual icons");
check(!layout.includes("v41-page-watercolor"), "Client feedback: page-head watercolor remains removed");
check(css.includes(".v41-header.is-scrolled") && css.includes("max-height: 54px"), "Client feedback: scrolled logo retains fixed vertical clearance");
check(footer.includes("Youtube") && footer.includes("Instagram") && footer.includes("Linkedin"), "Footer retains visible social media icons");
check(css.includes("@media (max-width: 1100px)"), "Latest feedback: additional small-laptop/tablet responsive bridge is present");

console.log("\nKathanika Media V52 — Client Feedback Coverage\n");
for(const [ok,msg] of checks) console.log(`${ok?"PASS":"FAIL"}  ${msg}`);
if(failures.length){console.error(`\nClient feedback verification failed: ${failures.length} issue(s).`);process.exit(1)}
console.log(`\nClient feedback verification passed: ${checks.length} checks.`);
