// Português na raiz (`/slug`) e inglês sob `/en` (`/en/slug`). O PT fica sem
// prefixo de propósito: as URLs antigas do Jekyll continuam valendo.

export const defaultLang = 'pt' as const;
export const languages = { pt: 'Português', en: 'English' } as const;

export type Lang = keyof typeof languages;

/** Locale do Intl e valor do atributo `lang` do <html>. */
export const locales: Record<Lang, string> = { pt: 'pt-BR', en: 'en-US' };

/**
 * Caminho da página sem o `.html` que o `build.format: 'file'` acrescenta ao
 * `Astro.url.pathname`. Sem isso `/about` chega aqui como `/about.html` e
 * quebra tanto a detecção de idioma quanto a URL canônica.
 */
export function cleanPath(url: URL): string {
  const path = url.pathname.replace(/\.html$/, '').replace(/\/+$/, '');
  return path || '/';
}

export function getLang(url: URL): Lang {
  const path = cleanPath(url);
  return path === '/en' || path.startsWith('/en/') ? 'en' : 'pt';
}

/** Prefixa um caminho da raiz com o idioma. `/about` + en -> `/en/about`. */
export function localePath(path: string, lang: Lang): string {
  const clean = path === '/' ? '' : path;
  return lang === 'en' ? `/en${clean}` : clean || '/';
}

/** Mesmo caminho no outro idioma, pro seletor do cabeçalho. */
export function switchPath(url: URL, to: Lang): string {
  const path = cleanPath(url);
  const bare = path === '/en' ? '/' : path.startsWith('/en/') ? path.slice(3) : path;
  return localePath(bare, to);
}

export const ui = {
  pt: {
    'site.name': 'valderson • notas',
    'site.description': 'Um blog para aprendizados e pensamentos.',

    'a11y.skip': 'Pular para o conteúdo',
    'a11y.brand': 'valderson, início',
    'a11y.nav': 'Navegação principal',
    'a11y.social': 'Redes',
    'a11y.theme': 'Alternar tema claro/escuro',
    'a11y.themeShort': 'Alternar tema',
    'a11y.lang': 'Ver este site em inglês',

    'nav.home': 'Início',
    'nav.archive': 'Arquivo',
    'nav.tags': 'Tags',
    'nav.about': 'Sobre',

    'home.eyebrow': 'aprendizados & pensamentos',
    'home.title': 'Um cantinho pra pensar em voz alta.',
    'home.lead':
      'Anoto aqui o que ando aprendendo, lendo e tentando entender melhor. Sem tema fixo, sem pressa.',
    'home.empty': 'Ainda não há posts por aqui, mas já já tem. 🐾',

    'archive.title': 'Arquivo',
    'archive.description': 'Todos os posts, organizados por ano.',
    'archive.eyebrow': 'arquivo',
    'archive.heading': 'Tudo, por ano.',
    'archive.count': (n: number) => `${n} ${n === 1 ? 'texto' : 'textos'} até agora.`,

    'tags.title': 'Tags',
    'tags.description': 'Posts organizados por tema.',
    'tags.eyebrow': 'tags',
    'tags.heading': 'Por tema.',

    'post.nav': 'Outros posts',
    'post.older': '← Mais antigo',
    'post.newer': 'Mais recente →',
    'post.readingTime': (n: number) => `${n} min de leitura`,
  },
  en: {
    'site.name': 'valderson • notes',
    'site.description': 'A blog for things I am learning and thinking about.',

    'a11y.skip': 'Skip to content',
    'a11y.brand': 'valderson, home',
    'a11y.nav': 'Main navigation',
    'a11y.social': 'Social',
    'a11y.theme': 'Toggle light/dark theme',
    'a11y.themeShort': 'Toggle theme',
    'a11y.lang': 'Ver este site em português',

    'nav.home': 'Home',
    'nav.archive': 'Archive',
    'nav.tags': 'Tags',
    'nav.about': 'About',

    'home.eyebrow': 'learning & thinking',
    'home.title': 'A little corner to think out loud.',
    'home.lead':
      'I write down what I am learning, reading and trying to understand better. No fixed topic, no rush.',
    'home.empty': 'No posts here yet, but they are coming. 🐾',

    'archive.title': 'Archive',
    'archive.description': 'Every post, organized by year.',
    'archive.eyebrow': 'archive',
    'archive.heading': 'Everything, by year.',
    'archive.count': (n: number) => `${n} ${n === 1 ? 'post' : 'posts'} so far.`,

    'tags.title': 'Tags',
    'tags.description': 'Posts organized by topic.',
    'tags.eyebrow': 'tags',
    'tags.heading': 'By topic.',

    'post.nav': 'More posts',
    'post.older': '← Older',
    'post.newer': 'Newer →',
    'post.readingTime': (n: number) => `${n} min read`,
  },
} as const;

export function useTranslations(lang: Lang) {
  return ui[lang];
}
