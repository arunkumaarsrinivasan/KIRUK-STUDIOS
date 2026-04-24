---
description: Structured intake for a new Kiruk universe (client or ISM). Produces kiruk-projects/<universe>/intake.md. Does not generate artifacts.
argument-hint: <universe-slug>
---

# /kiruk-intake

Read `CLAUDE.md` and `openspec/project.md` first for context, especially the non-negotiables.

**Argument**: `$ARGUMENTS` = universe slug (lowercase, kebab-case, e.g. `midnight-atlas`). If empty, ask the user.

## What this does

Runs a structured intake conversation and writes `kiruk-projects/<slug>/intake.md`. Creates the folder if missing. Does **not** produce spec.md or any artifacts — that's `/kiruk-spec`.

## Procedure

1. Confirm `kiruk-projects/<slug>/` doesn't already contain `intake.md` (abort if it does — ask whether to overwrite).
2. Ask the user **one section at a time** (do not dump all questions at once):
   - **Goal** — one sentence. What are we building?
   - **Audience** — who uses it? Primary + secondary.
   - **World / Metaphor** — what universe is this? What does it look like, smell like, sound like?
   - **Scope** — what's in, what's out.
   - **Constraints** — timeline, tech, legal, accessibility.
   - **Deliverables** — concrete list.
   - **Risks** — what could kill this project?
   - **Evaluation** — how do we know it worked?
3. After all sections collected, write `kiruk-projects/<slug>/intake.md` with this front-matter:
   ```yaml
   ---
   universe: <slug>
   created: <ISO 8601>
   status: intake-complete
   next: /kiruk-spec <slug>
   ---
   ```
4. Print: "Intake saved. Run `/kiruk-spec <slug>` to draft the project spec."

## Rules

- Do NOT skip questions to save time.
- Do NOT fill in blanks the user didn't give you.
- If the brief smells like trend-chasing or template-cloning, surface it and ask the user to confirm they want Kiruk anyway (reference CLAUDE.md §4).
