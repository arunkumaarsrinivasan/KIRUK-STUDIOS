# Spec: template-services

## Purpose
Studio-level Services Guide. Describes the four pillars (Worldbuilding, Experimental Web, Brand Systems, Creative OS) with narrative examples, not generic bullet lists.

## Requirements

### Requirement: Four pillars present
The services doc MUST describe exactly the four pillars named in `VISION-MISSION.md`.

#### Scenario: Pillar count
- GIVEN generated services output
- WHEN sections scanned
- THEN four top-level pillar sections exist: Worldbuilding Partnerships, Experimental Web Experiences, Brand Systems, Creative OS & Framework Design

### Requirement: Narrative examples per pillar
Each pillar MUST include ≥1 concrete narrative example (anonymized if needed), not a generic bullet list.

#### Scenario: Example per pillar
- GIVEN a pillar section
- WHEN reviewed
- THEN ≥1 paragraph describes a real or plausible universe scenario

### Requirement: Disqualified clients section
The services doc MUST include a "not for you if…" section citing the non-negotiables from `VISION-MISSION.md`.

#### Scenario: Disqualifier section present
- GIVEN a rendered services output
- WHEN section headings are scanned
- THEN a "not for you if…" (or equivalently named) section exists
- AND it cites the trend-chasing / boring-work / shallow-branding non-negotiables

### Requirement: Capacity stated
The services doc MUST state the active client capacity (max 2–3 universes) as defined in `VISION-MISSION.md`.

#### Scenario: Capacity line present
- GIVEN a rendered services output
- WHEN the capacity statement is searched
- THEN the doc explicitly names "2–3 active client projects" (or current capacity from VISION-MISSION)

## Acceptance Artifacts
- `kiruk-templates/services/spec.md`
- `kiruk-templates/services/generator.md`
- `kiruk-templates/services/output/services-guide-v<n>.md`
