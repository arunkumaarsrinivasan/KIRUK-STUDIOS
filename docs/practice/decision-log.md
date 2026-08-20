<!--
status: living, append-only
purpose: Track 3 — analyze how Arun decides, and calibrate gut vs reason over time
pairs with: ../../FOUNDER_DECISIONS.md (durable locks), /kiruk-capture
-->

# Decision Log

Every meaningful design/build decision gets a row. The point is not the decision — it's **seeing your own patterns** (biases, strengths, avoidances) when you review these later against what actually happened. This is the calibration engine of kiruk-as-growth-OS.

## How to use

- Log when you make a non-trivial call (architecture, visual direction, tradeoff, "ship it / redraw it").
- Be honest about **gut vs reason** — which actually drove it.
- Write a **prediction** so future-you can check if you were right.
- Monthly, the AI reads this + `progress.md` + `critique-loop.md` and writes a reflection to `reflections/<date>.md`.

## Template (copy)

```
### <date> — <short title>
- Context: what situation forced a choice
- Options: A / B / C
- Choice: which + one line why
- Driver: gut | reason | mix (be honest)
- Prediction: what I expect to happen / regret
- Review (later): what actually happened
```

---

## Seed entries (this session)

### 2026-06-27 — Eyeball: polymorphic SVG+3D, not one tech

- Context: wanted "some SVG some 3D" without two separate components.
- Options: A) all SVG, B) all 3D, C) one container, pluggable iris.
- Choice: C — outer frame constant, iris backend swappable.
- Driver: mix (the sketch already implied it; reason confirmed it's the clean abstraction).
- Prediction: SVG backend covers ~80% of projects; 3D rarely needed.
- Review (later): —

### 2026-06-27 — Hand is source of truth (rough.js demoted to charts)

- Context: tempting to auto-generate the sketch look procedurally.
- Choice: author SVGs by hand; code only adds life.
- Driver: reason + values (Non-Negotiable #6, "scribble first").
- Prediction: slower coverage, but a look no template can copy.
- Review (later): —

### 2026-06-27 — Open-source from day one

- Context: build private vs public now.
- Choice: public now (license, package, releases).
- Driver: gut (build-in-public energy).
- Prediction: risk = maintenance overhead while the system still churns. Watch for this.
- Review (later): —
