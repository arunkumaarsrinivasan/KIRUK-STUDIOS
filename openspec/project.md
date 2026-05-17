# Kiruk Studio — OpenSpec Project Manifest

## Purpose

The OpenSpec workspace is Kiruk Studio's **single source of truth**. Every durable studio output — brand asset, design token, template, ISM experiment, client deliverable — is modeled as a **capability** with requirements and scenarios. Nothing ships without a spec.

## Domain vocabulary

| Term | Meaning |
|---|---|
| **Kiruk** | The studio. |
| **Kirukism** | The movement / cult / philosophy behind kiruk: innovation, crazy ideas, openness, collaboration with rebellious minds. |
| **Kirukargals** | External collaborators who believe in kirukism and co-create on universes or experiments. |
| **Kirukan** | Co-workers inside kiruk — building the studio alongside Arun. |
| **Kirukal** | Scribble (Tamil). Origin state of every kiruk project. |
| **Exploration** | Unstructured or semi-structured work in `ideas/inbox.md` and experiments; no OpenSpec gate until promotion. |
| **Durable / locked** | When an idea must hold for others or for ship—then it flows through `openspec/changes/` and specs. |
| **Universe** | A single project / world. Each client project = one universe with a codename. |
| **ISM** | Internal self-initiated experiment series (no subfolders until `/kiruk-ism-new` spawns them). |
| **Portal** | A transition/interaction moment between universes or states. |
| **Eye-motif test** | Every visual artifact must contain an eye motif or justify absence in its spec. |
| **Toolbending** | Using a tool in a way it was not designed for, as a core craft discipline. |
| **Guard** | A recorded prevention for a past mistake: spec scenario, script, rule, or check—see `operational-learning` and [LEARNINGS.md](../LEARNINGS.md). |
| **Capability** | A spec-governed studio function (e.g. `brand-system`, `template-proposal`). |

## Capabilities (source of truth = `openspec/specs/`)

- `brand-system` — identity, eye-marks, palette, type, motion rules
- `design-tokens` — DTCG JSON source + Style Dictionary outputs
- `idea-capture` — inbox + log + promoted pipeline (with `scribble` field)
- `repo-privacy` — secrets hygiene, private client/API data, code review and contribution process
- `operational-learning` — log mistakes in `LEARNINGS.md`, add guards, strengthen on repeat
- `ism` — ISM lab registry (names-only placeholder; cross-links to `products` on graduation)
- `products` — in-house digital product line (tools, micro-apps, extensions, SaaS, toys) + registry
- `build-in-public` — open/closed boundary, devlog cadence, redaction rules, story-drop format
- `content-pipeline` — canonical devlog → platform derivatives (IG, LinkedIn, X, video) contract
- `client-lifecycle` — universe state machine (lead → archived), slash-command surface, artifacts per state
- `pen-and-paper` — scribble-first ritual: every universe/ISM/product begins with a sketch
- `brand-consistency-ci` — automated gates: eye-motif coverage, token discipline, scribble presence, redaction scan
- `tech-stack` — locked tooling/runtime/framework envelope + per-route performance budgets + successor watch list
- `template-portfolio` · `template-services` · `template-pitch` · `template-proposal` · `template-contract` · `template-invoice` · `template-onboarding`

## Lifecycle

```
specs/<cap>/spec.md  ←── archive/<slug>/  ←── changes/<slug>/  ←── idea promoted
        ▲                                                              ▲
        │                                                              │
       truth                                                       inbox/log
```

1. Raw idea → `ideas/inbox.md` or `/kiruk-capture`.
2. Promote-ready → `scripts/promote-idea.mjs <slug>` → `openspec/changes/<slug>/`.
3. Author: `proposal.md` + updated `specs/<cap>/spec.md` + optional `design.md` + `tasks.md`.
4. `npx openspec validate --strict` — gate.
5. Apply (generate artifacts referencing spec section).
6. Move folder to `openspec/archive/<slug>/`.
7. Entry in `CHANGELOG.md` with **Why**.

## Requirement grammar

```
## Requirements

### Requirement: <short name>
The system MUST <behavior>.

#### Scenario: <short name>
- GIVEN <precondition>
- WHEN <trigger>
- THEN <observable outcome>
- AND <optional additional>
```

Use MUST / SHALL / MUST NOT. Avoid MAY for behaviors that affect the eye-motif, spec linkage, or brand non-negotiables.

## Validation gate (non-negotiable)

Before `apply`:
1. `npx openspec validate --strict` exits 0.
2. Each delta spec has ≥1 scenario per new requirement.
3. Any token addition has matching `design-tokens/spec.md` requirement.
4. Any visual artifact either contains an eye-motif or the spec explicitly justifies its absence.

## Tech conventions

- **Source of truth:** [`openspec/specs/tech-stack/spec.md`](specs/tech-stack/spec.md) — the locked 2026 envelope. Read it before adding any tool, framework, or library.
- Node ≥ 22 LTS, ESM (`"type": "module"`), pnpm 10.
- Design tokens authored in **W3C DTCG format** (`$type`, `$value`).
- Token build via **Style Dictionary v4** → `packages/design-system/build/`.
- Brand visuals authored as **React SVG components** in `packages/design-system/components/`.
- Lint + format: **Biome 2** for JS/TS/JSON, Prettier 3 for MD/MDX.
- Commit messages: **Conventional Commits** enforced by commitlint (`feat:`, `fix:`, `spec:`, `token:`, `chore:`, `docs:`, `perf:`, etc.).
- Pre-commit hygiene: Husky 9 + lint-staged 16.

## Out of scope here

- Financial / tax tracking (lives in Notion workspace per vision §5.2).
- Personal portfolio (`C:\Users\arunk\KIRUKULAM\kiruk-in`) — referenced for founder voice only, not imported.
- Design tool files (.pen, .fig, .sketch) — all visual primitives live as code in `packages/design-system/components/`.
