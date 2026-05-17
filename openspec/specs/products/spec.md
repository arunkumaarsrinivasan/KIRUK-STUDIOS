# Spec: products

## Purpose

The `products` capability defines kiruk's in-house digital product line — creative tools, micro-apps, browser extensions, AI-augmented SaaS, web toys — as first-class studio outputs alongside client universes and ISM experiments. Products are the long-game IP layer: lab-led discovery feeds them, services fund them, and successful ones graduate to standalone deploys with their own domains, brand sub-identity, and lifecycle.

Products are not the same as ISM experiments. An ISM is a time-boxed exploration; a product is a sustained thing with users, support, and updates. ISMs may graduate into products; products may never demote back to ISMs.

## Domain vocabulary

| Term | Meaning |
|---|---|
| **Product** | A kiruk-owned digital artifact intended for repeated use by people outside kiruk. |
| **Product universe** | A product's own world: name, sub-brand, deploy target, audience, success metric. Lives at `kiruk-projects/_products/<product-slug>/`. |
| **Graduation** | The promotion of an ISM experiment into a product. Requires founder approval + spec entry. |
| **Tier** | Product classification: `tool` (creative tool for makers), `micro-app` (consumer utility), `extension` (browser extension), `saas` (subscription product), `toy` (delight-first interactive). |

## Requirements

### Requirement: Product registry exists
A registry of active and archived products MUST live at `openspec/specs/products/registry.md`. Each entry MUST record: `slug`, `name`, `tier`, `status` (`incubating` | `live` | `paused` | `archived`), `deploy-target`, `audience`, `success-metric`, `origin` (`greenfield` | `ism-graduation:<ism-slug>`).

#### Scenario: New product added to registry
- GIVEN the founder approves a new product
- WHEN its entry is added to `registry.md`
- THEN the entry includes all required fields
- AND the entry's `slug` is unique within the registry

### Requirement: Product folder structure
Each product MUST have a folder at `kiruk-projects/_products/<slug>/` containing at minimum: `README.md` (1-paragraph what + why), `spec.md` (product capability spec linked from `openspec/specs/products/`), `devlog/` (entries per product chapter), `scribble/` (sketches that seeded the product).

#### Scenario: Product scaffolded on registry entry
- GIVEN a new entry in `registry.md`
- WHEN the founder runs the (future) `/kiruk-product-new <slug>` command
- THEN `kiruk-projects/_products/<slug>/` is created with the required files
- AND `scribble/` contains at least one image or text-placeholder satisfying `pen-and-paper` spec

### Requirement: Eye-motif inheritance
Every product MUST either visibly carry the eye motif in its UI or explicitly justify absence in `kiruk-projects/_products/<slug>/spec.md` under a `### Eye-motif justification` heading.

#### Scenario: Product without eye motif fails review
- GIVEN a product whose `spec.md` lacks both eye-motif presence and justification
- WHEN `brand-consistency-ci` runs
- THEN the build fails with a clear pointer to this requirement

### Requirement: Product graduation path from ISM
An ISM experiment MUST be graduatable to a product via founder approval recorded in a `graduate-<ism-slug>-to-product` OpenSpec change proposal. The proposal MUST cite: the ISM's learnings, the product tier, target audience, and the rationale for sustained investment.

#### Scenario: ISM graduates to product
- GIVEN ISM `<slug>` has shipped at least one public iteration
- WHEN the founder authors `openspec/changes/graduate-<slug>-to-product/proposal.md`
- AND `npx openspec validate` passes
- THEN on apply, a new product registry entry is added with `origin: ism-graduation:<slug>`
- AND the ISM record cross-links to the product

### Requirement: Product tier discipline
A product's tier (`tool` | `micro-app` | `extension` | `saas` | `toy`) MUST be recorded at creation and SHOULD NOT silently change. Tier changes require an OpenSpec proposal because they shift expected commitments (e.g. `saas` implies billing, support SLA, auth; `toy` implies low maintenance).

#### Scenario: Tier change without proposal is rejected
- GIVEN a product currently registered as `tier: toy`
- WHEN the founder edits `registry.md` to `tier: saas` without an accompanying change proposal
- THEN `brand-consistency-ci` flags the silent tier shift

### Requirement: Product privacy boundary
Products MUST follow `repo-privacy` rules. Customer data, billing data, and any per-user secrets MUST NOT be committed to this monorepo even under `_products/`. Each product MUST document its data-storage location in its `spec.md` under `### Data boundary`.

#### Scenario: Product data lives outside repo
- GIVEN a `saas`-tier product accepting user signups
- WHEN its spec is reviewed
- THEN the spec names an external store (e.g. Supabase project, Cloudflare D1) for user data
- AND no user records exist in the repo

## Acceptance Artifacts

- `openspec/specs/products/registry.md` (initially empty list under `## Active` + `## Archived`)
- `kiruk-projects/_products/` folder (initially empty, `.gitkeep` present)
- Cross-link from `openspec/specs/ism/spec.md` referencing graduation path
- Future: `.claude/commands/kiruk-product-new.md` slash command (separate proposal)
