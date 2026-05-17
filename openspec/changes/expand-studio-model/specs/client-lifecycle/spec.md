# Delta: client-lifecycle (ADDED capability)

## ADDED Requirements

### Requirement: State machine is enumerated
The lifecycle MUST follow exactly these states and transitions: `lead → intake → proposal → engaged → shipping → archived`, with `disqualify` as a terminal branch from `lead` or `intake`. Each transition MUST be recorded in the universe's `kiruk-projects/<universe>/state.md` with timestamp, prior state, new state, trigger, and a 1-line "why".

#### Scenario: Transition without state record rejected
- GIVEN a universe folder where `state.md` last records `intake`
- WHEN a contributor edits the folder as if it were `engaged` without appending a transition record
- THEN PR review and the lifecycle lint flag the missing transition

### Requirement: Required artifact per state
Each state MUST produce a required artifact relative to `kiruk-projects/<universe>/`: `lead` → `lead.md`; `intake` → `intake.md`; `proposal` → `proposal.md`; `engaged` → `contract.md`; `shipping` → universe `spec.md` under `openspec/specs/`; `archived` → `handoff.md` + `case-study.md` (publish gated by consent).

#### Scenario: Universe enters `proposal` without proposal artifact
- GIVEN a universe with `state: proposal` declared in `state.md`
- WHEN no `proposal.md` exists in the universe folder
- THEN lifecycle validation fails the universe

### Requirement: Pen-and-paper precondition
A universe MUST NOT transition from `intake` to `proposal` until at least one scribble (image or `[textual]` placeholder) is attached under `kiruk-projects/<universe>/scribble/` per the `pen-and-paper` capability.

#### Scenario: Proposal blocked without scribble
- GIVEN a universe at `intake` whose `scribble/` folder is empty
- WHEN the founder attempts `/kiruk-artifact proposal`
- THEN the command refuses and points to the pen-and-paper requirement

### Requirement: Privacy boundary at each state
The `transparency:` field set in `intake.md` MUST gate what artifacts can ever be published. The lifecycle MUST surface this gate at the `shipping → archived` transition by asking the founder to confirm or upgrade the transparency level before any case study is drafted.

#### Scenario: Archive blocked on transparency mismatch
- GIVEN a universe whose `intake.md` has `transparency: closed`
- WHEN the founder runs the archive transition and a public case study is queued
- THEN the transition is paused, founder is asked to upgrade transparency or anonymize
- AND no case study is written to `content/case-studies/` until resolved

### Requirement: Slash-command surface
The full lifecycle MUST be drivable from slash commands invokable from Claude Code or the kiruk-portal: `/kiruk-intake`, `/kiruk-spec`, `/kiruk-artifact <template>`, `/kiruk-archive <universe>`.

#### Scenario: Lifecycle complete from CLI
- GIVEN a fresh lead
- WHEN the founder runs `/kiruk-intake`, `/kiruk-spec`, `/kiruk-artifact proposal`, `/kiruk-artifact contract`, `/kiruk-artifact invoice`, `/kiruk-archive <slug>` in order with required inputs
- THEN the universe folder contains all 6 required artifacts
- AND `state.md` records all 5 transitions

### Requirement: No client secrets in lifecycle artifacts
Lifecycle artifacts MUST NOT contain API keys, passwords, signed contract PDFs, or payment data. Per `repo-privacy`, sensitive originals live in `kiruk-projects/<universe>/.local-only/` (gitignored) or external systems.

#### Scenario: Commit attempting to include signed PDF
- GIVEN a contributor stages `kiruk-projects/<universe>/contract-signed.pdf`
- WHEN PR review or `brand-consistency-ci` runs
- THEN the commit is flagged per `repo-privacy`
