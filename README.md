# vinrpm.com

Site estático da RPM – Natural Wines & Spirits, publicado pelo GitHub Pages.
Substitui o WordPress, com o mesmo aspeto e os mesmos endereços. O GitHub monta o site
sozinho sempre que se altera um ficheiro (demora 1 a 2 minutos).

## O que nunca se muda

Os endereços das páginas dos vinhos. As garrafas têm QR codes que apontam para eles:

| Vinho | Inglês (QR) | Português |
|---|---|---|
| Analogue 2024 | `/detail/analogue_2024/` | `/pt/detail/analogue_2024-2/` |
| Duotone 2024 | `/detail/duotone-2024/` | `/pt/detail/duotone-2024-2/` |
| EQ 2024 | `/detail/eq-2024/` | `/pt/detail/eq-2024-2/` |
| Overdub Tinto 2024 | `/detail/ovdb-tinto-2024/` | `/pt/detail/ovdb-tinto-2024-2/` |
| Overdub Branco 2025 | `/detail/ovdb-branco-2025/` | `/pt/detail/ovdb-branco-2025-2/` |
| Analogue 2023 (esgotado) | `/detail/analogue/` | `/pt/detail/analogue-2/` |
| EQ 2023 (esgotado) | `/detail/eq/` | `/pt/detail/eq-2/` |
| Looper 2023 (esgotado) | `/detail/looper/` | `/pt/detail/looper-2/` |
| Reverb 2023 (esgotado) | `/detail/reverb/` | `/pt/detail/reverb-2/` (QR) |
| Overdub Tinto 2023 (esgotado) | `/detail/ovdb-tinto/` | `/pt/detail/ovdb-tinto-2/` |
| Overdub Branco 2023 (esgotado) | `/detail/ovdb-branco/` | `/pt/detail/ovdb-branco-2/` |

Cada endereço corresponde a uma pasta com um `index.html` (por exemplo `detail/eq-2024/index.html`).
Não apagar nem renomear essas pastas.

## Onde está cada coisa

- `_data/vinhos/` — um ficheiro por vinho: nome, ano, cor do cartão, foto, casta, ficha técnica,
  informação nutricional e os textos em inglês e português.
- `_data/grelha.yml` — que vinhos aparecem na grelha da página inicial, e por que ordem.
- `_includes/conteudo/` — os textos da página inicial (introdução, história, contactos), em `-en` e `-pt`.
- `_data/textos.yml` — palavras fixas da interface (menu, "Mais info", rótulos da tabela nutricional).
- `wp-content/uploads/` — imagens e PDFs, nos mesmos caminhos que tinham no WordPress.
- `wp-content/themes/` — CSS, fontes e JavaScript do tema original.

## Corrigir um texto de um vinho

Abrir o ficheiro do vinho em `_data/vinhos/`, carregar no lápis (Edit), mudar o texto entre aspas, e
"Commit changes". Se o texto tiver aspas, escrevê-las como `\"`.

## Acrescentar um vinho novo

1. Pôr a foto e a ficha técnica em `wp-content/uploads/2026/...` (Add file → Upload files).
2. Copiar um ficheiro de `_data/vinhos/` com o nome do vinho novo (ex.: `ovdb-branco-2024.yml`) e preencher.
3. Criar as duas páginas, cada uma com este conteúdo (mudando o nome e o endereço):

   `detail/ovdb-branco-2024/index.html`
   ```
   ---
   layout: vinho
   vinho: ovdb-branco-2024
   lang: en
   permalink: /detail/ovdb-branco-2024/
   ---
   ```
   `pt/detail/ovdb-branco-2024-2/index.html`
   ```
   ---
   layout: vinho
   vinho: ovdb-branco-2024
   lang: pt
   permalink: /pt/detail/ovdb-branco-2024-2/
   ---
   ```
4. Para aparecer na página inicial, acrescentá-lo a `_data/grelha.yml`.

Quando um vinho esgota, basta tirá-lo de `_data/grelha.yml`. A página continua no ar para os QR codes.

## Domínio

Durante os testes o site está em https://cataleitao.github.io/vinrpm/ e `_config.yml` tem `baseurl: "/vinrpm"`.
No dia da mudança: `baseurl: ""`, ficheiro `CNAME` com `vinrpm.com`, e DNS apontado para o GitHub Pages.

## Endereços antigos do WordPress

`/the-quinta/`, `/wines/`, `/contacts/`, `/pt/a-quinta/`, `/pt/vinhos/`, `/pt/contactos/`, `/pt/`, `/detail/`,
`/pt/detail/` e `/hello-world/` redirecionam para a secção correspondente da página inicial.
