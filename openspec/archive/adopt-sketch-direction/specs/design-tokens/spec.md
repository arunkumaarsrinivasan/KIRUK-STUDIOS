# Delta: design-tokens

## MODIFIED Requirements

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

## ADDED Requirements

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
