# valderson • notas

Blog pessoal de aprendizados e pensamentos. Site em
**[valdersonjr.com](https://valdersonjr.com)**.

Feito com [Astro](https://astro.build): conteúdo em Markdown, zero JavaScript
por padrão, tema claro/escuro, RSS, sitemap e imagens otimizadas. Hospedado de
graça no GitHub Pages via GitHub Actions.

## Rodando localmente

Requer Node 20+ (veja `.nvmrc`).

```bash
npm install      # instala dependências
npm run dev      # http://localhost:4321
npm run build    # gera o site estático em dist/
npm run preview  # serve o build de produção localmente
```

## Estrutura

```
src/
  content/posts/     # os posts em português, um .md por artigo (o arquivo é a URL)
  content/en/        # as versões em inglês, servidas em /en/<slug>
  content.config.ts  # schema/validação do frontmatter das duas coleções
  i18n.ts            # strings da interface em PT e EN
  posts.ts           # leitura dos posts por idioma e o par PT<->EN
  pages/             # rotas em português (index, [slug], about, archive, tags, 404, feeds)
  pages/en/          # as mesmas rotas em inglês
  layouts/           # BaseLayout
  components/        # Header, Footer, BaseHead, ThemeToggle, PostCard
                     # + HomePage/ArchivePage/TagsPage/PostPage, compartilhados
                     #   pelos dois idiomas via prop `lang`
  styles/global.css  # design system (tokens, tipografia, claro/escuro)
public/              # arquivos servidos como estão (CNAME, favicon, ícones, imagens)
```

## Idiomas

O português fica na raiz (`/meu-post`) e o inglês sob `/en` (`/en/my-post`). O PT
não tem prefixo de propósito: as URLs antigas continuam valendo.

Os posts são escritos **só em português**. A versão em inglês é derivada: depois de
publicar o post em PT, rode no Claude Code

```
/traduzir <slug-do-post>
```

que gera `src/content/en/<slug-em-ingles>.md` já com o campo que liga as duas
versões:

```yaml
translationOf: normalizacao-ate-fnbc-e-quando-desnormalizar-de-proposito
```

É esse campo que alimenta o seletor de idioma do menu e as tags `hreflang`. Sem
ele o post em inglês continua funcionando, só fica sem par. As regras da tradução
(tom, o que não traduzir, o que nunca acrescentar) ficam em
`.claude/skills/traduzir/SKILL.md`.

O Pages CMS também lista a coleção **Posts (EN)** — serve pra corrigir uma frase
pelo navegador, não pra escrever do zero. Cada idioma tem seu próprio feed
(`/rss.xml` e `/en/rss.xml`), então ninguém passa a receber posts num idioma que
não assinou.

## Publicando pelo navegador (Pages CMS)

Jeito recomendado, 100% no navegador e sem terminal:

1. Tenha este repositório no GitHub (incluindo o `.pages.yml` da raiz).
2. Abra **[app.pagescms.org](https://app.pagescms.org)**, entre com o GitHub e
   autorize o acesso ao repositório `valdersonjr.github.io`.
3. Em **Posts → novo**, preencha título/data/tags, faça upload de imagens e
   escreva no editor. Ao salvar, o Pages CMS faz o commit do `.md` no repo e o
   GitHub Actions publica o site sozinho.

O modelo de conteúdo (campos e onde as imagens são salvas) fica no `.pages.yml`.

## Escrevendo um post (manual, opcional)

Crie `src/content/posts/meu-post.md`. O **nome do arquivo vira a URL**
(`/meu-post`). Frontmatter:

```yaml
---
title: 'Título do post'
date: 2026-02-10 09:00:00 -0300
tags: [Financeiro]
published: true          # opcional (padrão: true)
description: 'Resumo'    # opcional; se ausente, é gerado do texto
---
```

Para linkar outro post, use o caminho da URL dele: `[texto](/outro-post)`.

## Deploy

O deploy é automático: todo push na `master` dispara o workflow
`.github/workflows/deploy.yml`, que builda e publica no GitHub Pages.

> **Uma vez só:** em *Settings → Pages → Build and deployment → Source*,
> selecione **GitHub Actions**. O domínio (`valdersonjr.com`) é mantido pelo
> arquivo `public/CNAME`.
