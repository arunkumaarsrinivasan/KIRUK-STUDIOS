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
The generator MUST read fields from `kiruk-projects/<universe>/spec.md` and its `intake.md`. Missing required fields MUST block generation with a clear error message naming the missing field.

#### Scenario: Missing field blocks generation
- GIVEN a universe folder where `intake.md` lacks the `goal` field
- WHEN the proposal generator runs
- THEN generation halts with an error naming `goal`
- AND no partial proposal file is written

### Requirement: Spec-link footer
The proposal MUST end with a footer referencing the source spec path under `openspec/specs/<universe>/spec.md`.

#### Scenario: Footer present
- GIVEN a rendered proposal
- WHEN the last section is read
- THEN it contains a link to the source universe spec

### Requirement: Eye-motif test
The proposal MUST satisfy `brand-system`'s eye-motif test: an eye motif is present OR absence is justified in front-matter.

#### Scenario: Eye-motif present or justified
- GIVEN a rendered proposal
- WHEN the eye-motif test runs
- THEN at least one eye motif is found OR front-matter contains `eye-motif: none — justified: <reason>`

## Acceptance Artifacts
- `kiruk-templates/proposal/spec.md`
- `kiruk-templates/proposal/generator.md`
- `kiruk-templates/proposal/output/<universe>-proposal-v<n>.md`
