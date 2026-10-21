#!/usr/bin/env node
/**
 * Validaciones de integridad del sistema.
 * No tiene dependencias: se ejecuta con Node 20+.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generatedFiles } from './build.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const warnings = [];
const checks = [];

const rel = (file) => path.relative(ROOT, file).split(path.sep).join('/');
const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const exists = (file) => fs.existsSync(path.join(ROOT, file));
const fail = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);
const check = (name, fn) => {
  const before = errors.length;
  fn();
  checks.push({ name, ok: errors.length === before });
};

const SKIP_DIRS = new Set(['.git', 'node_modules', '.opencode']);
const TEXT_EXTS = new Set(['.md', '.html', '.css', '.js', '.mjs', '.json', '.txt', '.yml', '.yaml']);

function walk(dir = ROOT) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) out.push(...walk(full));
    } else if (TEXT_EXTS.has(path.extname(entry.name))) out.push(full);
  }
  return out;
}

const files = walk();
const textFiles = files.map((file) => ({ file, content: fs.readFileSync(file, 'utf8') }));

function parseColor(value) {
  if (typeof value !== 'string') return null;
  if (value.startsWith('#')) {
    let hex = value.slice(1);
    if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
    return { r: parseInt(hex.slice(0, 2), 16), g: parseInt(hex.slice(2, 4), 16), b: parseInt(hex.slice(4, 6), 16), a: 1 };
  }
  const match = value.match(/rgba?\(([^)]+)\)/);
  if (!match) return null;
  const [r, g, b, a = 1] = match[1].split(',').map(Number);
  return { r, g, b, a };
}

function composite(foreground, background) {
  return {
    r: foreground.r * foreground.a + background.r * (1 - foreground.a),
    g: foreground.g * foreground.a + background.g * (1 - foreground.a),
    b: foreground.b * foreground.a + background.b * (1 - foreground.a),
    a: 1,
  };
}

function withOpacity(color, alpha) {
  return { ...color, a: alpha };
}

function luminance(color) {
  const [r, g, b] = [color.r, color.g, color.b].map((channel) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const l1 = luminance(a);
  const l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function tokenValues(tokens, theme) {
  const byName = new Map(tokens.color.tokens.map((token) => [token.name, token]));
  const resolve = (name) => {
    const token = byName.get(name);
    if (!token) return null;
    if (typeof token.value === 'string' && token.value.startsWith('{')) {
      return resolve(token.value.slice(1, -1));
    }
    return typeof token.value === 'string' ? token.value : token.value[theme];
  };
  return Object.fromEntries(tokens.color.tokens.map((token) => [token.name, resolve(token.name)]));
}

check('archivos base', () => {
  const required = [
    'README.md', 'AGENTS.md', 'CLAUDE.md', 'llms.txt', 'INSTALACION.md', 'index.html',
    'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'SECURITY.md', 'TRADEMARKS.md',
    'tokens.json', 'tokens.css', 'tailwind/dsg-preset.js', 'tailwind/globals.css',
    'tailwind/play-config.js', 'components/bundle.css', 'components/registry.json',
    'components/registry.schema.json', 'schema/tokens.schema.json',
    'docs/README.md', 'docs/01-discovery.md', 'docs/02-architecture.md', 'docs/03-tokens.md',
    'docs/04-components.md', 'docs/05-brand.md', 'docs/06-ai-experience.md',
    'docs/07-contributing.md', 'docs/08-migration.md', 'docs/09-audit.md',
    'assets/brand/banner.svg', 'assets/brand/logo.svg', 'assets/brand/logo-on-light.svg',
    'assets/brand/logo-mark.svg', 'assets/brand/favicon.svg',
    'assets/fonts/fonts.css', 'assets/fonts/bricolage-grotesque-latin.woff2',
    'assets/fonts/ibm-plex-sans-latin.woff2', 'assets/fonts/ibm-plex-mono-latin-400.woff2',
    'assets/fonts/ibm-plex-mono-latin-500.woff2', 'assets/fonts/OFL-Bricolage-Grotesque.txt',
    'assets/fonts/OFL-IBM-Plex-Sans.txt', 'assets/fonts/OFL-IBM-Plex-Mono.txt',
    'tailwind/vendor/tailwind-play-3.4.17.js', 'tailwind/vendor/LICENSE-Tailwind.txt'
  ];
  for (const file of required) if (!exists(file)) fail(`Falta ${file}`);
});

check('licencia', () => {
  const pkg = JSON.parse(read('package.json'));
  if (pkg.license !== 'MIT') fail(`package.json debe declarar license: MIT (actual: ${pkg.license || 'sin licencia'}).`);
  const license = read('LICENSE');
  if (!license.startsWith('MIT License')) fail('LICENSE no contiene el texto MIT.');
  if (!license.includes(pkg.author)) fail(`LICENSE no menciona al titular ${pkg.author}.`);
});

check('artefactos generados al día', () => {
  for (const [file, expected] of Object.entries(generatedFiles())) {
    if (!exists(file)) { fail(`Falta ${file}`); continue; }
    if (read(file) !== expected) fail(`${file} no coincide con tokens.json/bundle.css. Ejecuta npm run build.`);
  }
});

check('JSON válido', () => {
  for (const { file, content } of textFiles) {
    if (!file.endsWith('.json')) continue;
    try { JSON.parse(content); } catch (error) { fail(`${rel(file)} no es JSON válido: ${error.message}`); }
  }
});

check('sin referencias a la marca anterior', () => {
  const legacyAllowed = new Set(['docs/08-migration.md', 'scripts/codemod-v1-to-v2.mjs']);
  for (const { file, content } of textFiles) {
    if (legacyAllowed.has(rel(file))) continue;
    if (/HUB I\+D\+i/i.test(content)) fail(`${rel(file)} contiene la marca anterior.`);
    if (/\bhub-[a-z]/i.test(content)) fail(`${rel(file)} contiene el prefijo heredado hub-.`);
    if (new RegExp('--dsg-' + 'dsg-').test(content)) fail(`${rel(file)} contiene un token con doble prefijo.`);
  }
});

check('variables CSS definidas', () => {
  const tokensCss = read('tokens.css');
  const defined = new Set([...tokensCss.matchAll(/--dsg-([a-z0-9-]+)\s*:/g)].map((m) => m[1]));
  const referenced = new Set();
  for (const { file, content } of textFiles) {
    for (const m of content.matchAll(/var\(--dsg-([a-z0-9-]+)\)/g)) referenced.add(m[1]);
    for (const m of content.matchAll(/['"]--dsg-([a-z0-9-]+)['"]/g)) referenced.add(m[1]);
  }
  for (const name of referenced) if (!defined.has(name)) fail(`Variable --dsg-${name} usada pero no definida.`);
});

check('contraste de tokens', () => {
  const tokens = JSON.parse(read('tokens.json'));
  for (const theme of ['dark', 'light']) {
    const values = tokenValues(tokens, theme);
    const canvas = parseColor(values.canvas);
    const glass = composite(parseColor(values.glass), canvas);
    const surfaces = { canvas, glass };
    const textTokens = ['ink', 'ink-muted', 'ink-subtle', 'accent', 'accent-warm', 'success', 'danger', 'admin'];
    for (const name of textTokens) {
      const foreground = parseColor(values[name]);
      for (const [surfaceName, background] of Object.entries(surfaces)) {
        const ratio = contrast(composite(foreground, background), background);
        if (ratio < 4.5) fail(`Contraste ${theme}: ${name} sobre ${surfaceName} = ${ratio.toFixed(2)} (< 4.5).`);
      }
    }
    for (const filled of ['accent', 'accent-warm', 'success', 'admin']) {
      const foreground = parseColor(values['on-accent']);
      const background = parseColor(values[filled]);
      const ratio = contrast(composite(foreground, background), background);
      if (ratio < 4.5) fail(`Contraste ${theme}: on-accent sobre ${filled} = ${ratio.toFixed(2)} (< 4.5).`);
    }
    // Chips y avisos usan un tinte del propio color sobre vidrio.
    for (const [name, alpha] of [['accent', 0.08], ['accent-warm', 0.08], ['success', 0.08], ['danger', 0.08], ['admin', 0.08], ['accent', 0.09], ['accent-warm', 0.09], ['success', 0.09], ['danger', 0.09]]) {
      const foreground = parseColor(values[name]);
      const background = composite(withOpacity(foreground, alpha), glass);
      const ratio = contrast(composite(foreground, background), background);
      if (ratio < 4.5) fail(`Contraste ${theme}: ${name} sobre tinte ${Math.round(alpha * 100)}% = ${ratio.toFixed(2)} (< 4.5).`);
    }
  }
});

check('registro de componentes', () => {
  const registry = JSON.parse(read('components/registry.json'));
  const bundle = read('components/bundle.css');
  const ids = new Set(registry.components.map((c) => c.id));
  for (const component of registry.components) {
    for (const key of ['id', 'name', 'status', 'summary', 'files', 'classes', 'useWhen', 'avoidWhen', 'accessibility', 'example']) {
      if (!(key in component)) fail(`Registro: ${component.id || '?'} sin "${key}".`);
    }
    for (const [kind, file] of Object.entries(component.files ?? {})) {
      if (!exists(file)) fail(`Registro: ${component.id} apunta a ${kind} inexistente (${file}).`);
    }
    for (const cls of component.classes ?? []) {
      const name = cls.replace(/^\./, '');
      const selector = new RegExp(`\\.${name.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}(?![\\w-])`);
      if (!selector.test(bundle)) fail(`Registro: ${component.id} declara ${cls}, que no existe en bundle.css.`);
    }
    for (const related of component.related ?? []) {
      if (!ids.has(related.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))) {
        // Los ids del registro usan nombres como "segmented-control"; comparamos también por nombre.
        const byName = registry.components.some((c) => c.name === related);
        if (!byName) fail(`Registro: ${component.id} referencia "${related}", que no existe.`);
      }
    }
  }
  const dirs = fs.readdirSync(path.join(ROOT, 'components'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  for (const dir of dirs) {
    const slug = dir.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (!registry.components.some((c) => c.name === dir || c.id === slug)) {
      fail(`El componente ${dir} no está en components/registry.json.`);
    }
    for (const file of ['README.md', 'preview.html']) {
      if (!exists(`components/${dir}/${file}`)) fail(`components/${dir}/${file} no existe.`);
    }
  }
});

check('accesibilidad estructural', () => {
  const pages = ['index.html', ...fs.readdirSync(path.join(ROOT, 'components'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => `components/${entry.name}/preview.html`)
    .filter((file) => exists(file))];
  for (const file of pages) {
    const html = read(file);
    if (/<img(?![^>]*\balt=)/i.test(html)) fail(`${file} tiene un <img> sin alt.`);
    if (/<(?:div|span)[^>]*\bonclick=/i.test(html)) fail(`${file} usa onclick en un elemento no interactivo.`);
    for (const tag of html.match(/<[^>]*role="progressbar"[^>]*>/gi) ?? []) {
      for (const attr of ['aria-valuenow', 'aria-valuemin', 'aria-valuemax']) {
        if (!tag.includes(attr)) fail(`${file} tiene un progressbar sin ${attr}.`);
      }
    }
    for (const tag of html.match(/<(?:input|select|textarea)(?![^>]*type="hidden")[^>]*>/gi) ?? []) {
      if (!/\bid=/.test(tag) && !/\baria-label(?:ledby)?=/.test(tag)) {
        fail(`${file} tiene un control sin id ni nombre accesible: ${tag.slice(0, 80)}`);
      }
    }
  }
});

check('vistas previas completas', () => {
  for (const dir of fs.readdirSync(path.join(ROOT, 'components'), { withFileTypes: true }).filter((e) => e.isDirectory())) {
    const file = `components/${dir.name}/preview.html`;
    if (!exists(file)) continue;
    const html = read(file);
    if (!html.includes('@dsCard')) warn(`${file} no declara @dsCard.`);
    if (!html.includes('../../tokens.css')) fail(`${file} no carga ../../tokens.css.`);
    if (!html.includes('../bundle.css')) fail(`${file} no carga ../bundle.css.`);
    if (!html.includes('../../tailwind/play-config.js')) warn(`${file} no carga play-config.js.`);
  }
});

check('enlaces locales', () => {
  for (const { file, content } of textFiles) {
    if (!['.md', '.html'].includes(path.extname(file))) continue;
    const dir = path.dirname(file);
    // Los bloques de código de Markdown son ejemplos: sus rutas no existen en el repo.
    const body = file.endsWith('.md') ? content.replace(/```[\s\S]*?```/g, '') : content;
    const links = [];
    for (const m of body.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) links.push(m[1]);
    for (const m of body.matchAll(/(?:href|src)="([^"]+)"/g)) links.push(m[1]);
    for (const raw of links) {
      if (!raw || raw.startsWith('#') || raw.startsWith('http') || raw.startsWith('mailto:') || raw.startsWith('data:') || raw.startsWith('tel:')) continue;
      if (/[{}<>]/.test(raw)) continue;
      const target = raw.split('#')[0].split('?')[0];
      if (!target) continue;
      const resolved = path.resolve(dir, target);
      if (!fs.existsSync(resolved)) fail(`${rel(file)} enlaza a ${raw}, que no existe.`);
    }
  }
});

check('árbol de documentación', () => {
  const docs = fs.readdirSync(path.join(ROOT, 'docs')).filter((f) => f.endsWith('.md')).sort();
  if (docs.length < 9) warn(`docs/ tiene ${docs.length} archivos; revisa el índice.`);
  for (const file of ['README.md', 'AGENTS.md', 'llms.txt']) {
    if (!read(file).includes('docs/')) warn(`${file} no enlaza a docs/.`);
  }
});

const total = checks.length;
const passed = checks.filter((c) => c.ok).length;
for (const item of checks) console.log(`${item.ok ? '✓' : '✗'} ${item.name}`);
for (const warning of warnings) console.log(`! ${warning}`);
for (const error of errors) console.log(`✗ ${error}`);
console.log(`\n${passed}/${total} bloques correctos · ${errors.length} errores · ${warnings.length} avisos`);
if (errors.length) process.exit(1);
