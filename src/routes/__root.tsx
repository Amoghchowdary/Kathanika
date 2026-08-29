import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { ContentProvider } from "../content/store";
import { withBasePath } from "../lib/base-path";
import { absoluteSiteUrl } from "../lib/seo";


const CRITICAL_CSS = `
:root{--background:#8a5f41;--foreground:#f3e4c9;--foreground-readable:#f8ebd7;--line:#a77f60;--accent:#ccd67f;--card-bg:#f3e5ca;--card-text:#4a2f20}
*{box-sizing:border-box}html,body{margin:0;min-width:320px;background:var(--background);color:var(--foreground)}body{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;-webkit-font-smoothing:antialiased}a{color:inherit;text-decoration:none}img{display:block;max-width:100%;height:auto}.v41-shell{min-height:100vh;background:var(--background);overflow:clip}
.v41-header{position:fixed;z-index:80;inset:0 0 auto;height:94px;display:grid;grid-template-columns:210px 1fr auto;align-items:center;gap:24px;padding:12px clamp(20px,3.2vw,56px);background:transparent;border-bottom:2px solid transparent}.v41-brand{width:188px;height:58px;display:flex;align-items:center}.v41-brand picture{display:block;width:100%}.v41-brand img{width:100%;max-height:54px;object-fit:contain;object-position:left center}.v41-desktop-nav{display:flex;justify-content:flex-end;align-items:center;gap:clamp(18px,2.1vw,38px)}.v41-desktop-nav a{padding:10px 0 8px;color:var(--foreground-readable);font-size:clamp(12px,.95vw,16px);white-space:nowrap}.v41-menu-button{display:none;width:46px;height:46px;place-items:center;border-radius:50%;border:1px solid var(--line);background:transparent;color:var(--foreground-readable)}
.v41-mobile-menu{display:none}.v41-hero{position:relative;height:100svh;min-height:680px;max-height:1080px;overflow:hidden;border-bottom:2px solid var(--line)}.v41-hero-track{display:flex;width:100%;height:100%;transition:transform .85s cubic-bezier(.22,.72,.18,1)}.v41-hero-slide{position:relative;flex:0 0 100%;width:100%;min-width:100%;max-width:100%;height:100%;overflow:hidden}.v48-hero-layout{position:relative;z-index:2;width:100%;height:100%;display:grid;grid-template-columns:minmax(0,1.02fr) minmax(420px,.98fr);gap:clamp(34px,5vw,90px);align-items:center;padding:118px clamp(32px,5.5vw,92px) 84px}.v48-hero-copy{min-width:0}.v41-hero-eyebrow{display:flex;gap:16px;margin-bottom:18px;color:var(--foreground-readable);font-size:10px;text-transform:uppercase;letter-spacing:.15em}.v48-hero-copy h1{width:100%;max-width:840px;margin:0;font-size:clamp(54px,4.7vw,90px);line-height:.98;letter-spacing:-.055em;font-weight:700;text-wrap:balance;overflow-wrap:normal;word-break:normal}.v48-hero-copy>p{width:min(100%,560px);margin:28px 0 0;color:var(--foreground-readable);font-size:clamp(15px,1vw,18px);line-height:1.65}.v48-hero-media{position:relative;width:100%;height:min(64vh,620px);min-height:470px;isolation:isolate}.v48-hero-media-card{position:absolute;margin:0;overflow:hidden;border:2px solid var(--accent);border-radius:18px;background:var(--card-bg)}.v48-hero-media-card img{width:100%;height:100%;object-fit:cover}.v48-hero-media-card figcaption{position:absolute;left:12px;bottom:12px;max-width:calc(100% - 24px);padding:8px 11px;border-radius:999px;background:var(--card-bg);color:var(--card-text);font-size:10px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.v48-hero-media-card.card-1{z-index:4;width:72%;aspect-ratio:16/10;right:2%;top:5%;transform:rotate(2deg)}.v48-hero-media-card.card-2{z-index:5;width:56%;aspect-ratio:16/10;left:0;bottom:8%;transform:rotate(-4deg)}.v48-hero-media-card.card-3{z-index:6;width:44%;aspect-ratio:16/10;right:5%;bottom:0;transform:rotate(5deg)}.v41-hero-progress{position:absolute;z-index:9;left:clamp(22px,5.5vw,92px);right:clamp(22px,5.5vw,92px);bottom:28px;display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.v41-hero-progress>span{height:2px;background:var(--line);overflow:hidden}.v41-hero-progress i{display:block;height:100%;background:var(--accent)}
@media(max-width:1240px){.v41-desktop-nav{display:none}.v41-menu-button{display:grid}.v41-header{grid-template-columns:minmax(150px,188px) 1fr auto}.v48-hero-layout{grid-template-columns:minmax(0,.92fr) minmax(360px,1.08fr);gap:30px}.v48-hero-copy h1{font-size:clamp(50px,6.4vw,78px)}}
@media(max-width:900px){.v41-header{height:78px;padding:10px 18px;grid-template-columns:1fr auto}.v41-brand{width:140px;height:52px}.v41-brand img{max-height:48px}.v41-hero{min-height:900px;height:auto}.v48-hero-layout{min-height:900px;grid-template-columns:1fr;align-content:center;gap:34px;padding:118px 18px 76px}.v48-hero-copy h1{max-width:760px;font-size:clamp(48px,8.4vw,72px)}.v48-hero-media{width:min(100%,680px);height:390px;min-height:390px;justify-self:center}}
@media(max-width:640px){.v41-header{height:74px;padding:10px 16px}.v41-brand{width:136px;height:50px}.v41-brand img{max-height:46px}.v41-hero{min-height:790px}.v48-hero-layout{min-height:790px;padding:102px 18px 72px;gap:28px}.v48-hero-copy h1{font-size:clamp(40px,12.2vw,56px);line-height:1}.v48-hero-copy>p{font-size:14px}.v48-hero-media{height:285px;min-height:285px}.v48-hero-media-card.card-1{width:94%;right:3%;top:3%;transform:none}.v48-hero-media-card.card-2,.v48-hero-media-card.card-3{display:none}.v41-hero-progress{left:18px;right:18px;bottom:22px}}
`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href={withBasePath("/")}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<Record<string, never>>()({
  head: () => {
    const googleVerification = import.meta.env["VITE_GOOGLE_SITE_VERIFICATION"]?.trim();
    return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kathanika Media — Building the next generation of media" },
      {
        name: "description",
        content:
          "Kathanika Media builds new-age content IPs, communities and distribution ecosystems across Telugu and English.",
      },
      { name: "author", content: "Kathanika Media" },
      { name: "application-name", content: "Kathanika Media" },
      { name: "theme-color", content: "#8A5F41" },
      { name: "format-detection", content: "telephone=no" },
      { name: "geo.region", content: "IN-TG" },
      { name: "geo.placename", content: "Hyderabad" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "keywords", content: "Kathanika Media, podcast production Hyderabad, content IP development, YouTube production, media incubation, Telugu podcasts, content strategy" },
      { property: "og:title", content: "Kathanika Media — Building the next generation of media" },
      {
        property: "og:description",
        content:
          "Kathanika Media builds new-age content IPs, communities and distribution ecosystems across Telugu and English.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Kathanika Media" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:image", content: absoluteSiteUrl("og/kathanika-og.jpg") },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: absoluteSiteUrl("og/kathanika-og.jpg") },
      ...(googleVerification ? [{ name: "google-site-verification", content: googleVerification }] : []),
    ],
    links: [
      { rel: "icon", href: withBasePath("/favicon.png"), type: "image/png" },
      { rel: "manifest", href: withBasePath("/site.webmanifest") },
    ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${absoluteSiteUrl("/")}#organization`,
        name: "Kathanika Media",
        url: absoluteSiteUrl("/"),
        logo: absoluteSiteUrl("kathanika-logo-original.png"),
        image: absoluteSiteUrl("og/kathanika-og.jpg"),
        description: "Kathanika Media builds new-age content IPs, production systems and audience-led media properties across Telugu and English.",
        email: "kathanikamedia@gmail.com",
        telephone: "+91 90638 54291",
        sameAs: [
          "https://www.youtube.com/@kathanikamedia",
          "https://www.instagram.com/kathanikamedia/",
          "https://www.linkedin.com/company/kathanikamedia/",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91 90638 54291",
          contactType: "business inquiries",
          areaServed: "IN",
          availableLanguage: ["English", "Telugu"],
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "3rd Floor, Opp. Swathi Multi-speciality, Road No. 10, Gouri Shankar Nagar Colony, Banjara Hills",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          postalCode: "500034",
          addressCountry: "IN",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${absoluteSiteUrl("/")}#website`,
        url: absoluteSiteUrl("/"),
        name: "Kathanika Media",
        description: "Original content IPs, production, distribution and media incubation from Hyderabad.",
        inLanguage: "en-IN",
        publisher: { "@id": `${absoluteSiteUrl("/")}#organization` },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <style id="kathanika-critical-css" dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }} />
        <link id="kathanika-app-css" rel="stylesheet" href={appCss} media="print" />
        <script
          id="kathanika-css-loader"
          dangerouslySetInnerHTML={{
            __html: "(function(){var l=document.getElementById('kathanika-app-css');if(!l)return;var done=function(){l.media='all';};if(l.sheet){done();return;}l.addEventListener('load',done,{once:true});setTimeout(done,3000);}());",
          }}
        />
        <noscript><link rel="stylesheet" href={appCss} /></noscript>
        <link
          rel="preload"
          as="image"
          href={withBasePath("/media/production/responsive/IMG_4711-1024.avif")}
          imageSrcSet={`${withBasePath("/media/production/responsive/IMG_4711-480.avif")} 480w, ${withBasePath("/media/production/responsive/IMG_4711-800.avif")} 800w, ${withBasePath("/media/production/responsive/IMG_4711-960.avif")} 960w, ${withBasePath("/media/production/responsive/IMG_4711-1024.avif")} 1024w, ${withBasePath("/media/production/responsive/IMG_4711-1280.avif")} 1280w`}
          imageSizes="(max-width: 640px) 86vw, (max-width: 1100px) 620px, 38vw"
          type="image/avif"
          fetchPriority="high"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ContentProvider>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </ContentProvider>
  );
}
