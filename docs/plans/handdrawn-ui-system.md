<!--
spec: openspec/changes/handdrawn-design-system (to be drafted)
status: blueprint — not yet implemented
supersedes: ~/OneDrive/Desktop/creator-first*handdrawn*.plan.md (desktop drafts)
related: docs/plans/concept-eyeball-system.md, docs/handbook/learning-roadmap.md
-->

# Track 1 — Hand-Drawn UI System

> Make the entire kiruk UI feel authored by Arun's hand: backgrounds, component chrome, decorative marks — all drawn on the tablet. Code's job is support only: ingestion, consistency, layering, subtle life (draw-on + boil), accessibility, reuse. **Open-source from day one.**

## Why this exists

The current UI leans on the "eye as primary visual," with ~60+ procedural `RiggedGlyph` eyes and CSS rotations standing in for "hand-drawn." That reads as _applied effect_, not _authored craft_. The goal is to flip it: **your drawings are the source of truth; code never replaces your hand.** This becomes a fork-able, published design system — kiruk's public craft artifact.

## Core principle

| Layer                                                                      | Owner                                          |
| -------------------------------------------------------------------------- | ---------------------------------------------- |
| What is seen (backgrounds, chrome, decor, textures)                        | **You draw it** (Affinity / tablet / paper)    |
| How it lives (layering, draw-on, boil, hover, a11y, reduced-motion, reuse) | **Code**                                       |
| Procedural sketch look (rough.js)                                          | **Charts/diagrams only** — never your hand art |

## Phases

### T1.1 — De-eye + placeholder

Replace eye-heavy visuals with one neutral `<HandMark/>` placeholder while keeping **all** interaction, layout, state, and reduced-motion behavior identical.

- Touch: `apps/kiruk-portal/src/components/{ReactiveEye,RiggedGlyph,EyeBall,EyeCheckbox,EyeStatus,EyeField}.tsx`, `apps/kiruk-web/src/components/sketch/EyeMark.astro`, `apps/kiruk-portal/public/eye/*`, `CustomCursor.tsx`.
- **Park, don't delete** `EyeScene.tsx` (R3F) — it becomes the 3D ConceptEye backend (Track 2, later). Gate the `/eye-3d` route behind a flag.
- Deliverable: surfaces look "waiting for the real drawing," never broken.

### T1.2 — Authoring → web pipeline

Make every new drawing become production UI in one step.

- Folders: `packages/design-system/assets/handdrawn/{bg,chrome,decor,type}/`, each with `manifest.md` (pen-and-paper compliance: date, source, caption) and append-only `-v1`/`-v2` versioning.
- Pipeline: **Affinity v3** → Image Trace → SVG export (KEEP `viewBox` + `<title>`) → **SVGO v4** (config preserving viewBox/titles) → drop-in.
- `scripts/svg-ingest.mjs`: one command = SVGO optimize + naming/manifest check + report bytes saved.
- `perfect-freehand` for live ink capture (portal already has a pen-draw scribble surface, Slice 1 — reuse its PointerEvent pressure).

### T1.3 — Primitive system

Promote the existing one-off CSS into componentized primitives in `@kiruk/design-system`.

- From: `.sketch-border`, `.sketch-button`, `.bg-*`, `.scribbled-*` (in `apps/kiruk-portal/src/app/globals.css` + `apps/kiruk-web/src/styles/global.css`).
- To: `HandBackground`, `HandSurface` / `HandCard` / `HandPanel`, `HandButton`, `HandField`, `HandDivider`, `HandDecor`.
- Each primitive: accepts your SVG variants; handles hover/focus/reduced-motion; applies the right boil level.
- **Guard (LEARNINGS.md 2026-05-26):** wrap graduated CSS in `@layer components`; keep positioning (Tailwind utility on wrapper) decoupled from decoration (sketch class on inner element).
- **Pilot order:** forms + cards + buttons first (highest daily use).

### T1.4 — Background-first immersion

The whole screen should feel like a sketchbook page, not a UI with drawings stuck on.

- Layers: base paper + grain → hand-drawn ruling/grid/dots (imperfect) → overlays (tape, tears, coffee rings, corner scribbles) → per-view scene presets.
- Apply to portal shell first, then web landing/nav.

### T1.5 — Animation (subtle, yours)

- Reusable presets: **Motion `pathLength`** draw-on reveal on entry; **low-amplitude feTurbulence boil** on _selected_ important marks only; hover re-ink.
- One shared boil filter with a correct seamless loop: animate via `values` + `keyTimes`, `stitchTiles="noStitch"`, pre-blur noise, expanded filter region.
- Strict `prefers-reduced-motion: reduce` → static final drawing (boil → `roughness.smooth`, no draw-on).
- Research consensus: subtle > legibility-killing.

### T1.6 — Open-source from day one

- License split (confirm exact): **code → MIT**, **specs / templates / assets → CC-BY-NC**. Add `LICENSE`, `ATTRIBUTION.md`, `CONTRIBUTING.md`.
- Make `@kiruk/design-system` publishable: real `exports`, README component gallery, semver policy, `.github/workflows/release.yml` (npm + GitHub Releases).
- Scribble-back every primitive (pen-and-paper gate) in `assets/handdrawn/*/manifest.md`.

## Token additions (require spec — see OpenSpec)

`strokeWidth.{hairline 0.5, base 1.5, bold 2.5}` · `roughness.{smooth 0, hand 0.1–0.3, sketch 0.4–0.6}` · `inkOpacity.{ghost 0.3, regular 0.8, solid 1.0}`. Added to `packages/design-system/tokens/core.json` only after `design-tokens/spec.md` has matching requirements ("no token without spec").

## Verified resources (use these)

- Stroke capture: **perfect-freehand** — github.com/steveruizok/perfect-freehand
- Boil: **MDN feTurbulence + feDisplacementMap**, Codrops "texture with feTurbulence," CSS-Tricks Squigglevision; loop via `values`/`keyTimes`/`noStitch`
- Draw-on: **Motion `pathLength`** (motion.dev/docs/react-svg-animation); GSAP DrawSVG (alt)
- Authoring: **Affinity v3** Image Trace + SVG export; **SVGO v4** (preserve viewBox/titles)
- Charts only: rough.js / react-rough-fiber
- Handwritten text: **Tegaki** (gkurt.com/tegaki)
- **Avoid:** Scrawl-ui, "Sketchy Kit" (don't exist as libs), WigglyPaint as a dependency

## Done-when (Track 1)

Portal forms/cards/buttons are fully your hand; backgrounds feel like a sketchbook; animations are subtle + reduced-motion-safe; `@kiruk/design-system` builds clean ESM+CSS and installs in a scratch app; every primitive has a scribble.
