---
slug: eye-asset-governance
promoted: 2026-06-02
source: ideas/log.ndjson (manual-2026-06-02T06:26:14Z)
scribble: '[textual]'
scribble_reason: 'Governance/process decision, not a visual idea — no sketch applies. The override is about WHO may originate eye art + adding a 3D pipeline, governed by FOUNDER_DECISIONS AG1/AG2.'
status: promote-ready
target_specs: [brand-system, client-lifecycle, design-tokens]
---

# Eye asset governance — formalize the AG1/AG2 override

> One-line: graduate the founder decision that AI/code may originate the **portal** eye look (+ a 3D eye pipeline) from `FOUNDER_DECISIONS.md` into a real OpenSpec proposal, since it relaxes CLAUDE.md Non-Negotiables #4/#7.

## Why

`FOUNDER_DECISIONS.md` AG1/AG2 (2026-06-01) scoped-override Non-Negotiables #4 (eye-motif) and #7 (no work without a scribble) so tooling (Figma MCP, Blender MCP, code-authored SVG) may **originate** the portal eye's visual form — not only rig founder-drawn art. Per CLAUDE.md §5 (#5 "no token without spec") and §9 ("no silent transparency / boundary change"), a relaxation of a non-negotiable is durable studio truth and should live in an OpenSpec proposal, not only in the decisions log. Today the brand-system spec still implies founder-hand-only origination.

## What (proposal should specify)

- A scoped carve-out in `brand-system` / `design-tokens`: AI/code MAY originate eye assets for `apps/kiruk-portal` (vectors in `public/eye/`, hero, R3F/glTF 3D). `kiruk-web` brand mark + canonical logo stay founder hand-art.
- Quality bar that survives the carve-out: B&W sketch aesthetic holds; generated art must read as intentional sketch, not uncanny machine line-art (the original founder objection).
- AG2: add `three` + `@react-three/fiber` as an approved 3D surface for the portal eye; `.glb` authored in Blender; 2D pencil remains default.
- How the `brand-consistency-ci` eye-motif gate treats generated assets.

## Impact

- Specs touched: `brand-system`, `design-tokens`, possibly `pen-and-paper` (the #7 carve-out).
- Code already shipped on `feat/portal-eye-system-and-lifecycle` (assets + 3D pipeline) — this proposal makes the governing rule explicit and reviewable rather than implicit.

## Next

`node scripts/promote-idea.mjs eye-asset-governance` to seed `openspec/changes/eye-asset-governance/proposal.md`. (Not run automatically — founder approval first.)
