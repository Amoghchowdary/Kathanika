import fs from "node:fs";

const source = fs.readFileSync("src/routes/__root.tsx", "utf8");
let failures = 0;
const check = (condition, label) => {
  if (condition) console.log(`PASS  ${label}`);
  else { console.error(`FAIL  ${label}`); failures += 1; }
};

console.log("\nKathanika Media V55 — Google Tag Manager Verification\n");
check(source.includes("GTM-PZF49MGL"), "GTM container ID is present");
check(source.includes("www.googletagmanager.com/gtm.js?id="), "GTM loader is present in document head");
check(source.includes("www.googletagmanager.com/ns.html?id=GTM-PZF49MGL"), "GTM noscript iframe is present");
check(source.indexOf('id="google-tag-manager"') < source.indexOf('id="kathanika-critical-css"'), "GTM loader appears before critical application resources");
check(source.indexOf('<body>') < source.indexOf('www.googletagmanager.com/ns.html?id=GTM-PZF49MGL'), "GTM noscript iframe is inside body");
check((source.match(/GTM-PZF49MGL/g) || []).length === 2, "GTM container is included exactly twice (script + noscript)");

if (failures) {
  console.error(`\nV55 GTM verification failed with ${failures} issue(s).`);
  process.exit(1);
}
console.log("\nV55 GTM verification passed.");
