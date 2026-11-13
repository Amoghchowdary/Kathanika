import fs from "node:fs";
const read=(p)=>fs.readFileSync(p,"utf8"); const exists=(p)=>fs.existsSync(p); let failures=0;
const check=(ok,label)=>{console.log(`${ok?"PASS":"FAIL"}  ${label}`); if(!ok) failures+=1;};
console.log("\nKathanika Media V77 — Navigation + Product-Intent SEO Exit Control\n");
const header=read("src/components/site/SiteHeader.tsx");
check(header.includes('import { Link } from "@tanstack/react-router"'),"Header uses TanStack Router Link for route-native active state");
check(!header.includes("useRouterState") && !header.includes("currentPath") && !header.includes("window.location.pathname"),"No stale pathname-derived navigation state remains");
check((header.match(/activeOptions=\{\{ exact: true \}\}/g)||[]).length>=2,"Desktop and mobile links use exact active matching");
check((header.match(/activeProps=\{\{ className: "is-active", "aria-current": "page" \}\}/g)||[]).length>=2,"Desktop and mobile links expose active class and aria-current");
for(const [label,path] of [["Home","/"],["About","/about"],["Work","/work"],["Services","/services"],["Courses","/courses"],["Career Inquiry","/creators"],["Business Inquiry","/contact"]]){check(header.includes(`["${label}", "${path}"]`),`${label} route is mapped to ${path}`);}
const serviceRoutes=[["podcast-as-a-service","Podcast as a Service in Hyderabad","Podcast production and podcast-as-a-service"],["content-production","Content Production Company in Hyderabad","Content production, video production"],["ip-building","Content IP Building","Content IP development and brand-owned media"]];
const routeTree=read("src/routeTree.gen.ts"); const services=read("src/routes/services.tsx");
for(const [slug,titleNeedle,serviceType] of serviceRoutes){const file=`src/routes/${slug}.tsx`;check(exists(file),`${slug} landing page exists`);const source=read(file);check(source.includes(titleNeedle),`${slug} has search-intent title metadata`);check(source.includes(serviceType),`${slug} declares truthful Service schema/service type`);check(routeTree.includes(`'/${slug}'`),`${slug} is registered in the route tree`);check(services.includes(`/${slug}`),`${slug} receives internal links from Services`);}
const root=read("src/routes/__root.tsx");check(root.includes('"ProfessionalService"'),"Organization schema includes local professional-service context");check(root.includes("areaServed")&&root.includes("Hyderabad")&&root.includes("Telangana"),"Local structured data declares Hyderabad/Telangana service area");
const courses=read("src/routes/courses.tsx");check(courses.includes('"@type": "Course"'),"Courses page includes Course structured data");check(courses.includes('price: "5000"')&&courses.includes('priceCurrency: "INR"'),"Course schema matches ₹5,000 fee");
const sitemap=read("public/sitemap.xml");for(const path of ["podcast-as-a-service","content-production","ip-building","courses"]){check(sitemap.includes(`https://www.kathanika.in/${path}`),`Sitemap contains /${path}`)}
const seo=read("src/lib/seo.ts");check(seo.includes('rel: "canonical"'),"Canonical links remain enabled");check(seo.includes("index, follow"),"Index/follow directives remain enabled");
if(failures){console.error(`\nV77 navigation + SEO exit control failed with ${failures} issue(s).`);process.exit(1)} console.log("\nV77 navigation + SEO exit control passed.");
