// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import tailwindcss from '@tailwindcss/vite';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      VITE_EMAIL_SERVICE_ID: envField.string({ context: "client", access: "public" }),
      VITE_EMAIL_TEMPLATE_ID: envField.string({ context: "client", access: "public" }),
      VITE_EMAIL_PUBLIC_KEY: envField.string({ context: "client", access: "public" }),
    }
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(),sitemap()],

  site: "https://tanmoymondal.pages.dev",
});