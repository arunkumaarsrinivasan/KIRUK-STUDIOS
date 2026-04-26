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
- `design-system/` — shared tokens, React SVG components (consumed by all apps)
- `openspec/` — spec truth, change proposals, archive
- `content/` — manifesto, devlogs, case studies (feeds website + social)
- `ideas/` — inbox, log, promoted pipeline

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

- [x] `pnpm-workspace.yaml` — workspaces: apps/*, packages/*
- [x] `apps/kiruk-web/` — Next.js 15 stub with package.json, README
- [x] `apps/kiruk-portal/` — client portal stub with package.json, README
- [x] Kirukism vocabulary in CLAUDE.md, VISION-MISSION.md, CONTRIBUTING.md
- [x] Full monorepo ROADMAP (this file)
- [x] `packages/design-system/` migration — moved `design-system/` → `packages/design-system/` as `@kiruk/design-system`
- [x] Root `turbo.json` — Turborepo build pipeline
- [x] `package.json` updated — pnpm@9, turbo scripts

---

## Phase 3 — kiruk-web v0 (website)

**Goal**: Studio public face. Deployed from `apps/kiruk-web/`. Independent deploy → Vercel.

> 🔒 **BLOCKED — needs founder direction first.**
> Answer decisions in [`FOUNDER_DECISIONS.md`](FOUNDER_DECISIONS.md) before any code goes in here.
> Required locks: **B1, B2, B3, B4, B5, W1, W2, W3, W4, W5, W6, W7**

- [ ] **[needs B1–B5 locked]** Brand pass — final logo, palette, type confirmed in tokens
- [ ] **[needs W1–W3 locked]** Next.js 15 App Router scaffold + homepage hero built
- [ ] **[needs W2 locked]** Route structure finalized and stubbed
- [ ] `@kiruk/design-system` imported as workspace package in kiruk-web
- [ ] Token-driven theming: CSS vars from `packages/design-system/build/css/tokens.css`
- [ ] **[needs W4 locked]** Devlog index pulling from `content/devlogs/`
- [ ] Case studies pulling from `content/case-studies/`
- [ ] **[needs W5 locked]** Contact / "work with kiruk" CTA wired
- [ ] **[needs W7 locked]** Deployment config: `vercel.json` / `next.config.ts`
- [ ] Domain: kiruk.studio pointed at Vercel

**Exit**: site live at kiruk.studio; all locked routes render; devlog loop working.

---

## Phase 4 — kiruk-portal v0 (client management)

**Goal**: Client universe tracking, deliverable management, invoicing — internal-facing. Deployed from `apps/kiruk-portal/`. Separate deploy (Railway / Vercel / self-hosted).

> 🔒 **BLOCKED — needs founder direction first.**
> Required locks: **P1, P2, P3** in [`FOUNDER_DECISIONS.md`](FOUNDER_DECISIONS.md)

- [ ] **[needs P2 locked]** Next.js 15 App Router scaffold + auth
- [ ] Universe dashboard: list active client projects, status, phase
- [ ] `/kiruk-intake` slash command output → portal intake form (mirrors `kiruk-projects/<universe>/intake.md`)
- [ ] Deliverable tracker: spec → draft → review → shipped state machine
- [ ] Template runner: trigger `/kiruk-artifact <template>` outputs from portal UI
- [ ] Invoice tracker linked to `template-invoice` generator
- [ ] Secret guard: portal never stores API keys or client secrets in DB; env-only
- [ ] Deploy + auth flow

**Exit**: Arun can create a new universe, track it to completion, and generate all 7 docs from portal without leaving a browser.

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

| App / Artifact | Deploy target | Trigger |
|---|---|---|
| `apps/kiruk-web` | Vercel (kiruk.studio) | push to `main` |
| `apps/kiruk-portal` | Railway or Vercel (portal.kiruk.studio) | push to `main` |
| `kiruk-ism/<name>` | Vercel or Netlify (per experiment) | manual or ISM branch |
| Design tokens | npm (private or public `@kiruk/design-system`) | on release tag |
| Content / devlogs | Consumed by kiruk-web at build time | static MDX in repo |

---

## Continuous tracks (always on)

- **Spec hygiene** — archive applied changes same-day; no open proposals > 1 week.
- **Idea capture** — SessionEnd hook always on; weekly review of `ideas/log.ndjson` for promote-ready candidates.
- **Token audit** — monthly check that `design-system/build/` reflects all specs.
- **Changelog discipline** — every closed task → CHANGELOG entry with "why".
- **Kirukism content** — ≥1 devlog every 2 weeks; case studies after every shipped universe.
- **Operational learning** — material mistakes → `LEARNINGS.md` with Guard; repeat mistakes get strengthened guard.

---

## How to change this plan

1. Edit this file directly with `[~]` / `[–]` markers.
2. Explain the "why" in `CHANGELOG.md` under `## Unreleased`.
3. If the change is structural (new phase, dropped pillar, re-scoped mission) → open `openspec/changes/roadmap-<slug>/proposal.md`, validate, apply.
