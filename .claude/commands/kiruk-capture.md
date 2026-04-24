---
description: Flush current session's creative decisions into ideas/log.ndjson. Offer to promote ideas ready for OpenSpec.
---

# /kiruk-capture

Read `openspec/specs/idea-capture/spec.md` for the schema.

## What this does

1. Summarize the current session's **creative decisions** (not every tool call). Focus on:
   - Choices made (color, type, motion, structure)
   - Specs changed or authored
   - Artifacts generated
   - User-raised ideas that deserve follow-up
2. Build a JSON object matching the schema in `idea-capture/spec.md`:
   ```json
   {
     "ts": "<ISO 8601 now>",
     "source": "manual",
     "session_id": "<from context or 'manual-<ts>'>",
     "summary": "<1–2 sentence session summary>",
     "decisions": ["...", "..."],
     "questions": ["..."],
     "files_touched": ["path/rel/to/repo", "..."],
     "user_intent": "<what the user wanted out of this session>"
   }
   ```
3. Append exactly ONE line to `ideas/log.ndjson` (create file if missing).
4. Redact secrets per `idea-capture/spec.md` (sk-*, ghp_*, AKIA*, password/secret/api_key assignments).
5. Ask the user: "Any of these ideas promote-ready? (y/N)" — if yes, prompt for slug, then write `ideas/promoted/<slug>.md` with the idea body + a one-line note. Do NOT run `promote-idea.mjs` automatically; just stage the file.
6. Print: "Logged. Current log depth: <line-count>."

## Rules

- Single line append. No rewrites.
- No secrets in the entry.
- Slug validation: `^[a-z0-9][a-z0-9-]{1,60}$`.
- If the session had no substantive creative work, still append an entry with `decisions: []` and a one-line summary.
