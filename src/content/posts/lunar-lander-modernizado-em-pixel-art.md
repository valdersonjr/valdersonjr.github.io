---
title: Lunar Lander modernizado em pixel art
date: 2026-09-12
tags:
  - Insight
description: Ideia inicial de um jogo pixel art estilo Lunar Lander, focado em
  pouso de naves, feito em Godot e Aseprite.
published: true
---
Do meu ponto de vista, é essencial investir em autoconhecimento para poder extrair o melhor de si em diferentes contextos da vida. Digo isso porque cada indivíduo tem sua peculiaridade no que condiz com o aprendizado. Pelo que percebi, meu cérebro absorve bem ao tentar colocar algum conhecimento adquirido em prática. Ultimamente, andei tendo curiosidade quanto à área de desenvolvimento de jogos, o que é estranho para mim, por não ter tido isso antes, visto que a cultura gamer compõe grande parte da minha vida. A fim de aprender mais sobre isso, tive a ideia de criar um jogo. Entretanto, como todo bom projeto, a parte mais difícil é pensar em alguma solução ou ideia criativa... mesmo que eu também goste bastante da ideia de "antes feito do que perfeito". Sem mais rodeios, vou deixar abaixo registrado a ideia inicial do que pretendo construir e, caso tudo dê certo, eu volto aqui para comparar no que deu.

Ideia inicial de forma abstrata: quero criar um joguinho pixel art estilo Lunar Lander, porém trazendo para uma versão mais moderna da coisa. A mecânica central do jogo será o pouso de uma nave, que enfrentará diferentes condições dadas as características intrínsecas da região de determinado planeta escolhido. O afunilamento de abstração do jogo é: espaço -> planeta -> regiões -> mecânica de pouso.

Espaço: lugar finito de navegação com um conjunto de planetas.

Planeta: conjunto de uma ou mais regiões. Cada planeta possuirá suas mecânicas gerais compartilhadas (a exemplo da gravidade, pois a gravidade de um planeta não muda de forma relevante dependendo da região no mundo real).

Região: lugar onde será realizada a mecânica de pouso. Cada uma terá formas adversas de pouso, prevendo dificuldades intrínsecas (por exemplo, posso criar pouso em uma caverna).

Zona de contratação: alguns planetas irão dispor de regiões que terão publicação de contratos e suas recompensas.

Contrato: um contrato (ou missão) será a motivação inicial que teremos como pretexto para procurarmos pela região de um planeta. Cada contrato terá também sua peculiaridade, prevendo diferentes recompensas. As atividades específicas ainda não foram mapeadas, mas prevejo que possam ter expedições de exploração, coleta de recurso e talvez até combate.

A ideia central do jogo é a mecânica de pouso. Além disso, percebo um crescente movimento atual na busca por recursos de diversão que não preveem muitas dificuldades de aprendizado (em outras palavras, busca por dopamina fácil). Por este motivo, quero que o jogo facilite ao máximo o jogador apenas chegar em uma dada região, pousar a nave e receber sua recompensa. Como toda boa ideia, quero começar e ir refinando ela com o passar do tempo. Posteriormente, voltarei aqui para averiguar o que tinha inicialmente de proposta e o que construí de fato (não sei quanto tempo levarei).

Esqueci de falar que a stack é Godot com Gdscript e Aseprite para pixel art. A prototipação inicial será feita através da utilização de pacotes de pixel art com licensa gratuita e utilização de agente de codificação.