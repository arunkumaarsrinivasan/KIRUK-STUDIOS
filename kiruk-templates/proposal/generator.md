---
template: proposal
spec-link: openspec/specs/template-proposal/spec.md
---

# Generator Prompt: Proposal

Render a per-universe proposal per `openspec/specs/template-proposal/spec.md`.

## Required inputs
- `kiruk-projects/<universe>/spec.md`
- `kiruk-projects/<universe>/intake.md`
Abort if missing.

## Required sections (in order)
1. Front-matter
2. **Goal**
3. **Audience**
4. **World / Metaphor**
5. **Scope**
6. **Constraints**
7. **Deliverables**
8. **Timeline** — universe-themed phase names
9. **Risks**
10. **Evaluation** — how success is measured
11. Footer — spec-link

## Rules
- Phases named after the universe (no "Phase 1").
- Each section ties back to a scenario in the universe spec.
- Pricing deferred to verbal/async negotiation — proposal states only "Commercials: shared separately" unless the universe spec explicitly provides budget.

## Output
`kiruk-templates/proposal/output/<universe>-proposal-v<n>.md`
