import fs from "node:fs";
import path from "node:path";

const mode = process.argv[2] || "github-pages";
const root = process.cwd();
const envPath = path.join(root, `.env.${mode}`);

function parseEnv(file) {
  if (!fs.existsSync(file)) return {};
  return Object.fromEntries(
    fs.readFileSync(file, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const i = line.indexOf("=");
        return [line.slice(0, i), line.slice(i + 1)];
      }),
  );
}

const env = parseEnv(envPath);
const rawSite = process.env.VITE_PUBLIC_SITE_URL || env.VITE_PUBLIC_SITE_URL || "https://www.kathanika.in/";
const site = rawSite.endsWith("/") ? rawSite : `${rawSite}/`;
const today = new Date().toISOString().slice(0, 10);

const routes = [
  { path: "", priority: "1.0", images: ["media/production/responsive/IMG_4711-1280.webp"] },
  { path: "about", priority: "0.9", images: ["media/production/responsive/IMG_20260722_204442-1280.webp", "media/production/responsive/IMG_5530-960.webp"] },
  { path: "work", priority: "0.9", images: ["media/production/responsive/IMG_5147-1280.webp", "media/production/responsive/IMG_4711-960.webp"] },
  { path: "services", priority: "0.9", images: [] },
  { path: "creators", priority: "0.8", images: [] },
  { path: "contact", priority: "0.8", images: [] },
  { path: "brands", priority: "0.8", images: [] },
  { path: "privacy", priority: "0.3", images: [] },
  { path: "terms", priority: "0.3", images: [] },
];

const xmlUrls = routes.map(({ path: route, priority, images }) => {
  const imageXml = images.map((image) => `\n    <image:image>\n      <image:loc>${new URL(image, site).toString()}</image:loc>\n    </image:image>`).join("");
  return `  <url>\n    <loc>${new URL(route, site).toString()}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>${imageXml}\n  </url>`;
}).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${xmlUrls}\n</urlset>\n`;
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap.xml", site).toString()}\n`;
const yaml = `# Human-readable sitemap manifest. Search engines use sitemap.xml.\nsite: ${site}\nlast_modified: ${today}\nroutes:\n${routes.map(({ path: route }) => `  - ${new URL(route, site).toString()}`).join("\n")}\n`;

fs.mkdirSync(path.join(root, "public"), { recursive: true });
fs.writeFileSync(path.join(root, "public", "sitemap.xml"), xml);
fs.writeFileSync(path.join(root, "public", "robots.txt"), robots);
fs.writeFileSync(path.join(root, "public", "sitemap.yml"), yaml);

console.log(`SEO files generated for ${site}`);
