# Roadmap — Kiruk

> Living plan. Change freely — log the "why" in `CHANGELOG.md`.
> Status markers: `[ ]` pending · `[~]` in-progress · `[x]` done · `[–]` dropped.
>
> **Kirukism vocabulary:** `kiruk` = the studio · `kirukism` = the movement/cult/philosophy · `kirukargals` = collaborators who believe in the vision · `kirukan` = co-workers inside kiruk.

---

## What this repo holds

One monorepo. Everything that is kiruk lives here:

- Ideology, vision, mission, brand
- `apps/kiruk-web` — public studio website (deploys independently)
- `apps/kiruk-portal` — client management, universe tracking, deliverables (deploys independently)
- `kiruk-ism/` — ISM experiment series (each ISM ships independently)
- `kiruk-projects/` — client universes (per-universe deploy or handoff)
- `kiruk-projects/_products/` — **in-house digital products** (each ships independently; long-game IP layer)
- `packages/design-system/` — shared tokens, React SVG components (consumed by all apps)
- `openspec/` — spec truth, change proposals, archive
- `content/` — manifesto, devlogs (≥1 every 14 days), case studies, story drops, social derivatives, scribbles
- `ideas/` — inbox, log (with `scribble` field), promoted pipeline
- `.brand-ci/` — automated coverage reports (gitignored)

---

## Phase 0 — OS Bootstrap [x DONE]

**Goal**: Stand up the studio operating system.

- [x] Root docs: CLAUDE.md, AGENTS.md, README, VISION-MISSION, ROADMAP, TASKS, CHANGELOG
- [x] OpenSpec scaffold + core specs (brand-system, design-tokens, idea-capture, ism, repo-privacy, operational-learning)
- [x] 7 template spec+generator pairs
- [x] DTCG token files (core, semantic, type, motion, components) + Style Dictionary build
- [x] Token pipeline live: `npm run tokens:build` → CSS/Tailwind/TS
- [x] Scripts: build-tokens, capture-session, promote-idea
- [x] 5 slash commands
- [x] SessionEnd hook wired in `.claude/settings.json`
- [x] Smoke test: `npx openspec validate` passes

---

## Phase 1 — Brand Spine [x DONE]

**Goal**: Define the kiruk brand inside its own system.

- [x] `content/manifesto.md` v1 — kirukism philosophy, 4 pillars, non-negotiables
- [x] Eye SVG components: EyePrimary, EyeIris, EyeGaze, EyePortal, EyeConstellation, Scribble
- [x] Core DTCG palette (void, iris-core, portal-glow, halo-warm, kohl, paper)
- [x] Type pairing (rational: Inter · expressive: Playfair Display · mono: JetBrains Mono)
- [x] 4 motion motifs: gaze-track, iris-dilate, portal-transition, cursor-orbit
- [x] brand-system spec authored; design-tokens spec authored

---

## Phase 2 — Monorepo Scaffold + Kirukism Identity [x DONE]

**Goal**: Shape the repo as a true monorepo and encode kirukism as the studio's core identity.

- [x] `pnpm-workspace.yaml` — workspaces: apps/_, packages/_
- [x] `apps/kiruk-web/` — stub with package.json, README (framework later switched Next.js → **Astro 5** per tech-stack lock)
- [x] `apps/kiruk-portal/` — client portal stub with package.json, README
- [x] Kirukism vocabulary in CLAUDE.md, VISION-MISSION.md, CONTRIBUTING.md
- [x] Full monorepo ROADMAP (this file)
- [x] `packages/design-system/` migration — moved `design-system/` → `packages/design-system/` as `@kiruk/design-system`
- [x] Root `turbo.json` — Turborepo build pipeline
- [x] `package.json` updated — pnpm@9, turbo scripts

---

## Phase 3 — kiruk-web v0 (website) [~ IN PROGRESS]

**Goal**: Studio public face — lab-led front door. Deployed from `apps/kiruk-web/`. Independent deploy → Vercel.

> **Stack lock:** Astro 5 + React 19 islands + Tailwind v4 + Motion v11 + GSAP 3 + Three.js r170+ + R3F 9 + Velite for MDX content. See [`openspec/specs/tech-stack/spec.md`](openspec/specs/tech-stack/spec.md).

> ✅ **Unblocked 2026-05-26** — brand + website decisions answered in [`FOUNDER_DECISIONS.md`](FOUNDER_DECISIONS.md) (B1–B5, W1–W7) and applied via the `adopt-sketch-direction` OpenSpec change. Direction: hand-drawn **black-&-white sketch**, POV designer's-desk hero, ship under **kiruk.in/studio**.

- [x] Brand pass — mono token palette (paper/ink/pencil + absurd-asset color) + hand & body-sans fonts confirmed in tokens
- [x] Astro 5 scaffold + sketch design system (fonts, sketch CSS, primitives) + home hero (cursor pencil field + KIRUK wordmark)
- [x] Eye cursor + bottom sketch nav; `/studio` base path wired (`src/lib/base.ts`)
- [~] `@kiruk/design-system` consumed — currently app-local CSS vars; promote primitives into the package next
- [ ] **Fix pencil-stroke feel** — current field reads like smoke; rework to stamped graphite strokes
- [ ] **POV desk + 2.5D hands** hero (W1/W3) — the full concept; phase after launch
- [x] Route structure built out — `/kirukism`, `/ism`, `/products`, `/services`, `/about` + `/devlog` stub, all on-voice (manifesto/vision-derived), reusing `Base` + sketch nav + new `EyeMark` (eye-motif on every page). `astro build` green (7 pages).
- [x] Devlog index + post pages pulling from `content/devlogs/` via **Velite** — `velite.config.ts` + an Astro integration runs Velite on setup (watch in dev) → `.velite/` typed data; `/devlog` lists entries, `/devlog/[slug]` renders the markdown body. `astro build` green (8 pages, the one existing entry rendered). The build-in-public devlog loop is live.
- [ ] Case studies pulling from `content/case-studies/`
- [ ] "Leave a note on the desk" contact flow (W5) wired
- [ ] Deploy: Vercel under `kiruk.in/studio` base
- [ ] Domain: dedicated kiruk domain later (W7)

**Exit**: site live at kiruk.in/studio; routes render; devlog loop working.

---

## Phase 3.5 — Product Track v0 (in-house digital products)

**Goal**: Ship the first kiruk-owned product. Lab-led strategy means a product launch is part of the front-door story, not a post-services afterthought.

> 🔒 **BLOCKED — needs founder direction first.**
> Required locks: **PR1, PR2, PR3** in [`FOUNDER_DECISIONS.md`](FOUNDER_DECISIONS.md) (added under PRODUCTS section).
> Governed by `openspec/specs/products/spec.md`.

- [ ] **[needs PR1 locked]** Founder picks first product: slug, name, tier (`tool` | `micro-app` | `extension` | `saas` | `toy`)
- [ ] **[needs PR1 locked]** OpenSpec change proposal `pick-first-product` authored + validated
- [ ] Scribble required first — at least one sketch in `kiruk-projects/_products/<slug>/scribble/`
- [ ] **[needs PR2 locked]** Deploy target picked (Vercel / Cloudflare / Chrome Web Store / iOS / Android)
- [ ] Product folder scaffolded at `kiruk-projects/_products/<slug>/` per `products` spec
- [ ] Registry entry added to `openspec/specs/products/registry.md`
- [ ] **[needs PR3 locked]** Success metric defined (one measurable thing — users, MAUs, signups, downloads, qualitative)
- [ ] v0 shipped publicly; eye-motif present or justified in product spec
- [ ] Devlog entry covering the build → in `content/devlogs/`

**Exit**: ≥1 product live with public URL; product is referenced from kiruk-web; devlog tells the story; success metric being tracked privately.

---

## Phase 4 — kiruk-portal v0 (client management) [~ IN PROGRESS]

**Goal**: Run a client universe **from first scribble to handoff** in the browser — and reinvent the proposal as a **collaborative pen-paper scribble**, not a written doc. Deployed from `apps/kiruk-portal/`. Separate deploy (Vercel).

> **Stack lock:** Next.js 15 (App Router, Turbopack) + React 19 + Tailwind v4 + Motion v11 + Zod 4 + Zustand 5 + Drizzle ORM on Neon Postgres + Better-Auth + Hono on Cloudflare Workers. See [`openspec/specs/tech-stack/spec.md`](openspec/specs/tech-stack/spec.md).

> ✅ **Unblocked 2026-05-26** — P1/P2/P3 answered (Arun + client read-view · Better-Auth · full done-record). Building in slices; **no DB until the architecture is locked** (founder call 2026-05-27).

**Slice 1 — scribble surface [x done]**

- [x] Next.js 15 + Tailwind v4 scaffold, B&W sketch design (matches kiruk-web)
- [x] `/proposals/new` — scribble-proposal canvas (pen draw, pressure, undo, clear, export PNG)
- [x] `/onboard` — client onboarding flow: detail → kirukal archetype quiz → company vibe sliders → scribble-the-energy → product vision → summary (book-call + start-scribble CTAs). Hybrid test.

**Slice 2 — lifecycle + file persistence [x done 2026-06-02]**

- [x] Universe dashboard: list `kiruk-projects/<universe>/`, show lifecycle state, advance states (`/universes` board + cockpit)
- [x] Server actions write onboarding → `intake.md` + `state.md`; scribbles → universe `scribble/` (file-backed engine `src/lib/lifecycle.ts`)
- [x] Lifecycle state machine UI (lead → intake → proposal → engaged → shipping → archived) — full per-phase builder screens, precondition gates, transparency gate, `.local-only/` for figures, Vitest. Shipped on `feat/portal-eye-system-and-lifecycle`.

**Slice 3 — auth + DB [~] scaffolded 2026-06-02 (architecture proposed `DA1`; awaiting Neon provisioning)**

- [~] Better-Auth (magic-link) + Neon + **Drizzle schema authored** — `src/db/schema.ts` (auth core + `universe`/`transition`/`client_access`), lazy env-guarded client `src/db/index.ts`, `src/lib/auth.ts`, `drizzle.config.ts`, `.env.example`, `/api/auth/[...all]`. **Build green with no DB.** Activation = provision Neon + `pnpm db:generate && db:migrate` (`src/db/README.md`).
- [ ] Client **read-only view** of their own universe (P1) — lands after the DB is live
- [ ] Persist onboarding + scribbles + lifecycle to DB (replace file) — dual-read during migration
- [x] Secret guard: no API keys/client secrets in DB; env-only; `.env*` gitignored

**Slice 4 — collaboration + deploy [~] in progress 2026-06-02**

- [~] Collaborative scribble — **async mark-back done** (`/universes/[slug]/review`: client marks on the proposal scribble in a 2nd colour → saved to `scribble/`; shareable link + mark-back count in the cockpit). Real-time (live cursors) deferred — needs a transport service or the live DB.
- [x] Collaborative-call hook — **request-call → file-backed inbox** (`/call` → `kiruk-projects/_inbox/calls.ndjson`, gitignored; replaces the onboarding `alert()`). Cal.com deferred.
- [~] Deploy to Vercel — **config + runbook done** (`vercel.json`, `DEPLOY.md`). Live deploy needs your Vercel account **and** Slice 3 DB live (file writes don't persist on serverless).

**Spec debt:** redefine the `proposal` artifact in `client-lifecycle` / `template-proposal` from prose-doc → collaborative scribble-canvas (OpenSpec change, explore-now-spec-after).

**Exit**: Arun onboards a client, scribbles a proposal collaboratively, runs the universe to handoff, all in the browser; client sees a read-only view.

---

## Phase 4.5 — Automation Spine

**Goal**: Wire the automation surface so solo-founder operations run on rails. Governed by `content-pipeline`, `client-lifecycle`, `brand-consistency-ci`, `idea-capture` specs.

> 🔒 **BLOCKED — needs founder direction first.**
> Required locks: **AU1, AU2** in [`FOUNDER_DECISIONS.md`](FOUNDER_DECISIONS.md) (added under AUTOMATION section).

- [ ] **[needs AU1 locked]** Content pipeline implementation chosen (custom node script vs n8n vs GitHub Action)
- [ ] `scripts/generate-derivatives.mjs` (or chosen runner) — canonical MDX → IG / LinkedIn / X / video derivatives
- [ ] `content/devlogs/_template.mdx` — front-matter template per `content-pipeline` spec
- [ ] `/kiruk-publish <slug>` slash command — human-triggered publish step (no auto-post)
- [ ] **[needs AU2 locked]** Brand-CI runner chosen (GitHub Actions vs Husky vs local pre-commit)
- [ ] `.github/workflows/brand-ci.yml` (or chosen runner) — wires all `brand-consistency-ci` gates
- [ ] `scripts/brand-ci/*.mjs` — per-check implementations (eye-motif, token coverage, hardcoded color, scribble, redaction)
- [ ] `.brand-ci/redaction-patterns.json` — committed redaction patterns
- [ ] `/kiruk-archive <universe>` slash command — completes the client lifecycle
- [ ] `scripts/check-scribble.mjs` — pen-and-paper lint
- [ ] Update `scripts/capture-session.mjs` + `scripts/promote-idea.mjs` for `scribble` field

**Exit**: a single devlog file produces social derivatives end-to-end; a new universe runs through all 6 lifecycle states via slash commands; brand-CI fails on any non-compliant commit.

---

## Phase 5 — ISM Lab Launch

**Goal**: First ISM experiment shipped publicly; devlog + social pipeline running.

> 🔒 **BLOCKED — needs founder direction first.**
> Required locks: **I1, I2, I3, S1, S2** in [`FOUNDER_DECISIONS.md`](FOUNDER_DECISIONS.md)

- [ ] **[needs I1+I2 locked]** Run `/kiruk-ism-new <name>` — scaffold first real ISM
- [ ] **[needs I2 locked]** Build ISM experiment #1 — interactive prototype
- [ ] ISM devlog entry #1 in `content/devlogs/`
- [ ] **[needs I3 locked]** ISM page on kiruk-web or standalone URL
- [ ] **[needs S1+S2 locked]** Social pipeline: devlog → platform posts → `content/social/`
- [ ] Establish devlog cadence: every 2 weeks minimum

**Exit**: ≥1 ISM shipped publicly with devlog; devlog rhythm established; ≥4 social posts from content pipeline.

---

## Phase 6 — Kirukargal Network (collaboration model)

**Goal**: Open the studio to kirukargals — creative collaborators who believe in kirukism.

- [ ] `CONTRIBUTING.md` v2 — kirukargal onboarding: philosophy check, spec literacy, eye-motif test
- [ ] `/kiruk-collab-intake` slash command — structured intake for kirukargal project proposals
- [ ] Kirukargal project template: `kiruk-projects/_kirukargal-template/`
- [ ] Revenue + credit model documented in `openspec/specs/collaboration/spec.md`
- [ ] First kirukargal invited and onboarded
- [ ] Co-IP / rev-share proposal template live in `kiruk-templates/`

**Exit**: ≥1 kirukargal active in a live universe; collaboration model publicly documented.

---

## Phase 7 — Open Creative OS (Year 2)

**Goal**: Package Kiruk's Creative OS so other weird studios can use it.

- [ ] `kiruk-creative-os/` standalone package extracted from this monorepo
- [ ] OpenSpec adaptation guide: "how to adapt OpenSpec for creative work"
- [ ] Studio OS template repo on GitHub (public, forkable)
- [ ] Workshop curriculum: spec-first creative practice for makers
- [ ] Teaching revenue line: Gumroad / cohort / workshop

**Exit**: another studio forks + adapts kiruk Creative OS; workshop v1 delivered.

---

## Deployment topology

| App / Artifact                    | Deploy target                                                  | Trigger              |
| --------------------------------- | -------------------------------------------------------------- | -------------------- |
| `apps/kiruk-web`                  | Vercel (kiruk.in/studio; dedicated domain later)               | push to `main`       |
| `apps/kiruk-portal`               | Railway or Vercel (portal.kiruk.studio)                        | push to `main`       |
| `kiruk-ism/<name>`                | Vercel or Netlify (per experiment)                             | manual or ISM branch |
| `kiruk-projects/_products/<slug>` | Per product (web → Vercel, extension → Chrome Web Store, etc.) | per product config   |
| Design tokens                     | npm (private or public `@kiruk/design-system`)                 | on release tag       |
| Content / devlogs                 | Consumed by kiruk-web at build time                            | static MDX in repo   |
| Brand-CI report                   | Build artifact on every CI run                                 | every PR + push      |

---

## Continuous tracks (always on)

- **Spec hygiene** — archive applied changes same-day; no open proposals > 1 week.
- **Idea capture** — SessionEnd hook always on; weekly review of `ideas/log.ndjson` for promote-ready candidates. Promotion requires a scribble.
- **Token audit** — monthly check that `packages/design-system/build/` reflects all specs.
- **Changelog discipline** — every closed task → CHANGELOG entry with "why".
- **Kirukism content** — ≥1 devlog every 14 days; case studies after every shipped universe; story drop quarterly.
- **Operational learning** — material mistakes → `LEARNINGS.md` with Guard; repeat mistakes get strengthened guard.
- **Pen-and-paper ritual** — every new universe / ISM / product begins with at least one scribble in its `scribble/` folder.
- **Brand-CI on every push** — eye-motif coverage, token discipline, scribble presence, redaction scan, no hardcoded colors.

---

## How to change this plan

1. Edit this file directly with `[~]` / `[–]` markers.
2. Explain the "why" in `CHANGELOG.md` under `## Unreleased`.
3. If the change is structural (new phase, dropped pillar, re-scoped mission) → open `openspec/changes/roadmap-<slug>/proposal.md`, validate, apply.
