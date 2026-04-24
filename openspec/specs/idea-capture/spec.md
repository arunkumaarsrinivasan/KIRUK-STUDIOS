# Spec: idea-capture

## Purpose

The idea-capture capability ensures every creative decision, raw sketch, and session insight lands in a durable store and can graduate into an OpenSpec change proposal without friction. It has three surfaces: `ideas/inbox.md` (zero-friction dump), `ideas/log.ndjson` (append-only session log), `ideas/promoted/` (graduated stubs).

## Requirements

### Requirement: Inbox is always writable
`ideas/inbox.md` MUST exist and accept any markdown or plaintext content without schema constraints.

#### Scenario: Any dump succeeds
- GIVEN a user writes a rough idea to `ideas/inbox.md`
- WHEN saved
- THEN no validation, no rejection, no format policing

### Requirement: Append-only session log
`ideas/log.ndjson` MUST be append-only. Each line MUST be a valid JSON object with at minimum: `ts` (ISO 8601), `source` (`session-end` | `manual`), `summary` (string), `decisions` (array), `session_id` (string).

#### Scenario: Log entry well-formed
- GIVEN a `/kiruk-capture` run or SessionEnd hook fire
- WHEN the entry is appended
- THEN it parses as JSON
- AND includes `ts`, `source`, `summary`, `decisions`, `session_id`
- AND no existing lines were modified

### Requirement: Manual capture command
A slash command `/kiruk-capture` MUST exist at `.claude/commands/kiruk-capture.md` that summarizes the current session's creative decisions and appends to `log.ndjson`. It MUST ask whether any idea is promote-ready and, if yes, write `ideas/promoted/<slug>.md`.

#### Scenario: Capture round-trip
- GIVEN a user types a new idea in `ideas/inbox.md`
- WHEN `/kiruk-capture` is run
- THEN a new line appears in `log.ndjson` summarizing the idea and decisions
- AND the user is prompted about promotion

### Requirement: Automatic session-end capture
A SessionEnd hook in `.claude/settings.json` MUST run `node scripts/capture-session.mjs` on every Claude Code session close, appending a condensed entry to `log.ndjson`.

#### Scenario: Session close appends entry
- GIVEN a Claude Code session in this repo ends
- WHEN the SessionEnd hook fires
- THEN `log.ndjson` gains exactly one new line with `source: "session-end"`

### Requirement: Promotion path
A promoted idea MUST be graduatable to an OpenSpec change proposal via `node scripts/promote-idea.mjs <slug>`. The script MUST create `openspec/changes/<slug>/proposal.md` seeded from `ideas/promoted/<slug>.md`.

#### Scenario: Promote creates valid proposal skeleton
- GIVEN `ideas/promoted/<slug>.md` exists
- WHEN `node scripts/promote-idea.mjs <slug>` runs
- THEN `openspec/changes/<slug>/proposal.md` exists with the required Why/What/Impact sections
- AND the source file is moved to `ideas/promoted/.applied/<slug>.md` (not deleted)

### Requirement: No sensitive content
The capture pipeline MUST NOT persist secrets, credentials, tokens, or API keys found in the session transcript.

#### Scenario: Secret redaction
- GIVEN a session transcript containing an API key pattern (e.g., `sk-…`)
- WHEN the capture script processes it
- THEN the offending substring is redacted to `[REDACTED]` before writing to `log.ndjson`

## Acceptance Artifacts

- `ideas/inbox.md`
- `ideas/log.ndjson` (initially empty)
- `ideas/promoted/` + `.applied/` subfolder
- `scripts/capture-session.mjs`
- `scripts/promote-idea.mjs`
- `.claude/commands/kiruk-capture.md`
- `.claude/settings.json` with SessionEnd hook
