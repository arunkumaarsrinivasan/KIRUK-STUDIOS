# Tasks — lock-tech-stack

## Spec

- [ ] Author `openspec/specs/tech-stack/spec.md`
- [ ] Author delta `openspec/changes/lock-tech-stack/specs/tech-stack/spec.md`
- [ ] Register `tech-stack` in `openspec/project.md`

## Root config

- [ ] Bump `package.json` engines to Node ≥22, packageManager pnpm@10, add scripts
- [ ] Add `tsconfig.base.json` with strict flags
- [ ] Add `biome.json`
- [ ] Add `commitlint.config.mjs`
- [ ] Add Husky 9 hooks: `.husky/pre-commit`, `.husky/commit-msg`
- [ ] Add `.size-limit.cjs`
- [ ] Add `.github/workflows/lighthouse.yml` placeholder
- [ ] Update `.nvmrc` and `.node-version` to `22`

## Apps

- [ ] Switch `apps/kiruk-web/package.json` to Astro 5 stub
- [ ] Update `apps/kiruk-web/README.md` to record framework choice + rationale
- [ ] `apps/kiruk-portal/package.json` — pin React 19, add Drizzle + Better-Auth dev hints

## Docs

- [ ] `CLAUDE.md` — replace stack line, point to `tech-stack` spec; add forbidden tools
- [ ] `GLOSSARY.md` — add stack vocab entries
- [ ] `ROADMAP.md` — Phase 3 scaffolds Astro 5
- [ ] `CHANGELOG.md` — entry with "Why"
- [ ] `TASKS.md` — mark stack lock done; add follow-on tasks (wire Lighthouse CI, install Husky, install Biome)

## Validate

- [ ] `pnpm spec:validate` strict
- [ ] `pnpm doctor`
- [ ] Move folder to `openspec/archive/lock-tech-stack/`

## Follow-ups (separate proposals)

- [ ] `wire-husky` — actually `pnpm install` Husky + commitlint + lint-staged once Node 22 is in use
- [ ] `wire-biome` — install Biome + run initial `biome format --write .`
- [ ] `wire-lighthouse-ci` — first real budgets per app route
- [ ] `pick-first-product` — picks deploy target per tech-stack deploy table
