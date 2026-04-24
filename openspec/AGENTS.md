# openspec/AGENTS.md — OpenSpec Lifecycle for Agents

Terse rules for navigating the OpenSpec subtree.

## Folder anatomy

```
openspec/
├── project.md          # domain + conventions (read first)
├── AGENTS.md           # this file
├── specs/<cap>/spec.md # canonical capability specs (truth)
├── changes/<slug>/     # in-flight proposals
│   ├── proposal.md     # why + what-changes + impact
│   ├── design.md       # optional: alternatives + trade-offs
│   ├── tasks.md        # implementation checklist
│   └── deltas/         # delta spec files mirroring specs/ paths
└── archive/<slug>/     # applied proposals, kept for audit
```

## Lifecycle states

1. **Proposed** — folder exists in `changes/<slug>/`, proposal.md present, deltas drafted.
2. **Validated** — `npx openspec validate --strict` passes on the change.
3. **Applied** — deltas merged into `specs/<cap>/spec.md`; generated artifacts reference spec sections.
4. **Archived** — folder moved to `archive/<slug>/`. `CHANGELOG.md` entry added.

## proposal.md template

```markdown
# Proposal: <slug>

## Why
<1–3 sentences: what problem / opportunity>

## What changes
- Added: Requirement X in brand-system/spec.md
- Modified: Requirement Y in design-tokens/spec.md
- Removed: _(none)_

## Impact
- Specs touched: <list>
- Artifacts to regenerate: <list>
- Downstream templates/commands affected: <list>

## Deltas
See ./deltas/*.md
```

## Scenario format (BDD)

```markdown
### Requirement: Eye-mark on all visual artifacts
Every visual artifact produced by the studio MUST either contain a visible eye motif or justify its absence in the artifact's front-matter.

#### Scenario: Logo export passes eye-motif test
- GIVEN a new brand-system export request
- WHEN the artifact is rendered
- THEN at least one eye-motif component is present
- AND its usage is recorded in the artifact's front-matter `spec-link:` field
```

## Validation checklist (before apply)

- [ ] Every new requirement has ≥1 scenario.
- [ ] Every scenario uses GIVEN / WHEN / THEN.
- [ ] No orphan deltas (all deltas map to a spec path).
- [ ] No spec change without matching `tasks.md`.
- [ ] Tokens-only proposals: paired with `design-tokens` delta.

## Archiving

```bash
mv openspec/changes/<slug>/ openspec/archive/<slug>/
```

Then append to `CHANGELOG.md` → `## [Unreleased]` → appropriate section + **Why** line.

## Forbidden

- Editing `specs/*/spec.md` directly without a corresponding `changes/<slug>/`.
- Deleting archived proposals.
- Authoring specs in anything other than markdown.
