# Delta: brand-system

## MODIFIED Requirements

### Requirement: Primary eye-mark

The studio MUST define one primary eye-mark logo as a React SVG component at `packages/design-system/components/eye/EyePrimary.tsx`, with a static SVG export at `packages/design-system/build/logos/primary.svg`.

Until the final mark is designed (FOUNDER_DECISIONS B1), `EyePrimary` MAY be an explicitly-labelled **placeholder**, and the eye motif MAY also be expressed as a _drawn_ eye (shader/canvas/inline SVG) in interactive surfaces. The "exactly one mark" exclusivity is relaxed to "one canonical mark or its documented placeholder/derivative" while B1 is open.

#### Scenario: Placeholder mark permitted while B1 open

- GIVEN B1 (primary eye-mark) is unresolved in `FOUNDER_DECISIONS.md`
- WHEN an artifact displays the studio identity using the labelled `EyePrimary` placeholder or a documented drawn-eye derivative
- THEN it passes the brand check
- AND a task remains to replace the placeholder with the finalized mark

### Requirement: Type pairing

The brand MUST pair a **clean body sans** (for long-form reading: manifesto, devlogs, case-study prose, UI) with **hand-drawn faces** for voice — a wordmark face, a display hand face, and a handwriting face. All faces MUST be declared in `packages/design-system/tokens/type.json`. (This replaces the prior single rational + expressive pairing.)

#### Scenario: Type roles declared

- GIVEN `packages/design-system/tokens/type.json` is read
- WHEN the token set is inspected
- THEN it declares a clean body-sans family AND at least one hand-drawn family for display/voice
- AND long-form body text resolves to the body-sans, not a handwriting face

## ADDED Requirements

### Requirement: Light-only application

All brand surfaces (web + artifacts) MUST default to light — white paper + black stroke. A dark-mode token set is NOT required and MUST NOT be assumed by components.

#### Scenario: No dark-mode dependency

- GIVEN any brand surface or component
- WHEN rendered without a theme toggle
- THEN it presents on white paper with black stroke
- AND it does not depend on a dark-theme token set to be legible
