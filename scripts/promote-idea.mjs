#!/usr/bin/env node
/**
 * promote-idea.mjs — graduate a raw idea into an OpenSpec change proposal.
 *
 * Usage:
 *   node scripts/promote-idea.mjs <slug>
 *
 * Reads ideas/promoted/<slug>.md, creates openspec/changes/<slug>/proposal.md
 * seeded with the idea content + the required Why/What/Impact skeleton, then
 * moves the source to ideas/promoted/.applied/<slug>.md (not deleted).
 *
 * Spec: openspec/specs/idea-capture/spec.md
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const slug = process.argv[2];
if (!slug || !/^[a-z0-9][a-z0-9-]{1,60}$/.test(slug)) {
  console.error('Usage: node scripts/promote-idea.mjs <slug>');
  console.error('  slug: lowercase alphanumeric + dashes, 2-61 chars');
  process.exit(1);
}

const sourcePath = path.join(repoRoot, 'ideas/promoted', `${slug}.md`);
const appliedDir = path.join(repoRoot, 'ideas/promoted/.applied');
const appliedPath = path.join(appliedDir, `${slug}.md`);
const changeDir = path.join(repoRoot, 'openspec/changes', slug);
const proposalPath = path.join(changeDir, 'proposal.md');
const tasksPath = path.join(changeDir, 'tasks.md');
const deltasDir = path.join(changeDir, 'deltas');

if (!fs.existsSync(sourcePath)) {
  console.error(`[promote-idea] ${sourcePath} not found.`);
  console.error('  Create ideas/promoted/<slug>.md first (e.g., via /kiruk-capture).');
  process.exit(1);
}

if (fs.existsSync(changeDir)) {
  console.error(`[promote-idea] openspec/changes/${slug}/ already exists. Aborting.`);
  process.exit(1);
}

const ideaBody = fs.readFileSync(sourcePath, 'utf8');
const now = new Date().toISOString();

const proposal = `# Proposal: ${slug}

> Promoted from \`ideas/promoted/${slug}.md\` on ${now}.

## Why

<fill in: what problem or opportunity does this address?>

## What changes

- Added: <requirement> in <spec-path>
- Modified: <requirement> in <spec-path>
- Removed: _(none)_

## Impact

- Specs touched: <list>
- Artifacts to regenerate: <list>
- Downstream commands/templates affected: <list>

## Original idea (verbatim)

${ideaBody.trim()}

## Deltas

See ./deltas/ — add one file per spec being changed, mirroring the openspec/specs/ path.
`;

const tasks = `# Tasks: ${slug}

- [ ] Draft delta spec file(s) in ./deltas/
- [ ] Author proposal.md Why / What / Impact sections
- [ ] Run \`npx openspec validate --strict\`
- [ ] Apply (generate or modify artifacts referencing spec)
- [ ] Move folder to openspec/archive/${slug}/
- [ ] Append CHANGELOG.md entry (with "Why" line)
`;

fs.mkdirSync(changeDir, { recursive: true });
fs.mkdirSync(deltasDir, { recursive: true });
fs.mkdirSync(appliedDir, { recursive: true });

fs.writeFileSync(proposalPath, proposal);
fs.writeFileSync(tasksPath, tasks);
fs.writeFileSync(path.join(deltasDir, '.gitkeep'), '');

fs.renameSync(sourcePath, appliedPath);

console.log(`[promote-idea] ✓ created openspec/changes/${slug}/`);
console.log(`[promote-idea] ✓ moved source → ideas/promoted/.applied/${slug}.md`);
console.log('[promote-idea] next: fill in Why/What/Impact, draft deltas, validate.');
