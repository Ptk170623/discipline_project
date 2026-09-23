# Estudo com IA — o método dentro do app

Para livros em que o objetivo é aprender os **conceitos** (matemática, estatística, ferramentas como git),
e não acompanhar o raciocínio do autor. Cada capacidade tem seus livros de referência; cada **parte** é um conceito.

| Etapa do método | Onde acontece |
| --- | --- |
| 1. Identificar o valor prático do conceito | Nota da parte (vem do plano) e início da sessão |
| 2. Identificar o conceito e os subconceitos | As partes da capacidade (prompt "dividir em partes") |
| 3. Tentar explicar antes de aprender | Sessão com IA |
| 4. Definição com as próprias palavras, do zero | Sessão com IA |
| 5. Comparar com a definição correta | Sessão com IA |
| 6. Atualizar a definição | Sessão com IA → vira o **cartão de revisão** |
| Prática: demonstração e mini-projeto | Sessão com IA, na **base de prática** |
| 7. Explicar de novo com repetição espaçada | Revisões D+1 → D+7 → D+30 do app (prompt de revisão) |

## Base de prática

Em **Capacidades → Configurar base**, descreva a base de dados que o agente de ensino vai usar
(arquivos, tabelas, colunas, como acessar). Se preferir, anexe a base numa conversa com o Claude e use
**Copiar prompt: descrever a base**; cole a descrição gerada. Cada capacidade pode ter uma base própria
em Editar (por exemplo, um repositório de teste para git); em branco, vale a base padrão.

Com a base configurada, os prompts pedem:

- **no plano**, um mini-projeto de 20 a 60 minutos por parte (vira a nota `> Mini-projeto: ...`);
- **na sessão**, uma demonstração do conceito na base (código ou consultas e a interpretação), um erro comum
  e o mini-projeto com critérios de pronto, que a IA revisa;
- **na revisão**, uma pergunta de aplicação na base e a cobrança do mini-projeto que ficou pendente.

Se o agente puder executar código com acesso à base (por exemplo, arquivos anexados numa conversa com execução
de código, ou o Claude Code na pasta da base), ele roda de verdade; se não puder, ele escreve o código pronto
para você rodar e pede a saída.

## O fluxo

1. **Planejar** — na capacidade, cadastre os livros (Editar → Livros de referência) e toque em
   **Copiar prompt: dividir em partes**. Cole numa conversa com o Claude. A resposta vem no formato de
   importação; copie e use **Importar** na mesma capacidade. Cada parte chega com prazo e nota de valor prático.
   Para várias capacidades de uma vez, use o botão do prompt na tela **Importar arquivo** da lista de Capacidades.
2. **Estudar** — no dia, abra a parte e toque em **Copiar prompt da sessão de estudo**. A IA conduz as etapas
   uma a uma e, no fim, gera o cartão (CONCEITO, PERGUNTA, MINHA DEFINIÇÃO, REFERÊNCIA, APLICAÇÃO, PONTOS DE ATENÇÃO).
   Cole o cartão em **Colar cartão**, marque **Trabalhei nesta parte hoje** e, quando dominar, **Marcar como concluída**.
3. **Revisar** — no dia seguinte a parte aparece em Revisão espaçada. Toque em **Prompt** ao lado dela: a IA faz a
   pergunta do cartão, compara com a sua definição e termina com **REVISÃO FEITA** ou **REVISAR DE NOVO** —
   é o botão que você aperta no app.

## Dica: um Projeto no Claude

Crie um Projeto (por exemplo "Estudos") e deixe todas as sessões dentro dele, uma conversa por conceito.
Se você tiver os livros em PDF, adicione-os ao conhecimento do Projeto: as explicações passam a seguir o conteúdo
desses livros. Os prompts do app já trazem tudo o que a IA precisa, então o Projeto é opcional.
