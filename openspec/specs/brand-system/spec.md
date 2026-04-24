# Spec: brand-system

## Purpose

The brand-system capability governs Kiruk Studio's own identity — the eye-motif visual language, logo system, color direction, typography pairing, motion rules, and the component library in `design-system/pen-files/kiruk-design.pen` that all other artifacts draw from. It is the source of visual coherence across every universe the studio builds.

## Requirements

### Requirement: Primary eye-mark
The studio MUST define exactly one primary eye-mark logo, authored in `kiruk-design.pen` as the component `Eye/Primary`, and exported as SVG to `design-system/build/logos/primary.svg`.

#### Scenario: Primary mark referenced by any artifact
- GIVEN any rendered artifact (template output, website, devlog)
- WHEN the artifact displays the studio's identity
- THEN it MUST reference `Eye/Primary` (or a documented derivative) and no other mark

### Requirement: Secondary eye-marks
The studio MUST define ≥3 secondary eye-marks for pattern, favicon, and motion use, each authored as `Eye/<Variant>` in `kiruk-design.pen`.

#### Scenario: Secondary mark catalog complete
- GIVEN the brand-system spec is marked v1-locked
- WHEN `mcp__pencil__batch_get` is run against `Eye/*`
- THEN ≥4 components return (1 primary + ≥3 secondary)

### Requirement: Palette derived from tokens
The brand palette MUST be sourced from `design-system/tokens/core.json` and `design-system/tokens/semantic.json`. No hardcoded brand hex values outside these files.

#### Scenario: Palette drift detection
- GIVEN a visual artifact using a brand color
- WHEN the color is audited against token build output (`design-system/build/css/tokens.css`)
- THEN every color value resolves to a token name, not a raw hex

### Requirement: Type pairing
The brand MUST pair one **rational** typeface (for UI, structure, grids) with one **expressive** typeface (for headings, manifesto voice). Both MUST be declared in `design-system/tokens/type.json`.

#### Scenario: Type pairing declared
- GIVEN `design-system/tokens/type.json` is read
- WHEN the token set is inspected
- THEN exactly two family tokens exist: `font-rational` and `font-expressive`

### Requirement: Motion motifs
The brand MUST define ≥4 motion motifs in `design-system/tokens/motion.json` that tie to the eye metaphor: `gaze-track`, `iris-dilate`, `portal-transition`, `cursor-orbit`.

#### Scenario: Motion tokens present
- GIVEN `design-system/tokens/motion.json`
- WHEN parsed as DTCG
- THEN tokens `gaze-track`, `iris-dilate`, `portal-transition`, `cursor-orbit` each exist with `$type: duration` or `$type: cubicBezier`

### Requirement: Eye-motif test
Every visual artifact produced by the studio MUST contain a visible eye motif OR justify absence in its front-matter `eye-motif-absent-because:` field.

#### Scenario: Artifact passes eye-motif test
- GIVEN any rendered visual artifact under `kiruk-templates/*/output/` or `content/`
- WHEN reviewed
- THEN an eye motif is visually present
- OR the artifact front-matter includes a `eye-motif-absent-because:` justification

### Requirement: Non-negotiables enforced
Brand output MUST comply with the five non-negotiables in `CLAUDE.md` §4. A brand artifact violating any non-negotiable MUST NOT be archived.

#### Scenario: Trend-chase rejection
- GIVEN a brand-system change proposal
- WHEN the proposal references a trending style or clones a known studio/product
- THEN the proposal is rejected at validation gate

## Acceptance Artifacts

- `design-system/pen-files/kiruk-design.pen` with `Eye/Primary`, `Eye/Iris`, `Eye/Gaze`, `Eye/Portal`, `Eye/Constellation`, `Kirukal/Scribble`
- `design-system/build/logos/primary.svg` + `secondary-{1,2,3}.svg`
- `design-system/tokens/{core,semantic,type,motion}.json` complete
- `content/manifesto.md` referencing the brand
- Front-matter convention documented here
