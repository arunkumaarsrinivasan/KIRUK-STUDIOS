# AGENTS.md — Operational Map for AI Agents

Terse navigation for any AI coding agent (Claude Code, Cursor, etc.) working in this repo.

## Entry points

1. Read `CLAUDE.md` first — contains master prompt, non-negotiables, forbidden actions.
2. Read `VISION-MISSION.md` to understand the studio's direction.
3. Read `ROADMAP.md` + `TASKS.md` for current priorities.
4. Read `openspec/project.md` for domain vocabulary and conventions.
5. Read `openspec/AGENTS.md` for OpenSpec lifecycle rules.

## Core invariant

**Spec-first.** No artifact ships without a matching `openspec/specs/<capability>/spec.md` requirement. Every edit to a spec goes through `openspec/changes/<slug>/` (propose → validate → apply → archive).

## Change protocol

1. Branch-of-thought → `ideas/inbox.md` OR `/kiruk-capture`.
2. Promote-ready idea → `scripts/promote-idea.mjs <slug>` → creates `openspec/changes/<slug>/proposal.md`.
3. Fill proposal.md (why + what-changes + impact) and the delta spec file.
4. Run `npx openspec validate`.
5. Apply with `/kiruk-artifact` or manual edits referencing the proposal.
6. Move proposal folder to `openspec/archive/<slug>/`.
7. Append entry to `CHANGELOG.md`.

## Capability registry

- `brand-system` — eye-motif identity + rules
- `design-tokens` — DTCG JSON, Style Dictionary outputs
- `idea-capture` — inbox → log → promoted pipeline
- `ism` — ISM lab (names-only for now; no subproject specs until `/kiruk-ism-new` is run)
- `template-{portfolio,services,pitch,proposal,contract,invoice,onboarding}` — 7 client docs

## Forbidden paths

- `design-system/build/**` — generated, regenerate via `npm run tokens:build`
- Any file outside `.claude/commands/` and `.claude/settings.json` inside `.claude/` — local state

## Tool allowlist

- `npx openspec validate` — spec gate
- `npm run tokens:build` — regenerate design-system/build/
- `/kiruk-intake`, `/kiruk-spec`, `/kiruk-artifact`, `/kiruk-capture`, `/kiruk-ism-new` — slash commands
