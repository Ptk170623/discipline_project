# Teste: método "prática primeiro"

Teste paralelo. O método atual do app (sessão de estudo em 4 passos, flashcard e revisão) continua como está. Aqui o
conceito é aplicado primeiro no projeto real, no harness do trabalho, e só depois explicado, questionado e aprovado.

Fluxo: mapa (Projeto Claude) → prompt de análise → harness (resultado) → explicação na prática (Projeto) → perguntas até
entender → você explica sem ler → aprovação → flashcard → revisão com active recall (a do app, sem mudança).

Parte de teste: **Frequency tables, histograms and density plots** (Statistics for Data Science).

## Prompt 1 — Projeto Claude (nova conversa)

```
New method test: practice first. Part "Frequency tables, histograms and density plots" of the capability "Statistics for Data Science". Use the sources and the parts.txt attached to this Project and follow the Project instructions. Speak English only.

Plan notes: Source: PSDS Ch. 1, "Frequency Tables and Histograms", "Density Plots and Estimates" (~pp. 22-27); OpenIntro Ch. 2, section 2.1 · Why here: boxplots hide multi-modal shapes; histograms and density plots show the full distribution. · Practical value: spot skewness, several peaks and binning effects that change a story.

Do not teach me the part yet. Do two things:

1. MAP: list the concept of this part and all its sub-concepts, numbered, by name only, in the order the author presents them.

2. ANALYSIS PROMPT: write one simple, direct prompt that I will paste into Claude Code (my work harness), which has my real project, code and data. The prompt must make it analyze my real project as if I were analyzing and developing it, applying the concepts of the map.
Mode: ALL concepts in one analysis. (I may change this line to "ONE concept: <number>" before sending.)
Rules for the analysis prompt:
- Short and direct, under 200 words: the goal, the concepts to apply (names only, no theory) and what to produce.
- Read-only: it must not change any file. It runs only what is needed to look at the real data and code.
- Privacy: no personal data and no raw rows in the answer; only column names, counts, aggregates, short code, and file or table names.
- It must end with a RESULT REPORT that I can paste back to you, one block per concept, in this format: CONCEPT / WHERE (file, table, column) / WHAT I RAN (short code or query) / WHAT IT SHOWED (numbers) / WHAT IT MEANS FOR THE PROJECT (one or two lines) / PROBLEMS OR SURPRISES.
- If a concept does not apply to my project, it must say so instead of inventing an example.

Give me the MAP and then the ANALYSIS PROMPT in one block, ready to copy. Nothing else.
```

## Prompt 2 — mesma conversa do Projeto, depois de colar o resultado do harness

```
Here is the RESULT REPORT from my work harness:
---
[paste the result report here]
---
Now:
1. Explain each concept of the map in practice, using only this result: what it is, what it showed in my real project and why it matters. Keep each one short. Where the result is weak or missing, say so and use a generic example, marked as generic.
2. I will ask questions until I understand everything. Answer them. Do not quiz me yet.
3. When I say "ready", I will explain every concept and sub-concept in my own words, without reading anything, in one message. Check each one: what is right, what I forgot, what is wrong, with the correction. Then say "APPROVED" or "AGAIN" with what to reinforce. If AGAIN, I try again.
4. Only after APPROVED, create the flashcard in plain text:
CONCEPT: (name of the part)
SOURCE: (chapter and section)
MAP: (the concept and all its sub-concepts, names only)
MY DEFINITION: (the concept and EACH sub-concept in my own words, one per line, corrected; mark corrections with [fix: ...])
REAL CASE: (1 to 3 lines: what it showed in my real project; no personal data)
WATCH OUT: (what I got wrong or forgot)
KEY TERMS: (new English terms, each with a short meaning)

Keep your messages short. Start with step 1.
```

## Como encaixa no app

- Cole o flashcard em **Colar cartão** e marque a parte como concluída, como hoje.
- A revisão do app não muda: ela lista o mapa (MAP), você define tudo de novo e o agente corrige. O campo REAL CASE
  não vai para o prompt de revisão; só fica guardado no cartão.
- Este teste não usa o prompt de estudo do app (nem o texto para ouvir). Se a parte virar Speaking/Listening, o
  app cria essas partes do mesmo jeito ao concluir.

## Exemplo: parte 1 (Types of structured data)

Nesta parte a "análise" é um perfil dos dados: o harness inspeciona cada coluna dos dados reais e classifica com os
conceitos (tipo guardado x tipo estatístico, identificador, binário, ordinal, níveis). Ainda não é estatística. O prompt
de análise precisa dizer o que cada conceito vira na página e quais regras decidem o tipo de cada coluna.

```
Add a new page to this project: "Data types profile". It analyzes the real data of this project using these concepts: Structured data; Variable (column); Observation (row); Data type; Numeric (continuous, discrete); Categorical (nominal, binary, ordinal); Level; Stored type vs. statistical type; Identifier.

Rules:
- New page only. Do not change existing pages, data or logic. Use the same stack and style as the project.
- Generic: loop over every table or dataframe the project already loads. Do not hardcode column names.
- No personal data on the page or in your answer: only column names, counts, percentages and aggregates. Never show raw rows or values of identifier or personal columns (levels of non-personal categorical columns are fine).

What the page shows (name the concept in each section title):
1. Overview (structured data, variable, observation): per table, the number of rows (observations) and columns (variables), as summary cards.
2. Column inventory (data type, stored vs. statistical type): one row per column with the stored type (dtype) and the statistical type you decide: continuous, discrete, nominal, binary, ordinal, identifier, or other (date/text). Add a "why" column with the rule you used, in a few words. Mark the columns where the stored type misleads: numbers stored as text, codes or IDs stored as numbers, flags stored as integers, dates stored as text.
3. Segmenters: filters by table, stored type, statistical type, and "only mismatches".
4. Charts: columns by statistical type (bar); stored type x statistical type (heatmap or matrix); for the selected column: a histogram if numeric, the levels with counts if categorical (in their natural order if ordinal), and for identifiers the unique % and duplicate count.
5. Insights box: 5 to 8 findings with numbers. Each one names the risk it creates (for example an identifier that could be averaged, or a binary column treated as numeric) and the fix you suggest.

Classification rules: identifier = unique per row, or a key-like name. Binary = exactly 2 distinct values. Discrete = integers that count things. Continuous = measured values with many distinct values. Ordinal = levels with a natural order; flag it as "assumed" and show the order. Nominal = any other category.

Run the page with the project's own command and fix any errors. Then answer with a RESULT REPORT I can paste to my tutor:
- PAGE: where it is and how to run it.
- One block per group (1. structured data, variable, observation; 2. data type and stored vs. statistical type; 3. numeric: continuous and discrete; 4. categorical: nominal, binary, ordinal and level; 5. identifier), each with: WHERE (tables, columns) / WHAT I RAN / WHAT IT SHOWED (numbers and column names) / WHAT IT MEANS FOR THE PROJECT / PROBLEMS OR SURPRISES.
- MISMATCH LIST: column, stored type -> statistical type, why.
- TOP INSIGHTS.
If a concept does not appear in the data, say so instead of inventing an example.
```
