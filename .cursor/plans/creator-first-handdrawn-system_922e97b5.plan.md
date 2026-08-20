---
name: creator-first-handdrawn-system
overview: 'Shift from eye-centric visuals to a creator-first, fully hand-drawn system: backgrounds, components, and decorative elements are authored by you (tablet/paper), with code focused on ingestion, consistency, animation, and reuse. Eye assets are reduced to placeholders only until a future direction is decided.'
todos:
  - id: deeye-placeholder-pass
    content: Remove eye-heavy visuals from active surfaces and replace with minimal placeholders while preserving component behavior.
    status: pending
  - id: asset-pipeline-setup
    content: Define folder structure, naming/versioning, and processing workflow for your hand-drawn backgrounds/chrome/decor assets.
    status: pending
  - id: primitive-refactor
    content: Create reusable hand-drawn primitives and migrate existing sketch classes to componentized usage.
    status: pending
  - id: background-system
    content: Implement layered hand-drawn background presets and apply them to portal then web shells.
    status: pending
  - id: motion-pass
    content: Add subtle draw-on and limited boil effects to hand-drawn assets with reduced-motion parity.
    status: pending
  - id: creator-guide
    content: Document your tablet-to-web workflow and export standards for continuous drawing-driven updates.
    status: pending
  - id: staged-rollout
    content: Pilot, validate, then expand across all components and pages; keep eye placeholders until future direction change.
    status: pending
isProject: false
---

# Creator-First Hand-Drawn UI Plan

## Goal

Make the entire UI feel authentically hand-drawn by you:

- background system
- component chrome (buttons, cards, fields, panels)
- decorative marks
- motion pass (draw-on / subtle boil)

Eye-heavy visuals are intentionally paused. Keep only lightweight placeholders where structure expects an eye asset.

## Product Direction Changes

- Replace current "eye as primary visual driver" with a neutral hand-drawn placeholder strategy.
- Prioritize your authored sketches over generated/vector-perfect marks.
- Build a repeatable pipeline so new hand-drawn assets can be dropped in fast without rewriting UI code.

## Phase 1: Placeholder + De-Eye the Surfaces

- Replace existing eye-heavy visual usage with placeholder marks in high-visibility surfaces.
- Keep interaction behavior intact (layout, navigation, state), but swap artwork to neutral placeholder assets.
- Preserve accessibility and reduced-motion behavior.

Primary impact areas:

- `apps/kiruk-portal/src/components/ReactiveEye.tsx`
- `apps/kiruk-portal/public/eye/hero.svg`
- `apps/kiruk-portal/src/components/RiggedGlyph.tsx`
- `apps/kiruk-web/src/components/sketch/EyeMark.astro`

## Phase 2: Your Hand-Drawn Asset Pipeline

Create a strict authoring and import pipeline so every visual can come from your drawings.

### Authoring sources

- Tablet-first drawings (preferred)
- Paper scans/photos (fallback)

### Asset classes

- `bg/` hand-drawn backgrounds (paper grain, ruled lines, torn edges, scribble fields)
- `chrome/` component outlines (button/card/input/frame variants)
- `decor/` stickers, arrows, underlines, separators
- `type/` optional hand-lettered headings

### Processing

- Normalize dimensions, stroke contrast, transparency
- Export both raster (`png/webp`) and vector-ready (`svg`) variants where possible
- Naming conventions and versioning (`*-v1`, `*-v2`) for append-only iteration

## Phase 3: Hand-Drawn Primitive System (Code Layer)

Convert current class-based styling into reusable primitives that accept your assets.

Core primitives to establish:

- `HandBackground`
- `HandSurface`
- `HandButton`
- `HandInputFrame`
- `HandDivider`
- `HandDecor`

Refactor targets:

- `apps/kiruk-portal/src/app/globals.css`
- `apps/kiruk-web/src/styles/global.css`
- Existing components currently using `.sketch-border` / `.sketch-button` / `.handwritten`

## Phase 4: Background-First Systemization

Make the whole app feel drawn, not just boxed components.

Build a layered background engine:

- base paper texture
- sketch grid / ruled / dots variants
- hand-drawn overlays (corners, tape, torn edges)
- optional scene presets per page type

Route-level adoption:

- portal shell pages first
- web landing + nav pages next

## Phase 5: Animation Pass (Subtle, Human)

Animate your drawings without making them feel synthetic.

Motion rules:

- draw-on for entry moments
- low-amplitude boil for selected elements only
- hover re-ink on interactive controls
- strict reduced-motion fallback

Use existing stack only where it fits:

- Motion for path reveal and stagger
- reusable SVG filter presets for gentle wobble

## Phase 6: Creator Workflow (You-Centric)

Document a fast workflow so you can continuously inject new drawings.

Workflow doc should include:

- tablet settings and canvas presets
- line-weight and contrast guidelines for web readability
- export checklist (alpha, dimensions, naming)
- drop-in map: where each asset type lives and how components consume it

## Phase 7: Rollout Strategy

- Pilot on 3-5 core components + 2 key pages
- Validate readability, performance, and consistency
- Expand to all portal components
- Expand to web surfaces
- Keep eye placeholders until a new eye direction is explicitly approved

## Quality Gates

- Hand-drawn source is visible in every major surface
- No visual regression in interaction usability
- Reduced-motion support remains intact
- Background complexity does not reduce legibility
- Spec/process artifacts updated before broad rollout

## Expected Outcome

A complete hand-drawn UI language authored by you, where code supports your drawing system rather than replacing it. Eyes are no longer the visual center for now; placeholders keep structure stable while the new creator-first style becomes the product identity.
