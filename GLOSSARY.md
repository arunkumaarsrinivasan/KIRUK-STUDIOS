# Glossary — Kiruk Vocabulary

> Single source of truth for kiruk's vocabulary. Read this before reading anything else.
> If a term appears anywhere else in the repo (CLAUDE.md, VISION-MISSION.md, openspec/project.md, specs), the definition here wins.

---

## Identity

| Term | Pronunciation | Meaning |
|---|---|---|
| **kiruk** | _ki-ruk_ | The studio. Lowercase by default. Never "Kiruk Studio" except in formal external contexts. From Tamil *kirukal*. |
| **kirukism** | _ki-ru-kizm_ | The movement / cult / philosophy behind kiruk: innovation, crazy ideas, openness, collaboration with rebellious and weird minds. |
| **kirukal** | _ki-ru-kal_ | Tamil: scribble / crazy. The raw, unpolished first state of every idea. The fingerprint we refuse to sand off. |
| **kirukargal** (singular: **kirukargan**) | _ki-ru-kar-gal_ | External collaborator who believes in kirukism and co-creates on a universe, ISM, or product. |
| **kirukan** (plural: **kirukargal-anbu**) | _ki-ru-kan_ | Co-worker inside kiruk — building the studio alongside Arun. |

## Work units

| Term | Meaning |
|---|---|
| **Universe** | A single client project / world. Lives at `kiruk-projects/<slug>/`. |
| **ISM** | Self-initiated experiment series — internal R&D micro-worlds. Names registered in `openspec/specs/ism/spec.md`. |
| **Product** | A kiruk-owned digital artifact for repeated outside use. Tiered: `tool` / `micro-app` / `extension` / `saas` / `toy`. Lives at `kiruk-projects/_products/<slug>/`. |
| **Scribble** | A pen-on-paper / stylus / whiteboard / napkin sketch attached to a universe/ISM/product. Image OR `textual.md` with a `reason:`. |
| **Capability** | A spec-governed studio function (`brand-system`, `template-proposal`, `content-pipeline`, etc.). Source of truth: `openspec/specs/<cap>/spec.md`. |
| **Lifecycle state** | One of `lead` / `intake` / `proposal` / `engaged` / `shipping` / `archived` for a client universe. See `client-lifecycle` spec. |

## Process

| Term | Meaning |
|---|---|
| **OpenSpec** | Spec-as-truth workflow. Proposals → validate → apply → archive. Authored under `openspec/changes/<slug>/`. |
| **Promotion** | Graduating a raw idea (`ideas/promoted/<slug>.md`) into an OpenSpec change proposal via `scripts/promote-idea.mjs`. Requires a scribble. |
| **Graduation** | Promoting an ISM into a kiruk product via a dedicated OpenSpec proposal. |
| **Story drop** | Curated quarterly qualitative public update. The **only** public surface where revenue/MRR may appear. |
| **Eye-motif test** | Every visual artifact either contains an eye motif or justifies absence in spec. Enforced by `brand-consistency-ci`. |
| **Toolbending** | Using a tool in a way it was not designed for. Core craft discipline. |
| **Guard** | A recorded prevention for a past mistake — spec scenario, script check, rule, hook. See `LEARNINGS.md`. |
| **Automation surface** | The set of scripts, hooks, slash commands, and CI gates that make solo-founder operation sustainable. |

## Boundaries

| Term | Meaning |
|---|---|
| **Open** | Content kiruk publishes openly: devlogs, sketches, code, specs, ISMs, product launches, consenting case studies. |
| **Closed** | Content kiruk keeps private: revenue figures, client identities (default), contracts, customer data, raw briefs. |
| **Transparency level** | Per-universe flag in `intake.md`: `closed` (default) / `process-only` / `named`. Gates case-study publication. |

## Tech stack

> Lives in [`openspec/specs/tech-stack/spec.md`](openspec/specs/tech-stack/spec.md). Read it before adding tools.

| Term | Meaning |
|---|---|
| **Locked choice** | Current best-in-class pick for a stack layer. Changing it requires an OpenSpec proposal. |
| **Successor** | Next-likely winner for a layer. Watched at year-end review; not yet adopted. |
| **TSL** | Three.js Shading Language — node-based shader authoring portable to WebGPU. |
| **RSC** | React Server Component — component rendered on the server, ships no JS. |
| **PPR** | Partial Prerendering (Next.js) — static shell with dynamic holes streamed in. |
| **Island** | Astro term for a hydrated interactive component embedded in an otherwise zero-JS page. |
| **Edge-ready** | Runs on Cloudflare Workers / Vercel Edge / Deno Deploy without Node polyfills. |
| **Performance budget** | Hard ceiling per route for JS shipped + Core Web Vitals (LCP / FID / CLS). |
| **Conventional Commits** | Commit-message format (`feat:`, `fix:`, `spec:`, etc.) enforced by commitlint. |

## Spec mechanics

| Term | Meaning |
|---|---|
| **Requirement** | A MUST/SHALL behavior statement in a capability spec. Format: `### Requirement: <name>` + ≥1 `#### Scenario:`. |
| **Scenario** | A GIVEN/WHEN/THEN block under a requirement. The proof that the requirement is testable. |
| **Delta** | A change-proposal fragment that mirrors the spec path under `openspec/changes/<slug>/specs/<cap>/spec.md` with `## ADDED/MODIFIED/REMOVED Requirements` headers. |
| **Apply** | The act of merging a validated proposal's deltas into the canonical specs under `openspec/specs/<cap>/spec.md`. |
| **Archive** | Moving an applied change folder to `openspec/archive/<slug>/` and noting the apply in `CHANGELOG.md`. |

## Don't say

These phrases drift from the kiruk voice and should be avoided in docs / posts / artifacts:

- "Kiruk Studio" in casual contexts (use **kiruk**).
- "client" alone where **universe** is the natural unit.
- "design system" where **brand-system** or **design-tokens** is the spec name.
- "blog" instead of **devlog** for repo content.
- "branding" where **brand-system** + **eye-motif** is what we mean.
- "experiment" where **ISM** is the registered shape.
- "open source" without saying which license layer — code is MIT, content is CC-BY 4.0.

---

## Vocabulary changes

Updates to this glossary require an OpenSpec proposal because the vocabulary is part of the studio's voice. Drift gets noticed.
