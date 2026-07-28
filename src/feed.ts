import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { excerpt } from './utils';

// Shared feed builder so /rss.xml, /feed.xml and /atom.xml (the last two kept
// alive for subscribers of the old Jekyll site) all serve the same content.
export async function buildFeed(context: APIContext) {
  const posts = (await getCollection('posts', ({ data }) => data.published !== false)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  return rss({
    title: 'valderson • notas',
    description: 'Um blog para aprendizados e pensamentos.',
    site: context.site!,
    // Pages are served without a trailing slash (flat `/slug` files), so the
    // feed links must match or readers hit a 404 on GitHub Pages.
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description ?? excerpt(post.body ?? '', 45),
      link: `/${post.id}`,
      categories: post.data.tags,
    })),
    customData: `<language>pt-BR</language>`,
  });
}
