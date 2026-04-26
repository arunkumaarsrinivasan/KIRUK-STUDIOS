# Tasks — Kiruk

> Rolling task board. One source of truth for "what now?"
> When in doubt, match against `ROADMAP.md` phase exit criteria.
>
> Format: `- [ ] (priority: P0/P1/P2) <task> — owner: @handle — due: <date> — spec: <path>`
>
> **Vocabulary:** kirukargals = collaborators · kirukan = co-workers · kirukism = the movement

---

## Active — Phase 2 (Monorepo Scaffold + Kirukism Identity)

- [x] (P0) `pnpm-workspace.yaml` — workspaces: apps/*, packages/*
- [x] (P0) `apps/kiruk-web/` stub — package.json + README
- [x] (P0) `apps/kiruk-portal/` stub — package.json + README
- [x] (P0) Kirukism vocabulary in CLAUDE.md, VISION-MISSION.md, CONTRIBUTING.md, TASKS.md
- [x] (P0) Full monorepo ROADMAP.md rewrite (all phases + deploy topology)
- [ ] (P0) `packages/design-system/` migration — move `design-system/` → `packages/design-system/`, update all imports and specs — spec: openspec/specs/design-tokens/spec.md
- [ ] (P0) Root `turbo.json` — Turborepo build pipeline
- [ ] (P0) Update root `package.json` to use pnpm workspaces + turbo
- [ ] (P1) Smoke test: `pnpm install` from root resolves all workspaces

## Next — Phase 3 (kiruk-web)

- [ ] (P0) Next.js 15 scaffold in `apps/kiruk-web/` (App Router, Turbopack, TS, Tailwind)
- [ ] (P0) Import `@kiruk/design-system` as workspace package in kiruk-web
- [ ] (P0) Home route with Eye motif hero (EyePrimary + EyeConstellation)
- [ ] (P1) `/kirukism` route — manifesto + movement page
- [ ] (P1) `/ism` route — ISM series index
- [ ] (P1) `/services` route
- [ ] (P1) `/about` route
- [ ] (P1) `/devlog` route pulling from `content/devlogs/`
- [ ] (P2) Contact form → kirukargal intake
- [ ] (P0) Vercel deploy config + domain kiruk.studio

## Later — Phase 4+ (portal, ISM, kirukargals)

See `ROADMAP.md` Phases 4–7.

---

## Backlog / Ideas (not yet triaged)

- [ ] Social media pipeline spec (`openspec/specs/content-pipeline/spec.md`)
- [ ] `content/social/` output folder for devlog → social post conversion
- [ ] `/kiruk-collab-intake` slash command for kirukargal proposals
- [ ] First ISM experiment: which name from registry? (heroism / kirukism-series / colorism / nomadism)
- [ ] Case study rewrite: HP Print AI AX work
- [ ] Devlog template + first entry
- [ ] Notion workspace sync script (if needed alongside portal)
- [ ] `kiruk-creative-os/` package extraction (Year 2)

---

## Done (most recent first)

- [x] 2026-04-26 Kirukism vocabulary — ROADMAP, CLAUDE.md, VISION-MISSION.md, CONTRIBUTING.md
- [x] 2026-04-26 Monorepo scaffold — pnpm-workspace.yaml, apps/kiruk-web, apps/kiruk-portal stubs
- [x] 2026-04-XX Phase 1 brand spine — manifesto v1, Eye SVG components, token pipeline
- [x] 2026-04-XX Code-first design system — removed Pencil, React SVG Eye/* + Scribble, Style Dictionary
- [x] 2026-04-XX Phase 0 OS Bootstrap — all root docs, OpenSpec, specs, templates, scripts, slash commands

---

## Hygiene rules

- Every task maps to a spec path OR is tagged `(no-spec)` with justification.
- Move completed items to `## Done` with date.
- Dropped tasks → delete; log the "why" in `CHANGELOG.md`.
- Priority: **P0** = blocks phase exit · **P1** = phase scope · **P2** = nice-to-have.
