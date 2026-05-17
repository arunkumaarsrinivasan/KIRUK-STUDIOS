# Delta: tech-stack (ADDED capability)

## ADDED Requirements

### Requirement: Runtime is Node LTS, pinned
The repo MUST run on Node 22 LTS as the canonical runtime, pinned in `.nvmrc`, `.node-version`, and `engines.node` in `package.json`. Node 20 LTS is the minimum floor; older versions MUST be rejected by `pnpm install`.

#### Scenario: Old node rejected
- GIVEN a contributor on Node 18
- WHEN they run `pnpm install`
- THEN install fails with the engines mismatch message naming the required range

### Requirement: Package manager is pnpm 10
The repo MUST use pnpm 10 via `packageManager` field; npm and yarn MUST NOT be used. Lockfile is `pnpm-lock.yaml` only.

#### Scenario: Wrong manager rejected
- GIVEN a contributor runs `npm install`
- WHEN Corepack or `packageManager` field is honored
- THEN the run errors with the required-manager hint
- AND no `package-lock.json` is created

### Requirement: Monorepo orchestrator is Turborepo 2
The repo MUST use Turborepo 2 for task orchestration. Remote caching SHOULD be enabled in CI.

#### Scenario: Turbo pipeline drives builds
- GIVEN a `pnpm build` invocation from root
- WHEN run
- THEN `turbo run build` orchestrates per-workspace builds
- AND outputs are cached locally

### Requirement: TypeScript strict mode everywhere
Every workspace MUST use TypeScript 5.7+ with `strict: true`, `noUncheckedIndexedAccess: true`, `noImplicitOverride: true`, `verbatimModuleSyntax: true`, extending a root `tsconfig.base.json`.

#### Scenario: Workspace without strict rejected
- GIVEN a workspace `tsconfig.json` missing the base extends or overriding strict flags
- WHEN brand-CI runs the type-config check
- THEN the build fails

### Requirement: Lint + format split — Biome for code, Prettier for markdown
JS/TS/JSON files MUST be linted and formatted by Biome 2. Markdown files MUST be formatted by Prettier 3. ESLint and Stylelint MUST NOT be added.

#### Scenario: Single tool per surface
- GIVEN a `.ts` change
- WHEN `pnpm format` runs
- THEN Biome handles it
- AND a `.md` change is handled by Prettier

### Requirement: Pre-commit hygiene enforced
Husky 9 + lint-staged 16 + commitlint 19 MUST gate every commit with Conventional Commits.

#### Scenario: Bad commit rejected
- GIVEN a contributor commits with message `update stuff`
- WHEN the commit-msg hook runs
- THEN commitlint rejects with the Conventional Commits hint

### Requirement: kiruk-web uses Astro 5
The public studio website at `apps/kiruk-web/` MUST be built on Astro 5 with island architecture, MDX content collections, and zero-JS-by-default for static routes. Heavy interactive surfaces MUST be islands hydrated only when in viewport.

#### Scenario: Static route ships zero JS
- GIVEN the `/manifesto` route
- WHEN built
- THEN the page contains no `<script>` tags except inline JSON-LD and analytics
- AND the JS budget for that route is 0 KB excluding analytics

### Requirement: kiruk-portal uses Next.js 15 + React 19
The portal at `apps/kiruk-portal/` MUST run Next.js 15 (App Router, Turbopack) with React 19 (Server Components, Server Actions, Partial Prerendering).

#### Scenario: Portal uses RSC by default
- GIVEN a new portal route
- WHEN authored without explicit `'use client'`
- THEN it renders as an RSC

### Requirement: Styling = Tailwind v4 + design-token CSS variables
All apps and products MUST use Tailwind v4 (Oxide engine), consuming `@kiruk/design-system` CSS variables. Raw hex literals MUST NOT appear in app code.

#### Scenario: Tailwind config imports tokens
- GIVEN an app `tailwind.config.ts`
- WHEN inspected
- THEN it references the design-tokens CSS file or the Style-Dictionary-emitted Tailwind preset

### Requirement: Animation = Motion v11 + GSAP 3
React-component motion MUST use Motion v11. Complex timeline-based or signature interactions MUST use GSAP 3.

#### Scenario: Component-driven motion uses Motion
- GIVEN a hover/tap animation on a React component
- WHEN authored
- THEN it uses `motion/react`
- AND GSAP is reserved for scroll-triggered or multi-element choreography

### Requirement: 3D / WebGL = Three.js r170+ + R3F 9 + TSL
WebGL MUST use Three.js r170+ via React Three Fiber 9 + drei + postprocessing. Custom shaders MUST be authored in TSL.

#### Scenario: New shader written in TSL
- GIVEN a new shader requirement
- WHEN authored
- THEN it uses TSL nodes, not raw GLSL strings
- UNLESS a TSL equivalent is unavailable and the GLSL fallback is documented

### Requirement: Content authoring = MDX 3 + Velite
Devlogs, case studies, story drops, manifestos MUST be authored in MDX 3 and processed by Velite. Contentlayer is forbidden.

#### Scenario: Content schema validated at build
- GIVEN a new devlog MDX file
- WHEN `velite build` runs
- THEN front-matter is validated against schema
- AND malformed fields fail the build

### Requirement: Images = AVIF + WebP + Sharp
Raster images MUST be served AVIF first with WebP fallback. Builds MUST use Sharp.

#### Scenario: Image optimized at build
- GIVEN `sketch-01.png` in a scribble folder
- WHEN the kiruk-web build runs
- THEN AVIF + WebP variants are emitted
- AND HTML serves AVIF first

### Requirement: Database = Postgres on Neon, ORM = Drizzle
Persistent data MUST live on Neon Postgres. ORM MUST be Drizzle. Prisma is forbidden for new code.

#### Scenario: New persistent feature uses Drizzle
- GIVEN a new feature requiring data persistence
- WHEN the data layer is authored
- THEN the schema lives in `*/db/schema.ts` using Drizzle syntax

### Requirement: Auth = Better-Auth
When auth is required, kiruk products and portal MUST use Better-Auth. NextAuth/Auth.js is forbidden for new code.

#### Scenario: Portal auth uses Better-Auth
- GIVEN the portal needs login
- WHEN auth is wired
- THEN it imports from `better-auth`

### Requirement: Backend = Server Actions + Hono on Workers
Server-side logic MUST default to Server Actions. Standalone edge APIs MUST use Hono on Cloudflare Workers. Spring Boot MUST NOT be added unless a Java-only workload is required.

#### Scenario: New mutation uses Server Action
- GIVEN a portal form submission
- WHEN implemented
- THEN it is a Server Action, not a custom API route

### Requirement: Validation = Zod 4
All input/output boundaries MUST be validated with Zod 4 schemas; `z.infer` is the canonical type source.

#### Scenario: Server Action validates input
- GIVEN a Server Action accepting user input
- WHEN invoked
- THEN it parses input through a Zod schema before any logic

### Requirement: State = Zustand 5 client + RSC server
Cross-component client state MUST use Zustand 5. Redux, Jotai, Recoil MUST NOT be added.

#### Scenario: Component state choice
- GIVEN cross-component shared state is needed
- WHEN implemented
- THEN it uses a Zustand store

### Requirement: Tests = Vitest 2 + Playwright 1.49+
Unit + component tests MUST use Vitest 2. E2E MUST use Playwright. Jest and Cypress MUST NOT be added.

#### Scenario: New unit test
- GIVEN a new utility function
- WHEN tested
- THEN the test file imports from `vitest`

### Requirement: Performance budgets per route
Every app route MUST declare a JS budget via size-limit. Default ceilings: kiruk-web static ≤ 50 KB JS, kiruk-web island pages ≤ 150 KB total JS, kiruk-portal ≤ 250 KB, products declare per-product. Lighthouse CI MUST run on every PR and fail regressions > 5 points.

#### Scenario: Budget regression blocks merge
- GIVEN a PR adding 80 KB of JS to a static kiruk-web route
- WHEN size-limit + Lighthouse CI run
- THEN the PR is blocked with the overage cited

### Requirement: Observability = Sentry + Speed Insights
Production deploys MUST wire Sentry for errors and Speed Insights (or open-source RUM) for Core Web Vitals. PII MUST be scrubbed per `repo-privacy`.

#### Scenario: Production error surfaces
- GIVEN an uncaught error in production
- WHEN it fires
- THEN Sentry captures it with stack + breadcrumbs minus PII

### Requirement: Deploy targets enumerated
`kiruk-web` and `kiruk-portal` MUST deploy to Vercel. Edge APIs MAY use Cloudflare Workers. Products pick from: Vercel, Cloudflare Pages, Cloudflare Workers, Chrome Web Store, Firefox Add-ons, R2 + static host, or a documented justified exception.

#### Scenario: Product picks deploy target per tier
- GIVEN a new product registry entry
- WHEN deploy target is picked
- THEN it falls within the enumerated list or is documented as an exception

### Requirement: Successor watch list maintained
The tech-stack spec MUST maintain a successor watch list. An annual re-evaluation pass MUST run at year-end. Moving an item from watch to locked requires an OpenSpec proposal.

#### Scenario: Annual re-evaluation
- GIVEN year-end
- WHEN the founder runs the stack-review ritual
- THEN each locked choice is checked against the watch list
- AND any switch is proposed via OpenSpec
