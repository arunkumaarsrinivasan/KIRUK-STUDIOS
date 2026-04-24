/**
 * Style Dictionary v4 config.
 * Consumes design-system/tokens/*.json (DTCG format) and emits:
 *   build/css/tokens.css      — CSS custom properties
 *   build/tailwind/tokens.cjs — Tailwind theme extension
 *   build/ts/tokens.ts        — TypeScript exports
 *   build/pen/variables.json  — Pencil MCP variables payload
 *
 * Spec: openspec/specs/design-tokens/spec.md
 */
const path = require('node:path');

/** @type {import('style-dictionary').Config} */
module.exports = {
  log: { warnings: 'warn', verbosity: 'default' },
  source: [path.join(__dirname, 'tokens/**/*.json')],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: path.join(__dirname, 'build/css/'),
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: { outputReferences: true }
        }
      ]
    },
    tailwind: {
      transformGroup: 'js',
      buildPath: path.join(__dirname, 'build/tailwind/'),
      files: [
        {
          destination: 'tokens.cjs',
          format: 'javascript/module',
        }
      ]
    },
    ts: {
      transformGroup: 'js',
      buildPath: path.join(__dirname, 'build/ts/'),
      files: [
        {
          destination: 'tokens.ts',
          format: 'javascript/es6',
        }
      ]
    },
    pen: {
      transformGroup: 'js',
      buildPath: path.join(__dirname, 'build/pen/'),
      files: [
        {
          destination: 'variables.json',
          format: 'json/flat',
        }
      ]
    }
  }
};
