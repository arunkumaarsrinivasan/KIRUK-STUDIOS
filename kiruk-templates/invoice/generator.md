---
template: invoice
spec-link: openspec/specs/template-invoice/spec.md
---

# Generator Prompt: Invoice

Render a per-universe invoice per `openspec/specs/template-invoice/spec.md`.

## Required fields
- Invoice number (format: `KIRUK-<YYYY>-<NNNN>`)
- Issue date, due date (ISO 8601)
- Universe name
- Phase name (universe-themed)
- Line items (description, qty, rate, amount)
- Subtotal, GST (if applicable), total
- Currency (INR default; USD/EUR for global clients)
- Payment instructions (bank, Wise, Stripe — pick per client)
- Eye/Primary mark in header

## Output
`kiruk-templates/invoice/output/<universe>-invoice-<nnnn>.md`
