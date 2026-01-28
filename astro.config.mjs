// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";
import vue from "@astrojs/vue";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), vue()],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: [],
      external: ['p5']
    }
  }
});