# kiruk-portal

> `apps/kiruk-portal` — internal client management. Deploys to portal.kiruk.studio.

Universe tracker, deliverable manager, template runner, invoicing — internal tool for Arun and kirukan.

## Status

**Phase 4 — slice 1 scaffolded.** Next.js 15 (App Router, Turbopack) + Tailwind v4, sketch B&W
design to match kiruk-web. The headline idea: **a proposal is scribbled, not written** — sketch
the idea on a pen-paper canvas, hand it to the client, get their marks back.

- `/` — scribble-desk landing + client lifecycle map (lead → handoff)
- `/proposals/new` — **scribble-proposal canvas** (live): pen drawing, undo, clear, export PNG

## Roadmap (next slices)

- Slice 2: universe dashboard + save scribbles into `kiruk-projects/<universe>/`, lifecycle state machine
- Slice 3: Better-Auth + Neon/Drizzle persistence + client read-view (FOUNDER_DECISIONS P1/P2/P3)
- Slice 4: real-time client mark-back (collaborative scribble) + deploy
- OpenSpec: redefine the `proposal` artifact (client-lifecycle / template-proposal) from prose-doc → scribble-canvas

## Deploy target

Vercel. Domain TBD (portal.kiruk.in or subpath).

## Related

- Templates: `../../kiruk-templates/`
- Client projects: `../../kiruk-projects/`
- Specs: `../../openspec/specs/`
