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

## Prática primeiro (opção por capacidade)

Em **Editar** a capacidade, marque **Prática primeiro** e, se quiser, cole o **link dos resultados da prática** (a página
com os números e as explicações dos conceitos, calculados no seu projeto real). Vale para capacidades profissionais; o
idioma e a leitura seguem como antes. As partes continuam as mesmas.

Aqui você aprende **na página de prática**. O Projeto Claude só responde às suas perguntas e corrige as suas explicações.

- **Instruções do Projeto:** as fontes, o parts.txt, a descrição das bases e os resultados da prática (link e
  STUDY_PACK.md), mais o combinado: você usa o mapa de conceitos da parte, faz active recall explicando cada conceito
  na prática com os exemplos reais, e o tutor só responde e corrige; quando você explica tudo, ele aprova e você volta
  para revisar depois de um intervalo. As regras de idioma ficam.
- **Prompt da sessão de estudo (curto):** 1) mapa (conceito e subconceitos, só os nomes, na ordem da página, com a aba
  de cada um; se a página não tem a aba da parte, o tutor avisa e para); 2) você estuda na página e tenta explicar cada
  conceito com os exemplos reais; o tutor só responde e corrige, dizendo o que acertou, o que esqueceu, o que errou e o
  que melhorar; 3) quando você explica tudo ele diz APPROVED; se não, diz AGAIN com o que melhorar e você tenta de novo
  **amanhã**, não na semana ou no mês seguinte. Não há flashcard nem texto para ouvir nesse prompt.
- **Marcar a parte:** depois do APPROVED, marque como concluída. A revisão é D+1, D+7 e D+30, com o limite diário.
- **Prompt de revisão (curto):** o tutor dá o mapa, você explica cada conceito de memória com os exemplos reais, e ele
  responde REVIEW DONE ou REVIEW AGAIN (que volta amanhã).

## Ferramenta de repetição espaçada

- **Controle dos dias:** o padrão são 3 repetições, 1, 7 e 30 dias (a 1ª depois de concluir a parte, a 2ª depois da 1ª,
  a 3ª depois da 2ª). Mude em **Ajustar o guia** (vale para tudo) ou em **Editar** a capacidade (só para ela, ex.: 3, 10, 40).
  Revisão que precisa voltar volta sempre amanhã. O limite por dia (2 em dias úteis, 6 no fim de semana) continua.
- **Prazo da capacidade com a última repetição:** na página da capacidade, o app mostra o fim previsto (a última
  repetição de cada parte, feita ou por fazer), compara com o prazo e diz até quando estudar a última parte
  (prazo menos a soma dos dias). O "prazo pelas partes" sugerido já soma os dias da última repetição.
- **Nota em markdown ao terminar a repetição:** quando você marca a última repetição de uma parte (capacidades com
  Prática primeiro), o app pede a nota do Obsidian: aparece "nota pendente" no guia e na seção de revisões, e na parte há o
  botão **Copiar prompt: nota em markdown**. Cole a nota gerada em **Colar nota**; dá para **Baixar .md** de uma parte ou
  **Baixar todas as notas** (um arquivo).

Teste inicial: capacidade **Statistics for Data Science**, com a página "Statistics in Practice".
