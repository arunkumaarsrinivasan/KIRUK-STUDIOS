# Spec: template-contract

## Purpose
Per-universe contract. Standard legal baseline + Kiruk-specific clauses: experimentation allowance, creative risk, IP rights for client work and shared experiments.

## Requirements

### Requirement: Kiruk-specific clauses
The contract MUST include clauses covering: (a) experimentation allowance, (b) creative-risk acceptance, (c) IP split for client work vs shared ISM-derived output, (d) portfolio/devlog publication rights.

#### Scenario: Clause presence
- GIVEN a rendered contract
- WHEN scanned for clauses (a)-(d)
- THEN all four are present

### Requirement: Jurisdiction
The contract MUST state jurisdiction (India-based) and payment terms accommodating global clients (INR / USD / EUR support, wire + Stripe + Razorpay where relevant).

#### Scenario: Jurisdiction stated
- GIVEN a rendered contract
- WHEN the jurisdiction section is scanned
- THEN the doc names India as governing jurisdiction
- AND payment terms list at least INR + one international currency

### Requirement: Plain-language override
Each legal clause MUST be paired with a one-sentence plain-language summary.

#### Scenario: Plain-language pair per clause
- GIVEN a rendered contract
- WHEN clauses are scanned
- THEN every clause has an adjacent plain-language line (italic / blockquote / side-by-side)

### Requirement: Review-before-use disclaimer
Each generated contract MUST include a front-matter flag `legal-review-required: true`. The generator MUST emit a visible disclaimer that the output is not legally binding until a lawyer reviews.

#### Scenario: Flag and disclaimer present
- GIVEN a rendered contract
- WHEN front-matter is parsed
- THEN `legal-review-required: true` is present
- AND a visible disclaimer line appears in the document body

## Acceptance Artifacts
- `kiruk-templates/contract/spec.md`
- `kiruk-templates/contract/generator.md`
- `kiruk-templates/contract/output/<universe>-contract-v<n>.md`
