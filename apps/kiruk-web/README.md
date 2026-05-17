# kiruk-web

> `apps/kiruk-web` — the public face of kiruk. Deploys to [kiruk.studio](https://kiruk.studio).

Public studio website built on **Astro 5** (island architecture, content collections, zero-JS-by-default).

## Why Astro and not Next.js

This app is **content-first** — manifesto, devlogs, case studies, ISM showcase, products gallery, about. Astro 5 ships near-zero JavaScript for static routes while still allowing React islands for heavy interactive surfaces (WebGL hero, signature transitions). On the LCP / TBT / JS-budget metrics that define Awwwards-tier craft, Astro beats Next.js for this profile.

The decision is locked in [`openspec/specs/tech-stack/spec.md`](../../openspec/specs/tech-stack/spec.md) → **"kiruk-web uses Astro 5"**. The internal portal at `apps/kiruk-portal/` still uses Next.js 15 — it is dashboard- and auth-heavy and benefits from RSC + Server Actions.

## Status

**Phase 3 — not yet scaffolded.** This stub marks the app's place in the monorepo and pins the framework + libraries. Real scaffold lands after `FOUNDER_DECISIONS.md` brand and website locks (B1–B5, W1–W7) are answered.

When ready:

```bash
pnpm create astro@latest apps/kiruk-web -- --template minimal --typescript strict --no-install --no-git
pnpm install
```

Then wire `@astrojs/react`, `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/vercel`, Tailwind v4 via `@tailwindcss/vite`, Velite for content collections, R3F for the WebGL island, Motion + GSAP for transitions.

## Planned routes

| Route | Purpose | JS budget |
|---|---|---|
| `/` | Home — Eye motif hero, studio punch (WebGL island) | ≤ 150 KB |
| `/kirukism` | Manifesto, philosophy | 0 KB |
| `/ism` | ISM lab — experiment series index | ≤ 50 KB |
| `/products` | In-house product gallery | ≤ 50 KB |
| `/services` | What kiruk builds with founders | 0 KB |
| `/about` | Arun + kirukan + kirukargals | 0 KB |
| `/devlog` | Transparent process log (MDX via Velite) | 0 KB |
| `/case-studies` | Shipped universes | ≤ 50 KB |

Budgets enforced via `size-limit` + Lighthouse CI per [`tech-stack`](../../openspec/specs/tech-stack/spec.md) → "Performance budgets per route".

## Stack inside this app

| Layer | Choice | Source |
|---|---|---|
| Framework | Astro 5 | `tech-stack` spec |
| Component runtime | React 19 (island only) | `tech-stack` spec |
| Styling | Tailwind v4 + `@kiruk/design-system` CSS vars | `tech-stack` spec |
| Content | MDX 3 + Velite | `tech-stack` spec |
| Animation | Motion v11 + GSAP 3 | `tech-stack` spec |
| 3D | Three.js r170 + R3F 9 + drei | `tech-stack` spec |
| Validation | Zod 4 | `tech-stack` spec |
| Images | Sharp at build + AVIF + WebP | `tech-stack` spec |

## Deploy target

Vercel via `@astrojs/vercel`. Domain: kiruk.studio.

## Related

- Design system: `../../packages/design-system/` (workspace package `@kiruk/design-system`)
- Content: `../../content/devlogs/`, `../../content/case-studies/`, `../../content/story-drops/`
- Specs: `../../openspec/specs/`
