# Pessoa Necessária

App simples, em um único arquivo (`pessoa-necessaria.html`), publicado como artifact do Claude:
https://claude.ai/artifact/EqeFFPLngiz23JeGZaRkwR

O método de estudo está em [`metodo/metodo-simples.md`](metodo/metodo-simples.md).

## A estrutura

De cima para baixo, para objetivos profissionais e pessoais:

**objetivo → objetivo real → projetos → capacidades de cada projeto → trabalho do dia (um estudo ou uma tarefa)**

- **Objetivo e objetivo real.** Por exemplo, *Trabalho remoto*, e o objetivo real: tempo e dinheiro. Os objetivos profissionais são etapas (uma de
  cada vez); os pessoais (como *Saúde* e *Cristianismo*) ficam à parte.
- **Projeto.** Tem passos na ordem e uma lista das capacidades que exige. O **Projeto de agora** fica no topo da tela inicial.
- **Capacidade.** Algo que preciso saber fazer (por exemplo, *Estatística*, *SQL / Data Modeling*, *English Speaking*, *Corpo forte e saudável*).
  Uma capacidade pode servir a mais de um projeto, e um estudo pode desenvolver mais de uma capacidade.
- **Estudo.** Um livro ou curso, com os **capítulos** na ordem. Ao terminar de ler um capítulo, marco a caixa: as revisões caem em 1, 7 e 30 dias.
  **Lembrei** leva para a próxima data; **Não lembrei** volta no dia seguinte (limite de 2 revisões nos dias úteis e 6 no fim de semana).
  A revisão é feita fora do app (explicar de memória, com a leitura do livro): o app só calcula as datas.
- **Tarefa diária.** Uma lista curta, com uma caixa para hoje, rótulo e as tarefas *Necessárias*. Uma tarefa pode desenvolver uma capacidade.

## O que o app mostra

1. **Projeto de agora**, no topo, com a barra de passos e o passo atual.
2. **Objetivo atual** (a etapa em que estou).
3. **Hoje**: as tarefas do dia, com o botão da *pessoa necessária*, e as **Revisões de hoje**.
4. **Estudos**, em grupos, com a barra de capítulos e o próximo capítulo.
5. **Últimos 14 dias**: uma grade para marcar o que fiz e não marquei.
6. **Calendário**: por dia, quantas tarefas necessárias foram feitas e quanto trabalho houve em estudos profissionais e pessoais. **Ajustar este dia** corrige o passado.
7. **Mapa**: a estrutura inteira, em árvore (objetivo, projetos, capacidades, estudos e tarefas). Em cada capacidade há uma página com seus estudos e tarefas.
8. **Ideias para depois**: o botão **+ Ideia** guarda a ideia e o app não muda por causa dela.

Não há prompts nem flashcards no app: eles são feitos fora dele. As notas em markdown ficam no Obsidian.

## O que saiu da tela

Gráficos, conquistas, contagens de registros, sequências, rótulos e compensações, metas por dia da semana, notas em markdown, os prompts de
estudo e de revisão, o Guia do dia e as capacidades Speaking e Listening automáticas. O código continua no arquivo (parte dele não é mais mostrado) e o
guia do dia está guardado em [`arquivo/`](arquivo/), junto com o README anterior, que descreve tudo isso.

Os dados não foram apagados: histórico de tarefas, partes, revisões e o que está protegido pela senha continuam salvos.

## Importar partes

Em **Importar partes** (ou **Importar**, dentro de um estudo), cole ou envie um arquivo com o modelo de importação (o app mostra o modelo). Os arquivos de plano
que já existem ficam em `planejamento/`.
