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
console.log("\nKathanika Media V85 — Search Console + Custom 404 Exit Control\n");
check(pkg.name==="kathanika-media-v85-seo-growth"&&pkg.version==="85.0.0","V85 package identity/version are correct");
check(read("VERSION.txt").trim()==="85.0.0","VERSION.txt matches V85");
check(router.includes('trailingSlash: "always"'),"Router standardizes public routes to trailing-slash URLs");
check(seo.includes("canonicalPageUrl")&&seo.includes('`${withoutEdges}/`'),"Canonical URLs standardize page paths with trailing slashes");
check(gen.includes("function pageUrl(route)")&&gen.includes('`${clean}/`'),"SEO generator emits final trailing-slash page URLs");
for(const path of ["about","work","services","courses","creators","contact","brands","media-company-hyderabad","podcast-as-a-service","content-as-a-service","content-production","youtube-as-a-service","reels-as-a-service","social-media-management","personal-branding","ip-building"]){check(sitemap.includes(`https://www.kathanika.in/${path}/`),`Sitemap uses final URL for /${path}/`)}
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

const serviceLanding=read("src/components/site/ServiceSeoLanding.tsx");
const servicesPage=read("src/routes/services.tsx");
const home=read("src/routes/index.tsx");
const newSeoRoutes=[
  ["media-company-hyderabad.tsx","Media & Content Production Company in Hyderabad"],
  ["content-as-a-service.tsx","Content as a Service in Hyderabad"],
  ["youtube-as-a-service.tsx","YouTube as a Service in Hyderabad"],
  ["reels-as-a-service.tsx","Reels as a Service"],
  ["social-media-management.tsx","Social Media Management in Hyderabad"],
  ["personal-branding.tsx","Personal Branding for Founders & CEOs in Hyderabad"],
];
for(const [file,phrase] of newSeoRoutes){const source=read(`src/routes/${file}`);check(source.includes("seoHead(")&&source.includes(phrase),`${file} has dedicated product/geographic search-intent metadata`)}
check(root.includes("OfferCatalog")&&root.includes("Content as a Service")&&root.includes("Personal Branding"),"Organization schema includes the expanded service offer catalog");
check(home.includes("v85-home-search-cluster")&&home.includes("/media-company-hyderabad/")&&home.includes("/podcast-as-a-service/"),"Homepage exposes crawlable product and Hyderabad intent links");
check(servicesPage.includes("/content-as-a-service/")&&servicesPage.includes("/youtube-as-a-service/")&&servicesPage.includes("/social-media-management/"),"Services hub links the expanded product-intent cluster");
check(serviceLanding.includes("v85-service-proof")&&serviceLanding.includes("3 Cr+")&&serviceLanding.includes("Hyderabad"),"Service landing pages include proof and local context for deeper engagement");
check(serviceLanding.includes("FAQPage")&&serviceLanding.includes("acceptedAnswer"),"Visible service FAQs are mirrored into structured FAQ data");
check(serviceLanding.includes("/work/")&&serviceLanding.includes("v85-service-actions"),"Service pages give users a proof-first path to Work before inquiry");

if(failures){console.error(`\nV85 SEO growth hardening failed with ${failures} issue(s).`);process.exit(1)}
console.log("\nV85 geographic + product SEO growth verification passed.");
