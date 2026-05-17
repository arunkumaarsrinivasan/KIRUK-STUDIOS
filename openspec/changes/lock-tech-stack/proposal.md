# Proposal: lock-tech-stack

## Why

Kiruk launches as an open-source creative OS. The world will judge it by craft — Lighthouse scores, frame budgets, JS-bundle size, build speed, contributor DX. Today the repo names a few tools (Next.js 15, React 19, Tailwind, Style Dictionary, Three.js) but does not lock the full stack across the studio + lab + product line. Drift will happen the moment a contributor or product picks something else without a stated reason.

This proposal locks the 2026 best-in-class envelope for every layer — runtime, package manager, monorepo orchestrator, lint, framework per app surface, styling, animation, 3D, content, database, auth, backend, validation, state, testing, performance, observability, deploy. Every locked choice has a written reason and a named successor on watch.

The core decisions (researched, January 2026):

- **Node 22 LTS** (was floor ≥20) for active LTS + improved perf.
- **pnpm 10** (was 9) for faster install + better workspace isolation.
- **Biome 2 for code + Prettier for markdown** — single tool, 25× faster than ESLint+Prettier.
- **Husky + lint-staged + commitlint** with Conventional Commits — every commit gated.
- **kiruk-web → Astro 5** (was Next.js 15) — content-first studio site ships ~0 JS on static routes. Awwwards-tier studios moved to Astro in 2024–2025.
- **kiruk-portal → Next.js 15** (unchanged) — dashboard-heavy with auth and Server Actions.
- **Tailwind v4** (Oxide engine) — 5× faster, CSS-first config, consumes design-token CSS vars.
- **Motion v11 + GSAP 3** — Motion for React-component animation, GSAP for cinematic timelines.
- **Three.js r170+ via React Three Fiber 9 + TSL** — TSL shaders portable to WebGPU.
- **MDX 3 + Velite** for content (Contentlayer is unmaintained).
- **AVIF primary + WebP fallback + Sharp at build** for images.
- **Postgres on Neon + Drizzle ORM** (forbid Prisma in new code, forbid Spring Boot unless JVM-only workload demanded).
- **Better-Auth** for authentication.
- **Server Actions + Hono on Cloudflare Workers** for backend.
- **Zod 4 for validation, Zustand 5 for client state.**
- **Vitest 2 + Playwright 1.49+** for testing.
- **size-limit + Lighthouse CI** enforcing per-route JS + Core-Web-Vitals budgets.
- **Sentry + Vercel Speed Insights** for observability.
- **Vercel + Cloudflare hybrid** for deploys.

## What changes

### Added capability
- **`tech-stack`** at `openspec/specs/tech-stack/spec.md` — full locked envelope + successor watch list.

### Modified docs
- **`CLAUDE.md`** — replace the "Preferred stack" line with reference to `tech-stack` spec. Add new forbidden tools (Prisma in new code, Jest, ESLint, Cypress, Spring Boot unless justified).
- **`GLOSSARY.md`** — add stack vocab entries (TSL, Edge-ready, RSC, PPR, Locked choice, Successor).
- **`ROADMAP.md`** — add note that Phase 3 (kiruk-web) now scaffolds Astro 5, not Next.js.
- **`openspec/project.md`** — register `tech-stack` capability.

### Modified code
- **`package.json`** — bump `engines.node` to `>=22`, `packageManager` to `pnpm@10`, add scripts for `lint`, `lint:fix`, `typecheck`, `commit`, `prepare` (Husky), `size-limit`.
- **`tsconfig.base.json`** — new root TS config with strict flags.
- **`biome.json`** — new Biome config.
- **`commitlint.config.mjs`** — Conventional Commits.
- **`.husky/pre-commit`** + **`.husky/commit-msg`** — hooks.
- **`.size-limit.cjs`** — placeholder budgets.
- **`apps/kiruk-web/package.json`** + **`README.md`** — switch to Astro 5 (no Astro install yet; stub the framework choice + scripts).
- **`apps/kiruk-portal/package.json`** — bump Next.js peer ranges, pin React 19, add Drizzle/Better-Auth as dev hints.

## Impact

- **Specs touched:** 1 new (`tech-stack`) + project.md registration. No existing capability spec is breaking-modified.
- **Code touched:** root config files; app stubs (no real code yet); package.json scripts.
- **Risk:** the kiruk-web stub switch from Next.js to Astro is the biggest change. Mitigation: kiruk-web has no app code yet — only `package.json` + `README.md` stubs. Switch is metadata-only at this stage. Founder can revert to Next.js by amending this spec if Astro feels wrong once they start building.
- **Downstream:** Phase 3 (kiruk-web build) starts with `pnpm create astro@latest` not `pnpm create next-app`. Phase 3.5 (first product) picks deploy target per the deploy table in `tech-stack`.

## Deltas

See `./specs/tech-stack/spec.md` for the ADDED-Requirements delta.
