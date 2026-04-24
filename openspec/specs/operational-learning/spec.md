# Spec: operational-learning

## Purpose

Turn **mistakes and near-misses** into **durable guards** so the studio and its agents do not repeat the same failure mode. Learning is explicit: written down, linked to prevention, and strengthened if a pattern resurfaces.

## Requirements

### Requirement: Record material mistakes and near-misses

When a **material** failure or near-miss occurs (wrong shipped behavior, spec violation, broken build, review miss, privacy slip, or any “we should not do that again” event), the team MUST append an entry to [LEARNINGS.md](../../../LEARNINGS.md) at the repository root. The entry MUST state what went wrong, why it happened, what fixed it, and what **guard** stops a repeat.

#### Scenario: New learning is append-only and concrete
- GIVEN a mistake is understood and fixed
- WHEN the learning is captured
- THEN a new dated section is appended to `LEARNINGS.md` (not a silent edit of old text)
- AND the **Guard** field names a spec, validation command, rule, script, or habit—not only “be more careful”

### Requirement: Do not repeat without upgrading the guard

If the **same failure class** happens again, the team MUST add a **new** `LEARNINGS.md` entry (honest about the repeat) and MUST **strengthen** prevention: e.g. new **#### Scenario:** in the relevant `openspec/specs/**/spec.md`, a stricter check in `npm run …`, a Cursor rule, or automation. Deleting or rewriting old entries to hide the repeat is forbidden.

#### Scenario: Repeat forces a stronger guard
- GIVEN a failure class that was already logged in `LEARNINGS.md` recurs
- WHEN the second incident is closed
- THEN a new append documents the repeat
- AND a measurable guard is added or tightened (spec, test, or tool)

### Requirement: Connect learning to the rest of the OS

`LEARNINGS.md` MUST be referenced from [AGENTS.md](../../../AGENTS.md) and from contribution/review docs so humans and agents know to read recent entries before high-risk work. AI agents MUST check [LEARNINGS.md](../../../LEARNINGS.md) when the user says a task relates to a past bug, “don’t repeat,” or a known pitfall in this repo.

#### Scenario: Agent consults learnings for risky change
- GIVEN a user asks to change an area that has a `LEARNINGS.md` entry
- WHEN the agent plans the work
- THEN the agent reads the relevant entry and applies its **Guard** in the proposed diff or checklist

## Acceptance Artifacts

- `openspec/specs/operational-learning/spec.md` (this file)
- `LEARNINGS.md` at repository root
- `.cursor/rules/lessons-learned.mdc`
- `AGENTS.md` and `CONTRIBUTING.md` link to `LEARNINGS.md`
