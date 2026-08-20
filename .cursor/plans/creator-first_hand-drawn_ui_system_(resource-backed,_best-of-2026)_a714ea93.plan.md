---
name: Creator-First Hand-Drawn UI System (Resource-Backed, Best-of-2026)
overview: ''
todos:
  - id: phase-1-deeye
    content: De-eye surfaces with clean placeholders. Study current eye code only for removal. No new external resources here.
    status: pending
  - id: phase-2-asset-pipeline
    content: 'Define authoring-to-web pipeline for your drawings. Best resources: Affinity Designer 2026 workflows, Concepts, WigglyPaint for boil tests, Scrawl-ui/Sketchy Kit scrapbook references for what physical details read at UI scale, Figma Rough plugins for quick iteration.'
    status: pending
  - id: phase-3-primitives
    content: 'Build Hand* primitives. Best resources: Scrawl-ui & Sketchy Kit filter + wobble-level architecture + physical ephemera patterns (adapt, do not adopt wholesale); current kiruk sketch CSS as dialect to evolve.'
    status: pending
  - id: phase-4-backgrounds
    content: "Full hand-drawn background immersion. Best resources: Scrawl-ui scrapbook kit (strongest reference for layered handmade surfaces), Sketchy Kit, your own existing 'scribble is the interface' language."
    status: pending
  - id: phase-5-animation
    content: 'Draw-on + living boil on your assets. Best resources: Motion pathLength tutorial (official), Camillo Visini boil guide + Codrops + StackOverflow seamless loop patterns (values/keyTimes/noStitch), CSS-Tricks Squigglevision, WigglyPaint as quality bar for what good boil feels like.'
    status: pending
  - id: phase-6-workflow
    content: 'Creator workflow doc. Best resources: Affinity/Concepts real workflows 2026, WigglyPaint usage notes, Scrawl/Sketchy how-to pages for clean reference, Tegaki generator if lettering is involved.'
    status: pending
  - id: phase-7-rollout
    content: Pilot on portal forms/cards then backgrounds, then web. Validate. Keep eye placeholders. Update changelog and capture.
    status: pending
  - id: resource-governance
    content: "Maintain living 'resources we stole ideas from' section. Core now: SVG boil filters (Visini/Codrops/Stack), Motion path draw, pressure capture. Authoring: Affinity + WigglyPaint + Concepts. Inspiration only: Scrawl-ui patterns, Sketchy Kit. Optional: Tegaki (text), tldraw (live canvas)."
    status: pending
isProject: false
---

# Creator-First Hand-Drawn UI System (Resource-Backed, Best-of-2026)

## Core Philosophy (Re-stated for Clarity)

- **You draw everything that is seen**: full backgrounds, component chrome (borders, cards, buttons, fields, dividers), decorative elements, textures, overlays.
- Code's job is **support**: ingestion, consistency, layering, subtle life (draw-on + controlled boil), performance, accessibility, and reuse.
- Eyes / eyeballs are **paused**. Replace with minimal, clean placeholders only. No more "sloppy eyes" as the signature visual.

This plan explicitly integrates the best resources and techniques discovered from deep research (X/Twitter, GitHub, blogs, Codrops, StackOverflow, Figma plugins, tablet tools, 2025-2026 experiments) into **every phase**.

The goal is not to adopt libraries wholesale, but to steal the smartest ideas, filter implementations, animation patterns, and workflows so your hand-drawn work looks and feels like the absolute highest craft possible.

## Resource Strategy Overview (How We Use the Research)

Classify everything found:

**Core techniques to internalize now (build into the system):**

- SVG `feTurbulence` + `feDisplacementMap` for organic wobble/boil (Camillo Visini guide, Codrops Squigglevision, TheLinuxCode practical distortion guide, CSS-Tricks).
- Proper seamless looping: `values` + `keyTimes`, `stitchTiles="noStitch"`, pre-blur noise, expanded filter region (StackOverflow + Visini).
- Motion `pathLength` for authentic draw-on (official Motion docs + path drawing tutorial).
- Pressure-sensitive stroke capture (perfect-freehand + real PointerEvent pressure).

**Authoring & generation tools for you (the drawer):**

- Affinity Designer 2026 (best tablet-to-vector + raster in one file, Image Trace, clean SVG export, iPad parity).
- Concepts (infinite vector sketching for ideation).
- WigglyPaint (wigglypaint.com + Decker version) — draw once, get automatic boil + instant GIF/Live Photo. Use for test assets or direct inspiration.

**Inspiration libraries (study patterns, do not vendor the full thing):**

- Scrawl-ui and Sketchy Kit: real zero-dep implementations of multi-level wobbles using the exact SVG filter technique + scrapbook elements (sticky notes, washi tape, torn edges, stickers). Excellent reference for how to structure wobble levels and physical ephemera.
- Sketchy Kit's single-filter + CSS var approach.

**Text / lettering animation (optional, selective use):**

- Tegaki: best current solution for real stroke-order animated handwriting from any font or generated bundle. Generator tool available. Only for text elements if you want "drawn letter" feel.

**Capture / live input (upgrade path):**

- Fuderu (modern TS pressure + brush modules).
- react-sketch-canvas patterns.

**Ideation / reference conversion:**

- Figma Rough / Roughly plugins + Framed (hi-fi → sketch).

**Experimental / later surfaces:**

- tldraw SDK or Excalidraw embed only for dedicated "live scribble" areas, not core chrome.

**Rule**: Your drawings are always the source of truth. Resources inform the rendering/animation/support layer.

## Phase 1: De-Eye + Minimal Placeholders

Replace all current eye-heavy visuals with clean, neutral hand-drawn placeholders (simple almond/oval or blank "watch here" mark that you will eventually draw properly).

Keep all interaction, layout, state, and reduced-motion behavior identical.

**Best resources & techniques for this phase:**

- Study current eye implementations (ReactiveEye, hero.svg boil filter, RiggedGlyph) only to understand what to strip.
- No new external libs here — keep it dead simple so the hand-drawn identity can take over cleanly.

Primary files/areas to touch:

- ReactiveEye.tsx and related eye assets → placeholder
- RiggedGlyph
- EyeMark.astro
- Any hero or progress eyes

Deliverable: Surfaces look intentionally "waiting for the real drawing" rather than "broken eye".

## Phase 2: Your Hand-Drawn Asset Pipeline (Authoring → Web)

Establish the professional drop-in system so every new drawing you make can become production UI instantly.

Asset categories:

- Backgrounds (paper, ruled, textured fields, full scenes)
- Chrome (button frames, card outlines, input boxes, panel edges — multiple weights/roughness)
- Decor (arrows, underlines, tape, stickers, torn edges, washi, corner marks)
- Optional lettering sets

Processing: normalize, versions, raster + SVG where useful, clear naming.

**Best resources & techniques to make this the best possible:**

- Affinity Designer 2026 workflow (themadebyjames sketch-to-vector, UIGuides review, official docs): Pixel persona for texture + Vector persona + Image Trace + Export Persona. This is currently the strongest single-app tablet-to-clean-SVG pipeline.
- Concepts for fast infinite-canvas ideation before committing to final drawings.
- WigglyPaint: draw quick test versions with built-in boil to decide if a mark "wants to live" before finalizing the static version you will use.
- Scrawl-ui / Sketchy Kit scrapbook elements as visual reference for what physical details (tape, staples, torn paper) read well at UI scale — then draw your own versions.
- Figma Rough/Roughly + Framed if you ever want to quickly rough-ify a reference layout before drawing the real thing.

Workflow doc must cover: tablet pressure/brush settings for web legibility, line weight hierarchy, contrast for light paper/black ink, export checklist, versioning.

## Phase 3: Hand-Drawn Primitive System (Code That Celebrates Your Drawings)

Stop scattering `.sketch-border`, handwritten classes, and one-off styles.

Create a small set of primitives that your drawings plug into:

- HandBackground
- HandSurface / HandCard / HandPanel
- HandButton / HandAction
- HandInput / HandField
- HandDivider / HandRule
- HandDecor (for stickers, arrows, etc.)

These primitives handle layering, hover states, focus, reduced-motion, and apply the right wobble/boil level from your asset variants.

**Best resources & techniques:**

- Scrawl-ui and Sketchy Kit: study how they apply one SVG filter with levels (sw-wobble-1 to -4) and physical ephemera classes. Copy the filter architecture and level system, implement with your own drawings.
- TheLinuxCode + Visini guides for practical displacement scale, region expansion, and performance notes.
- Current kiruk sketch classes (`.sketch-border::before`, rotation micro-tilts, handwritten fonts) as the starting "kiruk dialect" — evolve them into the primitive system rather than throw away.

Migrate high-use components first.

## Phase 4: Background-First Full Immersion

The entire screen should feel like a page from your sketchbook, not a UI with drawings stuck on.

Layered system:

- Base paper + grain
- Ruling / grid / dot variants (hand-drawn, not perfect)
- Overlays and physical details (tape, tears, coffee rings, corner scribbles)
- Scene presets per major view (desk, wall, open book, etc.)

**Best resources:**

- Scrawl-ui scrapbook kit (sticky notes, washi, torn edges, polaroids, receipts, spiral binding) — strongest public reference for "full handmade surface" using exactly the filter technique we will use.
- Sketchy Kit examples.
- Your own existing devlog and manifesto language about "scribble becomes the interface" — this phase makes that literal.

Apply first to portal shell + key flows, then web landing/nav.

## Phase 5: Animation Pass — Living but Yours

Give your drawings subtle life:

- Draw-on reveal on entry (feels like you just finished the line)
- Very low-amplitude boil on selected important marks only (not everything)
- Hover re-ink / slight emphasis on interactive elements
- Strict reduced-motion: static final drawing

**Best resources & techniques (this is where the research pays off the most):**

- Motion path drawing tutorial (official) for clean `pathLength` staggered reveals on your SVG strokes.
- Camillo Visini "Simulating Hand-Drawn Motion with SVG Filters" + Codrops feTurbulence article + StackOverflow "perfectly loop feTurbulence" for the correct `values` + `keyTimes` + `noStitch` boil loop. This is the current state-of-the-art for browser-native living lines.
- CSS-Tricks Squigglevision for the multi-filter keyframe variant if you want discrete "frame" boiling instead of continuous.
- WigglyPaint as the reference for what "good boil" feels like when baked into the drawing itself. Use it to decide which of your marks should boil and at what intensity.
- Avoid over-applying — the research consistently shows subtle is better for UI legibility.

Implement as reusable filter presets + Motion variants that any primitive can opt into.

## Phase 6: Creator Workflow + Continuous Improvement (You-Centric)

A living document so you (and future kirukargals) can keep feeding new drawings forever.

Must include:

- Exact tablet settings and brushes that produce web-friendly marks
- Line weight and contrast rules
- How to test boil/wobble quickly (WigglyPaint)
- Export + drop-in checklist
- How to add a new chrome variant or background preset
- Mapping table: "I drew X → it becomes Y primitive usage"

**Best resources to reference while writing this:**

- Affinity + Concepts real artist workflows (2026 reviews)
- WigglyPaint iPad + web usage notes (zero lag, one-click GIF for quick validation)
- Scrawl-ui and Sketchy Kit "how to use" pages for clean zero-build inspiration
- Tegaki generator if you ever want to turn a hand-lettered alphabet into animated text

## Phase 7: Staged Rollout + Validation

Pilot → validate → expand.

Order suggestion:

1. Portal forms + cards + buttons (highest daily use)
2. Portal backgrounds + major screens
3. Web nav + landing surfaces
4. Everything else

Quality gates:

- Every major surface has visible hand-drawn source from you
- No loss in usability, contrast, or performance
- Reduced-motion fully respected
- Eye placeholders remain until a deliberate new eye direction

After each meaningful stage: update changelog, capture decisions.

## What the Final Experience Should Feel Like

You open the portal or the site and it feels like opening one of your actual sketchbooks. The paper, the lines, the wobbles, the tape — all yours. The code makes it interactive, consistent, and alive in a quiet, human way, using the best filter, animation, and capture techniques discovered in 2025-2026, without ever replacing your hand as the author.

This is the plan that brings the original "search Twitter and everywhere for the best" research into service of the new constraint: everything drawn by you.
