# Security Policy — Kiruk

## Reporting a vulnerability

If you discover a security issue — committed secret, leaked credential, vulnerable dependency, exploit in published kiruk code or a deployed kiruk product — **do not open a public issue.**

Email the founder privately: `praveenmanikandan2000@gmail.com` with subject `[kiruk security]`.

Include:

- A description of the issue and where it lives (file path, repo, deployed URL).
- Steps to reproduce, if applicable.
- Your assessment of impact (low / medium / high).
- Whether the issue is currently being exploited in the wild.

You will get an acknowledgement within **3 business days**. A triage assessment follows within **7 days**.

---

## Disclosure timeline

| Severity | Target fix window | Disclosure |
|---|---|---|
| Critical (active exploit, leaked secret) | 24–72 hours | Public note in `CHANGELOG.md` + `LEARNINGS.md` once fixed |
| High (potential exploit, no active use) | 14 days | Public note when fixed |
| Medium / Low | 30 days | Aggregated in monthly security note |

We coordinate disclosure with you; we will credit reporters in `LEARNINGS.md` unless you ask otherwise.

---

## Scope

In scope:

- This monorepo (`KIRUK-STUDIOS`) and all packages, apps, scripts, slash commands published from it.
- Deployed kiruk apps: `kiruk.studio`, `portal.kiruk.studio`, ISM deploys, in-house product deploys listed in `openspec/specs/products/registry.md`.
- Generated artifacts (design tokens, content derivatives).

Out of scope:

- Personal forks not affiliated with kiruk.
- Third-party tools we depend on (report upstream).
- Social engineering of the founder (just don't).

---

## Committed secrets

If you find a secret committed to history:

1. Email immediately (subject `[kiruk security] committed secret`).
2. Do **not** include the secret in the email body — name the file path and approximate commit.
3. The founder will rotate the credential first, then scrub history (`git filter-repo` or BFG) within 24 hours.
4. A `LEARNINGS.md` entry with `Mistake / Root cause / Fix / Guard` will be added so the same class of leak is prevented.

See `openspec/specs/repo-privacy/spec.md` and `openspec/specs/operational-learning/spec.md`.

---

## Dependency policy

- `pnpm audit` runs as part of the CI doctor script (`pnpm doctor`).
- High/critical CVEs in production dependencies are patched within 7 days.
- We pin Node to LTS (`.nvmrc`) and pnpm major version in `package.json#packageManager`.

---

## Safe harbor

Good-faith research aligned with this policy will not result in legal action by kiruk. We support coordinated disclosure.
