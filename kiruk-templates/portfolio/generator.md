---
template: portfolio
spec-link: openspec/specs/template-portfolio/spec.md
---

# Generator Prompt: Portfolio

You are rendering the Kiruk Studio portfolio document. Follow `CLAUDE.md` non-negotiables and the requirements in `openspec/specs/template-portfolio/spec.md`.

## Step 1 — Gather
Read:
- `VISION-MISSION.md`
- `content/manifesto.md`
- Every file in `content/case-studies/`
- Every file in `content/devlogs/ism-*.md`

## Step 2 — Structure
Produce a markdown document with sections in this order:
1. Front-matter: `eye-motif-absent-because: <justification or remove>`, `spec-link: openspec/specs/template-portfolio/spec.md`, `version: <n>`.
2. **The Kirukal** — 1-paragraph manifesto distillation.
3. **Universes** — per case study, a "before-world / after-world" narrative paragraph + sketch reference + shipped-interface reference. No feature bullets.
4. **ISM Lab** — (only if ≥1 spawned ISM exists) each ISM with its theme, prototype link, and devlog link.
5. **The Studio** — capacity, non-negotiables (short form), contact.

## Step 3 — Voice
Match founder tone (CLAUDE.md §3): concrete stories, process-transparent, playful-precise, collaboration-first.

## Step 4 — Write
Output to `kiruk-templates/portfolio/output/portfolio-v<next>.md`. Bump `<n>` from previous versions.

## Step 5 — Verify
- [ ] Each universe has a narrative paragraph + sketch + shipped artifact reference.
- [ ] Eye-motif present or justified in front-matter.
- [ ] No generic agency boilerplate.
- [ ] Spec-link footer present.
