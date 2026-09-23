# Pessoa Necessária

App de estudos em um único arquivo (`pessoa-necessaria.html`), publicado como artifact do Claude:
https://claude.ai/artifact/EqeFFPLngiz23JeGZaRkwR

- **Calendário** no topo: sessões de trabalho, partes concluídas e revisões de cada dia; clique no dia para ver o detalhe.
- **Pessoa necessária**: texto de motivação para ler todos os dias.
- **Revisão espaçada**: parte de capacidade concluída → D+1. "Revisar de novo" → +1 dia. "Revisão feita" → D+7 → D+30 → lista futura (sem data).
- **Capacidades** e **Projetos**: prazos, partes, contagem da semana e do mês, registro de sessões e conclusão.

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

Cada parte traz prompts prontos (dividir em partes, sessão de estudo, revisão) e um cartão de revisão.
O passo a passo está em [`metodo/estudo-com-ia.md`](metodo/estudo-com-ia.md).

## Onde ficam os dados

A página guarda os próprios dados (capability `artifact`): cada alteração publica uma nova versão
com o estado embutido em `<script id="pn-data">`. Quem abre o link vê sempre a versão mais recente;
só quem tem permissão de edição consegue alterar. Este arquivo no repositório é o modelo
(com `null` nos dados, o app mostra exemplos) — os dados reais vivem no artifact.
