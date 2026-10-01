# Pessoa Necessária

App de estudos em um único arquivo (`pessoa-necessaria.html`), publicado como artifact do Claude:
https://claude.ai/artifact/EqeFFPLngiz23JeGZaRkwR

- **Calendário** no topo: sessões de trabalho, partes concluídas e revisões de cada dia; clique no dia para ver o detalhe.
- **Pessoa necessária**: texto de motivação para ler todos os dias.
- **Revisão espaçada**: parte de capacidade concluída → D+1. "Revisar de novo" → +1 dia. "Revisão feita" → D+7 → D+30 → lista futura (sem data).
- **Capacidades** e **Projetos**: prazos, partes, contagem da semana e do mês, registro de sessões e conclusão.

## Tarefas diárias, áreas e conquistas

- **Contagem por área**: os cartões de registros aparecem duas vezes, um grupo **Profissional** e outro **Pessoal**, com a mesma contagem (hoje, sequência, semana, revisões).
- **Capacidades e Projetos** abrem primeiro a escolha da área e só depois a lista. Cada item tem a área em Editar.
- **Tarefas diárias**: cartões com o nome, se foi feita hoje e a sequência de dias. A página da tarefa tem o botão
  "Registrar feito hoje", os últimos 35 dias e um texto com o que fazer. Rótulos (ex.: *Discipline charge*) filtram os cartões.
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
