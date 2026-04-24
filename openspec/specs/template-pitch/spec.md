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
The pitch MUST cite the source intake at `kiruk-projects/<universe>/intake.md`.

### Requirement: Eye-motif test
Inherits brand-system eye-motif test.

## Acceptance Artifacts
- `kiruk-templates/pitch/spec.md`
- `kiruk-templates/pitch/generator.md`
- `kiruk-templates/pitch/output/<universe>-pitch-v<n>.md`
