// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages serves the site under /beclassy; Vercel (later) serves it at the root.
// The deploy workflow sets BASE_PATH, local dev uses '/'.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site: process.env.SITE_URL || 'https://theshy3819.github.io',
  base,
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  build: { assets: '_assets' },
});
