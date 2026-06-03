// @ts-check
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { build } from 'velite';

// Run Velite (content/devlogs → .velite/) before Astro reads it. Watches in dev.
let veliteStarted = false;
function velite() {
  return {
    name: 'velite-integration',
    hooks: {
      'astro:config:setup': async (/** @type {{ command: string }} */ { command }) => {
        if (veliteStarted) return;
        veliteStarted = true;
        await build({ watch: command === 'dev', clean: true });
      },
    },
  };
}

// kiruk-web — Astro 5 island architecture. Stack locked in openspec/specs/tech-stack/spec.md.
export default defineConfig({
  // Interim: ship under kiruk.in/studio until a dedicated domain (tech-stack spec:
  // "kiruk-web interim base path"). Internal links must respect import.meta.env.BASE_URL.
  site: 'https://kiruk.in',
  base: '/studio',
  integrations: [react(), velite()],
  vite: {
    plugins: [tailwindcss()],
  },
});
