<!--
status: living — update as you go
method: modeled on the aihero.dev /teach loop
pacing: weekend bursts (milestone-based, no fixed dates)
related: mission.md, glossary.md, progress.md, ../plans/*
-->

# Kiruk Learning Roadmap — "what to do in each part"

You are a design engineer (3 yrs; Figma, Claude, Cursor; sketches sometimes). The new-to-you gaps are: **SVG filter internals (boil)**, **Affinity→web SVG hygiene**, **Motion `pathLength`**, and later **Blender→R3F→TSL**. This roadmap teaches them _by shipping the real system_ — you learn the exact thing the next phase needs, nothing more.

## How this roadmap works (the /teach loop)

1. **Assess once** — fill `mission.md` (why / current level / what success looks like / how you learn). Done at M0.
2. **Run a milestone** — each has: **Concept** (what to understand) → **Sketch** (what to draw on the tablet) → **Code** (the drop-in) → **Done-when** (checkpoint).
3. **Report back** — after each, write 3 lines in `progress.md`: _what clicked / what confused / what's next._ New terms go to `glossary.md`.
4. **Adapt** — based on your report, the next lesson is generated/tuned to your gaps. For any milestone you want taught live and deeper, invoke the **`/teach`** skill with that milestone as the topic.

Pacing: **weekend bursts.** Each milestone is one weekend-sized bite. Do them in order — each unlocks the next.

---

## M0 — Mission & setup

- **Concept:** what "good hand-drawn for web" means (line weight, contrast on white paper, legibility at UI scale).
- **Sketch:** one throwaway button frame, just to test the pipeline.
- **Code/setup:** create `assets/handdrawn/`; make an Affinity SVG export preset (keep viewBox + title); install/configure SVGO; fill `mission.md`.
- **Done when:** one test SVG goes tablet → Affinity → SVGO → repo, clean and small.

## M1 — De-eye the surfaces _(Track 1.1)_

- **Concept:** why a clean placeholder beats a broken/sloppy eye; preserving behavior while swapping art.
- **Sketch:** a single neutral `HandMark` (simple almond or "watch-here" mark).
- **Code:** swap `RiggedGlyph` / `ReactiveEye` / `EyeMark` for `<HandMark/>`; park `EyeScene`.
- **Done when:** portal builds; every page shows the placeholder; layout/state unchanged; reduced-motion OK.

## M2 — Your first primitive _(Track 1.3)_

- **Concept:** CSS Cascade Layers (`@layer components`) and why positioning (Tailwind on wrapper) must be decoupled from decoration (sketch class on inner). _(This is the exact bug in LEARNINGS.md 2026-05-26 — you'll feel why.)_
- **Sketch:** a button frame you actually like.
- **Code:** build `HandButton` consuming your SVG.
- **Done when:** the button works inside a real form, no Tailwind utility override regression.

## M3 — Make it live _(Track 1.5)_

- **Concept:** how `feTurbulence` (Perlin noise) + `feDisplacementMap` = organic boil; why a seamless loop needs `values` + `keyTimes` + `stitchTiles="noStitch"`; how Motion `pathLength` draws a stroke on from 0→1.
- **Sketch:** nothing new — reuse M2's button.
- **Code:** add a shared boil filter + a `pathLength` draw-on to `HandButton`.
- **Done when:** boil loops with no visible stitch jump; draw-on plays once on entry; `prefers-reduced-motion` = fully static.

## M4 — Pilot surface _(Track 1.3 / 1.4)_

- **Concept:** a primitive _family_ (card, input, field) sharing the same hand + tokens.
- **Sketch:** card outline, input box, field frame.
- **Code:** `HandCard`, `HandField`; migrate one full portal form (forms + cards + buttons).
- **Done when:** one complete portal form is 100% your hand and still fully usable.

## M5 — Backgrounds _(Track 1.4)_

- **Concept:** layered paper system (paper+grain → ruling/dots → overlays → scene preset).
- **Sketch:** paper texture, a ruling/dot field, one overlay (tape or torn edge).
- **Code:** `HandBackground` presets; apply to the portal shell.
- **Done when:** a screen feels like a page from your sketchbook — and text stays legible.

## M6 — Concept-Eyeball, SVG backend _(Track 2.1 / 2.2)_

- **Concept:** outer-constant / iris-variable; clip path + shared boil; per-project payload.
- **Sketch:** the constant outer eye frame + one iris scene (the VZBISM mirror).
- **Code:** `<ConceptEye renderer="svg">` with your pilot iris.
- **Done when:** the pilot iris animates (blink/dilate/gaze) inside the constant frame.

## M7 — Open-source _(Track 1.6)_

- **Concept:** licensing (MIT vs CC-BY-NC), semver, what makes a package publishable.
- **Sketch:** none.
- **Code:** add license files, clean exports, README component gallery, release workflow.
- **Done when:** `@kiruk/design-system` installs and renders in a fresh scratch app.

## M8 — 3D iris _(Track 2.4 — optional / advanced)_

Start only when a real project needs depth.

- **Concept:** glTF export checklist, `useFrame`, TSL shader basics.
- **Do:** Blender model → glTF → R3F → one TSL iris tweak (dilation).
- **Done when:** `<Iris renderer="r3f">` lazy-loads, code-splits, and clips to the same circle as the SVG backend.

---

## After every milestone (the ritual)

1. 3 lines in `progress.md` (clicked / confused / next).
2. New terms → `glossary.md`.
3. Commit the scribble you drew (pen-and-paper gate).
4. One line in `CHANGELOG.md` `## Unreleased`; run `/kiruk-capture`.
5. Note any decision in `../practice/decision-log.md`; critique the artifact in `../practice/critique-loop.md`.
