import fs from "node:fs";

const source = fs.readFileSync("src/routes/__root.tsx", "utf8");
let failures = 0;
const check = (condition, message) => condition ? console.log(`PASS  ${message}`) : (console.error(`FAIL  ${message}`), failures++);
const idx = (s) => source.indexOf(s);

console.log("\nKathanika Media V57 — Google Analytics 4 Verification\n");
check(source.includes("G-Y94QFK4PZZ"), "GA4 measurement ID is present");
check(source.includes("https://www.googletagmanager.com/gtag/js?id=G-Y94QFK4PZZ"), "gtag.js loader is present");
check(source.includes("async"), "GA4 loader remains asynchronous");
check(source.includes("window.dataLayer=window.dataLayer||[]"), "GA4 dataLayer initialization is present");
check(source.includes("function gtag(){dataLayer.push(arguments);}"), "gtag helper is present");
check(source.includes("gtag('js',new Date())"), "GA4 initialization event is present");
check(source.includes("gtag('config','G-Y94QFK4PZZ')"), "GA4 configuration call is present");
check((source.match(/G-Y94QFK4PZZ/g) || []).length === 2, "GA4 ID occurs exactly twice (loader + config)");
check(!/G-(?!Y94QFK4PZZ)[A-Z0-9]{8,}/.test(source), "No unexpected GA4 measurement ID is present");
check(idx("www.googletagmanager.com/gtag/js?id=G-Y94QFK4PZZ") > idx("<head>"), "GA4 loader is declared inside head");
check(idx("www.googletagmanager.com/gtag/js?id=G-Y94QFK4PZZ") < idx("kathanika-critical-css"), "GA4 loads before critical application resources");
check(idx('id="google-tag-manager"') < idx("www.googletagmanager.com/gtag/js?id=G-Y94QFK4PZZ"), "GTM and direct GA4 tags have deterministic ordering");

if (failures) {
  console.error(`\nV57 GA4 verification failed with ${failures} issue(s).`);
  process.exit(1);
}
console.log("\nV57 Google Analytics 4 verification passed.");
