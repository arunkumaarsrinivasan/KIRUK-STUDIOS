#!/usr/bin/env node
/**
 * build-tokens.mjs — Style Dictionary v4 runner.
 *
 * Reads design-system/tokens/*.json (DTCG) and emits build/{css,tailwind,ts,pen}/.
 *
 * Spec: openspec/specs/design-tokens/spec.md
 * Run:  npm run tokens:build
 */
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const configPath = path.join(repoRoot, 'design-system/style-dictionary.config.cjs');

async function main() {
  let StyleDictionary;
  try {
    const mod = await import('style-dictionary');
    StyleDictionary = mod.default ?? mod;
  } catch (err) {
    console.error('[build-tokens] style-dictionary not installed. Run: npm install');
    process.exit(1);
  }

  const config = require(configPath);

  try {
    const sd = new StyleDictionary(config);
    await sd.hasInitialized;
    await sd.buildAllPlatforms();
    console.log('[build-tokens] ✓ built all platforms → design-system/build/');
  } catch (err) {
    console.error('[build-tokens] build failed:', err);
    process.exit(1);
  }
}

main();
