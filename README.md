# Pessoa Necessária

App simples, em um único arquivo (`pessoa-necessaria.html`), publicado como artifact do Claude:
https://claude.ai/artifact/EqeFFPLngiz23JeGZaRkwR

O método de estudo está em [`metodo/metodo-simples.md`](metodo/metodo-simples.md). O app só cuida de quatro coisas:

1. **Tarefas diárias.** Uma lista curta, com uma caixa para hoje. **Escolher tarefas** deixa só o que você faz de verdade (esconder ou excluir
   várias de uma vez). **Últimos 14 dias** mostra uma grade: toque num quadrado para marcar o que você fez e não marcou, ou para desmarcar.
2. **Estudos e a ordem das partes.** Cada estudo tem partes na ordem, e cada parte tem uma descrição (o grupo de conceitos). A caixa da parte marca
   como concluída. Adicione partes uma a uma, várias de uma vez (uma por linha) ou por **Importar**.
3. **Calendário.** Cada dia mostra quantas tarefas **necessárias** (rótulo *Necessária*) foram feitas, e quantos trabalhos você fez em estudos
   profissionais (azul) e pessoais (laranja): partes concluídas, revisões e sessões. Em **Ajustar este dia** dá para marcar o que você fez e não marcou,
   ou dizer que algo não estava no plano. O rótulo de cada tarefa aparece na lista e se escolhe em **Escolher tarefas**.
4. **Datas das revisões.** Ao concluir uma parte, as revisões caem em 1, 7 e 30 dias (dá para mudar). **Lembrei** leva para a próxima data.
   **Não lembrei** volta no dia seguinte. A tela mostra as revisões de hoje e as próximas.

Não há prompts no app por enquanto: você cria os seus fora dele. As notas em markdown e o projeto de aplicação também ficam fora do app.

## O que saiu da tela

Gráficos, conquistas, contagens de registros, sequências, rótulos e compensações, metas por dia da semana, notas em markdown, os prompts de
estudo e de revisão, o Guia do dia e as capacidades Speaking e Listening automáticas. O código continua no arquivo (parte dele não é mais mostrado) e o
guia do dia está guardado em [`arquivo/`](arquivo/), junto com o README anterior, que descreve tudo isso.

Os dados não foram apagados: histórico de tarefas, partes, revisões e o que está protegido pela senha continuam salvos.

## Importar partes

Em **Importar partes** (ou **Importar**, dentro de um estudo), cole ou envie um arquivo com o modelo de importação (o app mostra o modelo). Os arquivos de plano
que já existem ficam em `planejamento/`.
