# Spec: template-pitch

## Purpose
Per-universe pitch deck. Structured as a journey: current world → proposed universe → portal (how Kiruk will build it).

## Requirements

### Requirement: Journey structure
The pitch MUST follow: Current World → Proposed Universe → The Portal (our approach) → Milestones → Asks.

#### Scenario: Section order
- GIVEN a rendered pitch output
- WHEN headings are parsed
- THEN order matches: Current World, Proposed Universe, The Portal, Milestones, Asks

### Requirement: Universe-named phases
Milestone/phase names MUST be universe-themed, not "Phase 1/2/3".

#### Scenario: No generic phase names
- GIVEN the Milestones section
- WHEN scanned
- THEN no occurrence of `/Phase [0-9]/` unless explicitly justified in front-matter

### Requirement: Client brief reference
The pitch MUST cite the source intake file at `kiruk-projects/<universe>/intake.md` in a visible footer or sidebar.

#### Scenario: Intake citation present
- GIVEN a rendered pitch output
- WHEN the document is scanned for the intake path
- THEN a reference to `kiruk-projects/<universe>/intake.md` is present

### Requirement: Eye-motif test
The pitch output MUST satisfy `brand-system`'s eye-motif test: an eye motif is present OR absence is justified in front-matter.

#### Scenario: Eye-motif present or justified
- GIVEN a rendered pitch output
- WHEN the eye-motif test runs
- THEN at least one eye motif is found OR the front-matter contains `eye-motif: none — justified: <reason>`

## Acceptance Artifacts
- `kiruk-templates/pitch/spec.md`
- `kiruk-templates/pitch/generator.md`
- `kiruk-templates/pitch/output/<universe>-pitch-v<n>.md`
