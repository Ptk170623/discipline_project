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

## Capacidade guiada por conceitos

Quando o que você quer aprender é uma lista de conceitos e não o conteúdo de um livro (por exemplo, pensar em programas de dados),
preencha **Foco de aprendizagem** em Editar: a lista de conceitos, onde cada um costuma ser bem coberto e as regras de prática.
O foco manda na ordem das partes (por dependência, não pela ordem de um livro), as fontes viram referências e cada parte cita só as páginas
necessárias. Conceitos que nenhuma fonte cobre bem (como testes e leitura de código) viram exercícios nas suas bases. As regras de prática
valem na demonstração, no mini-projeto e nas revisões; o diagrama fica na conversa da sessão, não no cartão.

## Cada parte

O prompt da sessão de estudo tem 4 passos, **um de cada vez**, e o tutor espera a sua resposta antes de seguir. Você pode fazer perguntas a qualquer momento.

1. **Por que esse conceito:** por que ele aparece ali, que problema resolve, o que prepara e para que serve na prática.
2. **Mapa:** o conceito e os subconceitos, na ordem da fonte (com capítulo e seção), cada termo com uma linha de significado. O tutor não explica ainda: pede que você explique com o que já sabe ou imagina, e não corrige.
3. **Ensino na linha do autor:** a explicação do jeito do autor (intuição, argumento, exemplos) e a definição formal; o tutor diz o que estava certo e errado na sua tentativa e usa o esquema da sua base real para a prática. Pode dividir em mais de uma rodada. Como você estuda na tablet e não roda código, o tutor escreve os scripts e explica, com a saída esperada, para você rodar depois no trabalho.
4. **Sua definição:** você escreve do zero, com as suas palavras, e pergunta até entender tudo.

No final saem duas coisas: o **flashcard** (CONCEPT, SOURCE, MAP, MY DEFINITION, PRACTICE FOR WORK em uma linha, WATCH OUT, KEY TERMS). O MAP lista o conceito e os subconceitos só pelos nomes, e o MY DEFINITION traz a sua definição de cada um e o **texto para ouvir** (cerca de 1.500 palavras, em prosa, com três perguntas para responder em voz alta), que você usa na tarefa Listening da mesma noite.

O flashcard traz as perguntas que fizeram você pensar e a sua definição corrigida. O prompt da sessão não revisa partes anteriores: isso é feito pelas **revisões espaçadas do app** (D+1, D+7, D+30), que
geram o prompt de revisão a partir do cartão salvo. Assim cada parte é revisada uma vez por dia marcado, e a sessão de estudo começa direto na parte nova.

- **Estudar:** abra a parte no app → **Copiar prompt da sessão de estudo** → nova conversa **dentro do Projeto**.
  Ao final, cole o flashcard em **Colar cartão** e marque a parte.
- **Revisar:** no dia, **Prompt** ao lado da revisão → conversa no mesmo Projeto. O veredito
  (REVIEW DONE → **Revisão feita** / REVIEW AGAIN → **Revisar de novo**) é o botão que você aperta no app.
  A revisão é curta: o agente lista o mapa (o conceito e todos os subconceitos, só os nomes), você define tudo de novo com as
  suas palavras, no seu tempo, e manda numa mensagem só; ele corrige tudo de uma vez com base no cartão. Nada de código na revisão. O app manda só o essencial do cartão (conceito, fonte, minha definição,
  cuidados e termos), sem as perguntas, o exemplo e o código da prática.

- **Áudio de revisão (último passo da sessão):** depois do cartão, o tutor escreve uma fala longa sobre a parte inteira, em prosa simples, sem
  símbolos nem código, com perguntas para responder em voz alta. Cole o texto em uma ferramenta de texto para voz e ouça no dia seguinte: serve de revisão
  e de treino de listening (ouça sem ler, depois lendo o texto, depois sem ler de novo, como no cartão Listening English).

## Prática com os seus dados

O agente do Projeto **não acessa os dados**: ele lê só a descrição/schema e escreve scripts completos
(Python com pandas, lendo os arquivos pelos caminhos descritos). Você roda no trabalho, depois cola a saída (ou conta
o que aconteceu) numa sessão seguinte, e ele interpreta. As instruções proíbem pedir ou exibir dados pessoais; os scripts trabalham com agregados.

## Observações

- Capacidades de ondas futuras podem ficar **Em espera** (Editar → Situação): saem das contagens até **Começar agora**.
- Em livros grandes, o Projeto tende a buscar trechos relevantes em vez de ler tudo de uma vez; por isso cada
  parte aponta capítulo/seção/páginas.
- A base de prática do app entra inteira nas instruções só se for curta; se for longa, entra pelo nome e o
  arquivo completo vai anexado ao Projeto.

## Prática no trabalho

Você estuda em casa, na tablet, onde não dá para rodar código. Por isso o prompt de estudo não pede que você rode nada na hora: o agente explica como fazer a prática, passo a passo, com o seu esquema, e entrega o mini-projeto como tarefa para o trabalho. O cartão de revisão registra o mini-projeto como pendente, para o trabalho, e na revisão seguinte o agente pergunta o que aconteceu.
