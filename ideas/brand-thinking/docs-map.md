# Docs map — where a piece of writing lives

> Compass for the studio. One job per layer. If two layers claim the same sentence, the **tighter** layer wins (lock beats spark; public is a derivative).
> Research: [docs-workflow.md](./docs-workflow.md). Diátaxis: https://diataxis.fr/

## Layers (do not merge)

| Layer           | Job                                     | Home                                                                                         | Diátaxis analogue               |
| --------------- | --------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------- |
| **Kirukal**     | Spark. Mess allowed.                    | `ideas/inbox.md`, `ideas/brand-thinking/`, `content/scribbles/`                              | none (pre-docs)                 |
| **Operating**   | What now, what changed, what we learned | `TASKS.md`, `ROADMAP.md`, `CHANGELOG.md`, `LEARNINGS.md`, `FOUNDER_DECISIONS.md`             | how-to (internal)               |
| **Locked**      | Durable truth. Gated.                   | `openspec/specs/`, `openspec/changes/`                                                       | reference                       |
| **Explanation** | Why kiruk exists                        | `VISION-MISSION.md`, `content/manifesto.md`, `ideas/brand-thinking/overview.md` (until lock) | explanation                     |
| **Public**      | What strangers read                     | `content/devlogs/`, case studies, story-drops → `apps/kiruk-web`                             | tutorial + explanation (edited) |
| **Client**      | One-to-one job artifacts                | `kiruk-templates/`, `kiruk-projects/<universe>/`                                             | how-to (private)                |
| **Agent**       | How the scribe behaves                  | `.cursor/rules/`, `.cursor/skills/`, `.claude/commands/`                                     | how-to (for agents)             |

## Promotion (only path up)

```
kirukal  →  /kiruk-capture  →  ideas/promoted/<slug>  →  openspec/changes/
                                                         →  apply  →  specs + CHANGELOG
                                                         →  optional public derivative
```

Never: chat → `VISION-MISSION.md`. Never: brand-thinking → ISM folder without scribble + `/kiruk-ism-new`.

## Two task boards (on purpose)

| Board                        | Scope                          |
| ---------------------------- | ------------------------------ |
| [`TASKS.md`](../../TASKS.md) | Studio-wide (apps, specs, ISM) |
| [`task.md`](./task.md)       | This thinking pass only        |

If a task is “ship portal,” it does not belong here.

## Front-matter (when a file graduates)

Spark files may stay bare. Anything heading toward public or lock should carry: `status` (`spark` \| `operating` \| `locked` \| `public`), `scribble`, `spec-link` if it satisfies a spec.
