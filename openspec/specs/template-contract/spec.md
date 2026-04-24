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
The contract MUST state jurisdiction (India-based) and payment terms accommodating global clients.

### Requirement: Plain-language override
Each legal clause MUST be paired with a one-sentence plain-language summary.

### Requirement: Review-before-use disclaimer
Each generated contract MUST include a front-matter flag `legal-review-required: true`. Generator output is not legally binding until a lawyer reviews.

## Acceptance Artifacts
- `kiruk-templates/contract/spec.md`
- `kiruk-templates/contract/generator.md`
- `kiruk-templates/contract/output/<universe>-contract-v<n>.md`
