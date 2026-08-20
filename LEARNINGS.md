# LEARNINGS — mistakes, near-misses, guards

**Append-only.** Add new **dated** sections at the **bottom**. Do not rewrite or delete past entries to hide a repeat; if the same failure class happens again, add **another** entry and **strengthen** the guard (spec scenario, script, rule, or checklist). This file is for **learning in motion**—including what did not work—so the journey stays honest, not a scoreboard of perfection. Victories and pivots that teach a guard belong here too when they are material.

## How to add an entry

Use this shape (markdown `##` heading + bullets):

```markdown
## YYYY-MM-DD — short title

- **Mistake:** what broke or almost broke.
- **Root cause:** why it happened (process, spec gap, missing check, etc.).
- **Fix:** what we did to correct it.
- **Guard:** what now stops a repeat (link to spec section, `npm run …`, `.cursor/rules/…`, PR checklist item, or habit).
```

**Material** = worth recording: anything that could hurt users, brand, security, or trust if it happened again—not every typo.

## Entries

## 2026-05-26 — Unlayered sketch CSS overrode Tailwind position utilities

- **Mistake:** The bottom `SketchNav` rendered pinned to the top of the page instead of fixed at the bottom. `position: relative` (and `bottom: 20px`) applied, but `fixed` silently lost.
- **Root cause:** Tailwind v4 puts utilities in `@layer utilities`. The ported sketch classes in `global.css` (`.sketch-border`, `.sketch-button`, etc.) are **unlayered**. Per CSS cascade-layer rules, unlayered declarations beat layered ones regardless of source order — so `.sketch-border { position: relative }` overrode the `fixed` utility on the same element.
- **Fix:** Decoupled positioning from decoration — an outer wrapper carries the Tailwind position utilities (`fixed bottom-5 left-1/2 -translate-x-1/2`), the inner element carries `.sketch-border`.
- **Guard:** Never combine a `.sketch-*` class that sets `position` with a Tailwind position/inset utility on the **same** element — wrap instead. When the sketch primitives graduate into `@kiruk/design-system`, wrap their global CSS in `@layer components { … }` so Tailwind utilities can override cleanly, and this whole class of conflict disappears.

## 2026-05-27 — Parallel `next dev` on same dir corrupted Turbopack `.next` cache

- **Mistake:** While a dev server was already running on :3010, I started a _second_ `next dev` (on :3011) against the **same** `apps/kiruk-portal` dir to read its log. Minutes later the running app threw a runtime error: `Cannot find module '../chunks/ssr/[turbopack]_runtime.js'` from a stale `.next/server/pages/_document.js` (a pages-router artifact in an app-router app = corrupted/mixed cache).
- **Root cause:** Two `next dev` processes share one `.next` build dir. Turbopack writes/cleans chunks there; concurrent writers race and leave dangling chunk references. The first server then `require()`s a chunk the second one deleted/rewrote.
- **Fix:** Stopped both node processes, `rm -rf apps/kiruk-portal/.next`, started a **single** clean `next dev`. `/onboard` back to 200, error gone.
- **Guard:** Never run a second dev server against a project dir that already has one — reuse the running instance (curl it, or read the user's terminal). If a separate instance is truly needed (e.g. isolated log capture), point it at a **copy/worktree** or set a distinct `distDir`, never the shared `.next`. When verifying a route, prefer `curl` against the existing port over booting a parallel server.
