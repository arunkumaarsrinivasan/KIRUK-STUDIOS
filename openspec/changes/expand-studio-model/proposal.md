# Proposal: expand-studio-model

## Why

Kiruk has been scaffolded as a **services-led studio with an ISM lab on the side**. The founder has now locked four strategic decisions that reshape the studio:

1. **Lab-led, services follow** — ISM experiments and in-house digital products are the front door; client services chase the work, not the other way around.
2. **Build-in-public** — process, decisions, sketches, dead ends are public. Revenue + client internals stay private. Transparency is a discipline, not a marketing tactic.
3. **In-house digital product line** — kiruk ships its own creative tools, micro-apps, browser extensions, AI-augmented SaaS. Products are first-class outputs, not afterthoughts.
4. **Solopreneur automation across the whole studio** — content pipeline (devlog → social), client lifecycle (intake → invoice), idea capture + promotion, and asset/brand consistency must run on rails so one founder can sustain studio + lab + products.

The existing OS supports services and a placeholder ISM lab, but has no spec language for products, transparency rules, automation pipelines, or the pen-and-paper-first ritual that the founder treats as core practice. This proposal closes that gap.

## What changes

### Added capabilities
- **`products`** — in-house digital products line (tools, micro-apps, micro-SaaS, browser extensions, toys). Lifecycle, naming, where they live, when one graduates from `kiruk-ism/` to its own deploy.
- **`build-in-public`** — what kiruk publishes openly vs keeps private; cadence; redaction rules; channel mapping.
- **`content-pipeline`** — one devlog entry → IG carousel + LinkedIn post + X thread + (optional) short video transcript. Source files, generators, output folder, ownership.
- **`client-lifecycle`** — universe state machine from intake → proposal → contract → invoice → handoff → archive. Slash-command surface that drives it. Portal-facing fields.
- **`pen-and-paper`** — scribble-first ritual. Every new universe, ISM, or product MUST begin with a pen-and-paper sketch (photo or scan) attached to its intake or idea entry before any code is written.
- **`brand-consistency-ci`** — automated checks: every committed visual artifact runs the eye-motif test, every committed component imports from `@kiruk/design-system`, every new design token has a matching `design-tokens` requirement. CI gate.

### Modified capabilities
- **`idea-capture`** — adds a `scribble` field (path to sketch image or "[textual scribble]" placeholder) to `ideas/log.ndjson` schema; promotion script refuses to graduate an idea without one.
- **`ism`** — opens the registry beyond names: each ISM may now graduate into a standalone product (cross-link to `products` capability).

### Modified docs
- **`VISION-MISSION.md`** — restate mission as lab-led; insert product line; codify transparency rules + private boundaries.
- **`CLAUDE.md`** — vocab additions (`product`, `scribble-first`, `automation surface`); update non-negotiables (add eye-motif CI + pen-and-paper); update repo orientation.
- **`ROADMAP.md`** — insert **Phase 3.5: Product Track v0** + **Phase 4.5: Automation Spine**; renumber and re-gate downstream.
- **`FOUNDER_DECISIONS.md`** — lock the four answered strategic questions; add new question blocks for product-1 selection and automation tooling choice.

## Impact

- **Specs touched:** 6 new + 2 modified = 8 spec files; `openspec/project.md` capability list extended.
- **Docs touched:** VISION-MISSION, CLAUDE, ROADMAP, FOUNDER_DECISIONS, README, CHANGELOG, TASKS.
- **Code:** no app code changes in this proposal; product/automation implementations land in follow-up proposals once founder picks first product + automation tooling.
- **Downstream:** all future intakes, captures, and template runs must satisfy the pen-and-paper + brand-consistency requirements; agents will be guided by updated CLAUDE.md.
- **Risk:** pen-and-paper gate adds friction. Mitigated by allowing a `[textual scribble]` placeholder for digital-only ideation moments while still recording the *intent* to ground work in physical sketching.

## Deltas

Authored as full new spec files under `openspec/specs/<capability>/spec.md` per the precedent set by `add-repo-privacy-spec`. See `tasks.md` for the implementation checklist.
