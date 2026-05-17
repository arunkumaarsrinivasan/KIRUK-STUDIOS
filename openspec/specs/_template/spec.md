# Spec: <capability-name>

> Template for new capability specs. Copy this file to `openspec/specs/<capability>/spec.md`
> and replace placeholders. Every kiruk capability spec MUST follow this structure.

## Purpose

<2–4 sentences. What problem does this capability solve? Why does it exist?
What is in scope vs out of scope? Link to related specs where useful.>

## Domain vocabulary

> Only if this spec introduces new terms. Otherwise, refer the reader to [`/GLOSSARY.md`](../../../GLOSSARY.md).

| Term | Meaning |
|---|---|
| **<term>** | <definition>. |

## Requirements

> Use MUST / SHALL / MUST NOT for testable behavior. Avoid MAY for anything that
> touches eye-motif, spec linkage, brand non-negotiables, transparency boundary,
> or pen-and-paper ritual.

### Requirement: <short imperative name>
The system MUST <observable behavior>.

#### Scenario: <short outcome name>
- GIVEN <precondition>
- WHEN <trigger>
- THEN <observable outcome>
- AND <optional additional outcome>

### Requirement: <another>
The system MUST <another observable behavior>.

#### Scenario: <another>
- GIVEN <precondition>
- WHEN <trigger>
- THEN <observable outcome>

## Acceptance Artifacts

> Files or folders that prove this capability is in place.
> Use this section to anchor the spec to real paths in the repo.

- `<path/to/file-or-folder>`
- `<...>`

## Cross-references

> List specs this one depends on or affects. Use relative paths.

- [`/openspec/specs/<other-cap>/spec.md`](../<other-cap>/spec.md)
