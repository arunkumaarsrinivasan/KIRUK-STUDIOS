# Changelog — Kiruk

All notable changes, decisions, and plan shifts. Every entry answers **why** — not just what.

Format loosely follows [Keep a Changelog](https://keepachangelog.com/) with an added **Why** line per entry.

---

## [Unreleased]

### Changed

- **Repository ownership moved to the Kiruk Studio organization.** Clone, issue, and citation URLs now point at [`kiruk-studio/KIRUK-STUDIOS`](https://github.com/kiruk-studio/KIRUK-STUDIOS). Hybrid monorepo strategy locked as ST5 in `FOUNDER_DECISIONS.md` — incubating products stay here; mature products may graduate to independent `kiruk-studio` repos when autonomy criteria apply. **Why:** the studio operates under the org, not a personal account, without prematurely splintering the core OS.

### Added
- **`tech-stack` capability + `lock-tech-stack` proposal** — full 2026 best-in-class envelope locked across runtime, package manager, monorepo orchestrator, lint, frameworks per app surface, styling, animation, 3D, content, database, auth, backend, validation, state, testing, performance budgets, observability, deploy targets. Spec at [openspec/specs/tech-stack/spec.md](openspec/specs/tech-stack/spec.md); proposal at [openspec/changes/lock-tech-stack/](openspec/changes/lock-tech-stack/). Validates strict.
  - **Headline picks (researched, Jan 2026):** Node 22 LTS · pnpm 10 · Turborepo 2 · TypeScript 5.7 strict · **Biome 2** for code (25× faster than ESLint+Prettier) + Prettier 3 for MD · Husky 9 + lint-staged 16 + commitlint 19 (Conventional Commits) · **Astro 5** for `kiruk-web` (content-first, islands, zero-JS-by-default — beats Next.js on LCP/TBT for this profile) · **Next.js 15 + React 19 + RSC + Server Actions + PPR** for `kiruk-portal` · **Tailwind v4** (Oxide engine) · **Motion v11 + GSAP 3** · **Three.js r170+ + R3F 9 + drei + TSL** shaders (WebGPU-ready) · **MDX 3 + Velite** (Contentlayer is unmaintained) · AVIF + WebP + Sharp · **Postgres on Neon + Drizzle ORM** (Prisma forbidden new code) · **Better-Auth** (NextAuth forbidden new code) · **Server Actions + Hono on Cloudflare Workers** for backend (Spring Boot forbidden unless JVM-only workload demanded) · **Zod 4** for validation · **Zustand 5** for client state · **Vitest 2 + Playwright 1.49+** for tests · **size-limit + Lighthouse CI** with per-route JS + Core Web Vitals budgets · **Sentry + Speed Insights** for observability · **Vercel + Cloudflare hybrid** deploy.
  - **Successor watch list** maintained inside the spec for annual year-end re-evaluation (Node 24, Bun, WebGPU, React Compiler).
  - **Concrete config files added:** [tsconfig.base.json](tsconfig.base.json) (strict + `noUncheckedIndexedAccess`), [biome.json](biome.json), [commitlint.config.mjs](commitlint.config.mjs), [.husky/pre-commit](.husky/pre-commit) + [.husky/commit-msg](.husky/commit-msg), [.size-limit.cjs](.size-limit.cjs), [.github/workflows/lighthouse.yml](.github/workflows/lighthouse.yml) placeholder.
  - **Root package.json bumped:** `engines.node` → `>=22`, `packageManager` → `pnpm@10.0.0`, new scripts (`lint` / `lint:fix` / `format` / `format:fix` / `typecheck` / `test` / `size` / `prepare`), new devDeps (Biome, commitlint, Husky, lint-staged, Prettier, size-limit, TypeScript 5.7).
  - **App stubs updated:** `apps/kiruk-web/package.json` switched to Astro 5 + R3F 9 + Motion + GSAP + Velite + Sharp + Tailwind v4 + Zod 4 with rationale captured in `apps/kiruk-web/README.md` ("Why Astro and not Next.js"). `apps/kiruk-portal/package.json` pinned to React 19 + Tailwind v4 + Motion + Zod + Zustand + Drizzle + Better-Auth + Hono.
  - **`.nvmrc` + `.node-version`** bumped to `22`.
  - **Why:** kiruk launches as a public creative OS where craft is the signal. Every layer needs the best 2026 pick, with stated rationale and successor watch, so contributors and future kirukan inherit a stack that won't lag or break. Without locking, drift would be inevitable. The performance-budget table makes "world-class" measurable, not aspirational.

- **Foundation hardening for open-source launch** — config infrastructure, OSS compliance docs, dual license, CI gates, knowledge-layer files, README rewrite. Brings the repo to a state a stranger can land on, recognise as serious, and contribute to.
  - **Hygiene infra**: `.editorconfig`, `.nvmrc`, `.node-version`, `.gitattributes` (LF normalization for Windows-origin repo), `.prettierrc.json` + `.prettierignore`, `.markdownlint.jsonc`; expanded `.gitignore` for `.turbo/`, `.brand-ci/`, `scribble/.raw/`, dist/coverage caches.
  - **OSS compliance**: [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) (Contributor Covenant 2.1, kirukism-flavored), [`SECURITY.md`](SECURITY.md) (private disclosure, scope, timelines, safe harbor), [`GOVERNANCE.md`](GOVERNANCE.md) (founder-led with documented graduation path), [`CITATION.cff`](CITATION.cff), [`.github/FUNDING.yml`](.github/FUNDING.yml), [`.github/CODEOWNERS`](.github/CODEOWNERS), issue templates: [bug](.github/ISSUE_TEMPLATE/bug.yml) / [idea](.github/ISSUE_TEMPLATE/idea.yml) / [proposal](.github/ISSUE_TEMPLATE/proposal.yml) + [config](.github/ISSUE_TEMPLATE/config.yml).
  - **License split** — [`LICENSE`](LICENSE) becomes a router; code is MIT in [`LICENSE-CODE`](LICENSE-CODE), content (manifesto, devlogs, specs as prose, scribbles, templates) is CC-BY 4.0 in [`LICENSE-CONTENT`](LICENSE-CONTENT). Trademark note: kiruk/kirukism/eye-motif identity are not licensed for brand reuse.
  - **CI gates**: [`.github/workflows/openspec.yml`](.github/workflows/openspec.yml) runs `pnpm spec:validate` on every PR and push; [`.github/workflows/tokens.yml`](.github/workflows/tokens.yml) builds + verifies design tokens on tokens-touching changes; [`.github/workflows/doctor.yml`](.github/workflows/doctor.yml) weekly health probe.
  - **`pnpm doctor`** — [`scripts/doctor.mjs`](scripts/doctor.mjs) reports toolchain, openspec validation, capability registration drift, devlog cadence (14-day floor), scribble coverage, open proposals, idea-log promotion readiness.
  - **Knowledge layer**: [`GLOSSARY.md`](GLOSSARY.md) (single source for vocabulary), [`docs/README.md`](docs/README.md) (navigation index by role), [`openspec/specs/_template/spec.md`](openspec/specs/_template/spec.md) (spec authoring template).
  - **Pen-and-paper wired into scripts**: `scripts/capture-session.mjs` writes `scribble` field (null OK for exploration); `scripts/promote-idea.mjs` blocks promotion without a scribble reference (front-matter line or `--scribble=` flag); [`kiruk-templates/_scribble/`](kiruk-templates/_scribble/) holds manifest + textual templates.
  - **README rewrite** — badges, repo-at-a-glance diagram, role-based navigation, license clarity, slash-command index.
  - **package.json hardening** — `homepage`, `repository`, `bugs`, `keywords`, `license: SEE LICENSE IN LICENSE`, new scripts `doctor` / `format` / `format:fix`.
  - **Why:** kiruk launches as a public, transparent creative OS. A repo visitor's first ten clicks need to load: license clarity, governance, security path, code of conduct, navigation, validation proof. These are the "world-class OSS" table stakes. Without them, the brand says "indie experiment"; with them, it says "this team takes its own work seriously."

- **`expand-studio-model` proposal** — 6 new capability specs (`products`, `build-in-public`, `content-pipeline`, `client-lifecycle`, `pen-and-paper`, `brand-consistency-ci`) + 2 modified (`idea-capture` adds `scribble` field; `ism` cross-links to `products`). Proposal at [openspec/changes/expand-studio-model/proposal.md](openspec/changes/expand-studio-model/proposal.md); validates with `npx openspec validate expand-studio-model --strict`.
  - **Why:** founder locked four strategic decisions (2026-05-18): lab-led model (ISM + products front door, services follow), process+decisions transparent but numbers private, full digital product surface (tools/micro-apps/extensions/SaaS/toys), and all four automation streams active. The old OS only modeled services + ISM placeholder; this proposal closes the gap so the studio has spec language for products, transparency boundary, content pipeline, lifecycle, scribble-first ritual, and brand-CI gates.
- **Pen-and-paper-first ritual** as a non-negotiable across CLAUDE.md, VISION-MISSION.md, and the new `pen-and-paper` spec. Every universe / ISM / product begins with a sketch (image or `scribble/textual.md` with `reason:`). Idea promotion blocked without it.
  - **Why:** kiruk means scribble. The studio refuses to let digital tools sand off the raw fingerprint of where work came from. Making the rule a spec is the only way to keep it under solo-founder time pressure.
- **Open/Closed transparency boundary** enumerated in `build-in-public` spec. Devlogs, sketches, code, specs are open; revenue, contracts, client identities, customer data are closed. Story drops (quarterly, qualitative) are the only public revenue surface.
  - **Why:** "build in public" without a boundary leaks. Encoding the boundary in a spec means contributors and agents share the same line — and changes to it require an OpenSpec proposal, not a quiet edit.
- **Product registry** — `openspec/specs/products/registry.md` initialized empty. New in-house products land here only via an OpenSpec change proposal.
- **`kiruk-projects/_products/`** folder placeholder for in-house digital product universes.
- **`content/devlogs/`, `content/case-studies/`, `content/story-drops/`, `content/social/`, `content/scribbles/`** subfolders scaffolded with `.gitkeep`.
- **ROADMAP** — new Phase 3.5 (Product Track v0) + Phase 4.5 (Automation Spine).
- **FOUNDER_DECISIONS.md** — STRATEGY section with four locked decisions (2026-05-18); new PRODUCTS (PR1–PR3) + AUTOMATION (AU1–AU2) question blocks.

### Added
- **Monorepo scaffold** — `pnpm-workspace.yaml` (workspaces: `apps/*`, `packages/*`), `apps/kiruk-web/` stub (Next.js 15, kiruk.studio target), `apps/kiruk-portal/` stub (internal client management). Design system stays at root until `packages/design-system` migration (Phase 2 next).
  - **Why:** kiruk holds everything — website, client portal, ISM experiments, design system — in one repo, deployed independently. Monorepo is the foundation for that.
- **Kirukism vocabulary** — `kirukism` (the movement/cult/philosophy), `kirukargals` (external collaborators), `kirukan` (studio co-workers) now encoded in [CLAUDE.md](CLAUDE.md) §1 and §3, [VISION-MISSION.md](VISION-MISSION.md) (new Kirukism section + People table), [CONTRIBUTING.md](CONTRIBUTING.md) (kirukargal framing), [TASKS.md](TASKS.md), and [ROADMAP.md](ROADMAP.md).
  - **Why:** the studio isn't just a business — it's a movement. kirukism drives why people collaborate, not just what they build. Language encodes intent.
- **Full monorepo ROADMAP** — [ROADMAP.md](ROADMAP.md) rewritten: 7 phases (OS bootstrap, brand spine, monorepo, website, portal, ISM lab, kirukargal network, open OS) + deployment topology table + continuous tracks.
  - **Why:** old 4-phase roadmap didn't cover the website, client portal, social pipeline, or kirukargal collaboration model. The studio needs a real plan to see where it's going.

### Changed
- **Creative OS docs** — [CLAUDE.md](CLAUDE.md) new §2 *Creative journey*; spec workflow renumbered and clarified as for **durable** work; exploration in inbox stays out of the OpenSpec gate until promotion. [VISION-MISSION.md](VISION-MISSION.md) principle 9, [AGENTS](AGENTS.md) *Creative rhythm*, [README](README.md), [LEARNINGS.md](LEARNINGS.md), [openspec/project.md](openspec/project.md) vocabulary, [kiruk-studio](.cursor/rules/kiruk-studio.mdc) and [lessons-learned](.cursor/rules/lessons-learned.mdc) rules aligned: **imagination and iteration are first-class; rules are scaffolding, not the ceiling.**
  - **Why:** match the studio’s real process—multiple iterations, fail/succeed, ongoing—and avoid reading specs as a demand for day-one finality.
- **Section renumbering** in `CLAUDE.md` (Founder → §3 … Session → §8); cross-refs updated in [brand-system](openspec/specs/brand-system/spec.md), [template-portfolio](openspec/specs/template-portfolio/spec.md), generators, [kiruk-intake](.claude/commands/kiruk-intake.md), [kiruk-artifact](.claude/commands/kiruk-artifact.md), [TASKS](TASKS.md), [CHANGELOG](CHANGELOG.md) founder line.

### Added
- **`operational-learning` capability** — [LEARNINGS.md](LEARNINGS.md) (append-only mistake log with **Mistake / Root cause / Fix / Guard**), [openspec/specs/operational-learning/spec.md](openspec/specs/operational-learning/spec.md), and always-on Cursor rule [`.cursor/rules/lessons-learned.mdc`](.cursor/rules/lessons-learned.mdc). Strengthen prevention on repeat; never rewrite old entries to hide a repeat. Proposal: [openspec/archive/add-operational-learning/proposal.md](openspec/archive/add-operational-learning/proposal.md).
  - **Why:** make “learn from the mistake, don’t repeat it” a first-class studio practice for humans and AI.
- **`repo-privacy` capability** — OpenSpec spec for keeping API keys and private client data out of git, optional `kiruk-projects/.../.local-only/` pattern, and code-review expectations. Supporting files: [CONTRIBUTING.md](CONTRIBUTING.md), [`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md), [`.env.example`](.env.example), stricter [`.gitignore`](.gitignore), Cursor rules [`.cursor/rules/privacy-secrets.mdc`](.cursor/rules/privacy-secrets.mdc) and [`.cursor/rules/code-review.mdc`](.cursor/rules/code-review.mdc).
  - **Why:** ship an open, transparent process without leaking credentials or other people’s confidential material; give humans and agents the same clear rules and PR checklist.

### Changed
- **OpenSpec** — `add-repo-privacy-spec` moved from `openspec/changes/` to `openspec/archive/add-repo-privacy-spec/` after apply.
  - **Why:** match the documented propose → validate → apply → archive lifecycle.
- **Removed Pencil MCP** from entire studio OS. Design system is now code-only.
  - **Why**: founder explicit decision. All visual primitives live as React SVG in `packages/design-system/components/`.
- **packages/design-system/components/** added — 6 React SVG components: `EyePrimary`, `EyeIris`, `EyeGaze`, `EyePortal`, `EyeConstellation`, `Scribble`. Colors via CSS custom properties; no hardcoded hex.
- **Token pipeline live** — `npm run tokens:build` emits CSS/Tailwind/TS. Fixed DTCG `usesDtcg: true` + Windows glob.
- **Token files** — fixed circular `color.paper` alias, removed top-level `$description` collision, restructured motion/components with proper namespacing.
- **Updated specs**: `brand-system` + `design-tokens` now reference code components, not Pencil files.
  - **Why**: spec claims must match actual implementation.

### Added
- **Studio OS bootstrap** — scaffolded repo structure, root docs, openspec skeleton, planning docs (`VISION-MISSION.md`, `ROADMAP.md`, `TASKS.md`, this file).
  - **Why**: establish spec-first, idea-capturing foundation before any brand/ISM work begins. Vision doc §6 mandates Claude Code as in-house creative engineer with OpenSpec workflow.
- **Scope refinement** — ISM lab starts as `openspec/specs/ism/spec.md` only; no heroism/kirukism/colorism/nomadism subfolders yet. Founder will spawn them via `/kiruk-ism-new` when ready.
  - **Why**: avoid premature commitment to ISM branches before brand spine is locked.
- **Founder context** — CLAUDE.md §3 encodes Arun's voice, stack, motifs, recurring themes from `kiruk-in`.
  - **Why**: keeps voice-sensitive artifacts (manifestos, case studies) aligned without re-briefing per session.

### Changed
- _none_

### Removed
- _none_

### Decisions
- **Design system from scratch** — not importing from `GraviaAI` or `kiruk-in`.
  - **Why**: founder explicit preference; ensures brand spine is purposeful, not inherited.
- **Explicit planning layer** — `VISION-MISSION.md` + `ROADMAP.md` + `TASKS.md` + `CHANGELOG.md` as top-level readable state.
  - **Why**: founder wants visibility into "what's happening" and ability to change plans without archaeology.
- **Pen file deferred save** — Pencil MCP cannot create a new file at a target path from API; Save-As is UI-only. Components scaffolded in the session buffer; founder to Save-As to `packages/design-system/pen-files/kiruk-design.pen`.
  - **Why**: Pencil MCP limitation. Documented in `packages/design-system/pen-files/README.md`.

---

## How to write an entry

1. New change? Add under `## [Unreleased]` → one of `Added` / `Changed` / `Removed` / `Fixed` / `Decisions`.
2. Each bullet: what changed + **Why**: line explaining intent.
3. On release (brand v1, phase completion, etc.): rename `Unreleased` → `[vX.Y] — YYYY-MM-DD`, start a fresh `[Unreleased]` on top.
4. Plan shifts (roadmap edits, scope drops) MUST land here, not in the roadmap diff alone.
