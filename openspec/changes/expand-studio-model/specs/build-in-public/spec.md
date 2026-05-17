# Delta: build-in-public (ADDED capability)

## ADDED Requirements

### Requirement: Open vs Closed boundary is enumerated
The build-in-public spec MUST maintain a current Open/Closed table listing every category (devlog, sketches, code, specs, ISMs, product launches, case studies, client names, briefs, revenue, contracts, customer data, personal). Any change to that table MUST go through an OpenSpec proposal.

#### Scenario: Boundary change requires proposal
- GIVEN a contributor or the founder wants to make a Closed category Open (or vice versa)
- WHEN they edit the table directly without an OpenSpec proposal
- THEN PR review and `brand-consistency-ci` reject the change
- AND the contributor is directed to open `openspec/changes/buildinpublic-boundary-<slug>/`

### Requirement: Devlog cadence floor
A public devlog entry MUST be published at least once every 14 days during active studio operation. Entries MUST live in `content/devlogs/<YYYY-MM-DD>-<slug>.mdx`.

#### Scenario: Missed cadence flagged
- GIVEN no new devlog has been added in the last 14 days
- WHEN the cadence-check action runs
- THEN it surfaces a reminder in the founder's session via SessionStart hook or status line

### Requirement: Redaction before publish
Any content destined for the open surface MUST be scanned for Closed-category leakage before publish. The scan MUST flag: dollar amounts paired with client names, raw email addresses, API key patterns, unredacted client-only brief language.

#### Scenario: Devlog draft mentions revenue figure
- GIVEN a devlog draft containing `"$8,500 from Acme"`
- WHEN the redaction check runs
- THEN the draft is flagged with the offending line cited
- AND publish is blocked until the line is removed or rephrased qualitatively

### Requirement: Story drops are the only revenue surface
Revenue, MRR, and growth figures MAY appear in public artifacts ONLY through a curated quarterly story drop post — qualitative, narrative-shaped, no real-time numbers, no per-client breakdown. Story drops MUST be tagged `kind: story-drop` in MDX front-matter.

#### Scenario: Real-time revenue dashboard rejected
- GIVEN someone proposes a live revenue widget on the website
- WHEN reviewed against this spec
- THEN the proposal is rejected
- AND the reviewer points to story-drop format as the only public revenue surface

### Requirement: Per-universe consent recorded
Every client universe's `intake.md` MUST record a `transparency:` field with one of: `closed` (default), `process-only` (process public, identity anonymized), `named` (full case study with client name, with signed consent).

#### Scenario: Case study publishes without consent flag
- GIVEN a case study draft for `kiruk-projects/<universe>/`
- WHEN the universe's `intake.md` has `transparency: closed`
- THEN the case study cannot be published to `content/case-studies/`
- AND a reviewer is prompted to obtain consent or anonymize
