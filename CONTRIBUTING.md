# Contributing to Kiruk

This repo is **open for learning and collaboration**. If you are reading this, you might be a **kirukargal** — someone who believes in kirukism and wants to co-create something that doesn't exist yet.

---

## Who is this for?

| Role | You are… |
|---|---|
| **Kirukargal** | External collaborator. You believe in kirukism. You want to co-create on a universe, experiment, or ISM project. |
| **Kirukan** | Studio co-worker, building kiruk from the inside alongside Arun. |
| **Learner** | Here to understand the spec-driven creative OS and adapt it for your own work. |

---

## Kirukism — the philosophy check

Before contributing, ask yourself:
- Does my contribution push something interesting, weird, or new?
- Would I be embarrassed to show this to someone who hates boring work?
- Am I here to collaborate, not to template?

If yes — welcome. If no — this might not be the right project for you. That is fine.

---

## Before you open a PR

1. **No secrets** — Never commit `.env`, real API keys, tokens, private client dumps, or PII. Use `.env.example` for variable **names** only. See [AGENTS.md](AGENTS.md) and `.cursor/rules/privacy-secrets.mdc`.
2. **Spec-first** — Substantive behavior or contract changes belong in `openspec/changes/<slug>/` with validation. See [openspec/AGENTS.md](openspec/AGENTS.md).
3. **Validate** — When you touch specs, run `npm run spec:validate` (or `npx openspec validate --strict`).
4. **Design tokens** — Do not hand-edit `packages/design-system/build/`; run `npm run tokens:build`.
5. **Changelog** — Add a line under `## Unreleased` in [CHANGELOG.md](CHANGELOG.md) when the change is user-visible or spec-relevant.

---

## Imagination first

Messy early work in `ideas/inbox.md` and exploration do not need a full OpenSpec pass — see [CLAUDE.md](CLAUDE.md) §2 and §4. Contribute in the spirit of **iteration**, not first-pass finality. Kirukism celebrates the scribble; polish comes after the idea earns its form.

**Mistakes and repeats:** Material failures and guards live in [LEARNINGS.md](LEARNINGS.md). Before reworking an area that previously broke, read recent entries. After fixing a significant issue, append a new dated section — do not hide repeats by editing old text.

---

## Code review

- Use the [pull request template](.github/PULL_REQUEST_TEMPLATE.md) in full (self-review counts for solo work; be honest on every box).
- Prefer small PRs: one capability or one theme per PR.
- Call out **security** or **spec** impact in the PR description.

---

## Security and private data

- **Disclosure:** Found a committed secret? Do not paste it in public issues. Rotate the credential, then remove it from history or contact a maintainer privately.
- **Client work:** Material that must not be public belongs in `kiruk-projects/<universe>/.local-only/` (gitignored) or outside this repo; see `repo-privacy` spec.

---

## Kirukargal project proposals

Want to co-create a universe or ISM experiment? Drop a raw idea in `ideas/inbox.md` or open an issue with the kirukargal proposal template (coming in Phase 6). The `/kiruk-intake` command starts a structured intake for full universe proposals.

---

## AI tools (Cursor, Claude Code, etc.)

Project rules live in [`.cursor/rules/`](.cursor/rules/). Agent entry points: [AGENTS.md](AGENTS.md) and [CLAUDE.md](CLAUDE.md). Follow the same privacy and spec rules as human contributors.
