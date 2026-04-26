# Changelog — Kiruk

All notable changes, decisions, and plan shifts. Every entry answers **why** — not just what.

Format loosely follows [Keep a Changelog](https://keepachangelog.com/) with an added **Why** line per entry.

---

## [Unreleased]

### Added
- **Monorepo scaffold** — `pnpm-workspace.yaml` (workspaces: `apps/*`, `packages/*`), `apps/kiruk-web/` stub (Next.js 15, kiruk.studio target), `apps/kiruk-portal/` stub (internal client management). Design system stays at root until `packages/design-system` migration (Phase 2 next).
  - **Why:** kiruk holds everything — website, client portal, ISM experiments, design system — in one repo, deployed independently. Monorepo is the foundation for that.
- **Kirukism vocabulary** — `kirukism` (the movement/cult/philosophy), `kirukargals` (external collaborators), `kirukan` (studio co-workers) now encoded in [CLAUDE.md](CLAUDE.md) §1 and §3, [VISION-MISSION.md](VISION-MISSION.md) (new Kirukism section + People table), [CONTRIBUTING.md](CONTRIBUTING.md) (kirukargal framing), [TASKS.md](TASKS.md), and [ROADMAP.md](ROADMAP.md).
  - **Why:** the studio isn't just a business — it's a movement. kirukism drives why people collaborate, not just what they build. Language encodes intent.
- **Full monorepo ROADMAP** — [ROADMAP.md](ROADMAP.md) rewritten: 7 phases (OS bootstrap, brand spine, monorepo, website, portal, ISM lab, kirukargal network, open OS) + deployment topology table + continuous tracks.
  - **Why:** old 4-phase roadmap didn't cover the website, client portal, social pipeline, or kirukargal collaboration model. The studio needs a real plan to see where it's going.

### Changed
- **Creative OS docs** — [CLAUDE.md](CLAUDE.md) new §2 *Creative journey*; spec workflow renumbered and clarified as for **durable** work; exploration in inbox stays out of the OpenSpec gate until promotion. [VISION-MISSION.md](VISION-MISSION.md) principle 9, [AGENTS](AGENTS.md) *Creative rhythm*, [README](README.md), [LEARNINGS.md](LEARNINGS.md), [openspec/project.md](openspec/project.md) vocabulary, [kiruk-studio](.cursor/rules/kiruk-studio.mdc) and [lessons-learned](.cursor/rules/lessons-learned.mdc) rules aligned: **imagination and iteration are first-class; rules are scaffolding, not the ceiling.**
  - **Why:** match the studio’s real process—multiple iterations, fail/succeed, ongoing—and avoid reading specs as a demand for day-one finality.
- **Section renumbering** in `CLAUDE.md` (Founder → §3 … Session → §8); cross-refs updated in [brand-system](openspec/specs/brand-system/spec.md), [template-portfolio](openspec/specs/template-portfolio/spec.md), generators, [kiruk-intake](.claude/commands/kiruk-intake.md), [kiruk-artifact](.claude/commands/kiruk-artifact.md), [TASKS](TASKS.md), [CHANGELOG](CHANGELOG.md) founder line.

### Added
- **`operational-learning` capability** — [LEARNINGS.md](LEARNINGS.md) (append-only mistake log with **Mistake / Root cause / Fix / Guard**), [openspec/specs/operational-learning/spec.md](openspec/specs/operational-learning/spec.md), and always-on Cursor rule [`.cursor/rules/lessons-learned.mdc`](.cursor/rules/lessons-learned.mdc). Strengthen prevention on repeat; never rewrite old entries to hide a repeat. Proposal: [openspec/archive/add-operational-learning/proposal.md](openspec/archive/add-operational-learning/proposal.md).
  - **Why:** make “learn from the mistake, don’t repeat it” a first-class studio practice for humans and AI.
- **`repo-privacy` capability** — OpenSpec spec for keeping API keys and private client data out of git, optional `kiruk-projects/.../.local-only/` pattern, and code-review expectations. Supporting files: [CONTRIBUTING.md](CONTRIBUTING.md), [`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md), [`.env.example`](.env.example), stricter [`.gitignore`](.gitignore), Cursor rules [`.cursor/rules/privacy-secrets.mdc`](.cursor/rules/privacy-secrets.mdc) and [`.cursor/rules/code-review.mdc`](.cursor/rules/code-review.mdc).
  - **Why:** ship an open, transparent process without leaking credentials or other people’s confidential material; give humans and agents the same clear rules and PR checklist.

### Changed
- **OpenSpec** — `add-repo-privacy-spec` moved from `openspec/changes/` to `openspec/archive/add-repo-privacy-spec/` after apply.
  - **Why:** match the documented propose → validate → apply → archive lifecycle.
- **Removed Pencil MCP** from entire studio OS. Design system is now code-only.
  - **Why**: founder explicit decision. All visual primitives live as React SVG in `design-system/components/`.
- **design-system/components/** added — 6 React SVG components: `EyePrimary`, `EyeIris`, `EyeGaze`, `EyePortal`, `EyeConstellation`, `Scribble`. Colors via CSS custom properties; no hardcoded hex.
- **Token pipeline live** — `npm run tokens:build` emits CSS/Tailwind/TS. Fixed DTCG `usesDtcg: true` + Windows glob.
- **Token files** — fixed circular `color.paper` alias, removed top-level `$description` collision, restructured motion/components with proper namespacing.
- **Updated specs**: `brand-system` + `design-tokens` now reference code components, not Pencil files.
  - **Why**: spec claims must match actual implementation.

### Added
- **Studio OS bootstrap** — scaffolded repo structure, root docs, openspec skeleton, planning docs (`VISION-MISSION.md`, `ROADMAP.md`, `TASKS.md`, this file).
  - **Why**: establish spec-first, idea-capturing foundation before any brand/ISM work begins. Vision doc §6 mandates Claude Code as in-house creative engineer with OpenSpec workflow.
- **Scope refinement** — ISM lab starts as `openspec/specs/ism/spec.md` only; no heroism/kirukism/colorism/nomadism subfolders yet. Founder will spawn them via `/kiruk-ism-new` when ready.
  - **Why**: avoid premature commitment to ISM branches before brand spine is locked.
- **Founder context** — CLAUDE.md §3 encodes Arun's voice, stack, motifs, recurring themes from `kiruk-in`.
  - **Why**: keeps voice-sensitive artifacts (manifestos, case studies) aligned without re-briefing per session.

### Changed
- _none_

### Removed
- _none_

### Decisions
- **Design system from scratch** — not importing from `GraviaAI` or `kiruk-in`.
  - **Why**: founder explicit preference; ensures brand spine is purposeful, not inherited.
- **Explicit planning layer** — `VISION-MISSION.md` + `ROADMAP.md` + `TASKS.md` + `CHANGELOG.md` as top-level readable state.
  - **Why**: founder wants visibility into "what's happening" and ability to change plans without archaeology.
- **Pen file deferred save** — Pencil MCP cannot create a new file at a target path from API; Save-As is UI-only. Components scaffolded in the session buffer; founder to Save-As to `design-system/pen-files/kiruk-design.pen`.
  - **Why**: Pencil MCP limitation. Documented in `design-system/pen-files/README.md`.

---

## How to write an entry

1. New change? Add under `## [Unreleased]` → one of `Added` / `Changed` / `Removed` / `Fixed` / `Decisions`.
2. Each bullet: what changed + **Why**: line explaining intent.
3. On release (brand v1, phase completion, etc.): rename `Unreleased` → `[vX.Y] — YYYY-MM-DD`, start a fresh `[Unreleased]` on top.
4. Plan shifts (roadmap edits, scope drops) MUST land here, not in the roadmap diff alone.
