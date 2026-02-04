// @ts-check
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://profile.dimaportish.com",
  integrations: [sitemap(), vue(), mdx()],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});
