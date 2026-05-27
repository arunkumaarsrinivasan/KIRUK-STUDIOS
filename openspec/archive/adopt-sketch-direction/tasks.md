# Tasks: adopt-sketch-direction

## Spec (this proposal)

- [x] Draft proposal.md
- [x] Draft deltas: design-tokens, brand-system, build-in-public, tech-stack, brand-consistency-ci
- [ ] `npx openspec validate adopt-sketch-direction --strict` passes
- [ ] Founder review + approve

## Apply (after approval)

- [ ] Rewrite `packages/design-system/tokens/core.json` → grayscale base (paper/ink/pencil ramp ≥8) + `absurd` accent group; `type.json` → hand-wordmark / hand-display / handwriting + clean body sans
- [ ] Regenerate tokens (`pnpm tokens:build`) and verify `build/css/tokens.css`
- [ ] Promote `apps/kiruk-web/src/styles/global.css` sketch palette + primitives toward `@kiruk/design-system`; replace hardcoded hex in `CustomCursor.tsx` + `public/favicon.svg` with token vars
- [ ] `scripts/doctor.mjs` — relax devlog cadence check from 14-day fail to informational
- [ ] `apps/kiruk-web/astro.config.mjs` — set `site: 'https://kiruk.in'`, `base: '/studio'`; audit internal links for base path
- [ ] Update `build-in-public` Open/Closed table cell ("Devlog … Every 2 weeks") to match new cadence
- [ ] Merge deltas into `openspec/specs/*/spec.md`; move change to `openspec/archive/adopt-sketch-direction/`
- [ ] `CHANGELOG.md` entry under `## [Unreleased]` with Why line

## Verify

- [ ] `pnpm doctor` green (no false cadence fail)
- [ ] `pnpm tokens:build` clean; no hardcoded-hex violations in `apps/*/src`
- [ ] kiruk-web home renders correctly under `/studio` base
