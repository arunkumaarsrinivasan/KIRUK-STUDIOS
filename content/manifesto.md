---
title: The Kiruk Manifesto
version: 1.0
status: locked
spec-link: openspec/specs/brand-system/spec.md
eye-motif-absent-because: text-only artifact — brand application is in visual renderings (design-system/components/)
---

# The Kiruk Manifesto

> *Kirukal* — Tamil for *scribble*. Also for *crazy*.
> We are both.

---

We believe the most interesting products do not exist yet.

We do not tell stories. We build the worlds those stories live in.

We start with kirukal — a scribble on paper, a voice note at 2am, a fragment nobody else can read. We keep that texture visible in the finished work. Polished does not mean sanded down.

Everything we make passes through the eye — the primary motif, the composition grid, the portal between universes. When a mark reaches the wall, the screen, the product surface, the eye is watching. Five forms: the full circle (`EyePrimary`), the standalone iris (`EyeIris`), the weighted gaze (`EyeGaze`), the concentric portal (`EyePortal`), the constellation (`EyeConstellation`). All built from a single palette rooted in two contrasting moves: `void` (#0A0A0B) and `paper` (#EFEADF), with the iris breaking through in `iris-core` (#FF4D2E).

We reject trend-chasing. We reject Figma-to-Dribbble imitation. We reject briefs that are reskins of other products. We will help you build the universe you actually want.

We believe in toolbending — using Three.js, WebGL, Blender, code, words in ways they were not designed for. The toolbender is not a gimmick; the toolbender is the craft. We build visuals in code because that is where we live. There is no translation layer between design and implementation; the eye component *is* the design.

We work spec-first. Every artifact lives inside a written specification before it reaches the world. We write the spec with you. We do not guess what you meant.

We ship end-to-end. Naming. Narrative. UX. Code. Motion. Launch. We are not a UI layer on somebody else's thinking. We want the strategy and the stroke.

We run the ISM Lab in public — micro-worlds we build for ourselves, so our edge stays sharp when the client work is quiet. What we learn there feeds what we ship for you.

We take 2 to 3 clients at a time. Budgets flex. Ambition does not.

If your idea is too weird for a normal agency — come here. Bring the scribble.

— Kiruk Studio, 2026

---

## Palette (v1-locked)

| Token | Value | Role |
|---|---|---|
| `color.void` | `#0A0A0B` | bg |
| `color.scribble-ink` | `#F5F3EE` | fg |
| `color.paper` | `#EFEADF` | warm surface |
| `color.iris-core` | `#FF4D2E` | primary accent |
| `color.portal-glow` | `#7C4DFF` | secondary accent |
| `color.halo-warm` | `#FFD166` | highlight |
| `color.kohl` | `#1A1A1C` | border / near-black |
| `color.gaze-dim` | `#3A3A3F` | muted fg |

## Type pairing (v1-locked)

| Token | Face | Role |
|---|---|---|
| `font-rational` | Inter | UI, grids, forms |
| `font-expressive` | Instrument Serif | Headings, manifesto |
| `font-mono` | JetBrains Mono | Code |

## Motion motifs

| Name | Duration | Easing | Intent |
|---|---|---|---|
| `gaze-track` | 520ms | ease-gaze | Element follows pointer |
| `iris-dilate` | 180ms | ease-iris | State change pulse |
| `portal-transition` | 900ms | ease-portal | Between-universe shift |
| `cursor-orbit` | 280ms | ease-gaze | Companion orbits cursor |
