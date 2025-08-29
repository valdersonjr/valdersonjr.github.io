---
title: 'Monty Hall'
published: false
tags: [Tecnologia, Probabilidade, Matemática]
translation_key: monty-hall
---

## Introdução:

O Paradoxo de Monty Hall é um problema de probabilidade que confunde muitas pessoas. Ele se popularizou com o show "Let's Make a Deal", apresentado por Monty Hall. A questão é a seguinte: você participa de um jogo onde há três portas. Atrás de uma delas está um carro e, atrás das outras duas, bodes. Você escolhe uma porta, mas o apresentador, que sabe o que está atrás de cada porta, abre uma das outras duas, revelando um bode. Então, ele te dá a opção de trocar de porta ou manter a sua escolha original. O que você deve fazer para aumentar suas chances de ganhar o carro?

A solução surpreendente é que, para maximizar suas chances de ganhar, você deve trocar de porta. Nesse blog post, vamos entender o porquê e simular o Paradoxo de Monty Hall com Ruby.

O Paradoxo Explicado

Aqui está o resumo matemático por trás do problema:

	1.	Ao escolher uma porta, a probabilidade de você acertar o carro é 1/3, e a probabilidade de estar errado é 2/3.
	2.	Quando Monty revela um bode em uma das outras duas portas, a probabilidade de a porta original ser a correta não muda (ainda 1/3).
	3.	A porta não escolhida que sobrou tem agora 2/3 de chance de ser a correta, pois Monty sempre revela um bode.

Portanto, trocar de porta aumenta suas chances de ganhar para 2/3!
