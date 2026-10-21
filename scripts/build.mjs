#!/usr/bin/env node
/**
 * Genera los artefactos derivados de tokens.json y del preset:
 *   - tokens.css
 *   - tailwind/globals.css (tokens + capa de componentes)
 *   - tailwind/play-config.js (config del preset para Tailwind Play CDN)
 *
 * Uso:
 *   node scripts/build.mjs          # escribe los archivos
 *   node scripts/build.mjs --check  # falla si hay diferencias
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HEADER = '/* Design System Glass — archivo generado por scripts/build.mjs desde tokens.json. No editar a mano. */';

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const write = (rel, content) => fs.writeFileSync(path.join(ROOT, rel), content);

function resolveValue(value, theme) {
  if (typeof value === 'string') {
    if (value.startsWith('{') && value.endsWith('}')) return `var(--dsg-${value.slice(1, -1)})`;
    return value;
  }
  const resolved = value[theme];
  if (!resolved) throw new Error(`Token sin valor para el tema "${theme}": ${JSON.stringify(value)}`);
  return resolved;
}

function themeDeclarations(tokens, theme) {
  const lines = [];
  for (const token of tokens.color.tokens) {
    lines.push(`  --dsg-${token.name}: ${resolveValue(token.value, theme)};`);
  }
  for (const token of tokens.shadow?.tokens ?? []) {
    lines.push(`  --dsg-${token.name}: ${resolveValue(token.value, theme)};`);
  }
  lines.push(`  color-scheme: ${theme};`);
  return lines.join('\n');
}

export function buildTokensCss() {
  const tokens = JSON.parse(read('tokens.json'));
  const dark = themeDeclarations(tokens, 'dark');
  const light = themeDeclarations(tokens, 'light');
  const lines = [HEADER, '', `:root, [data-theme="dark"] {`, dark, '}', '',
    '@media (prefers-color-scheme: light) {', '  :root:not([data-theme="dark"]) {',
    ...light.split('\n').map((line) => `  ${line}`), '  }', '}', '',
    '[data-theme="light"] {', light, '}', '', ':root {'];

  for (const [name, value] of Object.entries(tokens.type?.families ?? {})) {
    lines.push(`  --dsg-font-${name}: ${value};`);
  }
  for (const token of tokens.spacing?.tokens ?? []) {
    lines.push(`  --dsg-${token.name}: ${token.value};`);
  }
  for (const token of tokens.radius?.tokens ?? []) {
    lines.push(`  --dsg-${token.name}: ${token.value};`);
  }
  for (const token of tokens.backdrop?.tokens ?? []) {
    lines.push(`  --dsg-${token.name}: ${token.value};`);
  }
  lines.push('}', '');

  for (const group of tokens.type?.groups ?? []) {
    for (const style of group.styles ?? []) {
      const properties = [
        `font-family: var(--dsg-font-${group.family});`,
        `font-size: ${style.fontSize};`,
        `line-height: ${style.lineHeight};`,
        `font-weight: ${style.fontWeight};`,
      ];
      if (style.letterSpacing) properties.push(`letter-spacing: ${style.letterSpacing};`);
      if (['eyebrow', 'overline'].includes(style.name)) properties.push('text-transform: uppercase;');
      lines.push(`.${style.name} { ${properties.join(' ')} }`);
    }
  }
  return `${lines.join('\n')}\n`;
}

export function buildGlobalsCss() {
  const tokensCss = buildTokensCss()
    .replace(`${HEADER}\n\n`, '');
  const components = read('components/bundle.css');
  return `${HEADER}\n/* tokens.css + components/bundle.css, dentro de las capas de Tailwind. */\n\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer base {\n${tokensCss}\n}\n\n@layer components {\n${components}\n}\n`;
}

export function buildPlayConfig() {
  const preset = require(path.join(ROOT, 'tailwind/dsg-preset.js'));
  // El CDN no debe inyectar preflight: las previews ya cargan tokens.css y bundle.css.
  const config = { ...preset, corePlugins: { preflight: false } };
  const header = '/* Design System Glass — archivo generado por scripts/build.mjs desde tailwind/dsg-preset.js. No editar a mano. */';
  return `${header}\nwindow.tailwind = window.tailwind || {};\nwindow.tailwind.config = ${JSON.stringify(config, null, 2)};\n`;
}

export function generatedFiles() {
  return {
    'tokens.css': buildTokensCss(),
    'tailwind/globals.css': buildGlobalsCss(),
    'tailwind/play-config.js': buildPlayConfig(),
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const check = process.argv.includes('--check');
  const files = generatedFiles();
  let changed = 0;
  for (const [rel, content] of Object.entries(files)) {
    const current = fs.existsSync(path.join(ROOT, rel)) ? read(rel) : '';
    if (current !== content) {
      changed++;
      if (check) console.error(`✗ ${rel} está desactualizado. Ejecuta: npm run build`);
      else {
        write(rel, content);
        console.log(`✓ ${rel}`);
      }
    }
  }
  if (check && changed) process.exit(1);
  if (!check && !changed) console.log('Sin cambios: los artefactos ya estaban al día.');
}
