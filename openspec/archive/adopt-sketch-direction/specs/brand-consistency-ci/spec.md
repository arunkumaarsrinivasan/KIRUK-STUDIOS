# Delta: brand-consistency-ci

## MODIFIED Requirements

### Requirement: Eye-motif coverage check (gate)

Every committed React component file under `apps/*/src/**/*.tsx`, `packages/design-system/components/**/*.tsx`, or `kiruk-projects/_products/**/*.tsx` that renders visual output MUST satisfy the eye-motif rule by ONE of: (a) importing at least one component from `@kiruk/design-system` whose name starts with `Eye`; (b) including a top-of-file comment `// eye-motif: none — justified: <reason>` referencing a sibling `spec.md` paragraph; or (c) **drawing** the eye directly (shader / canvas / inline SVG) and declaring it with a top-of-file comment `// eye-motif: drawn — <ref>`.

While the primary eye-mark is an unfinalized placeholder (FOUNDER_DECISIONS B1), the check enforces eye-motif **presence** as a gate but treats the _specific mark identity_ (which `Eye*` component) as **advisory** — so drawn/placeholder eyes pass until the final mark + custom wordmark (B1/B2) land.

#### Scenario: Component with a drawn eye passes

- GIVEN `apps/kiruk-web/src/components/InkHero.tsx` that renders an eye via a shader/SVG and carries `// eye-motif: drawn — sketch hero reveals the eye`
- WHEN the brand-CI runs
- THEN the gate passes on eye-motif presence

#### Scenario: Component with no eye and no justification fails

- GIVEN a new visual component with no `Eye*` import, no drawn-eye declaration, and no justification comment
- WHEN the brand-CI runs
- THEN the gate fails, citing the file path and the missing eye-motif

#### Scenario: Placeholder mark identity is advisory

- GIVEN B1 is still a placeholder
- WHEN a component satisfies eye-motif presence via a drawn or placeholder eye rather than the final mark
- THEN the identity check emits an advisory note (not a failure) to swap in the finalized mark once B1 is resolved
