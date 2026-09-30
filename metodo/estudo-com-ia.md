# Estudo com IA — um Projeto do Claude por capacidade

Para fontes (livros, repositórios, cursos) em que o objetivo é aprender os **conceitos** (matemática, estatística, ferramentas como git),
seguindo a **linha de raciocínio do autor** (a ordem, os exemplos, o porquê de cada conceito aparecer ali)
sem precisar ler a fonte inteira. Cada **parte** do app é um conceito.

## Em inglês

Todos os prompts do app estão em **inglês** e pedem que o tutor ensine só em inglês: explicações, exemplos,
comentários do código e cartões de revisão. O tutor define cada termo técnico novo em inglês simples, responde
em inglês mesmo se você escrever em português e, depois de cada resposta sua, aponta no máximo dois erros de inglês
que atrapalham a clareza. O cartão ganha o campo **KEY TERMS** (os termos novos da sessão). As colunas das bases
continuam com os nomes originais, em português.

A resposta do prompt de divisão vem com as palavras-chave em inglês (`CAPABILITY`, `SOURCES`, `DEPTH`, `SESSIONS`,
`DEADLINE`, notas `Source` / `Why here` / `Practical value` / `Mini-project`), que o app importa normalmente.
Datas sempre com o dia primeiro (dd/mm/aaaa).

## Montagem (uma vez por capacidade)

1. No app, abra a capacidade → **Editar**: preencha as **fontes** (a primeira é a principal), a **profundidade**
   (Conceitual, Sólido ou Profundo), as **sessões por semana** e, se quiser, uma base de prática própria.
2. No claude.ai, crie um **Projeto** com o nome da capacidade.
3. Em **Copiar instruções do Projeto**, cole o texto nas instruções do Projeto.
4. Anexe ao Projeto: a fonte principal (PDF do livro, ou o README/arquivos do repositório), as complementares e o arquivo de **descrição/schema das bases** (só estrutura, sem dados pessoais).
5. Numa conversa do Projeto, cole **Copiar prompt: dividir em partes**. A resposta vem no formato de importação:
   - importe no app (**Importar**, dentro da capacidade);
   - salve a mesma resposta como **parts.txt** e anexe ao Projeto.
   Com as partes no app, a página da capacidade mostra o **prazo pelas partes**; **Usar este prazo** troca o prazo final por ele.
   Depois de editar partes no app, **Copiar parts.txt** gera o arquivo atualizado (com datas, notas e o que já foi concluído).

Cada parte traz as notas: **Source** (capítulo, seção, páginas), **Why here**, **Practical value** e **Mini-project**.

## Cada parte

| Etapa do método | Onde acontece |
| --- | --- |
| 1. Valor prático — e por que o autor trata do conceito ali | Notas do plano e etapa 1 da sessão |
| 2. Identificar o conceito e os subconceitos | Partes do plano / etapa 2 |
| 3. Tentar explicar antes de aprender | Sessão (etapa 3) |
| Ensino na linha do autor | Sessão (etapa 4) |
| Prática: script nas suas bases, rodado na sua máquina | Sessão (etapa 5) |
| 4. Definição com as próprias palavras, do zero | Sessão (etapa 6) |
| 5. Comparar com a definição do autor e uma formal | Sessão (etapa 7) |
| 6. Atualizar a definição → cartão de revisão | Sessão (etapa 8 e cartão) |
| Mini-projeto nas suas bases | Sessão (etapa 9) |
| 7. Explicar de novo com repetição espaçada | Revisões D+1 → D+7 → D+30 do app |

- **Estudar:** abra a parte no app → **Copiar prompt da sessão de estudo** → nova conversa **dentro do Projeto**.
  Ao final, cole o cartão em **Colar cartão** e marque a parte.
- **Revisar:** no dia, **Prompt** ao lado da revisão → conversa no mesmo Projeto. O veredito
  (REVIEW DONE → **Revisão feita** / REVIEW AGAIN → **Revisar de novo**) é o botão que você aperta no app.

## Prática com os seus dados

O agente do Projeto **não acessa os dados**: ele lê só a descrição/schema e escreve scripts completos
(Python com pandas, lendo os arquivos pelos caminhos descritos). Você roda na sua máquina, cola a saída e ele
interpreta. As instruções proíbem pedir ou exibir dados pessoais; os scripts trabalham com agregados.

## Observações

- Capacidades de ondas futuras podem ficar **Em espera** (Editar → Situação): saem das contagens até **Começar agora**.
- Em livros grandes, o Projeto tende a buscar trechos relevantes em vez de ler tudo de uma vez; por isso cada
  parte aponta capítulo/seção/páginas.
- A base de prática do app entra inteira nas instruções só se for curta; se for longa, entra pelo nome e o
  arquivo completo vai anexado ao Projeto.
