---
title: Normalização até FNBC, e quando desnormalizar de propósito
date: 2026-08-06
tags:
  - Banco de Dados
description: Entendendo de forma simples a 1FN, 2FN, 3FN e FNBC e tradeoffs de normalização
published: true
---
## Anomalias

Antes de mais nada, vale ressaltar que a normalização é feita para evitar anomalias de inserção, atualização e exclusão. Essas anomalias acontecem quando o banco está com suas tabelas e atributos mal definidos e acaba gerando redundância desnecessária.

> Tabela exemplo: LIVRO(++livro_id++, titulo, autor_id, autor_nome)

- Anomalia de inserção: quando um atributo impede a inserção de um dado de outro atributo que é logicamente independente dele. Exemplo: não é possível cadastrar um autor recém-contratado antes que tenha ao menos um livro registrado.
- Anomalia de atualização: caso múltiplos livros de um mesmo autor tenha sido cadastrado, ao atualizar o nome do autor deveremos atualizar todas as linhas da tabela ou o autor ficará registrado com nomes diferentes.
- Anomalia de exclusão: caso um autor tenha apenas 1 livro cadastrado, ao excluir o livro perderemos informação do autor.

## Primeira Forma Normal (1FN)

A primeira FN é bastante simples. Ela define que, para uma tabela estar na 1FN, o domínio dos possíveis valores de um atributo devem representar um dado atômico (não serem divisíveis). Por exemplo, o valor "12345" é atômico, mas o valor "Rua X, 123, CEP 76543123" não. Além disso, uma tabela na 1FN não deve possuir atributos multivalorados e deve obrigatoriamente possuir uma chave primária.



## Segunda Forma Normal (2FN)

Esse caso é sobre tabelas que possuem chave primária composta. A ideia é que toda tabela com PK composta na 2FN deve ter todos seus atributos dependentes dos dois ou mais atributos que compoem a chave.

> Tabela exemplo: ITEM_PEDIDO(++pedido_id++, ++produto_id++, quantidade, produto_nome)

Note que na tabela exemplo temos dois campos não chave: quantidade e produto_nome.

- *quantidade*: campo que depende dos dois atributos-chave para fazer sentido.
- *produto_nome*: campo que depende apenas de *produto_id* para fazer sentido. A existência de *pedido_id* não altera o valor de *produto_nome*.

Nesse contexto, dizemos que *produto_nome* possui uma **dependência parcial** em relação à PK. Para uma tabela estar na 2FN ela deve atender a dois critérios: estar na 1FN e não possuir dependências parciais.

Para remover a dependência parcial deve-se mover os campos que possuem esse tipo de dependência para uma nova tabela, deixando a nova versão assim em relação ao item de *Tabela exemplo*:

- ITEM_PEDIDO(++pedido_id++, quantidade, produto_id (FK))
- PRODUTO(++produto_id++, produto_nome)



## Terceira Forma Normal (3FN)

Na 3FN o foco é a análise dos atributos não-chave de uma tabela. Ela é violada quando um ou mais atributos não-chave determinam o valor de outro atributo não-chave.

> Tabela exemplo:  VENDA(++nota_fiscal++, cod_vendedor, nome_vendedor, cod_produto, quantidade)

Note que na tabela exemplo o valor do campo *nome_vendedor* é definido diretamente pelo valor do campo *cod_vendedor* e não pela PK diretamente. Nesse contexto, dizemos que *nome_vendedor* e *cod_vendedor* possuem uma **dependência transitiva**. Para uma tabela estar na 3FN ela deve estar antes na 2FN e não possuir dependências transitivas.

Para remover a dependência transitiva deve-se mover os campos que possuem esse tipo de dependência para uma nova tabela, deixando a nova versão assim em relação ao item de *Tabela exemplo*:

- VENDA(++nota_fiscal++, cod_produto, quantidade, cod_vendedor (FK))
- VENDEDOR(++cod_vendedor++, nome_vendedor)



## Forma Normal de Boyce-Codd (FNBC)

Para violar essa forma normal temos uma regrinha um pouco mais complicada, mas eu vou tentar simplificar. 

> Chave candidata: conjunto de um ou mais atributos que conseguem identificar unicamente uma linha da tabela. Uma chave candidata tem o comportamento quase semelhante ao de uma chave primária.

Com o conceito de chave candidata acima bem definido, agora mais fácil entender a FNBC. A ideia é: caso uma tabela possua um conjunto X composto por 1 ou mais atributos e esse X determina diretamente o valor de um outro atributo da mesma tabela, o conjunto inicial X deve ser uma chave candidata. Caso contrário, a tabela não estará na FNBC.

> Tabela exemplo:  ORIENTACAO(++aluno_id++, disciplina, professor)
>
> (Assumundo que possa ter apenas um professor por disciplina)

Seguindo a ideia da tabela exemplo acima, temos o atributo disciplina determinando o valor do atributo professor diretamente. Além disso, disciplina por si só não é forte o suficiente para identificar unicamente uma linha dessa tabela. Logo, FNBC violada.

Para remover esse tipo de violação devemos mover os campos que possuem esse tipo de comportamento para uma nova tabela, deixando a nova versão assim em relação ao item de *Tabela exemplo*:

- ORIENTACAO(++aluno_id++, disciplina(FK))
- DISCIPLINA(++disciplina++, professor)



## Quando não normalizar intencionalmente

A ideia por trás da normalização é evitar a redundância desnecessária e prevenir anomalias que possam causar inconsistências, afinal, um dado duplicado é, na prática, uma inconsistência esperando para acontecer. Por outro lado, a normalização acaba também criando a necessidade de realização de vários JOINS para buscar uma informação, e cada JOIN tem um custo que cresce junto com o volume de dados. Dito isso, um banco de dados normalizado pode acabar perdendo em desempenho de leitura para um banco de dados não normalizado, especialmente quando essas consultas se repetem em larga escala. Por outro lado, um banco de dados normalizado evita repetição de dados desnecessária, o que melhora o tempo de escrita e garante que cada informação exista em um único lugar confiável. 

Por fim, para casos em que tenhamos sistemas que façam leitura em grandes quantidades e que não necessitem tanto de escrita, um banco de dados menos normalizado seria o mais indicado, trocando parte dessa segurança por velocidade onde ela realmente importa.