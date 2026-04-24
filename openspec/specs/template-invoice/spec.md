# Spec: template-invoice

## Purpose
Per-universe invoice. Eye-branded, universe-named phases, clean minimal layout. Supports INR + USD/EUR for global clients.

## Requirements

### Requirement: Minimum invoice fields
Each invoice MUST include: invoice number, issue date, due date, universe name, phase name (universe-themed), line items, subtotal, taxes (GST where applicable), total, currency, payment instructions.

#### Scenario: Field completeness
- GIVEN a rendered invoice
- WHEN fields checked
- THEN all listed fields are present and non-empty

### Requirement: Universe-named phases
Line item descriptions referencing phases MUST use universe-themed names, not "Phase 1/2/3".

### Requirement: Currency handling
The invoice MUST support INR, USD, EUR. Currency symbol and locale formatting MUST match the chosen currency.

### Requirement: Eye-brand mark
The invoice MUST render the `Eye/Primary` mark in the header.

## Acceptance Artifacts
- `kiruk-templates/invoice/spec.md`
- `kiruk-templates/invoice/generator.md`
- `kiruk-templates/invoice/output/<universe>-invoice-<nnnn>.md`
