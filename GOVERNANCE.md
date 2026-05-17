# Governance — Kiruk

> How decisions are made at kiruk. Updated as the studio grows from solo to kirukargal network to studio team.

---

## Current model — Founder-led (2026)

**One founder, full ownership.** Arun Kumaar Srinivasan (`@kirukism`) is the sole maintainer and final decision-maker on:

- Vision, mission, principles, non-negotiables.
- Capability spec additions, modifications, removals.
- Roadmap priorities and phase gates.
- License changes.
- Brand identity locks (logo, palette, type, motion).
- Client universe intake/decline.
- In-house product roadmap and registry.
- Kirukargal collaboration agreements.

This is documented openly so contributors know who to ask and so the studio can scale governance without inventing a process under pressure.

---

## How decisions move

| Decision type | Process | Final say |
|---|---|---|
| Strategic direction (model, transparency, product mix) | Logged in `FOUNDER_DECISIONS.md`; locked when status reaches `[x]` | Founder |
| Durable spec change | OpenSpec proposal (`openspec/changes/<slug>/`) → validate → apply → archive | Founder review |
| Bug fix / non-behavioral change | PR with `CHANGELOG.md` entry | Founder review (self-merge OK for solo) |
| Roadmap shift | Edit `ROADMAP.md`; record "why" in `CHANGELOG.md` | Founder |
| Brand-CI bypass | PR description with `brand-ci: bypass <check> reason: <text>`; LEARNINGS entry if recurring | Founder |
| Client universe acceptance | `/kiruk-intake` + non-negotiables check | Founder |
| Kirukargal onboarding (Phase 6+) | Application → philosophy check → trial universe → onboarding | Founder, later council |
| Code of Conduct enforcement | Private report → 7-day triage → response per CoC | Founder, later council |

---

## Maintainer ladder (Year 2+)

When the kirukargal network passes ~5 active members, governance graduates:

1. **Kirukan council** — 2–3 active studio co-workers + the founder. Spec-merge authority on routine changes; founder retains veto on strategy + brand + license.
2. **Kirukargal review** — kirukargals get review-and-comment rights on proposals affecting their domain (e.g. product, ISM, education).
3. **Public RFC** — for spec changes that affect the open-source community (`kiruk-creative-os`), a 14-day public RFC window precedes apply.

The transition will be documented as a `governance-upgrade-<date>` OpenSpec proposal when it happens.

---

## Conflict resolution

Disagreement on a spec change:

1. Comment thread on the OpenSpec proposal.
2. If unresolved after 7 days, founder breaks the tie with a written rationale in the proposal's `proposal.md` under `## Why` (extended).
3. If the conflict is between contributors (not spec), Code of Conduct applies.

---

## Forking

This repo is open-source. You may fork for any aligned purpose (see `LICENSE` for code/content terms). If you ship a public derivative kiruk-style creative OS:

- Credit kiruk (CC-BY 4.0 requires it).
- Use a different name and brand — `kirukism`, `kiruk`, the eye motif library, and the manifesto are kiruk's voice.
- We will not police forks; we will publicly cheer ones that ship interesting weird worlds.

---

## Sustainability + decision capacity

The founder is solo. To preserve decision quality:

- Strategic locks live in `FOUNDER_DECISIONS.md` so they are made once, not re-litigated every PR.
- Spec system catches drift before it ships (see `brand-consistency-ci`).
- LEARNINGS log makes guards explicit so repeat decisions get easier.
- Two active client universes max + ≥1 ISM in motion (see `VISION-MISSION.md` capacity).

---

## Last updated

2026-05-18. Next review: when first kirukargal joins, OR Year 2 transition — whichever comes first.
