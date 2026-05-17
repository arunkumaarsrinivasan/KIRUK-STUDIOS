# Spec: client-lifecycle

## Purpose

Every client universe at kiruk moves through the same six states from first contact to archive. This capability defines that state machine, the artifacts each state produces, the slash-command surface that drives transitions, and the privacy boundary at each step. The goal is solo-founder operability: one person can shepherd a universe end-to-end without lost context.

## Domain vocabulary

| Term | Meaning |
|---|---|
| **Universe** | A single client engagement / project / world. |
| **State** | One of `lead` | `intake` | `proposal` | `engaged` | `shipping` | `archived`. |
| **Transition** | A move from one state to the next; each transition emits a required artifact. |
| **Engagement** | A universe in the `engaged` or `shipping` state — active billable work. |
| **Disqualify** | A terminal state branch from `lead` or `intake` when the brief fails the non-negotiables (trend-chase, shallow brief, hostile budget). |

## Requirements

### Requirement: State machine is enumerated
The lifecycle MUST follow exactly these states and transitions:

```
lead ──intake──> intake ──qualify──> proposal ──sign──> engaged ──build──> shipping ──handoff──> archived
   │               │                    │
   └─ disqualify ──┴── disqualify ──────┘
```

Each transition MUST be recorded in the universe's `kiruk-projects/<universe>/state.md` with timestamp, prior state, new state, trigger (slash-command or manual), and a 1-line "why".

#### Scenario: Transition without state record rejected
- GIVEN a universe folder where `state.md` last records `intake`
- WHEN a contributor edits the folder as if it were `engaged` without appending a transition record
- THEN PR review and the (future) lifecycle lint flag the missing transition

### Requirement: Required artifact per state
Each lifecycle state MUST produce a required artifact in the universe folder before the state is considered complete. The mapping below is canonical and MUST NOT be amended without an OpenSpec proposal.

| State | Required artifact (path relative to `kiruk-projects/<universe>/`) | Producer |
|---|---|---|
| `lead` | `lead.md` (first-contact notes) | `/kiruk-lead` (future) or manual |
| `intake` | `intake.md` (structured intake from `/kiruk-intake`) | `/kiruk-intake` |
| `proposal` | `proposal.md` (from `kiruk-templates/proposal`) | `/kiruk-artifact proposal` |
| `engaged` | `contract.md` (signed-state record; signature file outside repo) | `/kiruk-artifact contract` |
| `shipping` | `spec.md` (universe capability spec under `openspec/specs/<universe>/`) | `/kiruk-spec` |
| `archived` | `handoff.md` + `case-study.md` (drafted; publish gated by `build-in-public` consent) | `/kiruk-artifact onboarding` + manual case study |

#### Scenario: Universe enters `proposal` without proposal artifact
- GIVEN a universe with `state: proposal` declared in `state.md`
- WHEN no `proposal.md` exists in the universe folder
- THEN lifecycle validation fails the universe

### Requirement: Pen-and-paper precondition
A universe MUST NOT transition from `intake` to `proposal` until at least one scribble (image or `[textual]` placeholder) is attached to the universe under `kiruk-projects/<universe>/scribble/` per the `pen-and-paper` capability.

#### Scenario: Proposal blocked without scribble
- GIVEN a universe at `intake` whose `scribble/` folder is empty
- WHEN the founder attempts `/kiruk-artifact proposal`
- THEN the command refuses and points to the pen-and-paper requirement

### Requirement: Privacy boundary at each state
The `transparency:` field set in `intake.md` (see `build-in-public`) MUST gate what artifacts can ever be published. The lifecycle MUST surface this gate at the `shipping → archived` transition by asking the founder to confirm or upgrade the transparency level before any case study is drafted.

#### Scenario: Archive blocked on transparency mismatch
- GIVEN a universe whose `intake.md` has `transparency: closed`
- WHEN the founder runs the archive transition and a public case study is queued
- THEN the transition is paused, founder is asked to upgrade transparency or anonymize
- AND no case study is written to `content/case-studies/` until resolved

### Requirement: Slash-command surface
The full lifecycle MUST be drivable from slash commands invokable from Claude Code or the (future) kiruk-portal:
- `/kiruk-intake` (lead → intake) — already exists.
- `/kiruk-spec` (intake/engaged → shipping spec) — already exists.
- `/kiruk-artifact <template>` (proposal | contract | invoice | onboarding) — already exists.
- `/kiruk-archive <universe>` (shipping → archived) — to be added (separate proposal).

#### Scenario: Lifecycle complete from CLI
- GIVEN a fresh lead
- WHEN the founder runs `/kiruk-intake`, `/kiruk-spec`, `/kiruk-artifact proposal`, `/kiruk-artifact contract`, `/kiruk-artifact invoice`, `/kiruk-archive <slug>` in order with required inputs
- THEN the universe folder contains all 6 required artifacts
- AND `state.md` records all 5 transitions

### Requirement: No client secrets in lifecycle artifacts
Lifecycle artifacts (lead.md, intake.md, proposal.md, contract.md, invoice.md, handoff.md) MUST NOT contain API keys, passwords, signed contract PDFs, or payment data. Per `repo-privacy`, sensitive originals live in `kiruk-projects/<universe>/.local-only/` (gitignored) or external systems.

#### Scenario: Commit attempting to include signed PDF
- GIVEN a contributor stages `kiruk-projects/<universe>/contract-signed.pdf`
- WHEN PR review or `brand-consistency-ci` runs
- THEN the commit is flagged per `repo-privacy`

## Acceptance Artifacts

- `kiruk-projects/<universe>/state.md` template
- `kiruk-projects/<universe>/scribble/` folder (per pen-and-paper)
- Existing slash commands: `/kiruk-intake`, `/kiruk-spec`, `/kiruk-artifact`
- Future: `/kiruk-archive`, `/kiruk-lead` (separate proposals)
