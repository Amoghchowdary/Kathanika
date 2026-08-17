import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig, loadEnv } from "vite";

function normalizeBase(value: string | undefined): string {
  const raw = (value || "/").trim();
  if (!raw || raw === "/") return "/";
  return `/${raw.replace(/^\/+|\/+$/g, "")}/`;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = normalizeBase(process.env["VITE_SITE_BASE"] || env["VITE_SITE_BASE"]);

  return {
    base,
    resolve: {
      // Vite 8 supports tsconfig path resolution natively.
      tsconfigPaths: true,
    },
    plugins: [
      tailwindcss(),
      tanstackStart({
        prerender: {
          enabled: true,
          autoStaticPathsDiscovery: true,
          crawlLinks: true,
          retryCount: 2,
          retryDelay: 500,
          failOnError: true,
        },
      }),
      nitro(),
      viteReact(),
    ],
  };
});
