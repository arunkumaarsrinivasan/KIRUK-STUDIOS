---
description: Turn a completed intake into kiruk-projects/<universe>/spec.md + a draft openspec change proposal.
argument-hint: <universe-slug>
---

# /kiruk-spec

Read `CLAUDE.md`, `openspec/project.md`, and `openspec/AGENTS.md` first.

**Argument**: `$ARGUMENTS` = universe slug. Required.

## Preconditions

- `kiruk-projects/$ARGUMENTS/intake.md` exists (else abort, tell user to run `/kiruk-intake $ARGUMENTS`).

## What this does

1. Read the intake.
2. Draft `kiruk-projects/$ARGUMENTS/spec.md` in the capability-spec format (Purpose, Requirements with GIVEN/WHEN/THEN scenarios, Acceptance Artifacts).
3. Draft an openspec change proposal at `openspec/changes/universe-$ARGUMENTS-init/` with:
   - `proposal.md` (Why/What/Impact)
   - `tasks.md`
   - `deltas/specs/template-*/spec.md` stubs for any template customizations
4. Remind the user to run `npx openspec validate --strict` before proceeding.

## Rules

- Each requirement in the universe spec MUST have ≥1 scenario.
- Reference brand-system and design-tokens specs for inherited requirements (eye-motif, token discipline).
- Universe-themed phase names (no "Phase 1") — ask the user for the universe's metaphor vocabulary if not obvious from intake.
- End with a "Next" line suggesting `/kiruk-artifact proposal $ARGUMENTS` once the change is applied.
