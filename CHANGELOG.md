# Changelog — Kiruk Studio

All notable changes, decisions, and plan shifts. Every entry answers **why** — not just what.

Format loosely follows [Keep a Changelog](https://keepachangelog.com/) with an added **Why** line per entry.

---

## [Unreleased]

### Changed
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
- **Founder context** — CLAUDE.md §2 encodes Arun's voice, stack, motifs, recurring themes from `kiruk-in`.
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
