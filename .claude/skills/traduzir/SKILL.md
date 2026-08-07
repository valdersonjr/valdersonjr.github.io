---
name: traduzir
description: Traduz um post do blog de português para inglês, gerando src/content/en/<slug>.md com o translationOf certo. Use quando o usuário pedir pra traduzir um post, publicar em inglês, ou rodar /traduzir [slug].
---

# Traduzir um post pro inglês

O autor escreve **só em português**. O inglês é sempre derivado, gerado aqui.
Nunca peça pra ele escrever em inglês, e nunca edite o arquivo em português.

## Qual post

O argumento pode ser o slug (`normalizacao-ate-fnbc-...`), um pedaço do título, ou vir vazio.

- Com argumento: case ele contra os arquivos de `src/content/posts/`.
- Sem argumento: liste os posts de `src/content/posts/` que **ainda não têm** tradução
  (nenhum arquivo em `src/content/en/` com `translationOf` apontando pra eles) e traduza
  o mais recente. Se houver mais de um, mostre a lista e pergunte.

## O arquivo de saída

`src/content/en/<slug-em-ingles>.md`, onde o slug vem do título traduzido em
kebab-case, só ASCII. O nome do arquivo **é a URL** (`/en/<slug>`).

Frontmatter:

```yaml
title: <título traduzido>
date: <mesma data do post em PT, sem alterar>
tags:
  - <tags traduzidas>
description: <descrição traduzida; se o PT não tiver, deixe de fora>
published: <mesmo valor do PT>
translationOf: <nome do arquivo em PT, sem o .md>
```

`translationOf` é obrigatório — é o que liga as duas versões no seletor de idioma
do menu e nas tags `hreflang`. Sem ele o post fica órfão.

Antes de inventar uma tag nova, veja as que já existem em `src/content/en/` e
reuse, pra `/en/tags` não fragmentar (`Banco de Dados` → `Databases`).

## Como traduzir

O objetivo é o mesmo texto em outra língua, não um texto melhor.

- **Não** acrescente, resuma, reordene nem "melhore" nada. Mesmas seções, mesmos
  bullets, mesma ordem, mesmas quebras de linha.
- Mantenha o registro dele: primeira pessoa, informal, frases curtas, "dizemos que"
  → "we say that". Ele usa diminutivo e piadinha ("uma regrinha", "Logo, FNBC
  violada") — preserve o tom, não formalize.
- **Nada de travessão (—) nem reticências tipográficas (…).** Ele tirou os dois do
  site de propósito. Use vírgula, ponto ou `...`.
- Marcadores `++campo++` (sublinhado do Pages CMS) ficam como estão.
- Blocos de código: o código não muda. Traduza só comentários.
- Identificadores de exemplo **são traduzidos**, e de forma consistente no post
  inteiro: `LIVRO(++livro_id++, titulo)` → `BOOK(++book_id++, title)`. Um leitor de
  fora não deve ter que decifrar português no meio do exemplo.
- Nomes próprios ficam: UnB, AGU, Caixa, Easy Pallet, MOBFOG, Goiás Sem Fronteiras.
- Termos técnicos vão pro termo consagrado em inglês, não pra tradução literal:
  forma normal → normal form, chave candidata → candidate key, dependência
  transitiva → transitive dependency, chave estrangeira → foreign key.

## Se a tradução já existe

Atualize o arquivo no lugar e **mantenha o slug atual** — a URL já é pública. Só
renomeie se o título em PT mudou de assunto de verdade, e avise que a URL antiga vai
quebrar.

## Antes de terminar

1. `npm run build` — tem que passar.
2. Confirme que o post aparece em `dist/en.html` e que o par PT↔EN está ligado nos
   dois sentidos (`grep -o 'lang-switch" href="[^"]*"' dist/<slug-pt>.html`).
3. Diga qual URL nasceu (`/en/<slug>`) e ofereça o push. Não commite sem ele pedir.
