// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://valdersonjr.com',

  // Match the old Jekyll permalink shape: flat `/slug` (file, no trailing slash).
  // Jekyll served posts as `/conceitos-basicos` from `conceitos-basicos.html`;
  // `format: 'file'` reproduces that exactly so no existing URL breaks.
  trailingSlash: 'never',
  build: { format: 'file' },

  integrations: [mdx(), sitemap()],

  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
});
