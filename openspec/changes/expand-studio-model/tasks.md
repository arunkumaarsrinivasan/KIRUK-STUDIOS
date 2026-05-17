# Tasks — expand-studio-model

## Specs

- [ ] Author `openspec/specs/products/spec.md`
- [ ] Author `openspec/specs/build-in-public/spec.md`
- [ ] Author `openspec/specs/content-pipeline/spec.md`
- [ ] Author `openspec/specs/client-lifecycle/spec.md`
- [ ] Author `openspec/specs/pen-and-paper/spec.md`
- [ ] Author `openspec/specs/brand-consistency-ci/spec.md`
- [ ] Modify `openspec/specs/idea-capture/spec.md` — add `scribble` field requirement
- [ ] Modify `openspec/specs/ism/spec.md` — cross-link to `products`
- [ ] Register all new capabilities in `openspec/project.md`

## Docs

- [ ] Update `VISION-MISSION.md` — lab-led model, product line, transparency rules
- [ ] Update `CLAUDE.md` — vocab, non-negotiables, repo orientation, automation surface section
- [ ] Update `ROADMAP.md` — insert Phase 3.5 (Product Track) + Phase 4.5 (Automation Spine)
- [ ] Update `FOUNDER_DECISIONS.md` — lock answered questions; add product/automation question blocks
- [ ] Update `README.md` — reflect new studio identity (lab-led, build-in-public, product line)
- [ ] Append entry to `CHANGELOG.md` under `## Unreleased` with **Why**
- [ ] Update `TASKS.md` — close strategic-direction tasks, open follow-on tasks for first product + automation tooling

## Validate

- [ ] `npx openspec validate expand-studio-model --strict`
- [ ] Move `openspec/changes/expand-studio-model/` → `openspec/archive/expand-studio-model/` after apply

## Follow-ups (separate proposals, do NOT include here)

- [ ] `pick-first-product` — founder names the first in-house product, scope, name, deploy target
- [ ] `wire-content-pipeline` — pick generator (n8n, custom node script, GitHub Action) + auth surface
- [ ] `wire-client-lifecycle` — implement intake-to-invoice slash-command chain
- [ ] `wire-brand-ci` — implement eye-motif + token-coverage CI check
