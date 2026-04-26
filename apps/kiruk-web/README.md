# kiruk-web

> `apps/kiruk-web` — the public face of kiruk. Deploys to [kiruk.studio](https://kiruk.studio).

Studio website built on Next.js 15 (App Router, Turbopack). Consumes `@kiruk/design-system` tokens and Eye SVG components.

## Status

**Phase 3 — not yet scaffolded.** This stub marks the app's place in the monorepo.
See `ROADMAP.md` Phase 3 for the full plan.

## Planned routes

| Route | Purpose |
|---|---|
| `/` | Home — Eye motif hero, studio punch |
| `/kirukism` | The movement — manifesto, philosophy |
| `/ism` | ISM lab — experiment series index |
| `/services` | What kiruk builds with founders |
| `/about` | Arun + kirukan + kirukargals |
| `/devlog` | Transparent process log |
| `/case-studies` | Shipped universes |

## Deploy target

Vercel. Domain: kiruk.studio.

## Related

- Design system: `../../packages/design-system/` (workspace package `@kiruk/design-system`)
- Content: `../../content/devlogs/`, `../../content/case-studies/`
- Specs: `../../openspec/specs/`
