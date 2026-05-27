# Proposal: adopt-sketch-direction

## Why

The 2026-05-26 founder-decisions session (recorded in `FOUNDER_DECISIONS.md`) locked a new visual + operating direction that conflicts with several current specs. The studio identity is unchanged (creative studio, scribbles → worlds), but its **expression** is now a hand-drawn, pen-and-paper world: white paper + black pencil/pen stroke, with saturated "absurd" color reserved for assets to blend the digital and the physical. Type goes hand-drawn for display/voice with a clean sans for body. The website becomes a POV product-designer's desk. This proposal aligns the durable specs with those decisions so the build is legitimate (per CLAUDE.md §4 + non-neg #5), not a quiet drift.

Four conflicts to resolve:

1. **Palette + type** (`design-tokens`, `brand-system`) still encode the dark "void" palette and an Inter/Playfair "rational + expressive" pairing.
2. **Devlog cadence** (`build-in-public`) mandates ≥1 devlog every 14 days; founder wants "publish when real."
3. **Deploy path** (`tech-stack`) assumes a `kiruk.studio` root; the site ships under `kiruk.in/studio` for now.
4. **Eye-motif gate** (`brand-consistency-ci`) requires an `Eye*` import on every visual component, but the primary mark (B1) is an unfinalized placeholder and the eye is often _drawn_ (shader/SVG), not imported.

## What changes

- Modified: Requirement "Required token groups (v1)" in `design-tokens` (B&W base + absurd asset group + hand & sans font families).
- Added: Requirement "Absurd-color asset boundary" in `design-tokens`.
- Modified: Requirement "Type pairing" in `brand-system` (hand display/voice + clean body sans).
- Modified: Requirement "Primary eye-mark" in `brand-system` (placeholder permitted until finalized).
- Added: Requirement "Light-only application" in `brand-system`.
- Modified: Requirement "Devlog cadence floor" in `build-in-public` (no fixed floor; publish on material progress).
- Added: Requirement "kiruk-web interim base path" in `tech-stack` (`kiruk.in/studio`).
- Modified: Requirement "Eye-motif coverage check (gate)" in `brand-consistency-ci` (drawn-eye + placeholder tolerance).
- Removed: _(none)_

## Impact

- **Specs touched:** `design-tokens`, `brand-system`, `build-in-public`, `tech-stack`, `brand-consistency-ci`.
- **Code to update on apply:** `packages/design-system/tokens/*.json` (B&W + absurd + fonts), `scripts/doctor.mjs` (relax devlog cadence check), `apps/kiruk-web/astro.config.mjs` (`site` + `base`), refactor app-local hardcoded hex (`CustomCursor.tsx`, `favicon.svg`) to token vars before the brand-CI runner (AU2) is enabled.
- **Docs:** `CLAUDE.md` §3 stack line + non-neg references stay valid; `FOUNDER_DECISIONS.md` already records the decisions; `CHANGELOG.md` entry on archive.
- **Out of scope (parked):** the POV desk + 2.5D hands hero build (W1/W3), real pencil-stroke field rework, custom wordmark/eye-mark assets (B1/B2), ISM/product picks (I1/PR1), content + brand-CI runners (AU1/AU2 wiring). Those are exploration/build, not spec changes — this proposal only realigns the conflicting specs.

## Deltas

See `./specs/*/spec.md`.
