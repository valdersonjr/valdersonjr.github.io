---
title: 'Monty Hall'
published: false
tags: [Tecnologia, Probabilidade, Matemática]
translation_key: monty-hall
---

<div class="lang-pt" markdown="1">

## Introdução

O Paradoxo de Monty Hall é um problema de probabilidade que confunde muitas pessoas. Ele se popularizou com o show "Let's Make a Deal", apresentado por Monty Hall. A questão é a seguinte: você participa de um jogo onde há três portas. Atrás de uma delas está um carro e, atrás das outras duas, bodes. Você escolhe uma porta, mas o apresentador, que sabe o que está atrás de cada porta, abre uma das outras duas, revelando um bode. Então, ele te dá a opção de trocar de porta ou manter a sua escolha original. O que você deve fazer para aumentar suas chances de ganhar o carro?

A solução surpreendente é que, para maximizar suas chances de ganhar, você deve trocar de porta. Nesse blog post, vamos entender o porquê e simular o Paradoxo de Monty Hall com Ruby.

## O Paradoxo Explicado

Aqui está o resumo matemático por trás do problema:

1. Ao escolher uma porta, a probabilidade de você acertar o carro é 1/3, e a probabilidade de estar errado é 2/3.
2. Quando Monty revela um bode em uma das outras duas portas, a probabilidade de a porta original ser a correta não muda (ainda 1/3).
3. A porta não escolhida que sobrou tem agora 2/3 de chance de ser a correta, pois Monty sempre revela um bode.

Portanto, trocar de porta aumenta suas chances de ganhar para 2/3!

</div>

<div class="lang-en" markdown="1">

## Introduction

The Monty Hall Paradox is a probability problem that confuses many people. It became popular with the show "Let's Make a Deal," hosted by Monty Hall. The question is as follows: you participate in a game with three doors. Behind one of them is a car and behind the other two are goats. You choose a door, but the host, who knows what is behind each door, opens one of the other two, revealing a goat. Then, he gives you the option to switch doors or keep your original choice. What should you do to increase your chances of winning the car?

The surprising solution is that, to maximize your chances of winning, you should switch doors. In this blog post, let's understand why and simulate the Monty Hall Paradox with Ruby.

## The Paradox Explained

Here is the mathematical summary behind the problem:

1. When you choose a door, the probability of you picking the car is 1/3, and the probability of being wrong is 2/3.
2. When Monty reveals a goat behind one of the other two doors, the probability that your original door is correct does not change (still 1/3).
3. The remaining unchosen door now has a 2/3 chance of being correct because Monty always reveals a goat.

Therefore, switching doors increases your chances of winning to 2/3!

</div>
