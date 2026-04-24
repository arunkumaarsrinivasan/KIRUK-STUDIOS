# Contributing to Kiruk Studio

This repo is **open for learning**; it is also **strict about what must stay private**. Read [openspec/specs/repo-privacy/spec.md](openspec/specs/repo-privacy/spec.md) before your first meaningful change.

**Mistakes and repeats:** We record material failures and **guards** in [LEARNINGS.md](LEARNINGS.md) (see [openspec/specs/operational-learning/spec.md](openspec/specs/operational-learning/spec.md)). Before reworking an area that previously broke, read recent entries. After fixing a significant repeat-worthy issue, append a new dated section—do not hide repeats by editing old text.

## Before you open a PR

1. **No secrets** — Never commit `.env`, real API keys, tokens, private client dumps, or PII. Use `.env.example` for variable **names** only. See [AGENTS.md](AGENTS.md) and `.cursor/rules/privacy-secrets.mdc`.
2. **Spec-first** — Substantive behavior or contract changes belong in `openspec/changes/<slug>/` with validation. See [openspec/AGENTS.md](openspec/AGENTS.md).
3. **Validate** — When you touch specs, run `npm run spec:validate` (or `npx openspec validate --strict` as documented).
4. **Design tokens** — Do not hand-edit `design-system/build/`; run `npm run tokens:build`.
5. **Changelog** — Add a line under `## Unreleased` in [CHANGELOG.md](CHANGELOG.md) when the change is user-visible or spec-relevant.

## Code review

- Use the [pull request template](.github/PULL_REQUEST_TEMPLATE.md) in full (self-review counts for solo work; be honest on every box).
- Prefer small PRs: one capability or one theme per PR when possible.
- Call out **security** or **spec** impact in the PR description so reviewers do not miss it.

## Security and private data

- **Disclosure:** If you find a committed secret, do not paste it in public issues. Rotate the credential, then remove it from history or ask a maintainer to help with a private channel.
- **Client work:** Material that must not be public belongs in `kiruk-projects/<universe>/.local-only/` (gitignored) or outside this repo; see `repo-privacy` spec.

## AI tools (Cursor, Claude Code, etc.)

Project rules live in [`.cursor/rules/`](.cursor/rules/). Agent entry points: [AGENTS.md](AGENTS.md) and [CLAUDE.md](CLAUDE.md). Follow the same privacy and spec rules as human contributors.
