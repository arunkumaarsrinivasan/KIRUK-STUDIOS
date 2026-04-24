# Spec: template-proposal

## Purpose
Per-universe proposal. Spec-driven format: goals, constraints, creative principles, milestones, worldbuilding rules. Not a scope-and-price list.

## Requirements

### Requirement: Required sections
The proposal MUST include these sections in order: Goal, Audience, World / Metaphor, Scope, Constraints, Deliverables, Timeline, Risks, Evaluation.

#### Scenario: Section presence
- GIVEN a rendered proposal
- WHEN headings parsed
- THEN all nine sections present in order

### Requirement: Universe naming
Phase names MUST be universe-themed (e.g., "Portal Opening" not "Phase 1").

#### Scenario: Generic phase forbidden
- GIVEN the Timeline/Milestones section
- WHEN scanned
- THEN `/Phase [0-9]/` does not occur without justification

### Requirement: Input contract
The generator MUST read fields from `kiruk-projects/<universe>/spec.md` and its intake. Missing fields MUST block generation with a clear error.

### Requirement: Spec-link footer
The proposal MUST end with a footer referencing the source spec path.

### Requirement: Eye-motif test
Inherits brand-system.

## Acceptance Artifacts
- `kiruk-templates/proposal/spec.md`
- `kiruk-templates/proposal/generator.md`
- `kiruk-templates/proposal/output/<universe>-proposal-v<n>.md`
