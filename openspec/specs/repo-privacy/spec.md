# Spec: repo-privacy

## Purpose

Define how the studio **keeps private data private** (API keys, credentials, client-only material) while the rest of the repo stays open and reviewable. Also defines **code review** expectations for human and agent contributors so changes stay spec-aligned, safe, and teachable.

## Requirements

### Requirement: Secrets never committed

The repository MUST NOT track files that contain live secrets: API keys, database passwords, signing keys, OAuth client secrets, or long-lived access tokens. Configuration MUST use environment variables or a host-specific secret store; only **placeholder** names and non-secret structure belong in version control (e.g. `.env.example` at repo root).

#### Scenario: Reject secret-bearing env in git
- GIVEN a contributor runs `git add` on a file matching ignored secret patterns (e.g. `.env`, `.env.production`, `*.pem` under a non-doc path)
- WHEN they attempt to commit
- THEN pre-commit or review MUST catch it before the secret reaches the default branch
- AND the contributor MUST rotate any key that was ever committed

#### Scenario: Example env documents shape only
- GIVEN `.env.example` exists at repo root
- WHEN a new integration needs configuration
- THEN required variable **names** are listed with empty or clearly fake values
- AND no real secret value is present in the example file

### Requirement: Private client and API data

Client-specific deliverables, API responses, and credentials that are not meant for the public record MUST live outside tracked paths or under **explicit** ignore rules. The default is: **transparency in process, not in other people’s data** — never publish a client’s keys, PII, or confidential briefs as part of “open studio” work.

#### Scenario: Optional private island for per-universe secrets
- GIVEN material under `kiruk-projects/<universe>/` is too sensitive for the public repo
- WHEN the founder marks it private
- THEN that content MUST be moved to `kiruk-projects/<universe>/.local-only/` (gitignored) or a private repo
- AND the public tree MAY keep only non-secret summaries that reference `repo-privacy` and `idea-capture` redaction rules

### Requirement: Session and log redaction

Automated and manual capture paths MUST continue to redact common secret patterns before appending to `ideas/log.ndjson` (per [idea-capture](../idea-capture/spec.md) **No sensitive content**). AI agents MUST NOT paste live keys into issues, PRs, or commit messages.

#### Scenario: Agent does not restate user secrets
- GIVEN a user pastes a credential in chat
- WHEN the agent suggests a code or config change
- THEN the agent MUST use placeholders in diffs and avoid echoing the raw secret in new tracked files

### Requirement: Code review before merge to main

Non-trivial changes to `openspec/specs/`, `design-system/`, or `scripts/` affecting build or capture MUST be reviewed: at least one **checklist** pass (PR template or self-review) confirming spec touch, no forbidden paths edited by hand, and `npm run spec:validate` where applicable. Solo founders MAY self-review but MUST complete the same checklist with honesty.

#### Scenario: PR lists spec and security checks
- GIVEN a pull request changes a capability or adds tokens
- WHEN the PR is ready for merge
- THEN the PR body MUST use the pull request template under `.github/PULL_REQUEST_TEMPLATE.md` (or equivalent checklist)
- AND the author confirms no secrets and validation status

### Requirement: Repository files for review and contribution

The repo MUST include `CONTRIBUTING.md` at the root (how to propose changes, review norms, where to report security issues) and `.github/PULL_REQUEST_TEMPLATE.md` (review checklist). Cursor rules under `.cursor/rules/` MUST reinforce privacy and review; they MUST NOT contain real secret values.

#### Scenario: New contributor knows where rules live
- GIVEN someone opens a PR
- THEN they can find the checklist, privacy expectations, and link to this spec from `README.md` and `AGENTS.md` at the repo root

## Acceptance Artifacts

- `openspec/specs/repo-privacy/spec.md` (this file)
- `.env.example` at repository root
- `.gitignore` extended for secret and local-only patterns
- `CONTRIBUTING.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.cursor/rules/privacy-secrets.mdc`, `.cursor/rules/code-review.mdc`
- `AGENTS.md` and `README.md` link to this capability
