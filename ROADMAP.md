# Roadmap — Kiruk Studio

> Living plan. Change freely — log the "why" in `CHANGELOG.md`.
> Status markers: `[ ]` pending · `[~]` in-progress · `[x]` done · `[–]` dropped.

---

## Phase 0 — OS Bootstrap (now)

**Goal**: Stand up the studio operating system itself.

- [~] Root docs: CLAUDE.md, AGENTS.md, README, vision, roadmap, tasks, changelog
- [~] OpenSpec scaffold + 4 core specs (brand-system, design-tokens, idea-capture, ism)
- [~] 7 template spec+generator pairs
- [~] DTCG token files + Style Dictionary build
- [~] Scripts: build-tokens, sync-pen-variables, capture-session, promote-idea
- [~] 5 slash commands
- [ ] SessionEnd hook wired via update-config skill
- [ ] Master `kiruk-design.pen` scaffolded with Eye/* component skeleton
- [ ] Smoke test: openspec validate passes, sample proposal generated end-to-end

**Exit criteria**: someone can `git clone`, run `npm install && npx openspec validate`, drop a raw idea in `ideas/inbox.md`, run `/kiruk-capture`, and see a valid entry in `ideas/log.ndjson`.

---

## Phase 1 — Brand Spine (Week 1)

**Goal**: Define the Kiruk Studio brand itself inside its own system.

- [ ] Write Kiruk Manifesto (`content/manifesto.md`) v1
- [ ] Propose + apply primary eye-mark logo (Pencil MCP)
- [ ] Propose + apply ≥3 secondary eye-marks
- [ ] Lock core DTCG palette (1 neutral base + 1–2 accents)
- [ ] Lock type pairing (rational + expressive)
- [ ] Define 4 motion motifs (gaze, iris-dilate, portal-transition, cursor-track)
- [ ] Publish brand-system spec v1 from archive

**Exit**: brand-system spec marked v1-locked; kiruk-design.pen has Eye/* components used throughout.

---

## Phase 2 — Services, OS, Workspace (Week 2)

**Goal**: Ship the 7 client templates + connect studio to a CRM/Notion surface.

- [ ] Generate `template-services` output (the Services Guide)
- [ ] Generate `template-proposal`, `template-pitch`, `template-contract`, `template-invoice`, `template-onboarding` baseline outputs
- [ ] Author Notion schema spec: CRM, Projects, Spec Library, Finance, Content
- [ ] Bind each Notion DB to ≥1 Claude prompt pattern
- [ ] Decide: Notion API sync scripts vs manual import (propose via openspec)

**Exit**: all 7 templates render; proposal + pitch can be generated for a fake universe in one command.

---

## Phase 3 — Portfolio + ISM Launchpad (Week 3)

**Goal**: Public-facing proof. Rewrite past work + ship first ISM piece.

- [ ] Rewrite 3–5 past projects as worldbuilding case studies (`content/case-studies/`)
- [ ] Run `/kiruk-ism-new <first-ism>` — scaffolds first real ISM folder + spec
- [ ] Scaffold + ship ISM piece #1 prototype
- [ ] Draft `template-portfolio` output v1
- [ ] Outline studio website: home, ISM, services, about

**Exit**: portfolio.md renders from templates; first ISM has a public-ready devlog.

---

## Phase 4 — Public Presence + Client Engine (Week 4+)

**Goal**: Go live; open the door for clients.

- [ ] Ship kiruk.studio v0 (Next.js 15, App Router)
- [ ] Wire contact → CRM flow
- [ ] Publish first 4 devlogs (bi-weekly cadence)
- [ ] Outreach: 10 aligned founders contacted
- [ ] Establish pricing-alignment decision matrix in `openspec/specs/services/spec.md`

**Exit**: first aligned lead in pipeline; devlog rhythm sustained.

---

## Continuous tracks (always on)

- **Spec hygiene** — archive applied changes same-day.
- **Idea capture** — SessionEnd hook always on; weekly review of `ideas/log.ndjson` for promote-ready candidates.
- **Design token drift** — monthly audit that tokens in `design-system/build/` match specs.
- **Changelog discipline** — every closed task → CHANGELOG entry.

---

## How to change this plan

1. Edit this file directly with `[~]` / `[–]` markers.
2. Explain the "why" in `CHANGELOG.md` under `## Unreleased`.
3. If the change is structural (new phase, dropped pillar, re-scoped mission) → open `openspec/changes/roadmap-<slug>/proposal.md`, validate, apply.
