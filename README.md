# joao.codes

Personal profile site for [joao.codes](https://joao.codes), built with Vite and React.

## Development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm run build
```

## Deploy

The site is a static build served by Cloudflare Workers with static assets.
`wrangler.jsonc` points the Worker at `dist`.

Cloudflare Workers Builds settings:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

To deploy by hand:

```bash
npm run build
npx wrangler deploy
```
