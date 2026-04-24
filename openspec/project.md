# Kiruk Studio — OpenSpec Project Manifest

## Purpose

The OpenSpec workspace is Kiruk Studio's **single source of truth**. Every durable studio output — brand asset, design token, template, ISM experiment, client deliverable — is modeled as a **capability** with requirements and scenarios. Nothing ships without a spec.

## Domain vocabulary

| Term | Meaning |
|---|---|
| **Kirukal** | Scribble (Tamil). Origin state of every Kiruk project. |
| **Universe** | A single project / world. Each client project = one universe with a codename. |
| **ISM** | Internal self-initiated experiment series (no subfolders until `/kiruk-ism-new` spawns them). |
| **Portal** | A transition/interaction moment between universes or states. |
| **Eye-motif test** | Every visual artifact must contain an eye motif or justify absence in its spec. |
| **Toolbending** | Using a tool in a way it was not designed for, as a core craft discipline. |
| **Capability** | A spec-governed studio function (e.g. `brand-system`, `template-proposal`). |

## Capabilities (source of truth = `openspec/specs/`)

- `brand-system` — identity, eye-marks, palette, type, motion rules
- `design-tokens` — DTCG JSON source + Style Dictionary outputs
- `idea-capture` — inbox + log + promoted pipeline
- `ism` — ISM lab registry (names-only placeholder)
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

- Node ≥ 20, ESM (`"type": "module"`).
- Design tokens authored in **W3C DTCG format** (`$type`, `$value`).
- Token build via **Style Dictionary v4**.
- Pencil `.pen` files edited **only** via pencil MCP (`batch_design`, `set_variables`).
- Commit messages: see repo `CHANGELOG.md` style + Conventional Commits (`feat:`, `spec:`, `token:`, `chore:`).

## Out of scope here

- Financial / tax tracking (lives in Notion workspace per vision §5.2).
- Personal portfolio (`C:\Users\arunk\KIRUKULAM\kiruk-in`) — referenced for founder voice only, not imported.
