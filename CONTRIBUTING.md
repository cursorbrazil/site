# Contribuindo com o site Cursor Brasil

Este repo alimenta o [cursorbrasil.com.br](https://www.cursorbrasil.com.br). Todo conteúdo mora em arquivos TypeScript dentro de `content/`, sem banco de dados e sem CMS: mudou o arquivo, abriu PR, mergeou, foi pro ar. O deploy é automático em cada merge na `main`, e todo PR ganha um preview com URL própria pra você conferir antes.

## O que você NÃO precisa fazer aqui

Eventos futuros. O site puxa sozinho os eventos do calendário Luma de cada capítulo, de hora em hora. Criou o evento no Luma do seu capítulo, ele aparece no site sem tocar em código.

## Setup

Precisa de Node 22+ e pnpm 10.

```bash
git clone git@github.com:cursorbrazil/site.git
cd site
pnpm install
cp .env.example .env.local
pnpm dev
```

Site em http://localhost:3000.

## Receitas

### Publicar o recap de um evento

1. Coloque as fotos do card em `public/images/events/<cidade>/<id-do-evento>/`. `<cidade>` é o token da foto, `aracaju`, `canela`, `floripa`, `rio` ou `sp`, e não o slug do capítulo. `<id-do-evento>` é o `id` em `content/events.ts`. O nome do arquivo continua descritivo e com data, no formato `recife-2026-07-01.jpg`. Um token de cidade novo também entra em `PhotoCity` em `lib/types.ts`. Nunca reaproveite um nome de arquivo existente trocando o conteúdo. O cache de imagens serve a versão antiga pra sempre.
2. Copie `content/recaps/example-event.ts` pra um arquivo novo (ex.: `recife-2026-07.ts`), troque o slug e preencha. Todas as seções (palestrantes, projetos, destaques, links) são opcionais.
3. Registre o recap em `content/recaps/index.ts`.
4. Em `content/events.ts`, adicione (ou edite) a entrada do evento com `status: 'past'`, `thumbnail`, `galleryImages` (2 fotos viram colagem no card) e `recapPath: '/recaps/seu-slug'`. Uma entrada manual com a mesma `lumaUrl` do feed substitui a versão automática.

### Adicionar fotos ao mosaico do topo

Adicione as fotos em `public/images/events/<cidade>/hero/` e registre em `content/header-photos.ts` com um `alt` descritivo em português. Acrescente no fim da lista. Não reordene `headerPhotoPool` e não apague a entrada duplicada de `aracaju-hero-05.jpg`. O embaralhamento depende do índice. Depois rode `pnpm validate:bento`.

### Atualizar seu capítulo

`content/chapters.ts`: organizadores, links de WhatsApp/Instagram, site próprio. Se criar capítulo de um estado novo, adicione a bandeira em `public/images/flags/{uf}.png` (PNG, 168px de largura).

### Entrar como embaixador

`content/ambassadors.ts`, em ordem alfabética por nome. Foto 400x400 em `public/images/ambassadors/`. Links de GitHub, LinkedIn, Instagram e site são opcionais, mas o GitHub ajuda a te acharmos pra dar acesso aqui.

## Antes de abrir o PR

```bash
pnpm verify
```

Roda formatação, lint, typecheck, validadores de conteúdo e o build de produção. É o mesmo check do CI: se passou local, passa lá.

## Abrindo o PR

1. Crie um branch a partir da `main` (`git checkout -b recap-recife-julho`).
2. Um assunto por PR: um recap, um ajuste de capítulo. PR pequeno é PR mergeado rápido.
3. Commits no padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/): `feat(content): recap do meetup Recife de julho`.
4. Print ou preview URL na descrição quando mudar algo visual.
5. A `main` é protegida: precisa de 1 aprovação. Depois do merge, o site atualiza em poucos minutos.

Dúvidas? Chama no grupo dos embaixadores.
