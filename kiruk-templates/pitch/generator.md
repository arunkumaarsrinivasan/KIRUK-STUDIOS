---
template: pitch
spec-link: openspec/specs/template-pitch/spec.md
---

# Generator Prompt: Pitch

Render a per-universe pitch per `openspec/specs/template-pitch/spec.md`.

## Required inputs
- Active universe path: `kiruk-projects/<universe>/`
- `kiruk-projects/<universe>/intake.md`
- `kiruk-projects/<universe>/spec.md`

If either input is missing, abort with: "Missing `<path>`. Run `/kiruk-intake` or `/kiruk-spec` first."

## Structure
1. Front-matter: universe, spec-link, eye-motif tag, version.
2. **Current World** — the client's status quo, one paragraph in narrative voice.
3. **Proposed Universe** — the world Kiruk will build with them.
4. **The Portal** — how we'll build it (approach, toolbending, disciplines).
5. **Milestones** — universe-themed phase names only. No "Phase 1".
6. **Asks** — what we need from the client (access, time, decisions, budget range).

## Output
`kiruk-templates/pitch/output/<universe>-pitch-v<n>.md`
