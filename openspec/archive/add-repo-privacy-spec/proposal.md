# Proposal: add-repo-privacy-spec

## Why

The studio is public and open for learning, but API keys, credentials, and client-only material must stay out of version control. Contributors and agents need a single spec plus concrete files (CONTRIBUTING, PR template, env example, gitignore, Cursor rules) so review and privacy expectations are clear.

## What changes

- **Added** capability `repo-privacy` at `openspec/specs/repo-privacy/spec.md`.
- **Added** `CONTRIBUTING.md`, `.github/PULL_REQUEST_TEMPLATE.md`, `.env.example`, Cursor rules `privacy-secrets` and `code-review`.
- **Modified** `openspec/project.md`, `AGENTS.md`, `README.md`, `CLAUDE.md`, `CHANGELOG.md`, `.gitignore`, `kiruk-studio.mdc`, `openspec.mdc`.

## Impact

- Specs touched: `project.md`, new `repo-privacy/spec.md`.
- Artifacts: process/docs only; no design-system build.
- Downstream: all agents should read `repo-privacy` when touching config or private data.

## Deltas

Implemented in-tree per this proposal (new spec file + related docs).
