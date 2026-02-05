// @ts-check
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://profile.dimaportish.com",
  integrations: [sitemap(), vue(), mdx()],

  prefetch: {
    prefetchAll: true
  },

  vite: {
    plugins: [tailwindcss()],
  },

  // cloudflare is not working for cloudflare ==(())
  adapter: netlify(),
});
