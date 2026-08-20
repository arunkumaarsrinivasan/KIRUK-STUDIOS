<!--
status: living reference — grows as you ship
related: learning-roadmap.md, ../plans/handdrawn-ui-system.md
-->

# Hand-Drawn Workflow — Reference Manual

Look things up here per topic. The _what-to-do-next_ lives in `learning-roadmap.md`; this is the _how_.

## 1. Tablet → drawing settings (web-friendly marks)

- Draw at **2× the intended display size** so strokes stay crisp after tracing.
- **Line weight hierarchy:** hairline ~0.5px (details) · base ~1.5px (main strokes) · bold ~2.5px (emphasis). Map these to the `strokeWidth` tokens.
- **Contrast:** pure black ink (`--ink #0a0a0a`) on white paper (`--paper #ffffff`). B&W only — color is added by hand later, per the studio's sketch aesthetic.
- Keep strokes **open and confident**; avoid tiny fussy detail that vanishes at UI scale.

## 2. Affinity v3 → SVG export

1. Trace: select the sketch → **Image Trace** (Vector persona) → tune threshold so the line reads, not the paper grain.
2. Clean: remove stray nodes; group by intent (frame / fill / accent).
3. Export: File → Export → **SVG**. **Keep** `viewBox` and `<title>` (accessibility + responsive). Strip editor metadata.

## 3. SVGO v4 optimization

- Use a config that **does NOT** remove `viewBox` or `title` (v4 keeps them by default — don't override that).
- Expected savings: 60–85% with zero visual loss.
- Run via `scripts/svg-ingest.mjs` (optimize + naming/manifest check + bytes report).

## 4. Naming + versioning

- Path: `packages/design-system/assets/handdrawn/{bg,chrome,decor,type}/<name>-vN.svg`.
- **Append-only:** new iteration = new `-vN`, never overwrite (pen-and-paper rule).
- Every folder has a `manifest.md`: date, source, caption, which primitive consumes it.

## 5. The boil filter (copy-paste base)

A single shared SVG filter, applied via class. Animate for the living-line effect.

- `feTurbulence` `type="fractalNoise"`, low `baseFrequency`, `stitchTiles="noStitch"`.
- `feDisplacementMap` with a modest `scale` (start ~2–4; higher = wilder).
- Seamless loop: animate `baseFrequency`/`seed` with **`values` + `keyTimes`** so the last frame equals the first. Pre-blur the noise; expand the filter region (`x/y/width/height = -20%/-20%/140%/140%`) so displaced edges don't clip.
- **Reduced motion:** disable the animation; render at `roughness.smooth` (no displacement).

## 6. Draw-on (Motion `pathLength`)

- Give the SVG path a stroke; animate `pathLength` `0 → 1` on entry.
- Stagger multiple strokes for a "just finished drawing it" feel.
- Reduced motion: render at `pathLength: 1` immediately (no animation).

## 7. "I drew X → it becomes Y" map _(fill as you go)_

| Drawing          | File                      | Primitive / usage  |
| ---------------- | ------------------------- | ------------------ |
| button frame     | `chrome/button-v1.svg`    | `HandButton`       |
| card outline     | `chrome/card-v1.svg`      | `HandCard`         |
| input box        | `chrome/field-v1.svg`     | `HandField`        |
| paper texture    | `bg/paper-v1.svg`         | `HandBackground`   |
| tape / torn edge | `decor/tape-v1.svg`       | `HandDecor`        |
| outer eye frame  | `chrome/eye-frame-v1.svg` | `ConceptEye` outer |

## 8. Export checklist (before drop-in)

- [ ] viewBox present, `<title>` present
- [ ] SVGO run, bytes reported
- [ ] named `-vN`, manifest updated
- [ ] strokes use token widths, no hardcoded colors
- [ ] looks right at actual UI size (not just zoomed in)
