# Kiruk ISM Lab

Internal R&D surface. Self-initiated experiments orbiting personal fascinations.

## Current state: **empty by design**

No ISM subprojects exist yet. The four reserved names (`heroism`, `kirukism`, `colorism`, `nomadism`) are registered in `openspec/specs/ism/spec.md` but not yet spawned.

## How to spawn an ISM

```
/kiruk-ism-new <name>
```

This will:
1. Confirm `<name>` is in the registered list (else prompt to add via change proposal).
2. Create `kiruk-ism/<name>/{src,design-notes.md}`.
3. Seed `openspec/specs/ism-<name>/spec.md` from the template in the parent `ism` spec.
4. Append a TASKS entry under Phase 3 (or current phase).
5. Log the decision in `CHANGELOG.md`.

## Why empty

Brand spine comes first. ISMs without a locked brand are chaos, not kirukal.
