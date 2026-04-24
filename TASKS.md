# Tasks — Kiruk Studio

> Rolling task board. One source of truth for "what now?"
> When in doubt, match against `ROADMAP.md` phase exit criteria.
>
> Format: `- [ ] (priority: P0/P1/P2) <task> — owner: @handle — due: <date> — spec: <path>`

---

## Active — Phase 0 (OS Bootstrap)

- [~] (P0) Scaffold root docs — spec: CLAUDE.md §6
- [~] (P0) Scaffold openspec skeleton — spec: openspec/project.md
- [ ] (P0) Author `openspec/specs/brand-system/spec.md` v1
- [ ] (P0) Author `openspec/specs/design-tokens/spec.md` v1
- [ ] (P0) Author `openspec/specs/idea-capture/spec.md` v1
- [ ] (P0) Author `openspec/specs/ism/spec.md` v1 (names-only)
- [ ] (P0) DTCG tokens: core, semantic, type, motion, components
- [ ] (P0) Style Dictionary config + `build-tokens.mjs`
- [ ] (P0) `capture-session.mjs` + `promote-idea.mjs` + `sync-pen-variables.mjs`
- [ ] (P0) 5 slash commands in `.claude/commands/`
- [ ] (P0) SessionEnd hook registered via update-config skill
- [~] (P0) Master `kiruk-design.pen` scaffolded — components exist in Pencil buffer; **user must Save As** `design-system/pen-files/kiruk-design.pen` in Pencil UI. See `design-system/pen-files/README.md`.
- [ ] (P1) 7 template spec+generator stubs
- [ ] (P0) Smoke test: `npx openspec validate` returns 0
- [ ] (P0) Smoke test: `/kiruk-capture` round-trip

## Next — Phase 1 (Brand Spine)

- [ ] (P0) `content/manifesto.md` v1
- [ ] (P0) Primary eye-mark in `kiruk-design.pen`
- [ ] (P1) ≥3 secondary eye-marks
- [ ] (P0) Lock core palette
- [ ] (P0) Lock type pairing
- [ ] (P1) Define 4 motion motifs
- [ ] (P1) Brand-system spec → v1-locked

## Later — Phase 2+

See `ROADMAP.md`.

---

## Backlog / Ideas (not yet triaged)

- [ ] Notion workspace sync script
- [ ] kiruk.studio website Next.js scaffold
- [ ] First ISM experiment picker (which name first?)
- [ ] Case study rewrite: HP Print AI observability
- [ ] Devlog template + first entry

---

## Done (most recent first)

_(empty — will populate after Phase 0 completion)_

---

## Hygiene rules

- Every task maps to a spec path OR is tagged `(no-spec)` with justification.
- Move completed items to `## Done` with date.
- Dropped tasks → delete; log the "why" in `CHANGELOG.md`.
- Priority: **P0** = blocks phase exit · **P1** = phase scope · **P2** = nice-to-have.
