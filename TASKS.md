# Tasks — Kiruk

> Rolling task board. One source of truth for "what now?"
> When in doubt, match against `ROADMAP.md` phase exit criteria.
>
> Format: `- [ ] (priority: P0/P1/P2) <task> — owner: @handle — due: <date> — spec: <path>`
>
> **Vocabulary:** kirukargals = collaborators · kirukan = co-workers · kirukism = the movement

---

## Active — Founder input (most answered 2026-05-26)

- [x] (P0) 2026-05-18 — Strategy locks ST1–ST4 (lab-led, transparency boundary, product surface, automation streams)
- [x] (P0) 2026-05-26 — **B1–B5** brand (eye-mark placeholder, custom wordmark, B&W+absurd-assets, hand+sans, light-only)
- [x] (P0) 2026-05-26 — **W1–W7** website (POV desk + 2.5D hands, desk-object nav, note-on-desk contact, just-Arun, kiruk.in/studio)
- [x] (P0) 2026-05-26 — **AU2** brand-CI runner = Husky + Actions
- [x] (P1) 2026-05-26 — **S1–S2** all platforms, full production · **P1–P3** client read-view, Better-Auth, full record · **M1–M2** tagline meaning + kirukargal def
- [ ] (P0) **I1–I2** — first ISM (which one + concept) — STILL OPEN, unblocks Phase 5
- [ ] (P0) **PR1–PR3** — first product (name, deploy, metric) — STILL OPEN, unblocks Phase 3.5
- [ ] (P0) **AU1** — content-pipeline runner — STILL OPEN, unblocks Phase 4.5
- [ ] (P1) I3 done (ISM ships as page on studio site)

---

## Active — Phase 2 (Monorepo Scaffold + Kirukism Identity)

- [x] (P0) `pnpm-workspace.yaml` — workspaces: apps/_, packages/_
- [x] (P0) `apps/kiruk-web/` stub — package.json + README
- [x] (P0) `apps/kiruk-portal/` stub — package.json + README
- [x] (P0) Kirukism vocabulary in CLAUDE.md, VISION-MISSION.md, CONTRIBUTING.md, TASKS.md
- [x] (P0) Full monorepo ROADMAP.md rewrite (all phases + deploy topology)
- [x] (P0) `packages/design-system/` migration — moved `design-system/` → `packages/design-system/`, all path refs updated — spec: openspec/specs/design-tokens/spec.md
- [ ] (P0) Root `turbo.json` — Turborepo build pipeline
- [ ] (P0) Update root `package.json` to use pnpm workspaces + turbo
- [ ] (P1) Smoke test: `pnpm install` from root resolves all workspaces

## Active — Phase 3 (kiruk-web) [~ in progress]

- [x] (P0) Astro 5 scaffold (not Next.js) — config, layout, Tailwind v4, /studio base
- [x] (P0) Sketch design system in-app — fonts, sketch CSS, primitives (SketchNav/Button), eye CustomCursor
- [x] (P0) Home route — cursor pencil field + KIRUK wordmark + handwritten copy + sketch nav
- [ ] (P0) **Fix pencil-stroke feel** (smoke → real graphite strokes)
- [ ] (P0) **POV desk + 2.5D hands** hero (W1) — phase after launch
- [ ] (P0) Promote sketch primitives → `@kiruk/design-system` (currently app-local)
- [ ] (P1) Build routes: `/kirukism` `/ism` `/products` `/services` `/about` `/devlog`
- [ ] (P1) `/devlog` via Velite from `content/devlogs/`
- [ ] (P2) "Leave a note on the desk" contact (W5)
- [ ] (P0) Vercel deploy under kiruk.in/studio

## Active — Phase 4 (kiruk-portal: scribble → handoff) [~ in progress]

- [x] (P0) Next.js 15 + Tailwind v4 scaffold, B&W sketch design
- [x] (P0) `/proposals/new` scribble-proposal canvas (pen draw, undo, clear, export)
- [x] (P0) `/onboard` client onboarding — detail → archetype quiz → vibe sliders → scribble → product vision → summary
- [ ] (P0) **Slice 2:** universe dashboard + lifecycle state machine; server actions write onboarding → `intake.md`/`state.md`, scribbles → universe `scribble/`
- [ ] (P0) **Slice 3 [needs architecture lock]:** Better-Auth + Neon/Drizzle; client read-only view; replace localStorage/file persistence with DB
- [ ] (P1) **Slice 4:** real-time collaborative scribble (client marks back) + collaborative-call hook + Vercel deploy
- [ ] (P1) OpenSpec: redefine `proposal` artifact (client-lifecycle / template-proposal) prose-doc → scribble-canvas
- [ ] (P2) Font-license clearance before portal goes public (shared with kiruk-web)

## Later — Phase 4.5+ (automation, ISM, kirukargals)

See `ROADMAP.md` Phases 4.5–7.

---

## Active — Spec apply work (post-validation, pre-archive)

- [x] (P0) 2026-05-18 — `expand-studio-model` proposal validated (`npx openspec validate expand-studio-model --strict` passes)
- [x] (P0) 2026-05-18 — `lock-tech-stack` proposal authored + validated — `tech-stack` capability spec locks 2026 envelope
- [ ] (P0) Apply `expand-studio-model`: full specs already authored at `openspec/specs/<cap>/spec.md`; move proposal folder to `openspec/archive/expand-studio-model/` once founder reviews — spec: openspec/changes/expand-studio-model/
- [ ] (P0) Apply `lock-tech-stack`: move proposal folder to `openspec/archive/lock-tech-stack/` once founder reviews — spec: openspec/changes/lock-tech-stack/
- [ ] (P1) `wire-husky` proposal — `pnpm install` + bootstrap Husky hooks (after Node 22 + pnpm 10 are local)
- [ ] (P1) `wire-biome` proposal — install Biome + run initial `biome format --write .`
- [ ] (P1) `wire-lighthouse-ci` proposal — real Lighthouse budgets per app route once apps build
- [ ] (P1) Author `pick-first-product` proposal once PR1 is answered — spec: openspec/specs/products/spec.md
- [ ] (P1) Author `wire-content-pipeline` proposal once AU1 is answered — spec: openspec/specs/content-pipeline/spec.md
- [ ] (P1) Author `wire-brand-ci` proposal once AU2 is answered — spec: openspec/specs/brand-consistency-ci/spec.md
- [ ] (P2) Author `wire-client-lifecycle` proposal — `/kiruk-archive` slash command + state.md template — spec: openspec/specs/client-lifecycle/spec.md
- [ ] (P2) Update `scripts/capture-session.mjs` + `scripts/promote-idea.mjs` to write/require `scribble` field — spec: openspec/specs/idea-capture/spec.md

## Backlog / Ideas (not yet triaged)

- [x] Social media pipeline spec → graduated to `content-pipeline` capability 2026-05-18
- [x] `content/social/` output folder → scaffolded 2026-05-18
- [ ] `/kiruk-collab-intake` slash command for kirukargal proposals
- [ ] First ISM experiment: which name from registry? (heroism / kirukism-series / colorism / nomadism)
- [ ] Case study rewrite: HP Print AI AX work
- [ ] Devlog template + first entry (use `content-pipeline` front-matter contract)
- [ ] First product scribble — physical sketch before any code (per pen-and-paper)
- [ ] Notion workspace sync script (if needed alongside portal)
- [ ] `kiruk-creative-os/` package extraction (Year 2)

---

## Done (most recent first)

- [x] 2026-05-26 `adopt-sketch-direction` OpenSpec change applied + archived — mono tokens (paper/ink/pencil + absurd assets), hand+sans fonts, light-only, drawn-eye/placeholder CI tolerance, dropped 14-day devlog floor, kiruk.in/studio base path. Validates 23/23
- [x] 2026-05-26 Founder-decisions session — all B/W/S/P/M + AU2 answered, recorded in FOUNDER_DECISIONS.md
- [x] 2026-05-26 kiruk-web sketch foundation — Astro 5, ported kiruk.in hand fonts, sketch CSS system + primitives, pencil cursor field hero, eye cursor, bottom nav, /studio base
- [x] 2026-05-26 Repo tidy — removed npm package-lock (pnpm-only), gitignore .astro/.vercel/\*.tsbuildinfo, fixed CLAUDE.md Astro/Next, moved vision plan into docs/
- [x] 2026-05-18 Foundation hardening for OSS launch — config infra, OSS compliance docs (CoC, Security, Governance, CITATION.cff, FUNDING, CODEOWNERS, issue templates), dual license split (MIT code + CC-BY 4.0 content), CI workflows (openspec/tokens/doctor), knowledge layer (GLOSSARY, docs/, spec template), pen-and-paper wired into scripts, README rewrite with badges + nav diagram
- [x] 2026-05-18 Strategy locks ST1–ST4: lab-led, transparency boundary, full product surface, all 4 automation streams active
- [x] 2026-05-18 OpenSpec proposal `expand-studio-model` authored + validated — 6 new capabilities (products, build-in-public, content-pipeline, client-lifecycle, pen-and-paper, brand-consistency-ci), 2 modified (idea-capture, ism)
- [x] 2026-05-18 VISION-MISSION.md restated as lab-led with product line + transparency principles + 12 principles
- [x] 2026-05-18 CLAUDE.md vocab, non-negotiables, repo orientation, automation surface section updated
- [x] 2026-05-18 ROADMAP.md Phase 3.5 (Product Track) + Phase 4.5 (Automation Spine) inserted
- [x] 2026-05-18 FOUNDER_DECISIONS.md STRATEGY section + PR1–PR3 + AU1–AU2 question blocks added
- [x] 2026-04-26 Kirukism vocabulary — ROADMAP, CLAUDE.md, VISION-MISSION.md, CONTRIBUTING.md
- [x] 2026-04-26 Monorepo scaffold — pnpm-workspace.yaml, apps/kiruk-web, apps/kiruk-portal stubs
- [x] 2026-04-XX Phase 1 brand spine — manifesto v1, Eye SVG components, token pipeline
- [x] 2026-04-XX Code-first design system — removed Pencil, React SVG Eye/\* + Scribble, Style Dictionary
- [x] 2026-04-XX Phase 0 OS Bootstrap — all root docs, OpenSpec, specs, templates, scripts, slash commands

---

## Hygiene rules

- Every task maps to a spec path OR is tagged `(no-spec)` with justification.
- Move completed items to `## Done` with date.
- Dropped tasks → delete; log the "why" in `CHANGELOG.md`.
- Priority: **P0** = blocks phase exit · **P1** = phase scope · **P2** = nice-to-have.
