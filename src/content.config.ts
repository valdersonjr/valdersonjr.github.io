import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Posts live as flat Markdown files whose filename is the URL slug
// (e.g. `conceitos-basicos.md` -> /conceitos-basicos), preserving the
// old Jekyll `permalink: /:title`.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    published: z.boolean().default(true),
    tags: z.array(z.string()).default([]),
    // Pages CMS writes `description: ''` when left blank; treat empty/whitespace
    // as absent so consumers fall back to an auto-generated excerpt.
    description: z
      .string()
      .optional()
      .transform((v) => (v && v.trim() ? v : undefined)),
  }),
});

export const collections = { posts };
