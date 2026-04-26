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

## Locked decisions (archive)

_(Move items here with date when `[x]` and built against.)_

---

## Reminder prompts

Next time you open this file, answer at least one `[ ]`.
Start with whatever feels clearest — doesn't have to be in order.
