# Spec: brand-system

## Purpose

The brand-system capability governs Kiruk Studio's own identity — the eye-motif visual language, logo system, color direction, typography pairing, motion rules, and the React SVG component library in `packages/design-system/components/` that all other artifacts draw from. It is the source of visual coherence across every universe the studio builds.

## Requirements

### Requirement: Primary eye-mark

The studio MUST define one primary eye-mark logo as a React SVG component at `packages/design-system/components/eye/EyePrimary.tsx`, with a static SVG export at `packages/design-system/build/logos/primary.svg`.

Until the final mark is designed (FOUNDER_DECISIONS B1), `EyePrimary` MAY be an explicitly-labelled **placeholder**, and the eye motif MAY also be expressed as a _drawn_ eye (shader/canvas/inline SVG) in interactive surfaces. The "exactly one mark" exclusivity is relaxed to "one canonical mark or its documented placeholder/derivative" while B1 is open.

#### Scenario: Placeholder mark permitted while B1 open

- GIVEN B1 (primary eye-mark) is unresolved in `FOUNDER_DECISIONS.md`
- WHEN an artifact displays the studio identity using the labelled `EyePrimary` placeholder or a documented drawn-eye derivative
- THEN it passes the brand check
- AND a task remains to replace the placeholder with the finalized mark

### Requirement: Secondary eye-marks

The studio MUST define ≥3 secondary eye-marks as React SVG components in `packages/design-system/components/eye/`, named `EyeIris`, `EyeGaze`, `EyePortal`, `EyeConstellation`.

#### Scenario: Secondary mark catalog complete

- GIVEN the brand-system spec is marked v1-locked
- WHEN `packages/design-system/components/eye/` is listed
- THEN ≥4 component files exist (EyePrimary + ≥3 secondary)

### Requirement: Palette derived from tokens

The brand palette MUST be sourced from `packages/design-system/tokens/core.json` and `packages/design-system/tokens/semantic.json`. No hardcoded brand hex values outside these files.

#### Scenario: Palette drift detection

- GIVEN a visual artifact using a brand color
- WHEN the color is audited against token build output (`packages/design-system/build/css/tokens.css`)
- THEN every color value resolves to a CSS custom property, not a raw hex

### Requirement: Type pairing

The brand MUST pair a **clean body sans** (for long-form reading: manifesto, devlogs, case-study prose, UI) with **hand-drawn faces** for voice — a wordmark face, a display hand face, and a handwriting face. All faces MUST be declared in `packages/design-system/tokens/type.json`. (This replaces the prior single rational + expressive pairing.)

#### Scenario: Type roles declared

- GIVEN `packages/design-system/tokens/type.json` is read
- WHEN the token set is inspected
- THEN it declares a clean body-sans family AND at least one hand-drawn family for display/voice
- AND long-form body text resolves to the body-sans, not a handwriting face

### Requirement: Motion motifs

The brand MUST define ≥4 motion motifs in `packages/design-system/tokens/motion.json` that tie to the eye metaphor: `gaze-track`, `iris-dilate`, `portal-transition`, `cursor-orbit`.

#### Scenario: Motion tokens present

- GIVEN `packages/design-system/tokens/motion.json`
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

Brand output MUST comply with the five non-negotiables in `CLAUDE.md` §5. A brand artifact violating any non-negotiable MUST NOT be archived.

#### Scenario: Trend-chase rejection

- GIVEN a brand-system change proposal
- WHEN the proposal references a trending style or clones a known studio/product
- THEN the proposal is rejected at validation gate

### Requirement: Light-only application

All brand surfaces (web + artifacts) MUST default to light — white paper + black stroke. A dark-mode token set is NOT required and MUST NOT be assumed by components.

#### Scenario: No dark-mode dependency

- GIVEN any brand surface or component
- WHEN rendered without a theme toggle
- THEN it presents on white paper with black stroke
- AND it does not depend on a dark-theme token set to be legible

## Acceptance Artifacts

- `packages/design-system/components/eye/{EyePrimary,EyeIris,EyeGaze,EyePortal,EyeConstellation}.tsx`
- `packages/design-system/components/kirukal/Scribble.tsx`
- `packages/design-system/components/index.ts` (barrel)
- `packages/design-system/build/logos/primary.svg` + `secondary-{iris,gaze,portal}.svg`
- `packages/design-system/tokens/{core,semantic,type,motion}.json` complete
- `content/manifesto.md` referencing the brand
