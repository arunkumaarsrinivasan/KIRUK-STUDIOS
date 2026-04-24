# Pen Files

Master `.pen` file lives here: `kiruk-design.pen`.

## Current status

Bootstrap session scaffolded the Eye/* component library and base tokens in the Pencil editor buffer via MCP. **File is not yet persisted to disk** — Pencil MCP cannot save a new document to a target path from the API; Save-As is a UI-only action.

## Action required

1. Open Pencil editor.
2. If the current buffer is named `pencil-new.pen` (unsaved), **File → Save As** → navigate to this folder → save as `kiruk-design.pen`.
3. Reopen via `mcp__pencil__open_document("C:\\Users\\arunk\\KIRUKULAM\\KIRUK-STUDIOS\\design-system\\pen-files\\kiruk-design.pen")` to verify.

## Scaffolded contents (in buffer)

Reusable components:
- `Eye/Primary` — primary eye-mark (sclera + iris + pupil + highlight)
- `Eye/Iris` — standalone iris (secondary mark)
- `Eye/Gaze` — horizontal-lid gaze variant (secondary)
- `Eye/Portal` — concentric portal rings (secondary)
- `Eye/Constellation` — multi-eye pattern (secondary)
- `Kirukal/Scribble` — hand-drawn scribble mark

Variables (seeded from `design-system/tokens/semantic.json`):
- `bg`, `fg`, `paper`, `accent`, `accent-alt`, `halo`, `kohl`, `gaze-dim`, `space-sm`, `space-md`, `space-lg`, `radius-md`

## Hygiene

- Edit only via pencil MCP (`batch_design`, `set_variables`).
- Do not read/grep the `.pen` file contents directly — binary/encrypted.
- To re-sync tokens from `design-system/tokens/`, run `npm run tokens:build && npm run tokens:sync-pen`.
