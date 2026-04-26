# kiruk-portal

> `apps/kiruk-portal` — internal client management. Deploys to portal.kiruk.studio.

Universe tracker, deliverable manager, template runner, invoicing — internal tool for Arun and kirukan.

## Status

**Phase 4 — not yet scaffolded.** This stub marks the app's place in the monorepo.
See `ROADMAP.md` Phase 4 for the full plan.

## Planned features

- Universe dashboard: active projects, phase, status
- Deliverable state machine: spec → draft → review → shipped
- Template runner: trigger `/kiruk-artifact` outputs from UI
- Invoice tracker linked to `template-invoice` generator
- Auth: NextAuth or Clerk (internal-only)

## Deploy target

Railway or Vercel. Domain: portal.kiruk.studio.

## Related

- Templates: `../../kiruk-templates/`
- Client projects: `../../kiruk-projects/`
- Specs: `../../openspec/specs/`
