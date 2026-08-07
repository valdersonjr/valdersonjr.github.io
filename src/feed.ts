import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { excerpt } from './utils';
import { getPosts, postPath } from './posts';
import { locales, ui, type Lang } from './i18n';

// Shared feed builder so /rss.xml, /feed.xml and /atom.xml (the last two kept
// alive for subscribers of the old Jekyll site) all serve the same content.
// Each language gets its own feed: /rss.xml is Portuguese, /en/rss.xml English,
// so nobody starts receiving posts in a language they did not subscribe to.
export async function buildFeed(context: APIContext, lang: Lang = 'pt') {
  const posts = await getPosts(lang);
  const t = ui[lang];

  return rss({
    title: t['site.name'],
    description: t['site.description'],
    site: context.site!,
    // Pages are served without a trailing slash (flat `/slug` files), so the
    // feed links must match or readers hit a 404 on GitHub Pages.
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description ?? excerpt(post.body ?? '', 45),
      link: postPath(post.id, lang),
      categories: post.data.tags,
    })),
    customData: `<language>${locales[lang]}</language>`,
  });
}
