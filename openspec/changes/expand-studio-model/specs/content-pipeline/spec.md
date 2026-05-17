# Delta: content-pipeline (ADDED capability)

## ADDED Requirements

### Requirement: Canonical entry front-matter contract
Every canonical devlog entry MUST have YAML front-matter containing at minimum: `title`, `slug`, `date` (ISO 8601), `state` (`draft|ready|published|archived`), `tags` (string array), `eye-motif` (path to image OR `"none — justified: <reason>"`), `scribble` (path to seeding sketch OR `"[textual]"`), `derive` (object: per-platform booleans `ig`, `linkedin`, `x`, `video`).

#### Scenario: Entry missing required front-matter rejected
- GIVEN a new file at `content/devlogs/<date>-<slug>.mdx` lacking `eye-motif` or `scribble`
- WHEN the generator runs
- THEN the entry is skipped and a clear error names the missing fields

### Requirement: Derivative outputs live next to canonical
For a canonical entry at `content/devlogs/<date>-<slug>.mdx`, derivative outputs MUST live at `content/devlogs/<date>-<slug>/<platform>.<ext>` so source and outputs travel together in review.

#### Scenario: Derivatives co-located
- GIVEN canonical `content/devlogs/2026-05-18-iris-dilate-motion.mdx` with `derive.ig: true`
- WHEN the generator runs
- THEN `content/devlogs/2026-05-18-iris-dilate-motion/ig.json` exists
- AND no derivative is written outside that folder

### Requirement: Platform format rules
Each platform output MUST satisfy the platform's hard constraints: IG carousel (`ig.json`) — 6-10 slides, each body ≤ 280 chars; LinkedIn (`linkedin.md`) — single post ≤ 3000 chars; X thread (`x-thread.md`) — each tweet ≤ 280 chars; video script (`video-script.md`) — scene-by-scene with `[on-screen]` + `[voiceover]` markers.

#### Scenario: Generator produces oversized X tweet
- GIVEN a canonical entry generating a 290-char tweet
- WHEN the generator runs
- THEN the tweet is split or truncated with `[…]` marker
- AND the entry's `state` cannot advance to `ready` until human review confirms the split

### Requirement: Manual review before publish
A derivative MUST NOT auto-publish to any platform. The generator MAY post via API to a staging surface (local preview, drafts inbox, scheduled-but-paused queue) but final publish MUST be a human action.

#### Scenario: Auto-publish attempt rejected
- GIVEN a derivative marked `ready`
- WHEN any automation tries to push it live without explicit human trigger
- THEN the push is blocked
- AND the founder is prompted in the portal or CLI

### Requirement: Story-drop tagging respected
Canonical entries with `tags: [story-drop]` MUST follow `build-in-public` story-drop rules. The generator MUST refuse to produce derivatives for any non-story-drop entry that contains revenue/MRR figures.

#### Scenario: Devlog with revenue figure outside story drop
- GIVEN a canonical entry with `"$8500"` in body and `tags: [devlog]` (not `story-drop`)
- WHEN the generator runs
- THEN derivative generation halts and the entry is flagged

### Requirement: Eye-motif reference required
Every derivative that produces visual output (IG slides, video) MUST reference at least one eye-motif image from `packages/design-system/components/` or `content/scribbles/`. Text-only platforms MAY skip but MUST note `eye-motif: none — justified: text-only platform`.

#### Scenario: IG carousel without eye motif
- GIVEN an entry generating IG slides with no eye-motif image reference
- WHEN the generator runs
- THEN the IG output is rejected
- AND the entry's front-matter is amended or a designer is prompted
