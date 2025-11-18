// @ts-check
import { defineConfig,envField  } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      EMAIL_SERVICE_ID: envField.string({ context: "client", access: "public"}),
      EMAIL_TEMPLATE_ID: envField.string({ context: "client", access: "public"}),
      EMAIL_PUBLIC_KEY: envField.string({ context: "client", access: "public"}),
    }
  },

  vite: {
    plugins: [tailwindcss()]
  }
});