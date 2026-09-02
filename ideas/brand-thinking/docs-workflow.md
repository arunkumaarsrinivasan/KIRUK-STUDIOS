# Documentation workflow — research and improvements

Filed 2026-09-02. Three lenses: creative technologist, design technologist, design engineer.  
Existing workflow reviewed end-to-end. **Not a lock.** Stack picks stay inside `openspec/specs/tech-stack/spec.md`.

Companion: [docs-map.md](./docs-map.md) (compass). Canvas: studio docs-workflow review (beside chat).

X MCP was **unauthenticated** this session; X practice is taken from published process/build-in-public writing plus [share-loop.md](./share-loop.md), not from live posts.

---

## Verdict

kiruk already has a **world-class spine for a one-person studio**: git as source of truth, OpenSpec as lock, idea-capture as promotion, scribble as provenance, agent skills/rules as the scribe. What is missing is the **quality bar around that spine** (prose/link CI, Diátaxis IA, live content pipeline, design↔code docs) and a **single compass** so dumps do not grow a fourth north star.

Do **not** buy Mintlify, Notion-as-OS, or Docusaurus. That would fight the locked Astro 5 + Velite + OpenSpec envelope and the “one founder” constraint.

---

## Existing workflow (cross-check)

### What actually runs

| Surface                                            | What it does                         | Gap                                                                           |
| -------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------- |
| `ideas/inbox.md` + `log.ndjson` + `/kiruk-capture` | Spark in, session out                | Cursor auto-capture is sparse unless this procedure runs                      |
| `ideas/brand-thinking/`                            | Thinking pass, routing table         | No front-matter; overlaps `VISION-MISSION` / `FOUNDER_DECISIONS` / `TASKS.md` |
| `openspec/` + `pnpm spec:validate` (CI)            | Lock + gate                          | Strong. Human still skips promotion                                           |
| `VISION-MISSION`, manifesto, CLAUDE, AGENTS        | Explanation + agent OS               | Mixed tutorial/how-to/reference/explanation in one file                       |
| `content/devlogs` + Velite + `kiruk-web`           | Public narrative                     | One entry. Front-matter thinner than `content-pipeline` spec                  |
| `content-pipeline` spec                            | Devlog → IG/LI/X                     | **Generator not built** (`scripts/generate-derivatives.mjs` TBD)              |
| `brand-consistency-ci` spec                        | Eye, tokens, scribble, redaction     | **Checks specified, runner not the full gate**                                |
| Tokens CI                                          | Style Dictionary build               | Good. Hand-edit of `build/` still forbidden                                   |
| Figma MCP (session)                                | Design ↔ code possible               | No `component.md` export loop, no Storybook                                   |
| Templates + portal lifecycle                       | Client how-to                        | Face 1 paused (50 questions)                                                  |
| LEARNINGS.md                                       | Operational memory                   | Strong, under-linked from dumps                                               |
| `.github/workflows`                                | openspec, tokens, doctor, lighthouse | No Vale, no lychee, no markdown link job                                      |

### Duplicate / drift risks

- Four “why we exist” drafts: manifesto, VISION-MISSION, brand-thinking overview, vision-and-system-plan.md (legacy).
- Two task boards (acceptable if scoped; dangerous if mixed).
- Method says write-back after delivery; nothing fails CI if skip it.
- Velite schema does not yet require `eye-motif` / `scribble` / `derive` from the content-pipeline spec.

---

## Benchmark (what “world-class” means in 2026)

Sources (ideas, not clones):

- [Diátaxis](https://diataxis.fr/) — four needs: tutorial, how-to, reference, explanation (used by Gatsby, Cloudflare, Canonical-adjacent practice).
- Docs-as-code 2026: Markdown in git, PR review, CI. Quality layer: **Vale** (prose), **lychee** (links). [Unmarkdown docs-as-code 2026](https://unmarkdown.com/blog/docs-as-code-2026); [lychee-action](https://github.com/lycheeverse/lychee-action/); [vale-action](https://github.com/vale-cli/vale-action/).
- Testable samples: LangChain “docs that test themselves” — code in docs is code.
- Design↔docs: token JSON as SoT; Figma MCP / component-md as **export**, not a second SoT ([uSpec component-md](https://docs.uspec.design/specs/component-md)).
- Public docs **in this envelope**: Astro **Starlight** _or_ more **Velite collections** on `kiruk-web` — not a second Next.js docs product. [Starlight vs Fumadocs 2026](https://www.pkgpulse.com/guides/fumadocs-vs-nextra-v4-vs-starlight-documentation-sites-2026).
- Share loop: process stages on X, judgment not hustle ([share-loop.md](./share-loop.md)).

---

## Three lenses

### Creative technologist

The workflow is a **medium**. It must keep kirukal (pen, dump, giggle) and still graduate. World-class here looks like:

- Inspectable process (canvas/notebook as state) — already the repo.
- Diverge (brand-thinking) / converge (OpenSpec) as an explicit switch, not a vibe.
- Public derivatives from one canonical MDX (content-pipeline) — specified, not live.
- Client Framework as a _trigger_, not a CMS.

**Improve:** enforce the compass ([docs-map.md](./docs-map.md)); ship the derivative generator when AU1 is answered; treat X as write-back of _stages_, never of fees.

### Design technologist

World-class is **one token graph**, Figma as a view, code as a view, docs as a view:

- DTCG JSON + Style Dictionary already.
- Next: when a component is real, export anatomy to markdown (Figma MCP / component-md), `spec-link` in front-matter, no screenshots as truth.
- Do not document hex in prose; document token names.

**Improve:** Velite (or a small script) that fails if a public MDX is missing `scribble` / eye justification; optional Figma→md skill when B1/B2 lock.

### Design engineer

World-class is **docs in the definition of done**:

- `pnpm spec:validate` already on PR.
- Add: lychee on `openspec/`, `ideas/brand-thinking/`, `content/` (exclude localhost, `.local-only`).
- Add: Vale with a **kiruk** vocab file (kiruk, kirukism, kirukargal, kirukan, kirukal) so agents and humans spell the same.
- Do not add ESLint. Biome stays for code. Vale is for prose.
- Public OS docs: prefer a Velite `docs` collection on `kiruk-web` (`/os` or `/docs`) over a new app — solo-founder budget.

**Improve:** one `docs` CI job (lychee first — zero config value; Vale after a tiny style file). Align Velite schema with content-pipeline front-matter. Do not implement brand-CI twice.

---

## Proposed target workflow (benchmark for kiruk)

```
scribble / spoken dump
  → kirukal (inbox or brand-thinking, routed by method.md)
  → capture (log.ndjson)
  → [optional] promote + OpenSpec
  → locked spec + CHANGELOG why
  → artifact (code, template, universe file)
  → public canonical MDX (if open)
  → derivatives (IG / LI / X) after human review
  → write-back (LEARNINGS or brand-thinking) if something broke
```

**Tools (locked envelope):** Node 22 · pnpm · Git · OpenSpec · MDX 3 · Velite · Astro 5 (`kiruk-web`) · Biome (code) · Vale (prose, new) · lychee (links, new) · Figma MCP (export, not SoT) · Style Dictionary · existing slash skills.

**Explicitly out:** Notion as source of truth, Mintlify, Docusaurus, Storybook-until-components-need-it, auto-post to X.

---

## Improvements (block by block)

### P0 — compass (this pass)

- [x] [docs-map.md](./docs-map.md) — layers + promotion + two task boards
- [ ] Point `README.md` and `method.md` at the map — so routing has one entry
- [ ] Agents read docs-map before filing a dump (skill already points at method; add map)

### P1 — quality without a new product

- [ ] `lychee` workflow on markdown (advisory first week, then gate)
- [ ] Velite schema: add `scribble`, `eye-motif` (or justified none) to match content-pipeline
- [ ] Vale + `.vale.ini` + kiruk terminology (advisory)
- [ ] Skill: after delivery, fail the reflection if write-back did not happen

### P2 — public Creative OS (after Brand 08 or first ISM)

- [ ] Velite collection or Starlight route for **how-to + reference** (slash commands, OpenSpec primer) — explanation stays manifesto
- [ ] `scripts/generate-derivatives.mjs` per content-pipeline spec
- [ ] Figma component-md only when a component is the product

### Do not do

- Rebuild the KB into a wiki
- Clone Boring Studio CBOS as the docs tool
- Spawn docs for Giggle/OSS until scribble exists
- Put fees or runway in this layer
