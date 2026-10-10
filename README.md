# Pessoa Necessária

App de estudos em um único arquivo (`pessoa-necessaria.html`), publicado como artifact do Claude:
https://claude.ai/artifact/EqeFFPLngiz23JeGZaRkwR

## Tela inicial

De cima para baixo:

- **Estudos:** as capacidades e os projetos ativos, direto na tela (não há mais a página Capacidades como porta). Eles ficam em **grupos**
  (Profissionais, Bíblia, Livros, Outros estudos, Projetos, ou o nome que você criar em **Editar › Grupo**). Cada linha mostra o progresso, a parte de agora
  e uma caixa para marcar que você trabalhou hoje; clicar abre o estudo. **+ Estudo**, **+ Projeto**, **Importar** e **Gerenciar** (a lista antiga, com a base de prática e os itens em espera) ficam no alto.
- **Tarefas:** as tarefas diárias, semanais e mensais (exercício, alimentação, oração…), cada uma com a caixa de hoje, o rótulo e o que falta compensar. **As revisões que caem hoje entram
  na mesma lista** (Prompt, Voltar amanhã, Feita). A tarefa marcada com **Ao clicar na tarefa, abrir o texto da pessoa necessária** abre a pessoa necessária em vez de um retângulo grande na tela.
- **Sequências:** uma faixa de quadrados por tarefa (60 dias, 26 semanas ou 12 meses, o último quadrado é hoje) e por estudo (sessões por dia; com meta, verde/parcial/faltou).
- **Calendário:** sessões, partes concluídas e revisões de cada dia. Em **Ajustar este dia** você marca o que fez e não marcou, ou que algo **não estava no plano** (o dia sai da conta e não quebra a sequência).
- **Revisão espaçada:** a fila, as notas em markdown, as próximas e as futuras. **Gráficos** e **Conquistas** fecham a página.

Os cartões de contagem (registros de hoje, sequência de acessos, semana) e o **Guia do dia** saíram. O código do guia está guardado em [`arquivo/`](arquivo/).

- **Revisão espaçada**: parte de capacidade concluída → 1ª revisão (padrão D+1). "Voltar amanhã" → +1 dia. "Feita" → D+7 → D+30 → lista futura (sem data). Os dias são configuráveis em **Ajustes**.
- **Tarefas diárias, semanais e mensais**: a página da tarefa tem o botão "Registrar feito hoje", os últimos 35 dias e um texto com o que fazer. Rótulos (ex.: *Discipline charge*) filtram a lista.
- **Quantidade de estudo por dia da semana:** em **Editar** o estudo, preencha as sessões necessárias de cada dia (dom a sáb). Entram no calendário como necessárias e nas sequências.
- **Conquistas**: metas com título, descrição, data opcional e uma regra de cálculo — manual, dias com registro no
  período (%), média de registros por dia, partes entregues no prazo (%), total de registros, sequência de dias ou
  sequência de uma tarefa diária. Conquistada, o cartão vira medalha dourada; passado o prazo sem cumprir, fica "não alcançada".
  Há modelos prontos: *Último trimestre pegando fogo*, *Psicopata do estudo* e *30 dias seguidos*.

## Importar de arquivo

Em **Capacidades** ou **Projetos**, use **Importar arquivo** (ou **Importar**, dentro de uma
capacidade, para acrescentar partes a ela). Escolha um `.txt`, `.md` ou `.json`, ou cole o texto;
o app mostra uma pré-visualização antes de gravar.

Modelos prontos: [`modelos/modelo.txt`](modelos/modelo.txt) e [`modelos/modelo.json`](modelos/modelo.json).

```
CAPACIDADE: Espanhol — conversação
PRAZO: +90
- Pronúncia e alfabeto | +7
- Verbos no presente | 30/10/2026
- Passado simples
```

- `CAPACIDADE:` ou `PROJETO:` começa um item; `PRAZO:` define o prazo final dele.
- Cada parte é uma linha (com `-`, `*` ou `1.` opcionais); a data vem depois de `|`.
- Datas: `15/12/2026`, `15/12`, `2026-12-15` ou relativas ao dia da importação: `+7`, `+2 semanas`, `+1 mês`.
- Partes sem data podem ser distribuídas até o prazo final.
- Se já existir um item com o mesmo nome, as partes novas entram nele e as repetidas são ignoradas.
- Linhas com `//` são comentários.
- `FONTES:` (opcional) livros, repositórios, cursos ou documentação, separados por `;` — a primeira é a **fonte principal**, a que define a ordem das partes (`LIVROS:` ainda funciona).
- `PROFUNDIDADE:` `Conceitual`, `Sólido` ou `Profundo`, e `SESSOES:` sessões por semana: o app usa os dois para calcular o **prazo pelas partes** (semanas = partes em aberto × fator ÷ sessões por semana; fator 1,5 no Profundo e 1,2 nos outros) e oferece **Usar este prazo**.
- `FOCO:` (opcional, pode repetir a linha) guarda os conceitos que você quer aprender e as regras de prática. Com foco, a capacidade é **guiada por conceitos**: o foco manda na ordem das partes e as fontes viram referências (veja abaixo).
- `SITUACAO: Em espera` deixa a capacidade guardada para uma próxima onda: ela fica fora das listas e contagens até você clicar em **Começar agora**. `AREA: Profissional` ou `Pessoal` escolhe a área.
- Uma linha `> texto` logo abaixo de uma parte vira a nota dela.
- As palavras-chave também valem em inglês, como os prompts geram: `CAPABILITY:`, `PROJECT:`, `SOURCES:`, `DEPTH:` (Conceptual, Solid, Deep), `SESSIONS:`, `DEADLINE:`, `STATUS: On hold`, `AREA:` (Professional, Personal). Em JSON: `capability`, `project`, `sources`, `deadline`, `sessions`.
- Blocos de código (```) são ignorados, então dá para colar a resposta da IA inteira.

## Estudo com IA

**Capacidade guiada por conceitos.** Nem todo assunto tem um livro que defina a ordem. No campo **Foco de aprendizagem**
(Editar) você escreve a lista de conceitos e as regras de prática; os prompts passam a ensinar cada conceito pela fonte
que melhor o explica, dizem quando nenhuma fonte cobre o conceito e aplicam as regras de prática em cada parte
(por exemplo, desenhar um diagrama Mermaid antes de qualquer código). Sem foco, tudo funciona como antes, com uma fonte principal.

Fluxo pensado para **um Projeto do Claude por capacidade**, com a fonte principal e o schema das bases anexados:
o app gera as instruções do Projeto, o prompt de divisão em partes (seguindo a linha do autor), o `parts.txt`,
e os prompts de sessão e de revisão. A prática é feita com scripts que você roda na sua máquina.
Os prompts são em **inglês** e o estudo das capacidades acontece em inglês. O passo a passo está em [`metodo/estudo-com-ia.md`](metodo/estudo-com-ia.md).

## Plano de capacidades

- [`planejamento/plano-capacidades.xlsx`](planejamento/plano-capacidades.xlsx): ondas, profundidade, partes estimadas,
  sessões por semana, prazo estimado (fórmulas), fontes, rotina semanal, marcos de inglês e projetos integradores.
- [`planejamento/capacidades-import.txt`](planejamento/capacidades-import.txt): o mesmo plano no formato de importação
  (onda 1 ativa, as demais em espera).
- [`planejamento/projetos-leitura.txt`](planejamento/projetos-leitura.txt): os projetos de leitura e anotações (João, Lewis, Carnegie, Covey e o curso de gramática).
- [`planejamento/rotina.md`](planejamento/rotina.md): a rotina decidida (treino, dias úteis, fim de semana, inglês, método de leitura).

## Guia do dia (arquivado)

O guia que ficava no topo da tela inicial (blocos de horário com as tarefas, as partes de estudo do dia, as faltas a compensar e as revisões) foi removido.
O código está em [`arquivo/guia-do-dia.js`](arquivo/guia-do-dia.js), para o caso de querer reimplementá-lo de outro jeito. Os horários e o número de sessões do guia não existem mais;
a quantidade de estudo agora é por estudo e por dia da semana.

## Tarefas necessárias, calendário e motivos

- **Necessária** é um rótulo de tarefa diária: a tarefa vale todos os dias, inclusive no fim de semana. Tarefas sem esse rótulo (como as de "Discipline charge") são opcionais e não entram na conta.
- **Compensar:** um dia sem registro vira uma falta. Registrar a tarefa mais de uma vez em outro dia compensa as faltas mais antigas; a linha da tarefa mostra o botão **Compensar** (no dia marcado, se você escolheu uma data). Um dia que não estava no plano pode ser tirado da conta em **Ajustar este dia**.
- **Calendário:** cada dia mostra **feitas/necessárias** (tarefas necessárias, capacidades "todo dia" e sessões de estudo do guia) e vale também para os dias passados, desde o primeiro registro. O painel do dia lista o que era necessário e o que foi feito, e tem o campo **Por que não fiz tudo neste dia?** (guardado só na parte privada, se houver senha).
- **Capacidades "todo dia":** em Editar, a opção **Trabalhar todo dia** coloca um passo por dia no guia (no bloco escolhido) e conta como necessária. Uma parte pode ter **Vezes para trabalhar**; você marca a parte como concluída quando conseguir.
- **Idioma (gramática e uso):** a opção **Idioma** em Editar troca os prompts de bases de dados por prática de idioma: o tutor explica o uso com exemplos do seu trabalho, mostra os erros comuns de quem fala português e pede frases suas, que ele corrige. O flashcard ganha **PRACTICE** (3 frases novas) no lugar de **PRACTICE FOR WORK**.
- **Speaking e Listening automáticos:** capacidades com a marca interna `mirror` (Communication / English Speaking e English Listening) ganham uma parte nova sempre que você conclui uma parte de outra capacidade ou projeto: "Explain: <parte>" (explicar em voz alta, em inglês simples) e "Listen: <parte>" (ouvir o áudio de resumo da sessão). Cada uma começa com 3 vezes para trabalhar.

**Prática no trabalho.** Nas capacidades profissionais, os prompts não pedem que você rode código na hora: o agente explica como fazer a prática, com o seu
esquema, e a prática vira tarefa para fazer no trabalho; o cartão registra o mini-projeto como pendente, para o trabalho.

**Regras de prática** (Editar) valem para uma capacidade sem mudar a ordem das partes, ao contrário do **Foco**.

## Plano da semana e prática na vida real

- **Plano da semana.** Em uma tarefa diária, o campo **Plano da semana** guarda o que fazer em cada dia (a primeira linha é o título). O cartão da tarefa
  mostra o título de hoje e a página mostra o dia inteiro e a semana toda. Serve para treino, rotina de estudo de inglês etc.
- **Capacidades pessoais.** Em capacidades da área Pessoal, os prompts trocam scripts e bases por **experimentos na vida real** (uma situação, o que fazer,
  o que observar) e cenas do dia a dia, e o tutor apresenta com fidelidade o argumento do autor em livros religiosos ou filosóficos.

## Compartilhar sem expor tudo

Tudo o que a página guarda aparece no código para quem abre o link, então esconder só na tela não basta.
Em **Compartilhar** o app cria uma senha e passa a trancar o que você marcar como oculto: a base de prática, o texto
da home e, se quiser, tarefas diárias, capacidades, projetos e conquistas. O oculto sai dos dados públicos
e vai para um bloco cifrado (`pn-vault`, AES-GCM com chave derivada da senha por PBKDF2). O link continua vivo e
atualiza sozinho para quem só visualiza. Só quem tem a senha e permissão de edição vê e edita tudo.

- Os gráficos gerais (constância, registros por semana, progresso) e o gráfico de cada tarefa diária têm um seletor
  Visível/Oculto. Ocultar um gráfico geral só esconde o cartão; ocultar uma tarefa, capacidade ou projeto remove
  também o histórico dele da vista pública.
- **Ver como visitante** mostra a página exatamente como o link a entrega.
- Quem perder a senha perde o conteúdo oculto. Use uma frase longa; senha curta pode ser descoberta por tentativas.

## Onde ficam os dados

A página guarda os próprios dados (capability `artifact`): cada alteração publica uma nova versão
com o estado embutido em `<script id="pn-data">`. Quem abre o link vê sempre a versão mais recente;
só quem tem permissão de edição consegue alterar. Este arquivo no repositório é o modelo
(com `null` nos dados, o app mostra exemplos) — os dados reais vivem no artifact.
