# Spec: design-tokens

## Purpose

The design-tokens capability defines the single source of truth for all design decisions expressible as data — color, typography, spacing, motion, radius, component primitives. Authored in W3C DTCG JSON, compiled by Style Dictionary into consumable formats for web (CSS vars, Tailwind, TS), and synced into `kiruk-design.pen` via the pencil MCP.

## Requirements

### Requirement: DTCG authoring format
All tokens MUST be authored in W3C Design Tokens Community Group format with `$type`, `$value`, and optional `$description` fields, in JSON files under `design-system/tokens/`.

#### Scenario: Token file validates as DTCG
- GIVEN any file in `design-system/tokens/*.json`
- WHEN parsed by a DTCG-compliant parser
- THEN every leaf token has `$type` and `$value`; no legacy Style-Dictionary-only shapes

### Requirement: Layered token hierarchy
Tokens MUST be organized into three layers: **core** (primitives), **semantic** (named aliases of core), **components** (component-scoped tokens referencing semantic).

#### Scenario: Layering enforced
- GIVEN any token in `semantic.json` or `components.json`
- WHEN its `$value` is inspected
- THEN it is a reference `{core.*}` or `{semantic.*}`, never a raw literal

### Requirement: Style Dictionary build
A build MUST produce CSS variables, Tailwind config, TypeScript exports, and a Pencil variables JSON from the token source.

#### Scenario: Build outputs present
- GIVEN `npm run tokens:build` has run
- WHEN `design-system/build/` is inspected
- THEN `css/tokens.css`, `tailwind/tokens.cjs`, `ts/tokens.ts`, `pen/variables.json` all exist and are fresh

### Requirement: Pencil sync
`design-system/build/pen/variables.json` MUST be pushed into `kiruk-design.pen` via `mcp__pencil__set_variables` when `npm run tokens:sync-pen` is run.

#### Scenario: Pen variables match token build
- GIVEN tokens have been built and synced
- WHEN `mcp__pencil__get_variables` is called on `kiruk-design.pen`
- THEN each variable name and value matches the corresponding entry in `build/pen/variables.json`

### Requirement: No token without spec
Any new token added to `design-system/tokens/*.json` MUST be accompanied by a requirement in this spec describing its intent and any constraints.

#### Scenario: Orphan token rejection
- GIVEN a token change proposal adds `eye-halo-glow`
- WHEN the proposal is validated
- AND no matching requirement exists in this spec or a referenced spec
- THEN validation fails

### Requirement: Required token groups (v1)
At v1, the token set MUST include these groups in `core.json`: `color` (≥8 primitives), `dimension` (spacing scale ≥6 steps), `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `radius`.

#### Scenario: Groups present
- GIVEN `design-system/tokens/core.json`
- WHEN parsed
- THEN top-level keys include `color`, `dimension`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `radius`

## Acceptance Artifacts

- `design-system/tokens/{core,semantic,type,motion,components}.json`
- `design-system/style-dictionary.config.cjs`
- `scripts/build-tokens.mjs`, `scripts/sync-pen-variables.mjs`
- `design-system/build/**` regenerated (gitignored)
