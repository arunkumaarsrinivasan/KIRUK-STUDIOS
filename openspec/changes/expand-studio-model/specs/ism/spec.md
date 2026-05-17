# Delta: ism (ADDED requirements)

## ADDED Requirements

### Requirement: Graduation path to product
An ISM that has shipped at least one public iteration MAY graduate into a kiruk product per `openspec/specs/products/spec.md`. Graduation MUST go through an OpenSpec change proposal at `openspec/changes/graduate-<ism-slug>-to-product/`.

#### Scenario: ISM graduates to product
- GIVEN ISM `<slug>` has at least one shipped iteration and a devlog entry
- WHEN the founder authors a graduation proposal and validation passes
- THEN on apply, a registry entry is added to `openspec/specs/products/registry.md` with `origin: ism-graduation:<slug>`
- AND this ISM spec is updated with a cross-link to the product

### Requirement: Pen-and-paper precondition
A spawned ISM MUST have at least one scribble (image or `textual.md`) in `kiruk-ism/<name>/scribble/` per `openspec/specs/pen-and-paper/spec.md` before any prototype code is written.

#### Scenario: ISM code without scribble blocked
- GIVEN a spawned ISM folder with no scribble
- WHEN any source file is added under `kiruk-ism/<name>/src/`
- THEN `brand-consistency-ci` flags the violation
