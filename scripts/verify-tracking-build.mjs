import fs from "node:fs";
import path from "node:path";

const out = path.resolve(".output/public");
let failures = 0;
const check = (c, m) => c ? console.log(`PASS  ${m}`) : (console.error(`FAIL  ${m}`), failures++);
const exists = (p) => fs.existsSync(path.join(out, p));
const read = (p) => fs.readFileSync(path.join(out, p), "utf8");
const routeFile = (route) => {
  if (!route) return exists("index.html") ? "index.html" : null;
  if (exists(`${route}/index.html`)) return `${route}/index.html`;
  if (exists(`${route}.html`)) return `${route}.html`;
  return null;
};

console.log("\nKathanika Media V57 — Built Tracking Verification\n");
check(fs.existsSync(out), ".output/public production artifact exists");

const routes = ["", "about", "work", "services", "creators", "contact", "brands", "privacy", "terms"];
for (const route of routes) {
  const f = routeFile(route);
  const label = route || "home";
  check(Boolean(f), `${label} built HTML exists`);
  if (!f) continue;
  const html = read(f);
  const gtmCount = (html.match(/GTM-PZF49MGL/g) || []).length;
  const gaCount = (html.match(/G-Y94QFK4PZZ/g) || []).length;
  check(gtmCount === 2, `${label} contains GTM exactly twice (loader + noscript)`);
  check(gaCount === 2, `${label} contains GA4 exactly twice (loader + config)`);
  check(html.includes("www.googletagmanager.com/gtm.js?id=") && html.includes("GTM-PZF49MGL"), `${label} contains GTM loader`);
  check(html.includes("www.googletagmanager.com/ns.html?id=GTM-PZF49MGL"), `${label} contains GTM noscript fallback`);
  check(html.includes("https://www.googletagmanager.com/gtag/js?id=G-Y94QFK4PZZ"), `${label} contains async GA4 loader`);
  check(html.includes("gtag('config','G-Y94QFK4PZZ')"), `${label} contains GA4 configuration call`);
  const headEnd = html.indexOf("</head>");
  const bodyStart = html.indexOf("<body");
  const bodyEnd = html.indexOf("</body>");
  const gtmLoader = html.indexOf("www.googletagmanager.com/gtm.js?id=");
  const gaLoader = html.indexOf("www.googletagmanager.com/gtag/js?id=G-Y94QFK4PZZ");
  const gtmNoScript = html.indexOf("www.googletagmanager.com/ns.html?id=GTM-PZF49MGL");
  check(gtmLoader > 0 && gtmLoader < headEnd, `${label} GTM loader is inside head`);
  check(gaLoader > 0 && gaLoader < headEnd, `${label} GA4 loader is inside head`);
  check(gtmNoScript > bodyStart && gtmNoScript < bodyEnd, `${label} GTM noscript is inside body`);
  check(html.includes('rel="preconnect" href="https://www.googletagmanager.com"'), `${label} preconnects to Google Tag Manager origin`);
  check(!/GTM-(?!PZF49MGL)[A-Z0-9]+/.test(html), `${label} contains no unexpected GTM container ID`);
  check(!/G-(?!Y94QFK4PZZ)[A-Z0-9]{8,}/.test(html), `${label} contains no unexpected GA4 measurement ID`);
}

if (failures) {
  console.error(`\nV57 built tracking verification failed with ${failures} issue(s).`);
  process.exit(1);
}
console.log("\nV57 built tracking verification passed.");
