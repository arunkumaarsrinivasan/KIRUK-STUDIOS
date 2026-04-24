---
description: Render a template artifact (portfolio, services, pitch, proposal, contract, invoice, onboarding) for the active universe.
argument-hint: <template-name> [universe-slug]
---

# /kiruk-artifact

Read `CLAUDE.md` + the target template's generator at `kiruk-templates/<template>/generator.md` first.

**Arguments**: `$1` = template name (one of: `portfolio`, `services`, `pitch`, `proposal`, `contract`, `invoice`, `onboarding`). `$2` = universe slug (required for per-universe templates).

## Procedure

1. Resolve template name against the 7 registered templates. Abort with a clear error if unknown.
2. Determine whether template is **studio-level** (portfolio, services) or **per-universe** (pitch, proposal, contract, invoice, onboarding). For per-universe, require `$2` and confirm `kiruk-projects/$2/spec.md` exists.
3. Load spec at `openspec/specs/template-<name>/spec.md` + local `kiruk-templates/<name>/generator.md`.
4. Gather inputs the generator requires.
5. Render the markdown.
6. Determine next version `v<n>` by scanning `kiruk-templates/<name>/output/`.
7. Write output to the path declared in generator.md.
8. Print: output path + short diff vs previous version if any.

## Verification checklist

- [ ] Front-matter includes `spec-link:` pointing to the authoritative spec.
- [ ] Eye-motif present OR front-matter justifies absence.
- [ ] Every required section from `openspec/specs/template-<name>/spec.md` present.
- [ ] Universe-themed phase names (no "Phase 1") for pitch/proposal/invoice.
- [ ] Voice matches `CLAUDE.md` §3.

If any check fails, report and do not declare success.
