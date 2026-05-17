# Spec: template-portfolio

## Purpose
Studio-level portfolio document. Narrates Kiruk's worldbuilding practice through before/after worlds, sketches next to shipped interfaces, and ISM lab highlights. Never a feature list.

## Requirements

### Requirement: Worldbuilding narrative structure
The portfolio MUST present projects as worlds (before/after), not feature lists.

#### Scenario: No bullet-list-only cases
- GIVEN a rendered portfolio output in `kiruk-templates/portfolio/output/`
- WHEN the case-study sections are scanned
- THEN each case has ≥1 narrative paragraph and ≥1 sketch/screenshot pair

### Requirement: ISM lab foregrounded
The portfolio MUST include a dedicated ISM section once ≥1 ISM is portfolio-eligible.

#### Scenario: ISM shown when available
- GIVEN ≥1 spawned ISM with devlog and prototype
- WHEN the portfolio is generated
- THEN an ISM section renders before the services section

### Requirement: Eye-motif test
The portfolio output MUST satisfy `brand-system`'s eye-motif requirement: an eye motif is present in at least one visual artifact OR the absence is justified in the document's front-matter.

#### Scenario: Eye-motif present or justified
- GIVEN a rendered portfolio output
- WHEN the eye-motif test runs against it
- THEN at least one eye-motif element is found OR the front-matter contains `eye-motif: none — justified: <reason>`
- AND the test passes

### Requirement: Tone match
Voice MUST match founder context in `CLAUDE.md` §3: narrative-driven, process-transparent, playful-precise.

#### Scenario: Voice check
- GIVEN generated portfolio text
- WHEN reviewed
- THEN prose shows concrete stories and process, not generic agency boilerplate

## Acceptance Artifacts
- `kiruk-templates/portfolio/spec.md` (this file's sibling, this IS the template-portfolio spec)
- `kiruk-templates/portfolio/generator.md`
- `kiruk-templates/portfolio/output/*.md` as rendered
