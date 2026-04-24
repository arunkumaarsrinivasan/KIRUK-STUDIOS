#!/usr/bin/env node
/**
 * sync-pen-variables.mjs — push built token variables into kiruk-design.pen.
 *
 * Precondition: `npm run tokens:build` has produced build/pen/variables.json.
 *
 * This script does NOT call pencil MCP directly (MCP runs inside Claude Code,
 * not from Node). Instead, it prints a machine-readable instruction that
 * Claude Code can consume to make the MCP call, and it writes a marker file
 * at build/pen/.sync-requested for audit.
 *
 * When run inside a Claude Code session via /kiruk-artifact or manually, the
 * agent is expected to pick up the payload and call:
 *     mcp__pencil__open_document("design-system/pen-files/kiruk-design.pen")
 *     mcp__pencil__set_variables({ ... })
 *
 * Spec: openspec/specs/design-tokens/spec.md (Requirement: Pencil sync)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const builtPath = path.join(repoRoot, 'design-system/build/pen/variables.json');
const markerPath = path.join(repoRoot, 'design-system/build/pen/.sync-requested');
const penFile = path.join(repoRoot, 'design-system/pen-files/kiruk-design.pen');

if (!fs.existsSync(builtPath)) {
  console.error('[sync-pen] build/pen/variables.json missing. Run `npm run tokens:build` first.');
  process.exit(1);
}

const variables = JSON.parse(fs.readFileSync(builtPath, 'utf8'));
const payload = {
  ts: new Date().toISOString(),
  penFile: path.relative(repoRoot, penFile).replaceAll('\\', '/'),
  variables,
};

fs.writeFileSync(markerPath, JSON.stringify(payload, null, 2));

console.log('[sync-pen] wrote sync request marker:', path.relative(repoRoot, markerPath));
console.log('[sync-pen] Claude Code should now call:');
console.log('    mcp__pencil__open_document("' + payload.penFile + '")');
console.log('    mcp__pencil__set_variables({ ... })  // with the payload.variables object');
console.log('[sync-pen] Variables prepared:', Object.keys(variables).length);
