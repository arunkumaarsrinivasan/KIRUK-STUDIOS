---
description: Spawn a new ISM experiment — scaffold folder, spec, devlog stub, and tasks entry.
argument-hint: <ism-name>
---

# /kiruk-ism-new

Read `openspec/specs/ism/spec.md` first for the registered names and template.

**Argument**: `$ARGUMENTS` = ism name (must be in the Registered Names list of `ism/spec.md`).

## Preconditions

- Brand spine ideally v1-locked (ROADMAP Phase 1 complete). If not, warn user and ask confirmation.
- `$ARGUMENTS` is in the registered list in `openspec/specs/ism/spec.md`.
- `kiruk-ism/$ARGUMENTS/` does not yet exist.

## Procedure

1. Validate registered name. If not registered, refuse and explain how to add via a change proposal.
2. Refuse if folder already exists.
3. Create:
   - `kiruk-ism/$ARGUMENTS/src/.gitkeep`
   - `kiruk-ism/$ARGUMENTS/design-notes.md` (seeded with "## Open questions", "## Sketches", "## Decisions")
   - `kiruk-ism/$ARGUMENTS/README.md` (what this ISM explores, links to spec)
4. Create `openspec/specs/ism-$ARGUMENTS/spec.md` by copying the template from `openspec/specs/ism/spec.md` § "Template for a spawned `ism-<name>` spec", substituting `<name>` → `$ARGUMENTS`.
5. Open (or create) `openspec/changes/ism-$ARGUMENTS-spawn/proposal.md` describing the spawn and its Why.
6. Append to `TASKS.md` under the current phase: `- [ ] (P1) Ship ism-$ARGUMENTS prototype v1 — spec: openspec/specs/ism-$ARGUMENTS/spec.md`.
7. Append to `CHANGELOG.md` `## [Unreleased]` → `### Added`: "ISM spawned: $ARGUMENTS. **Why**: <ask user>".
8. Print: "Spawned ism-$ARGUMENTS. Next: fill design-notes.md, validate the change, start sketching in Pencil."

## Rules

- Never pre-fill design decisions. That's the user's job.
- The ISM's eye-motif compliance inherits from brand-system — remind the user.
