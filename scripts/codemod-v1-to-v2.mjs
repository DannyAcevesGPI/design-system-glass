#!/usr/bin/env node
/**
 * Codemod de la versión 1 (namespace anterior) a Design System Glass v2.
 *
 * Uso:
 *   node scripts/codemod-v1-to-v2.mjs <directorio>            # simulación
 *   node scripts/codemod-v1-to-v2.mjs <directorio> --write    # aplica cambios
 *
 * No toca node_modules ni .git. No renombra archivos: revisa la guía
 * docs/08-migration.md para los renombrados manuales.
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const write = args.includes('--write');
const root = path.resolve(args.find((arg) => !arg.startsWith('--')) ?? '.');
const SKIP = new Set(['.git', 'node_modules', 'dist', 'build', '.next', 'coverage']);
const EXTS = new Set(['.css', '.html', '.js', '.jsx', '.ts', '.tsx', '.md', '.json']);

const TOKENS = [
  'glass-highlight', 'glass-strong', 'glass-rim', 'backdrop-glass-light',
  'backdrop-glass', 'shadow-glass', 'font-display', 'font-sans', 'font-mono',
  'accent-warm', 'on-accent', 'ink-muted', 'ink-subtle', 'radius-full',
  'radius-sm', 'radius-md', 'radius-lg', 'radius-xl', 'radius-2xl', 'radius-3xl',
  'space-1', 'space-2', 'space-3', 'space-4', 'space-5', 'space-6', 'space-7',
  'space-10', 'space-14', 'canvas', 'ink', 'glass', 'line', 'accent',
  'success', 'warning', 'danger', 'admin'
].sort((a, b) => b.length - a.length);

const varRe = new RegExp(`(?<![\\w-])--(${TOKENS.map((t) => t.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})(?![\\w-])`, 'g');

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP.has(entry.name)) out.push(...walk(full));
    } else if (EXTS.has(path.extname(entry.name))) {
      out.push(full);
    }
  }
  return out;
}

if (!fs.existsSync(root)) {
  console.error(`No existe el directorio: ${root}`);
  process.exit(1);
}

let changed = 0;
let replacements = 0;
for (const file of walk(root)) {
  const before = fs.readFileSync(file, 'utf8');
  let after = before
    .replaceAll('hub-idi-design-system.html', 'index.html')
    .replaceAll('hub-preset.js', 'dsg-preset.js')
    .replaceAll('hub-ds-theme', 'dsg-theme')
    .replaceAll('hub-', 'dsg-');
  after = after.replace(varRe, (_, token) => `--dsg-${token}`);
  // Corrige modificadores BEM que hubieran quedado con doble prefijo.
  after = after.replace(/dsg-([a-z0-9_]+)--dsg-(accent|admin|danger|success|warning)\b/g, 'dsg-$1--$2');
  if (after !== before) {
    changed++;
    replacements += (before.match(/hub-|(?<![\w-])--(?:canvas|ink|glass|accent|success|warning|danger|admin|line|shadow|font|space|radius|backdrop)/g) ?? []).length;
    console.log(`${write ? '✎' : '·'} ${path.relative(root, file)}`);
    if (write) fs.writeFileSync(file, after);
  }
}

console.log(`\n${changed} archivos con cambios · ${replacements} referencias detectadas`);
if (!write && changed) console.log('Simulación. Ejecuta con --write para aplicar.');
