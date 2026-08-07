// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkUnderline from './plugins/remark-underline.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://valdersonjr.com',

  // Match the old Jekyll permalink shape: flat `/slug` (file, no trailing slash).
  // Jekyll served posts as `/conceitos-basicos` from `conceitos-basicos.html`;
  // `format: 'file'` reproduces that exactly so no existing URL breaks.
  trailingSlash: 'never',
  build: { format: 'file' },

  // Portuguese stays unprefixed at the root so every existing URL keeps working;
  // English lives under `/en`.
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    mdx(),
    // Emits the hreflang alternates in the sitemap from the `/en` prefix.
    sitemap({
      i18n: {
        defaultLocale: 'pt',
        locales: { pt: 'pt-BR', en: 'en-US' },
      },
    }),
  ],

  markdown: {
    // `++texto++` -> <u>texto</u>, pro sublinhado da chave primária nos exemplos.
    remarkPlugins: [remarkUnderline],
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
});
