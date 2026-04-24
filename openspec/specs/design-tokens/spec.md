# Spec: design-tokens

## Purpose

The design-tokens capability defines the single source of truth for all design decisions expressible as data — color, typography, spacing, motion, radius, component primitives. Authored in W3C DTCG JSON, compiled by Style Dictionary into CSS custom properties, Tailwind theme extension, and TypeScript exports. All visual components (`design-system/components/`) consume tokens from `design-system/build/`.

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
A build MUST produce CSS custom properties, Tailwind config, and TypeScript exports from the token source.

#### Scenario: Build outputs present
- GIVEN `npm run tokens:build` has run
- WHEN `design-system/build/` is inspected
- THEN `css/tokens.css`, `tailwind/tokens.cjs`, `ts/tokens.ts` all exist and are fresh

### Requirement: Components consume tokens
Every React component in `design-system/components/` MUST consume color, dimension, and motion values via CSS custom properties (from `build/css/tokens.css`) or TypeScript token imports (from `build/ts/tokens.ts`). No hardcoded hex values in component source.

#### Scenario: No hardcoded hex in components
- GIVEN any file in `design-system/components/**/*.tsx`
- WHEN grepped for `/^#[0-9a-fA-F]{3,8}/` (raw hex literals)
- THEN no matches found outside of token files

### Requirement: No token without spec
Any new token added to `design-system/tokens/*.json` MUST be accompanied by a requirement in this spec describing its intent and any constraints.

#### Scenario: Orphan token rejection
- GIVEN a token change proposal adds a new token
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
- `scripts/build-tokens.mjs`
- `design-system/build/{css/tokens.css,tailwind/tokens.cjs,ts/tokens.ts}` regenerated (gitignored)
