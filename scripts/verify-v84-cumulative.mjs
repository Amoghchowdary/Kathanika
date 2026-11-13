import fs from "node:fs";
let failures=0;const check=(ok,label)=>{console.log(`${ok?"PASS":"FAIL"}  ${label}`);if(!ok)failures++};
const read=(f)=>fs.readFileSync(f,"utf8");
const pkg=JSON.parse(read("package.json"));
const router=read("src/router.tsx");
const seo=read("src/lib/seo.ts");
const gen=read("scripts/generate-seo.mjs");
const sitemap=read("public/sitemap.xml");
const notFound=read("public/404.html");
const root=read("src/routes/__root.tsx");
console.log("\nKathanika Media V84 — Search Console + Custom 404 Exit Control\n");
check(pkg.name==="kathanika-media-v84-cumulative-release-fix"&&pkg.version==="84.0.0","V84 package identity/version are correct");
check(read("VERSION.txt").trim()==="84.0.0","VERSION.txt matches V84");
check(router.includes('trailingSlash: "always"'),"Router standardizes public routes to trailing-slash URLs");
check(seo.includes("canonicalPageUrl")&&seo.includes('`${withoutEdges}/`'),"Canonical URLs standardize page paths with trailing slashes");
check(gen.includes("function pageUrl(route)")&&gen.includes('`${clean}/`'),"SEO generator emits final trailing-slash page URLs");
for(const path of ["about","work","services","courses","creators","contact","brands","podcast-as-a-service","content-production","ip-building"]){check(sitemap.includes(`https://www.kathanika.in/${path}/`),`Sitemap uses final URL for /${path}/`)}
check(fs.existsSync("public/404.html"),"Custom GitHub Pages 404 document exists");
check(notFound.includes("This page is no longer in the edit."),"Custom 404 carries Kathanika-specific recovery copy");
check(notFound.includes('href="/work/"')&&notFound.includes('href="/services/"')&&notFound.includes('href="/contact/"'),"Custom 404 links only to valid final URLs");
check(root.includes('className="v82-not-found"'),"SPA-level not-found experience is branded");
const routeSources=fs.readdirSync("src/routes").filter(f=>f.endsWith(".tsx")).map(f=>read(`src/routes/${f}`)).join("\n");
check(!/noindex/i.test(routeSources),"Indexable route source contains no accidental noindex directive");
check(!sitemap.includes("404.html"),"404 page is excluded from sitemap");
const header=read("src/components/site/SiteHeader.tsx");
const sections=read("src/components/site/sections.tsx");
check(header.includes('["About", "/about/"]')&&header.includes('["Work", "/work/"]')&&header.includes('["Business Inquiry", "/contact/"]'),"Primary navigation uses canonical trailing-slash typed routes");
check(!sections.includes('to="/contact"') && !sections.includes('to="/creators"') && !sections.includes('to: "/brands"') && !sections.includes('to: "/creators"') && !sections.includes('to: "/work"') && !sections.includes('to: "/services"'),"Section links do not retain non-canonical typed route destinations");

if(failures){console.error(`\nV84 Search Console hardening failed with ${failures} issue(s).`);process.exit(1)}
console.log("\nV84 Search Console + custom 404 verification passed.");
