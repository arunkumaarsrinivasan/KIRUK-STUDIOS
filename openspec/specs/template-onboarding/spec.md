# Spec: template-onboarding

## Purpose
Per-universe "Welcome to the Universe" kit. Explains Kiruk's process, collaboration expectations, tool stack, and how scribbles become worlds. First artifact a new client receives.

## Requirements

### Requirement: Welcome narrative
The onboarding doc MUST open with a personalized welcome addressing the client by universe name, not generic "Welcome to Kiruk Studio".

### Requirement: Process walkthrough
The doc MUST explain the scribble → spec → artifact flow in ≤7 steps with a diagram or ASCII flow.

### Requirement: Collaboration expectations
The doc MUST state: response cadence (async default, weekly sync), preferred tools (Loom walkthroughs, Notion, Pencil), and escalation path.

### Requirement: Tool stack list
The doc MUST list the tools the client will see across the engagement (Pencil, Notion, Figma if needed, GitHub, etc.) and what each is used for.

### Requirement: First actions
The doc MUST end with ≤5 concrete "do these first" actions for the client (e.g., accept Notion invite, review intake, confirm universe codename).

## Acceptance Artifacts
- `kiruk-templates/onboarding/spec.md`
- `kiruk-templates/onboarding/generator.md`
- `kiruk-templates/onboarding/output/<universe>-welcome.md`
