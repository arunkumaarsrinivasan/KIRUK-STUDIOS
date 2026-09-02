# Method — how this knowledge base is written

Arun is the **skill manager / orchestrator**. The agent is the scribe and filer.

Read [docs-map.md](./docs-map.md) before filing if the dump could land in more than one layer.

Every spoken or written dump in this pass is a **document-creation task**, not a chat that evaporates.

## Lifecycle

```
spoken dump
  → chapter file (what was said)
  → topic files (what it means as thinking)
  → ideas.md (seeds)
  → task.md (moves)
  → tensions.md (if it fights the repo)
  → /kiruk-capture
  → lock only when Arun says lock → OpenSpec / VISION-MISSION
```

## Routing

| If the dump is about…                               | Write to                          |
| --------------------------------------------------- | --------------------------------- |
| Purpose / what this KB is for                       | `overview.md`                     |
| One designer, one client                            | `one-to-one.md`                   |
| Criticism, nepotism, absurdism, naturalism, heroism | `themes.md`                       |
| Desirable Giggle, OSS products, surveys             | `projects.md`                     |
| The five-step project loop                          | `workflow.md`                     |
| X / public process / OSS creative practice          | `share-loop.md`                   |
| Docs workflow / IA / CI for writing                 | `docs-workflow.md`, `docs-map.md` |
| A workbook day’s answers                            | `chapters/NN-….md`                |
| Legal / domain / handles / desk                     | `setup.md`                        |
| What people should feel / lock onto                 | `association.md`                  |
| Why studio vs personal brand                        | `why-studio.md`                   |
| Who sits in the room                                | `people.md`                       |
| Why someone chooses kiruk                           | `edge.md`                         |
| Other brands, poles, intersection                   | `inspirations.md`                 |
| Holding back, movie scream, structure               | `constraints.md`                  |
| How we will pitch later                             | `positioning.md`                  |
| A new concept, unnamed, unfinished                  | `ideas.md`                        |
| Something to do next                                | `task.md`                         |
| Clash with manifesto / specs / portal               | `tensions.md`                     |
| A word that must stay stable                        | `glossary.md`                     |

Split. Do not grow one mega-file. If a topic file would need a second theme, make a new file and link it from `README.md`.

## Rules for the scribe

1. **Capture, don’t lock.** This folder is kirukal. Durable truth still needs OpenSpec.
2. **Block by block.** One chapter or one topic per pass. Do not rebuild the whole studio from a dump.
3. **Think, don’t decorate.** Prefer _why this move exists_ over slogans and palette talk. The workbook is _how_, not look/feel.
4. **Do not copy the workbook.** Summarize operations. No substantial verbatim from the PDF.
5. **Do not copy Boring Studio’s OS.** Study the spine; write kiruk’s version. Same rule as `docs/plans/client-flow-foundation.md`.
6. **Keep / unlearn.** When a dump changes older kiruk copy, log the tension. Do not silently overwrite `VISION-MISSION.md`.
7. **Reflect back** in kiruk language, then wait for correction before the next chapter.
8. **Privacy.** No secrets, client names, fees, or live keys. Placeholders only.

## After each dump

- [ ] Chapter file updated
- [ ] Topic files updated (only the ones touched)
- [ ] New seeds in `ideas.md`
- [ ] New actions in `task.md`
- [ ] Tensions updated if the repo would be wrong
- [ ] `README.md` status row updated
- [ ] `/kiruk-capture` appended
- [ ] Founder hears a short reflection, not a paste of their transcript

## Promote (later)

An idea leaves this folder only when Arun says yes, a slug exists, and a scribble is attached (`[textual]` with `reason:` or an image). Then `ideas/promoted/<slug>.md` — do not run `promote-idea.mjs` unless asked.
