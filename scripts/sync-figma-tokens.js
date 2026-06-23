#!/usr/bin/env node
// Usage: node scripts/sync-figma-tokens.js [path/to/tokens.json]

const fs = require('fs');
const path = require('path');

const TOKENS_FILE = path.resolve(
  __dirname,
  process.argv[2] ?? '../tokens/tokens.json',
);
const GLOBALS_CSS = path.resolve(__dirname, '../src/styles/globals.css');

const CATEGORY_LABELS = {
  color: 'Colors',
  font: 'Typography',
  'line-height': 'Line Height',
  'letter-spacing': 'Letter Spacing',
  radius: 'Radius',
  shadow: 'Shadow',
};

/** Recursively flatten { a: { b: { value, type } } } → { 'a.b': { value, type } } */
function flattenTokens(obj, prefix = '') {
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('$')) continue; // skip Token Studio metadata
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === 'object' && 'value' in val && 'type' in val) {
      result[fullKey] = val;
    } else if (val && typeof val === 'object') {
      Object.assign(result, flattenTokens(val, fullKey));
    }
  }
  return result;
}

/** 'color.g.0' → '--color-g-0', 'shadow.DEFAULT' → '--shadow' */
function pathToCSSVar(tokenPath) {
  const parts = tokenPath.split('.');
  const filtered = parts.filter((p) => p.toUpperCase() !== 'DEFAULT');
  return '--' + filtered.join('-');
}

/** '{color.y.100}' → 'var(--color-y-100)' */
function resolveReferences(value) {
  return String(value).replace(/\{([^}]+)\}/g, (_, ref) => {
    const parts = ref.split('.');
    const filtered = parts.filter((p) => p.toUpperCase() !== 'DEFAULT');
    return `var(--${filtered.join('-')})`;
  });
}

function formatValue(token) {
  const { value, type } = token;

  if (String(value).includes('{')) {
    return resolveReferences(value);
  }

  switch (type) {
    case 'borderRadius':
    case 'fontSize': {
      const num = parseFloat(value);
      if (!isNaN(num) && String(num) === String(value)) {
        return `${(num / 16).toFixed(4).replace(/\.?0+$/, '')}rem`;
      }
      return String(value);
    }
    case 'boxShadow': {
      if (Array.isArray(value)) {
        return value
          .map((s) => formatValue({ value: s, type: 'boxShadow' }))
          .join(', ');
      }
      if (value && typeof value === 'object') {
        const {
          x = 0,
          y = 0,
          blur = 0,
          spread = 0,
          color = 'transparent',
          type: st,
        } = value;
        const inset = st === 'innerShadow' ? 'inset ' : '';
        return `${inset}${x}px ${y}px ${blur}px ${spread}px ${color}`;
      }
      return String(value);
    }
    default:
      return String(value);
  }
}

function buildThemeBlock(tokens) {
  // Group by top-level key, preserving insertion order
  const groups = new Map();
  for (const [tokenPath, token] of Object.entries(tokens)) {
    const category = tokenPath.split('.')[0];
    if (!groups.has(category)) groups.set(category, []);
    groups.get(category).push([tokenPath, token]);
  }

  const lines = ['@theme {'];

  for (const [category, entries] of groups) {
    const label = CATEGORY_LABELS[category] ?? category;
    lines.push(`  /* ===== ${label} ===== */`);
    lines.push('');
    for (const [tokenPath, token] of entries) {
      const varName = pathToCSSVar(tokenPath);
      const cssValue = formatValue(token);
      lines.push(`  ${varName}: ${cssValue};`);
    }
    lines.push('');
  }

  lines.push('}');
  return lines.join('\n');
}

function main() {
  if (!fs.existsSync(TOKENS_FILE)) {
    console.error(`Token file not found: ${TOKENS_FILE}`);
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(TOKENS_FILE, 'utf-8'));
  const tokens = flattenTokens(raw);
  const count = Object.keys(tokens).length;

  const themeBlock = buildThemeBlock(tokens);

  const css = fs.readFileSync(GLOBALS_CSS, 'utf-8');
  // Match @theme { ... } — no nested blocks in @theme so non-greedy is safe
  const updated = css.replace(/@theme\s*\{[\s\S]*?\n\}/, themeBlock);

  if (updated === css) {
    console.error('Error: @theme { } block not found in globals.css');
    process.exit(1);
  }

  fs.writeFileSync(GLOBALS_CSS, updated, 'utf-8');
  console.log(`Synced ${count} tokens → src/styles/globals.css`);
}

main();
