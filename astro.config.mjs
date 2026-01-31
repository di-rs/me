// @ts-check
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://profile.dimaportish.com",
  integrations: [sitemap(), vue()],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});
