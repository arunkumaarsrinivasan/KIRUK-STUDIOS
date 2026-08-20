<!--
spec: openspec/changes/eye-motif-transition (to be drafted)
status: blueprint — not yet implemented
related: docs/plans/handdrawn-ui-system.md, FOUNDER_DECISIONS.md (AG1, AG2)
source sketch: VZBISM mirror eye + "eyeball is the menu / outer layer is common" note
-->

# Track 2 — Concept-Eyeball System

> Each project gets an eye. The **outer eye is constant** (your hand-drawn frame, the brand). The **iris is a window into that project's idea / design system / style** — "are we seeing the genuine vibe or not?" The iris is **per-project: some SVG, some 3D**.

## Why this exists

The old eyes were decorative and interchangeable (8 procedural patterns). The new eyeball is **meaningful**: it is the project's concept made visible. Your VZBISM sketch already designed the rule — _eyeball is the menu, outer layer is common for consistency._ This turns the eye from a logo tic into kiruk's signature storytelling device, and resolves the "some SVG / some 3D" tension cleanly.

## The architecture

```
<ConceptEye project="vzbism">          ← outer almond + lid + lashes = YOUR hand-drawn SVG, CONSTANT
   <Iris renderer="svg" | "r3f">        ← per-project payload, VARIES
      ...the project's reflected world...
   </Iris>
</ConceptEye>
```

- **Outer eye** — one frame, drawn once, by you. The canonical eye-motif (replaces RiggedGlyph). Owns the circular clip path + the shared boil filter.
- **Iris** — a slot. The `renderer` prop picks the backend. **Both backends clip to the same circle and share the same boil filter**, so swapping SVG ↔ 3D never moves or resizes the frame.
- **Per-project data** — iris payload lives beside `kiruk-projects/<universe>/` (e.g. `concept-eye.svg` or a glTF + scene config). Adding a project = adding an iris, not new chrome.

## Phases

### T2.1 — Container + SVG backend (build first)

- `<ConceptEye>`: render hand-drawn outer frame, define `<clipPath>` circle, mount shared `feTurbulence` boil filter, render `<Iris>`.
- SVG backend (`renderer="svg"`): a layered Affinity-drawn scene (the project's world reflected). Animate with Motion / GSAP + feTurbulence. Target < 50 KB. **This covers most projects.**

### T2.2 — Per-project payloads

- Convention: `kiruk-projects/<universe>/concept-eye/` holds `iris.svg` (+ `manifest.md`) or `iris.glb` + `scene.json`.
- First pilot iris: the **VZBISM mirror scene** (landscape reflected in the iris, per your sketch).

### T2.3 — Animation family

- Shared behaviors: blink, iris dilate, gaze-track (follow pointer), draw-on reveal, boil.
- Driven by the existing motion tokens (`gaze-track`, `iris-dilate`, `portal-transition`) so SVG and 3D irises feel like one family.
- Reduced-motion: both backends fall to a static frame.

### T2.4 — 3D backend (LATER / optional module)

Only build when a specific project genuinely needs depth or interactivity.

- Promote the parked `EyeScene.tsx` (R3F).
- Blender model → **glTF 2.0** export (apply modifiers; export materials, UV/texcoords, normals) → `gltfjsx` → JSX → **Draco** compress (target < 5 MB) → R3F 9.
- **TSL** iris shader for dilation / reflection / parallax, animated via `useFrame`.
- **Lazy-load + code-split** — the ~400–600 KB cost only loads on 3D-iris pages.

### T2.5 — Swap-in

Replace the Track-1 `<HandMark/>` placeholder with `<ConceptEye>` once the outer frame is drawn and the SVG backend works.

## Your-tools workflow

| Backend                | Tools                                         | Flow                                                                                                                                      |
| ---------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **SVG iris** (default) | Affinity v3, Figma Pro, Claude design, tablet | Draw scene + iris → layered SVG export → SVGO → drop into `<Iris renderer="svg">`. Figma for fast layout iteration; Claude for variants.  |
| **3D iris** (later)    | Blender, tablet                               | Model eyeball + scene, stylized materials → glTF 2.0 export → gltfjsx + Draco → `<Iris renderer="r3f">` → TSL shader tweak in `useFrame`. |

**Decision rule per project:** static / illustrative concept → SVG. Depth / interactive / hero "wow" → 3D.

## Verified resources

- 3D: Blender → glTF → R3F 9 (`useGLTF` / gltfjsx, Draco) + **TSL** — Maxime Heckel "Field guide to TSL & WebGPU"; Codrops "3D world in the browser with Blender and Three.js" (2025).
- SVG anim: Motion `pathLength`, GSAP DrawSVG, MDN feTurbulence.
- Live-scribble surface (optional, not the eye): tldraw / Excalidraw.

## CI / spec note

The brand-consistency-ci **eye-motif gate** requires an eye per visual. During the hand-drawn transition it is **paused via OpenSpec** (`openspec/changes/eye-motif-transition/`), then re-activated with `ConceptEye` / `HandMark` as the canonical motif. FOUNDER_DECISIONS **AG1** (AI/code-gen portal eyes) and **AG2** (R3F + glTF) already permit this approach for portal assets.

## Done-when (Track 2)

SVG ConceptEye renders a pilot iris inside the constant frame, animates (blink/dilate/gaze/boil), is reduced-motion-safe, stays lightweight; backend swap (SVG↔3D) doesn't move the frame; 3D module lazy-loads only where used.
