---
template: services
spec-link: openspec/specs/template-services/spec.md
---

# Generator Prompt: Services Guide

Render the Kiruk Studio Services Guide per `openspec/specs/template-services/spec.md`.

## Inputs
- `VISION-MISSION.md`
- `content/manifesto.md`
- `openspec/specs/template-services/spec.md`

## Output structure
1. Front-matter: spec-link, version, eye-motif tag.
2. **Four Pillars** — Worldbuilding Partnerships · Experimental Web Experiences · Brand Systems · Creative OS & Framework Design. Each pillar: 1 narrative paragraph + 1 concrete universe example + typical deliverables + 1-line tone-check on what "good" looks like.
3. **Capacity** — max 2–3 active client projects.
4. **Not for you if…** — the non-negotiables as disqualifiers.
5. **How we engage** — spec-first workflow (link to CLAUDE.md §3).
6. **Contact** — founder handle, email.

## Voice
Direct, assertive, zero-hedge. Example tone: "We will not rebrand you to match a competitor. If that's what you want, don't engage us."

## Output path
`kiruk-templates/services/output/services-guide-v<n>.md`
