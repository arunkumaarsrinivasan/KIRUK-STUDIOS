# Kiruk Studio

> *Kirukal* (Tamil: scribble, crazy) → worlds.

**Source:** [github.com/arunkumaarsrinivasan/KIRUK-STUDIOS](https://github.com/arunkumaarsrinivasan/KIRUK-STUDIOS) (public) · License: [MIT](./LICENSE)

Kiruk Studio is a creative studio that turns raw scribbles and wild imagination into never-before-seen products. Everything is an eye. No trend-chasing, no boring work, no shallow branding.

This repo is the studio's operating system — a spec-driven, idea-capturing, design-token-powered creative OS. It is **open for learning and scrutiny**: process, ideas, specs, and experiments are kept in-repo so the story from scribble to shipped work stays visible—wins, detours, and missteps included.

### Open & transparent

- **End-to-end:** [ideas/](./ideas/) (inbox, append-only log, promoted stubs), [openspec/](./openspec/) (capabilities and change history), [CHANGELOG.md](./CHANGELOG.md) for what shipped and why.
- **No hidden “making of”** beyond private client secrets: if something is safe to version, it should live here so others (and future you) can learn from the path, not just the highlight reel.
- **Mistakes are part of the artifact:** when something is wrong, fix it in the open and document the correction in the changelog or change proposals when it matters to the system.

## Four pillars

1. **Worldbuilding Partnerships** — idea → shipped product.
2. **Experimental Web Experiences** — Awwwards-grade, WebGL + interaction.
3. **Brand Systems** — eye-first identity, living guidelines.
4. **Creative OS & Framework Design** — help other studios spec their own.

## Quickstart

```bash
npm install
npm run tokens:build        # regenerate design-system/build/
npx openspec validate       # gate all specs
```

## Where to look

| Want to… | Read |
|---|---|
| Understand the studio | [VISION-MISSION.md](./VISION-MISSION.md) |
| Know current priorities | [ROADMAP.md](./ROADMAP.md), [TASKS.md](./TASKS.md) |
| See what changed | [CHANGELOG.md](./CHANGELOG.md) |
| AI setup (Claude Code, Cursor) | [CLAUDE.md](./CLAUDE.md), [AGENTS.md](./AGENTS.md), [`.cursor/rules/`](./.cursor/rules/) |
| Navigate specs | [openspec/project.md](./openspec/project.md) |
| Dump a raw idea | [ideas/inbox.md](./ideas/inbox.md) |
| Read the manifesto | [content/manifesto.md](./content/manifesto.md) |

## Spec-first flow

```
idea → ideas/inbox.md
     → /kiruk-capture            (logs decisions to ideas/log.ndjson)
     → promote-idea.mjs          (graduates to openspec/changes/<slug>/)
     → openspec validate         (gate)
     → /kiruk-artifact           (generates template output)
     → openspec/archive/<slug>/  (history)
     → CHANGELOG.md              (why it mattered)
```

## Slash commands

- `/kiruk-intake` — structured intake for new project/universe
- `/kiruk-spec` — turn intake into spec + change proposal
- `/kiruk-artifact <template>` — render a template against active universe
- `/kiruk-capture` — flush session decisions into `ideas/log.ndjson`
- `/kiruk-ism-new <name>` — scaffold a new ISM experiment

## Founder

Arun Kumaar Srinivasan — [@kirukism](https://instagram.com/kirukism) — Bangalore.
