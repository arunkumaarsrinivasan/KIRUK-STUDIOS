# Spec: design-tokens

## Purpose

The design-tokens capability defines the single source of truth for all design decisions expressible as data — color, typography, spacing, motion, radius, component primitives. Authored in W3C DTCG JSON, compiled by Style Dictionary into CSS custom properties, Tailwind theme extension, and TypeScript exports. All visual components (`packages/design-system/components/`) consume tokens from `packages/design-system/build/`.

## Requirements

### Requirement: DTCG authoring format

All tokens MUST be authored in W3C Design Tokens Community Group format with `$type`, `$value`, and optional `$description` fields, in JSON files under `packages/design-system/tokens/`.

#### Scenario: Token file validates as DTCG

- GIVEN any file in `packages/design-system/tokens/*.json`
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
- WHEN `packages/design-system/build/` is inspected
- THEN `css/tokens.css`, `tailwind/tokens.cjs`, `ts/tokens.ts` all exist and are fresh

### Requirement: Components consume tokens

Every React component in `packages/design-system/components/` MUST consume color, dimension, and motion values via CSS custom properties (from `build/css/tokens.css`) or TypeScript token imports (from `build/ts/tokens.ts`). No hardcoded hex values in component source.

#### Scenario: No hardcoded hex in components

- GIVEN any file in `packages/design-system/components/**/*.tsx`
- WHEN grepped for `/^#[0-9a-fA-F]{3,8}/` (raw hex literals)
- THEN no matches found outside of token files

### Requirement: No token without spec

Any new token added to `packages/design-system/tokens/*.json` MUST be accompanied by a requirement in this spec describing its intent and any constraints.

#### Scenario: Orphan token rejection

- GIVEN a token change proposal adds a new token
- WHEN the proposal is validated
- AND no matching requirement exists in this spec or a referenced spec
- THEN validation fails

### Requirement: Required token groups (v1)

At v1, the token set MUST include these groups in `core.json`: `color`, `dimension` (spacing scale ≥6 steps), `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `radius`.

The `color` group MUST encode a **monochrome paper-and-ink base**: a `paper` (white/near-white) value, an `ink` (black/near-black stroke) value, and a `pencil` grayscale ramp of ≥6 steps between them — ≥8 color primitives total. Saturated hues MUST NOT live in this base group (see "Absurd-color asset boundary").

The `fontFamily` group MUST declare at least: a **wordmark** face, a **display** hand face, a **handwriting** face, and a **clean body sans** face.

#### Scenario: Groups present

- GIVEN `packages/design-system/tokens/core.json`
- WHEN parsed
- THEN top-level keys include `color`, `dimension`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `radius`

#### Scenario: Monochrome base + four font families

- GIVEN `core.json` is parsed
- WHEN the `color` and `fontFamily` groups are inspected
- THEN `color` contains `paper`, `ink`, and a `pencil` grayscale ramp (≥8 color primitives total) with no saturated hues
- AND `fontFamily` declares wordmark, display (hand), handwriting, and body-sans families

### Requirement: Absurd-color asset boundary

Saturated "absurd" colors MUST be defined in a dedicated token group (e.g. `color.absurd.*`) that is reserved for **assets and illustrations only** — never for page chrome, body text, borders, or UI surfaces. Semantic UI tokens MUST resolve only to the monochrome base. This keeps the interface mono (white paper + black stroke) while letting absurd-colored objects blend the digital and the physical.

#### Scenario: Absurd color used in UI chrome rejected

- GIVEN a semantic or component token whose `$value` references `color.absurd.*`
- WHEN the token build or brand-CI audits semantic/component tokens
- THEN it fails, citing that absurd colors are asset-only
- AND the fix is to resolve UI tokens to the monochrome base

#### Scenario: Absurd color on an asset allowed

- GIVEN an illustration/asset token or component referencing `color.absurd.*`
- WHEN audited
- THEN it passes, because the absurd group is scoped to assets/illustrations

## Acceptance Artifacts

- `packages/design-system/tokens/{core,semantic,type,motion,components}.json`
- `packages/design-system/style-dictionary.config.cjs`
- `scripts/build-tokens.mjs`
- `packages/design-system/build/{css/tokens.css,tailwind/tokens.cjs,ts/tokens.ts}` regenerated (gitignored)
