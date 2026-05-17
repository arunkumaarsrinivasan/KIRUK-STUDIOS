# Spec: template-onboarding

## Purpose
Per-universe "Welcome to the Universe" kit. Explains Kiruk's process, collaboration expectations, tool stack, and how scribbles become worlds. First artifact a new client receives.

## Requirements

### Requirement: Welcome narrative
The onboarding doc MUST open with a personalized welcome addressing the client by universe name, not a generic "Welcome to Kiruk Studio".

#### Scenario: Universe-named opening
- GIVEN a rendered onboarding doc for universe `<slug>`
- WHEN the first heading or paragraph is read
- THEN it references the universe name explicitly

### Requirement: Process walkthrough
The doc MUST explain the scribble → spec → artifact flow in ≤7 steps with a diagram or ASCII flow.

#### Scenario: Walkthrough present
- GIVEN a rendered onboarding doc
- WHEN the process section is parsed
- THEN it contains ≤7 numbered steps
- AND it includes a diagram or ASCII flow

### Requirement: Collaboration expectations
The doc MUST state response cadence (async default, weekly sync), preferred tools (Loom walkthroughs, Notion, GitHub), and an escalation path.

#### Scenario: Expectations section present
- GIVEN a rendered onboarding doc
- WHEN the collaboration section is scanned
- THEN response cadence, tools list, and escalation path are each named explicitly

### Requirement: Tool stack list
The doc MUST list every tool the client will see across the engagement and explain what each is used for.

#### Scenario: Tool list present
- GIVEN a rendered onboarding doc
- WHEN the tool-stack section is scanned
- THEN at least Notion, GitHub, and Loom are named with a one-line purpose each

### Requirement: First actions
The doc MUST end with ≤5 concrete "do these first" actions for the client.

#### Scenario: Closing actions present
- GIVEN a rendered onboarding doc
- WHEN the final section is read
- THEN it lists ≤5 actionable bullets (e.g. accept Notion invite, review intake, confirm universe codename)

## Acceptance Artifacts
- `kiruk-templates/onboarding/spec.md`
- `kiruk-templates/onboarding/generator.md`
- `kiruk-templates/onboarding/output/<universe>-welcome.md`
