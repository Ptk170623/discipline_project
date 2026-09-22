# Pessoa Necessária

App de estudos em um único arquivo (`pessoa-necessaria.html`), publicado como artifact do Claude:
https://claude.ai/artifact/EqeFFPLngiz23JeGZaRkwR

- **Calendário** no topo: sessões de trabalho, partes concluídas e revisões de cada dia; clique no dia para ver o detalhe.
- **Pessoa necessária**: texto de motivação para ler todos os dias.
- **Revisão espaçada**: parte de capacidade concluída → D+1. "Revisar de novo" → +1 dia. "Revisão feita" → D+7 → D+30 → lista futura (sem data).
- **Capacidades** e **Projetos**: prazos, partes, contagem da semana e do mês, registro de sessões e conclusão.

## Onde ficam os dados

A página guarda os próprios dados (capability `artifact`): cada alteração publica uma nova versão
com o estado embutido em `<script id="pn-data">`. Quem abre o link vê sempre a versão mais recente;
só quem tem permissão de edição consegue alterar. Este arquivo no repositório é o modelo
(com `null` nos dados, o app mostra exemplos) — os dados reais vivem no artifact.
