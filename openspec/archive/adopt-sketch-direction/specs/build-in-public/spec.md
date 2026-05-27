# Delta: build-in-public

## MODIFIED Requirements

### Requirement: Devlog cadence floor

There is NO fixed devlog cadence floor. A public devlog entry SHOULD be published whenever there is material progress (a shipped thing, a decision, a dead end worth sharing) rather than on a fixed clock. Entries MUST still live in `content/devlogs/<YYYY-MM-DD>-<slug>.mdx`. Tooling MAY surface how long it has been since the last devlog as **information**, but MUST NOT fail or block on a missed interval.

#### Scenario: Long gap is informational, not a failure

- GIVEN no new devlog has been added in 30 days
- WHEN the cadence check runs (e.g. `scripts/doctor.mjs`)
- THEN it reports the days-since-last-devlog as info
- AND it does NOT fail the run or block any merge

#### Scenario: Devlog still lands in the dated folder

- GIVEN the founder publishes a devlog
- WHEN the file is created
- THEN it is named `content/devlogs/<YYYY-MM-DD>-<slug>.mdx`
