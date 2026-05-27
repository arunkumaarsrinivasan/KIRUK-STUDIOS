// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// kiruk-web — Astro 5 island architecture. Stack locked in openspec/specs/tech-stack/spec.md.
export default defineConfig({
  // Interim: ship under kiruk.in/studio until a dedicated domain (tech-stack spec:
  // "kiruk-web interim base path"). Internal links must respect import.meta.env.BASE_URL.
  site: 'https://kiruk.in',
  base: '/studio',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
