# Founder Decisions — Kiruk

> Everything here is BLOCKED until you give direction.
> Fill in the `→ Your answer:` fields as ideas crystallize.
> Status: `[ ]` needs input · `[~]` rough thoughts written · `[x]` locked, build can proceed.
>
> **Rule:** No Phase starts without all its `[x]` boxes. Rough is fine. "I'll know it when I see it" is not enough — write at least a direction.

---

## How to use this

1. Read a section. Write your raw thought in `→ Your answer:` — messy is fine.
2. Change `[ ]` → `[~]` when you have rough thoughts.
3. Change `[~]` → `[x]` when you're confident enough to build against it.
4. Locked decisions move to the relevant spec when they're strong enough.

---

## STRATEGY — locked 2026-05-18 (governs all downstream phases)

### ST1 — Studio model
`[x]` **Lab-led, services follow.** ISM + in-house products are the front door. Client services chase the work, not the other way around. Encoded in VISION-MISSION + `openspec/specs/products/spec.md`.

### ST2 — Transparency
`[x]` **Process + decisions public; numbers + client internals private.** Devlogs, sketches, dead ends, code, specs all open. Revenue, MRR, contracts, customer data closed. Story drops (quarterly, qualitative) are the only public revenue surface. Encoded in `openspec/specs/build-in-public/spec.md`.

### ST3 — In-house product types (allowed surface)
`[x]` Creative tools for makers · consumer micro-apps / toys · AI-augmented creative SaaS · browser extensions · any digital surface. Each product picks one tier at creation: `tool` | `micro-app` | `extension` | `saas` | `toy`. Encoded in `openspec/specs/products/spec.md`.

### ST4 — Automation focus (all four streams active)
`[x]` Content pipeline (devlog → social), client lifecycle (intake → invoice), idea capture + promotion, brand consistency CI. All four governed by their own specs. Implementation choice pending (see AU1, AU2 below).

---

## BRAND — blocks Phase 3 + all visual work

### B1 — Primary eye mark: final design?
`[ ]`
EyePrimary SVG exists as a geometric placeholder (circle + iris + pupil). Is that the actual kiruk logo, or is the real logo still undesigned?

- If placeholder → what does the real one feel like? (rough sketch, reference, or description)
- If real → confirm it's locked.

→ **Your answer:**

---

### B2 — Wordmark: does "kiruk" have a custom text treatment?
`[ ]`
Options: (a) just the Inter/Playfair type from tokens, (b) custom letterform, (c) all-lowercase vs mixed, (d) symbol only (no text wordmark).

→ **Your answer:**

---

### B3 — Palette: do the current token colors feel right?

`[ ]`
Current:
| Token | Hex | Role |
|---|---|---|
| `void` | `#0a0a0b` | background |
| `scribble-ink` | `#f2f0eb` | foreground |
| `iris-core` | `#ff4d2e` | primary accent |
| `portal-glow` | `#7b2fff` | secondary accent |
| `halo-warm` | `#ffb84d` | tertiary warm |
| `paper` | `#1a1a1f` | surface |
| `kohl` | `#2a2a35` | elevated surface |
| `gaze-dim` | `#6b6b80` | muted text |

Do these feel like kiruk? What's missing or off?

→ **Your answer:**

---

### B4 — Typography: Inter + Playfair locked?
`[ ]`
Current pairing:
- Rational (UI/body): **Inter**
- Expressive (headings/manifesto): **Playfair Display**
- Mono: JetBrains Mono

Does this feel right? Or are you circling other options (e.g. different expressive face, variable font, something weirder)?

→ **Your answer:**

---

### B5 — Brand application: dark only, light, or adaptive?
`[ ]`
Web + all brand artifacts — do they default dark? Support light mode? Or is kiruk always dark?

→ **Your answer:**

---

## WEBSITE (kiruk-web) — blocks Phase 3

### W1 — Homepage feeling
`[ ]`
Not layout yet — the *feeling*. What happens when someone lands on kiruk.studio?

Some poles to push against:
- Cinematic opener (3D scene, eye motif, slow reveal)
- Brutalist bold (huge type, raw, immediate)
- Interactive cursor (everything reacts)
- Quiet and confident (white space, type-first)
- All of the above in sequence

Give a mood, a reference, a sentence, a scribble description — anything.

→ **Your answer:**

---

### W2 — Navigation: final routes?
`[ ]`
Current plan: `/` · `/kirukism` · `/ism` · `/services` · `/about` · `/devlog`

Add, remove, rename — what should someone be able to navigate to?

→ **Your answer:**

---

### W3 — Homepage hero: what's in it?
`[ ]`
After you answer W1, describe what's actually on screen above the fold:
- Eye motif component? Which one? Animated?
- Headline copy — what does it say?
- Sub-copy or is it visual-only?
- CTA? What does it say and where does it go?

→ **Your answer:**

---

### W4 — Devlog format
`[ ]`
- Text only (MDX markdown)
- Short video + transcript
- Both
- Something else entirely

And cadence: every 2 weeks was the plan. Still right?

→ **Your answer:**

---

### W5 — "Work with kiruk" CTA flow
`[ ]`
Someone wants to hire kiruk. What happens?
- Contact form (goes where?)
- Email link
- Calendly / booking
- "We'll reach out" (form → Arun's inbox)
- Something weirder

→ **Your answer:**

---

### W6 — About page: who's on it?
`[ ]`
Options:
- Just Arun
- Arun + kirukan (when they join)
- Arun + kirukargals credited by project
- Studio story + people

→ **Your answer:**

---

### W7 — Domain / deploy timing
`[ ]`
Do you own kiruk.studio already? Or still need to register?
When does the site need to be live? (No pressure — just helps prioritize.)

→ **Your answer:**

---

## ISM LAB — blocks Phase 5

### I1 — Which ISM experiment first?
`[ ]`
Registry: **heroism · kirukism-series · colorism · nomadism**

Which one is calling you? Or is it none of these — a new name?

→ **Your answer:**

---

### I2 — ISM #1 concept
`[ ]`
Once you pick the name — what's the actual concept/world?
- What's the medium? (web experience, physical object, video, interactive, mixed)
- What's the idea in one sentence?
- What makes it kirukal (weird/not-before-seen)?

→ **Your answer:**

---

### I3 — ISM publishing format
`[ ]`
When ISM #1 ships, what does "shipped" look like?
- Standalone URL?
- Page on kiruk.studio/ism/name?
- GitHub repo + live demo?
- Something else?

→ **Your answer:**

---

## SOCIAL — blocks Phase 5

### S1 — Which platforms are active?
`[ ]`
Where is @kirukism active or wants to be?
- Instagram (process reels, carousels)
- LinkedIn (long-form, studio updates)
- Twitter/X
- YouTube / Shorts
- Threads
- Other

→ **Your answer:**

---

### S2 — Content format per platform
`[ ]`
Devlog exists as text in the repo. How does it translate to social?
- Instagram: carousel slides? Reels? Both?
- LinkedIn: long post?
- How much effort per post? Full production or raw/in-process?

→ **Your answer:**

---

## CLIENT PORTAL — blocks Phase 4

### P1 — Who uses the portal?
`[ ]`
- Arun only
- Arun + kirukan (team access)
- Clients get a read-only view of their universe?
- Other

→ **Your answer:**

---

### P2 — Auth approach
`[ ]`
- No auth (local dev only, never deployed publicly)
- Magic link (simple, email-based)
- Clerk (fast, full-featured)
- NextAuth with GitHub
- Other

→ **Your answer:**

---

### P3 — "Universe done" — what does it look like?
`[ ]`
In the portal, when a client universe is complete, what does the record show?
- Which docs were generated (proposal, invoice, etc.)
- Spec link
- Shipped URL / artifact
- Archive state

How does this differ from an active vs archived universe?

→ **Your answer:**

---

## META — how kiruk talks about itself

### M1 — Kirukism tagline / one-liner
`[ ]`
If someone asks "what is kiruk?" in one sentence — what's the answer?
(Not the long vision. The punchy line that goes on the website, bio, cold intro.)

→ **Your answer:**

---

### M2 — Kirukargal definition (public-facing)
`[ ]`
How does kiruk publicly describe what a kirukargal is?
The current internal def: "external collaborators who believe in kirukism."
What's the public language — inviting, specific, weird enough to filter?

→ **Your answer:**

---

## PRODUCTS — blocks Phase 3.5

### PR1 — First product: name, tier, what it does
`[ ]`
The studio is lab-led; a first product launch is part of the front-door story. Pick ONE to start. Tier choices: `tool` (creative tool for makers) · `micro-app` (consumer utility) · `extension` (browser extension) · `saas` (subscription) · `toy` (delight-first interactive).

Rough thoughts welcome — slug, name, one-line concept, tier, target audience.

→ **Your answer:**

---

### PR2 — Deploy target for first product
`[ ]`
Once PR1 is named — where does it live?
- Standalone web: Vercel / Netlify / Cloudflare Pages
- Browser extension: Chrome Web Store / Firefox Add-ons
- Mobile: iOS / Android / web-app-with-install
- CLI / npm package
- Other

→ **Your answer:**

---

### PR3 — Success metric for first product
`[ ]`
One measurable thing that tells you the product is working. Examples: "100 weekly active users in 90 days", "10 paid subscribers in 6 months", "1000 downloads", "qualitative: 5 strangers reach out unprompted". One sentence is enough.

→ **Your answer:**

---

## AUTOMATION — blocks Phase 4.5

### AU1 — Content pipeline implementation
`[ ]`
Spec is locked (`openspec/specs/content-pipeline/spec.md`). Pick the runner:
- Custom Node script in `scripts/generate-derivatives.mjs` (most control, you maintain it)
- n8n self-hosted (visual workflow, more flexible, more setup)
- GitHub Actions workflow (free CI, less interactive)
- Other / hybrid

→ **Your answer:**

---

### AU2 — Brand-CI runner
`[ ]`
Spec is locked (`openspec/specs/brand-consistency-ci/spec.md`). Pick the runner:
- GitHub Actions (runs on every PR, blocks merge)
- Husky pre-commit hooks (runs locally before each commit)
- Custom node script run manually + by CI
- Both Husky (local) + Actions (PR gate)

→ **Your answer:**

---

## Locked decisions (archive)

| Date | Section | Decision |
|---|---|---|
| 2026-05-18 | ST1 | Lab-led, services follow |
| 2026-05-18 | ST2 | Process + decisions transparent; numbers + client internals private |
| 2026-05-18 | ST3 | Product surface: tools, micro-apps, extensions, SaaS, toys (5 tiers) |
| 2026-05-18 | ST4 | All four automation streams active |

---

## Reminder prompts

Next time you open this file, answer at least one `[ ]`.
Start with whatever feels clearest — doesn't have to be in order.

**Highest-leverage open questions right now:**
- **PR1** (first product) — unlocks the whole product track and gives the lab-led front door a real artifact.
- **B1–B5** (brand locks) — still blocks website build.
- **AU1 + AU2** (automation runners) — unlocks the spine that makes solopreneur scale possible.
