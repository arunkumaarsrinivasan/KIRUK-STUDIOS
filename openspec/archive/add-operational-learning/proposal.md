# Proposal: add-operational-learning

## Why

The studio needs a shared, honest record of mistakes and **guards** so humans and agents do not repeat the same failure modes. Spec + append-only log + Cursor rules turn “we learned” into enforceable habits.

## What changes

- **Added** capability `operational-learning` at `openspec/specs/operational-learning/spec.md`.
- **Added** [LEARNINGS.md](LEARNINGS.md), [`.cursor/rules/lessons-learned.mdc`](.cursor/rules/lessons-learned.mdc).
- **Modified** `openspec/project.md` (vocabulary + capability list), `AGENTS.md`, `README.md`, `CONTRIBUTING.md`, `CLAUDE.md`, `kiruk-studio.mdc`, `openspec.mdc`, `code-review.mdc`, PR template, `CHANGELOG.md`.

## Impact

- Specs: new `operational-learning`; `project.md` vocabulary.
- No design-system build.
