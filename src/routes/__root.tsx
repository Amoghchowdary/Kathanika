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
      {
        rel: "stylesheet",
        href: appCss,
      },
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
        <link
          rel="preload"
          as="image"
          href={withBasePath("/media/production/responsive/IMG_4711-1024.avif")}
          imageSrcSet={`${withBasePath("/media/production/responsive/IMG_4711-480.avif")} 480w, ${withBasePath("/media/production/responsive/IMG_4711-960.avif")} 960w, ${withBasePath("/media/production/responsive/IMG_4711-1024.avif")} 1024w, ${withBasePath("/media/production/responsive/IMG_4711-1280.avif")} 1280w`}
          imageSizes="(max-width: 640px) 88vw, (max-width: 1100px) 640px, 38vw"
          type="image/avif"
          fetchPriority="high"
        />
        <script
          id="kathanika-font-loader"
          dangerouslySetInnerHTML={{
            __html: "(function(){var add=function(){if(document.getElementById('kathanika-font-css'))return;var l=document.createElement('link');l.id='kathanika-font-css';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@500;600;700&display=swap';document.head.appendChild(l);};var later=function(){setTimeout(add,250);};if(document.readyState==='complete'){later();}else{window.addEventListener('load',later,{once:true});}})();",
          }}
        />
        <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@500;600;700&display=swap" /></noscript>
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
