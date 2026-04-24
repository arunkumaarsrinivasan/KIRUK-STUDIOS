# Spec: ism

## Purpose

The ISM Lab is Kiruk Studio's internal R&D surface — self-initiated experiments orbiting personal fascinations. This spec is intentionally **names-only at v0**: it registers the ISM names that may be spawned later, without committing to any subproject scope until `/kiruk-ism-new <name>` is run.

When an ISM is spawned, a sibling spec `openspec/specs/ism-<name>/spec.md` is created from this spec's template section; the `/kiruk-ism-new` command handles scaffolding.

## Requirements

### Requirement: Registered ISM names
The ISM registry MUST list every ISM name the studio intends to reserve. Spawning a new ISM under a name not in the registry MUST require a spec change.

#### Scenario: Registry check
- GIVEN `/kiruk-ism-new <name>` is invoked
- WHEN `<name>` is not present in the Registered Names list below
- THEN the command refuses and prompts to open a change proposal adding the name

### Requirement: Spawned ISM requires its own spec
Once spawned, an ISM MUST have its own capability spec at `openspec/specs/ism-<name>/spec.md` with a Purpose section and ≥1 requirement.

#### Scenario: Spawned without spec
- GIVEN a folder `kiruk-ism/<name>/` exists
- WHEN no matching `openspec/specs/ism-<name>/spec.md` exists
- THEN validation fails

### Requirement: No subproject without spawn
Until `/kiruk-ism-new <name>` is run, `kiruk-ism/` MUST contain no subfolders for named ISMs.

#### Scenario: Empty-by-default invariant
- GIVEN the repo at v0 (Phase 0 bootstrap)
- WHEN `kiruk-ism/` is listed
- THEN no `<name>/` subfolder exists (only a README.md placeholder)

### Requirement: ISM devlog
A spawned ISM MUST produce at least one devlog entry in `content/devlogs/ism-<name>-<NNNN>.md` before being portfolio-eligible.

#### Scenario: Devlog precondition
- GIVEN an ISM is being added to the portfolio
- WHEN `content/devlogs/ism-<name>-*.md` does not exist
- THEN portfolio inclusion is blocked

## Registered Names

These names are reserved. They do not exist as projects yet.

- `heroism`
- `kirukism`
- `colorism`
- `nomadism`

(Add a name via a change proposal that appends here and writes an `ism-<name>` spec skeleton.)

## Template for a spawned `ism-<name>` spec

_(Used by `/kiruk-ism-new`; copied to `openspec/specs/ism-<name>/spec.md`.)_

```markdown
# Spec: ism-<name>

## Purpose
<what this ISM explores and why it matters to Kiruk>

## Requirements

### Requirement: Prototype
The ISM MUST produce one interactive prototype (web, installation, or device) exploring its theme.

#### Scenario: Prototype shippable
- GIVEN the ISM is marked v1-locked
- WHEN the prototype URL or artifact path is opened
- THEN the prototype loads and demonstrates the theme

### Requirement: Devlog
The ISM MUST produce at least one devlog entry at `content/devlogs/ism-<name>-<NNNN>.md`.

### Requirement: Eye-motif compliance
See brand-system/spec.md — Requirement: Eye-motif test.

## Acceptance Artifacts
- `kiruk-ism/<name>/src/` — prototype source
- `kiruk-ism/<name>/design-notes.md`
- `content/devlogs/ism-<name>-*.md`
```

## Acceptance Artifacts (for this v0 spec)

- `kiruk-ism/README.md` (placeholder explaining the empty state)
- No ISM subfolders present
- Template above used by `/kiruk-ism-new`
