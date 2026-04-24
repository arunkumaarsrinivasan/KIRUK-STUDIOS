## Summary

<!-- What does this PR do in 1–3 sentences? -->

## Type of change

- [ ] Spec / OpenSpec (capabilities, requirements, or change proposal)
- [ ] Design system (tokens, components, build)
- [ ] Automation (scripts, hooks, CI)
- [ ] Docs / process only
- [ ] Other: ___

## Checklist (author)

- [ ] **Secrets:** No new real API keys, tokens, `.env` contents, or private client data in this PR. Only placeholders in `.env.example` / docs.
- [ ] **Generated paths:** I did not hand-edit `design-system/build/`; if tokens changed, I ran `npm run tokens:build`.
- [ ] **OpenSpec:** If I changed requirements or behavior, I used `openspec/changes/<slug>/` and/or updated the right `openspec/specs/**/spec.md` with matching scenarios, and I ran `npm run spec:validate` when applicable.
- [ ] **idea-capture / logs:** If I touched `ideas/log.ndjson` or capture scripts, I did not store raw secrets; redaction rules still apply.
- [ ] **CHANGELOG:** I added an `## Unreleased` entry in [CHANGELOG.md](../CHANGELOG.md) if this change is user-facing or spec-notable.
- [ ] **LEARNINGS / repeat risk:** If this PR fixes a **material** mistake or a **repeat** of a past failure, I appended [LEARNINGS.md](../LEARNINGS.md) with Mistake / Root cause / Fix / **Guard** (or N/A is honest).
- [ ] **Review:** I self-reviewed diffs; I am ready for another pair of eyes if this is non-trivial.

## How to test

<!-- Commands or manual steps a reviewer can run. -->

```bash
# e.g.
npm run spec:validate
npm run tokens:build
```

## Links

<!-- Optional: issue, spec section, or related change slug. -->
