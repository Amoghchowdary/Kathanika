import fs from "node:fs";

const source = fs.readFileSync("src/routes/__root.tsx", "utf8");
let failures = 0;
const check = (condition, label) => condition ? console.log(`PASS  ${label}`) : (console.error(`FAIL  ${label}`), failures++);
const idx = (s) => source.indexOf(s);

console.log("\nKathanika Media V57 — Google Tag Manager Verification\n");
check(source.includes("GTM-PZF49MGL"), "GTM container ID is present");
check(source.includes("www.googletagmanager.com/gtm.js?id="), "Standard GTM loader is present");
check(source.includes("www.googletagmanager.com/ns.html?id=GTM-PZF49MGL"), "GTM noscript iframe is present");
check((source.match(/GTM-PZF49MGL/g) || []).length === 2, "GTM ID occurs exactly twice (loader + noscript)");
check(!/GTM-(?!PZF49MGL)[A-Z0-9]+/.test(source), "No unexpected GTM container ID is present");
check(idx('id="google-tag-manager"') > idx("<head>"), "GTM loader is declared inside head");
check(idx('id="google-tag-manager"') < idx('id="kathanika-critical-css"'), "GTM loader appears before critical application resources");
check(idx("www.googletagmanager.com/ns.html?id=GTM-PZF49MGL") > idx("<body>"), "GTM noscript iframe is inside body");
check(source.includes('rel="preconnect" href="https://www.googletagmanager.com"'), "Tracking origin preconnect is configured");
check(source.includes("(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});"), "Standard GTM bootstrap logic remains intact");

if (failures) {
  console.error(`\nV57 GTM verification failed with ${failures} issue(s).`);
  process.exit(1);
}
console.log("\nV57 GTM verification passed.");
