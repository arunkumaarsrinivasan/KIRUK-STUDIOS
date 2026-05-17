# Delta: idea-capture (MODIFIED)

## MODIFIED Requirements

### Requirement: Append-only session log
`ideas/log.ndjson` MUST be append-only. Each line MUST be a valid JSON object with at minimum: `ts` (ISO 8601), `source` (`session-end` | `manual`), `summary` (string), `decisions` (array), `session_id` (string), `scribble` (string path to sketch image, the literal `"[textual]"` marker, or `null` for pure exploration).

#### Scenario: Log entry well-formed
- GIVEN a `/kiruk-capture` run or SessionEnd hook fire
- WHEN the entry is appended
- THEN it parses as JSON
- AND includes `ts`, `source`, `summary`, `decisions`, `session_id`, `scribble`
- AND no existing lines were modified

#### Scenario: Promotion requires scribble
- GIVEN an idea entry with `scribble: null`
- WHEN `scripts/promote-idea.mjs <slug>` is invoked for that entry
- THEN promotion is blocked
- AND the founder is prompted to attach an image path or write `scribble/textual.md` with a `reason:`
