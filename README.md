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
- `LIVROS:` (opcional) guarda os livros de referência; uma linha `> texto` logo abaixo de uma parte vira a nota dela.
- Blocos de código (```) são ignorados, então dá para colar a resposta da IA inteira.

## Estudo com IA

Fluxo pensado para **um Projeto do Claude por capacidade**, com o livro e o schema das bases anexados:
o app gera as instruções do Projeto, o prompt de divisão em partes (seguindo a linha do autor), o `partes.txt`,
e os prompts de sessão e de revisão. A prática é feita com scripts que você roda na sua máquina.
O passo a passo está em [`metodo/estudo-com-ia.md`](metodo/estudo-com-ia.md).

## Onde ficam os dados

A página guarda os próprios dados (capability `artifact`): cada alteração publica uma nova versão
com o estado embutido em `<script id="pn-data">`. Quem abre o link vê sempre a versão mais recente;
só quem tem permissão de edição consegue alterar. Este arquivo no repositório é o modelo
(com `null` nos dados, o app mostra exemplos) — os dados reais vivem no artifact.
