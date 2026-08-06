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
  content/posts/     # os posts, um .md por artigo (o nome do arquivo é a URL)
  content.config.ts  # schema/validação do frontmatter dos posts
  pages/             # rotas (index, [slug], about, archive, tags, 404, feeds)
  layouts/           # BaseLayout
  components/        # Header, Footer, BaseHead, PostCard, ThemeToggle
  styles/global.css  # design system (tokens, tipografia, claro/escuro)
public/              # arquivos servidos como estão (CNAME, favicon, ícones, imagens)
```

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
