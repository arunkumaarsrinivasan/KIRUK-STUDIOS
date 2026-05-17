# Delta: pen-and-paper (ADDED capability)

## ADDED Requirements

### Requirement: Every new artifact has a scribble
A new universe, ISM, or product MUST have at least one scribble (image or textual) in its `scribble/` folder before any code, design token, spec proposal, or template artifact is generated for it.

#### Scenario: Code commit without scribble rejected
- GIVEN a new universe at `kiruk-projects/<universe>/` with no `scribble/` folder or empty `scribble/`
- WHEN the founder attempts to run any `/kiruk-artifact` template or commit source code into the universe folder
- THEN the action is refused with a clear message: "scribble required — drop a sketch in `<path>/scribble/` or write `scribble/textual.md` with a reason"

### Requirement: Scribble manifest is human-readable
Every `scribble/` folder MUST contain a `manifest.md` listing all scribbles with `date`, `source` (one of `paper` | `whiteboard` | `tablet` | `napkin` | `textual` | `other`), and a one-line caption.

#### Scenario: Manifest auto-checked on commit
- GIVEN a `scribble/` folder with image files but no manifest entry
- WHEN the scribble lint runs
- THEN it flags the orphaned image files

### Requirement: Textual scribble requires reason
A `scribble/textual.md` MUST include a `reason:` field explaining why no physical sketch was made. Acceptable reasons include `late-night-idea`, `transit-voice-memo`, `client-call-realtime`, `accessibility`. Unacceptable: `forgot`, `lazy`, blank.

#### Scenario: Textual scribble missing reason
- GIVEN `scribble/textual.md` with body but no `reason:` line
- WHEN the lint runs
- THEN the file is flagged and the founder is prompted to add a reason or replace with an image

### Requirement: Idea log records scribble reference
The `idea-capture` capability's `ideas/log.ndjson` schema MUST include a `scribble` field on every entry that promotes to a universe, ISM, or product. The field MAY be `null` for pure exploratory dumps but MUST be populated before promotion.

#### Scenario: Promotion blocked without scribble
- GIVEN an idea in `ideas/promoted/<slug>.md` referenced for promotion to a new universe
- WHEN `scripts/promote-idea.mjs` runs and the idea entry has no `scribble` reference
- THEN promotion is blocked until a scribble path is added or `textual` with reason is created

### Requirement: Scribbles are committed within size limits
Scribble images MUST be committed to the repo (the kirukal layer is part of the brand and public history per `build-in-public`). Images MUST be ≤ 2 MB each; oversized scans must be downsampled before commit. Original high-res scans MAY be kept in `scribble/.raw/` (gitignored).

#### Scenario: Oversized scribble image
- GIVEN a 5 MB sketch scan staged for commit at `<path>/scribble/sketch-01.png`
- WHEN the size check runs
- THEN the commit is blocked
- AND the contributor is directed to downsample or move to `.raw/`

### Requirement: Scribbles survive iteration
Once committed, a scribble MUST NOT be deleted or rewritten when the work iterates. New iterations add new scribbles (sketch-02, sketch-03). The kirukal trail is append-only.

#### Scenario: Scribble overwrite attempted
- GIVEN an existing `sketch-01.png` and a new sketch
- WHEN the contributor overwrites the file path
- THEN PR review rejects; the new sketch must use a new filename
- AND `manifest.md` records both with their dates
