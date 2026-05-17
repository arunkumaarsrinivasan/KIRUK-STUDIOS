# Spec: brand-consistency-ci

## Purpose

Kiruk's brand promises — eye-motif on every visual, no orphan design tokens, no hardcoded colors, scribble-first ritual, no published content with redacted leakage — are easy to forget under solo-founder time pressure. This capability defines an automated CI gate that enforces those promises on every commit and pull request. Drift gets caught before it ships, not after.

This spec defines the **checks**, not the implementation. A follow-up proposal will pick the runner (GitHub Actions, local pre-commit, Husky, custom node script) and wire it up.

## Domain vocabulary

| Term | Meaning |
|---|---|
| **Check** | A single automated assertion against the repo (e.g. eye-motif test, token coverage, scribble presence). |
| **Gate** | A check whose failure blocks merge to `main`. |
| **Advisory** | A check whose failure surfaces a warning but does not block merge. |
| **Coverage report** | A summary artifact written to `.brand-ci/` on each run, listing pass/fail per check + per touched file. |

## Requirements

### Requirement: Eye-motif coverage check (gate)
Every committed React component file under `apps/*/src/**/*.tsx`, `packages/design-system/components/**/*.tsx`, or `kiruk-projects/_products/**/*.tsx` that renders visual output MUST either: (a) import at least one component from `@kiruk/design-system` whose name starts with `Eye`, OR (b) include a top-of-file comment `// eye-motif: none — justified: <reason>` referencing a paragraph in a sibling `spec.md`.

#### Scenario: New component without eye motif fails CI
- GIVEN a new file `apps/kiruk-web/src/components/Hero.tsx` rendering JSX with no `Eye*` import and no justification comment
- WHEN the brand-CI runs
- THEN the gate fails
- AND the report cites the file path and missing requirement

### Requirement: Token coverage check (gate)
Every new design token added under `packages/design-system/tokens/**/*.json` MUST have a corresponding new requirement in `openspec/specs/design-tokens/spec.md`. The check matches token paths to requirement scenarios by token name.

#### Scenario: Token added without spec entry
- GIVEN a new token `color.spark.cyan` in `tokens/core.json`
- WHEN brand-CI runs and `design-tokens/spec.md` has no scenario referencing `spark.cyan`
- THEN the gate fails with a pointer to add the requirement

### Requirement: No hardcoded color or font in app code (gate)
Source files under `apps/*/src/` MUST NOT contain hex color literals (`#[0-9a-fA-F]{3,8}`), `rgb(`, or font-family literals other than via design tokens or `@kiruk/design-system` exports. Exceptions: gitignored env files, third-party library wrappers explicitly tagged `// brand-ci: third-party-color-ok`.

#### Scenario: Hex color in app source
- GIVEN `apps/kiruk-web/src/page.tsx` containing `color: '#ff4d2e'`
- WHEN brand-CI runs
- THEN the gate fails with the line cited
- AND the fix is documented: use `var(--color-iris-core)` or import from design system

### Requirement: Scribble presence check (gate)
Every universe folder (`kiruk-projects/<universe>/`), every ISM folder (`kiruk-ism/<ism>/`), every product folder (`kiruk-projects/_products/<product>/`) MUST contain a non-empty `scribble/` folder with at least one image or `textual.md`. See `pen-and-paper`.

#### Scenario: New universe with empty scribble folder
- GIVEN a new universe folder pushed without any scribble
- WHEN brand-CI runs
- THEN the gate fails

### Requirement: Redaction check on content (gate)
Files under `content/devlogs/`, `content/case-studies/`, `content/story-drops/`, `content/social/` MUST pass the redaction scan defined in `build-in-public` before merge. The scan looks for: dollar amounts paired with client names, raw email addresses outside `_template.mdx`, API key patterns, and any string flagged in `.brand-ci/redaction-patterns.json`.

#### Scenario: Devlog with leaked revenue
- GIVEN `content/devlogs/2026-05-18-rough-week.mdx` containing `"Acme paid $8500"`
- WHEN brand-CI runs
- THEN the gate fails with the line cited

### Requirement: Workspace import discipline (advisory)
Files under `apps/*/src/` SHOULD import shared visual primitives from `@kiruk/design-system` rather than duplicating them inline. This check MUST run on every CI pass and MUST emit an advisory warning when an inline duplicate is detected. The advisory MUST NOT block merge.

#### Scenario: Inline SVG eye drawn in app
- GIVEN an `<svg>` block in `apps/kiruk-web/src/page.tsx` that visually resembles an eye but doesn't import from the design system
- WHEN brand-CI runs
- THEN the report includes a soft warning suggesting use of the design system

### Requirement: Coverage report committed-or-published
After each CI run, a coverage report MUST be written to `.brand-ci/last-report.md` (gitignored locally; uploaded as build artifact in CI). The report lists every check, its result, and a per-file breakdown.

#### Scenario: Report missing
- GIVEN a CI run with no `.brand-ci/last-report.md` produced
- WHEN the orchestrator checks for the artifact
- THEN the run is marked failed for missing report

### Requirement: Bypass requires written reason
A check MAY be bypassed for a single PR by adding `brand-ci: bypass <check-name> reason: <text>` to the PR description. The bypass MUST be logged to `LEARNINGS.md` if it represents a real exception (per `operational-learning`).

#### Scenario: Silent bypass attempt
- GIVEN a PR labeled to skip brand-CI without the documented bypass syntax
- WHEN the gate runs
- THEN the bypass is ignored and the original checks run

## Acceptance Artifacts

- `.brand-ci/` folder convention (gitignored, written by runner)
- `.brand-ci/redaction-patterns.json` (committed, owned by `build-in-public`)
- Future: GitHub Actions workflow `.github/workflows/brand-ci.yml` (separate proposal to pick runner)
- Future: `scripts/brand-ci/*.mjs` per-check implementations (separate proposal)
