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

#### Scenario: Generic phase forbidden in line items
- GIVEN a rendered invoice
- WHEN line items are scanned
- THEN `/Phase [0-9]/` does not occur unless explicitly justified in front-matter

### Requirement: Currency handling
The invoice MUST support INR, USD, and EUR. Currency symbol and locale formatting MUST match the chosen currency.

#### Scenario: Locale formatting matches currency
- GIVEN an invoice rendered with `currency: USD`
- WHEN amounts are formatted
- THEN values use `$` prefix and `1,234.56` grouping
- AND a different currency choice produces correctly-localized output

### Requirement: Eye-brand mark
The invoice MUST render the `EyePrimary` mark from `@kiruk/design-system` in the header.

#### Scenario: Eye mark present in header
- GIVEN a rendered invoice
- WHEN the header is inspected
- THEN an `EyePrimary` SVG (or its referenced asset path) is present

## Acceptance Artifacts
- `kiruk-templates/invoice/spec.md`
- `kiruk-templates/invoice/generator.md`
- `kiruk-templates/invoice/output/<universe>-invoice-<nnnn>.md`
