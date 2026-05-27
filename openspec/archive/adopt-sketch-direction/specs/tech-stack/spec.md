# Delta: tech-stack

## ADDED Requirements

### Requirement: kiruk-web interim base path

Until a dedicated domain is purchased, `kiruk-web` MUST ship under the existing `kiruk.in` domain at the `/studio` base path. Astro MUST be configured with `site: 'https://kiruk.in'` and `base: '/studio'`, and all internal links, asset URLs, and route definitions MUST respect the base path. Moving to a root domain later MUST be a single config change plus a link audit.

#### Scenario: Internal link respects base path

- GIVEN the home page links to the manifesto route
- WHEN the site is built with `base: '/studio'`
- THEN the emitted href resolves under `/studio` (e.g. `/studio/kirukism`), not the domain root

#### Scenario: Base path is config-localized

- GIVEN a future move to a dedicated root domain
- WHEN `site`/`base` are updated in `astro.config.mjs`
- THEN no hardcoded `/studio` prefixes remain scattered in component source
