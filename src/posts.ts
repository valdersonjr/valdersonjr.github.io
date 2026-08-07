import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './i18n';

export type Post = CollectionEntry<'posts'> | CollectionEntry<'postsEn'>;

/** Posts publicados de um idioma, do mais novo pro mais antigo. */
export async function getPosts(lang: Lang): Promise<Post[]> {
  const entries =
    lang === 'en'
      ? await getCollection('postsEn', ({ data }) => data.published !== false)
      : await getCollection('posts', ({ data }) => data.published !== false);

  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** URL de um post. O slug é o nome do arquivo; o idioma vira prefixo. */
export function postPath(id: string, lang: Lang): string {
  return lang === 'en' ? `/en/${id}` : `/${id}`;
}

/**
 * Par PT<->EN de um post, pros links `hreflang` e pro seletor de idioma.
 * O vínculo mora só no lado inglês (`translationOf: <slug-pt>`), porque os
 * slugs mudam junto com o título traduzido.
 */
export async function getAlternate(post: Post, lang: Lang): Promise<string | null> {
  if (lang === 'en') {
    const ptSlug = (post.data as { translationOf?: string }).translationOf;
    if (!ptSlug) return null;
    const pt = await getPosts('pt');
    return pt.some((p) => p.id === ptSlug) ? postPath(ptSlug, 'pt') : null;
  }

  const en = await getPosts('en');
  const match = en.find((e) => (e.data as { translationOf?: string }).translationOf === post.id);
  return match ? postPath(match.id, 'en') : null;
}
