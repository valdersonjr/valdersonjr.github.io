---
title: Motor Javascript
date: 2026-09-23
description: O que todo bom desenvolvedor precisa saber
published: true
---
Estava querendo aprender sobre todo o ambiente de execução do JavaScript e cheguei nisso aqui, que é um componente essencial e preciso anotar pra lembrar depois.

Dos diferentes ambientes de execução JavaScript existentes, um sempre estará presente: o motor de execução da linguagem. Ele é o responsável por analisar, entender e executar o código-fonte escrito.

Como eu sempre gosto de dar um passo atrás e entender o processo de construção invés de apenas decorar, fui atrás de um padrão de construção do motor de execução de linguagens como o JavaScript e pelo que entendi o core da coisa são 4 etapas, sempre nessa ordem:

**1. Scanner → 2. Parser → 3. Interpretador/Compilador → 4. Garbage Collector**

### 1. Scanner (ou Lexer)

Lê o código-fonte caractere por caractere e agrupa em tokens (blocos com significado próprio, como um identificador, um operador ou um número). Nessa fase o código ainda não tem estrutura nenhuma, é só uma lista linear.

### 2. Parser

Pega essa lista de tokens e monta uma AST (Abstract Syntax Tree), uma árvore que representa como as partes do código se relacionam, seguindo a gramática da linguagem definida em sua especificação (ECMA define a do JavaScript). Nessa etapa aqui é onde estouram os erros de sintaxe.

### 3. Interpretador e/ou Compilador

Com a AST pronta, dado a otimização do fluxo de execução da linguagem, utiliza-se tanto compilador quanto interpretador, dado a natureza de cada um.

O interpretador percorre a AST (ou um bytecode gerado a partir dela) e já produz o resultado na hora, sem gerar código de máquina. É rápido para começar, mas mais lento para rodar repetidamente.

O compilador traduz a AST (ou bytecode) pra gerar código de máquina antes de rodar. Demora pra começar, mas o código final roda bem mais rápido.

**CallStack** e **Heap** entram como estrutura de dados nesse momento.

### 4. Garbage Collector

Por fim, gerencia a memória (heap) onde objetos, arrays e closures são criados durante a execução.



Assim como todo bom assunto a gente consegue aprofundar bem mais do que o escrito aqui. Como percebi que pode ser bastante extenso, pretendo voltar em cada tópico desses individualmente no futuro.