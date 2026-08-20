<!--
status: living — add a term the moment it first confuses you
-->

# Glossary — kiruk hand-drawn + eyeball stack

Plain-language definitions in Arun's terms. Add as you go.

- **boil** — the subtle living wobble of a hand-drawn line, animated. Made with SVG `feTurbulence` + `feDisplacementMap`.
- **feTurbulence** — SVG filter that generates Perlin/fractal noise (a cloudy random texture). The raw material for boil.
- **feDisplacementMap** — SVG filter that pushes pixels around using another image (the noise) as a map. Noise + displacement = wobble.
- **stitchTiles="noStitch"** — tells feTurbulence not to align noise tiles; needed (with `keyTimes`) for a seamless boil loop.
- **keyTimes / values** — SMIL/animation arrays that control _when_ an animation hits each value. Used to make the boil's last frame equal its first (seamless).
- **pathLength** — an SVG/Motion property; animating it 0→1 "draws" a stroke on, like a pen finishing the line.
- **roughness (token)** — kiruk token for how hand-drawn a line looks: `smooth` (0), `hand` (light), `sketch` (heavy).
- **viewBox** — the SVG's internal coordinate window; keep it so the SVG scales responsively. Never let SVGO strip it.
- **SVGO** — tool that shrinks SVG files by removing junk, without changing how they look.
- **Image Trace** — Affinity feature that turns a raster sketch into editable vector paths.
- **perfect-freehand** — JS lib that turns pointer/pen input (with pressure) into a smooth stroke outline.
- **rough.js** — JS lib that renders shapes in a sketchy style _procedurally_. In kiruk: **charts/diagrams only**, never the hand-drawn UI.
- **primitive** — a reusable base UI component (`HandButton`, `HandCard`…) that your drawings plug into.
- **@layer components** — a CSS Cascade Layer; wrapping sketch CSS in it stops it from overriding Tailwind utilities.
- **ConceptEye** — the eye component: constant outer frame + variable iris.
- **Iris (renderer)** — the per-project payload slot; `renderer="svg"` or `"r3f"`.
- **glTF / GLB** — the standard 3D file format for the web; `.glb` is the binary single-file version. Export target from Blender.
- **gltfjsx** — CLI that turns a `.glb` into a ready React Three Fiber component.
- **Draco** — compression for glTF meshes; shrinks 3D files a lot.
- **R3F (React Three Fiber)** — React renderer for Three.js (3D in React).
- **useFrame** — R3F hook that runs every animation frame; where you animate the 3D iris.
- **TSL (Three Shading Language)** — write shaders in JS-like code that runs on both WebGL and WebGPU.
- **shader** — a tiny program running on the GPU that decides each pixel's look (used for the 3D iris).
