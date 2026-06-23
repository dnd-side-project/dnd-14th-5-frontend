#!/usr/bin/env node
// Usage: node scripts/sync-figma-tokens.js
// Reads tokens/colors.json (Token Studio / Figma Variables) + tokens/tokens.json (design tokens)
// and syncs to src/styles/globals.css @theme block.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const COLORS_FILE = path.join(ROOT, 'tokens/colors.json');
const DESIGN_FILE = path.join(ROOT, 'tokens/tokens.json');
const GLOBALS_CSS = path.join(ROOT, 'src/styles/globals.css');

// Figma color group name → CSS prefix
const FIGMA_GROUP_PREFIX = {
  Grey: 'g',
  Gray: 'g',
  Red: 'r',
  Blue: 'b',
  Pink: 'p',
  Green: 'gr',
  Violet: 'v',
  Yellow: 'y',
};

// Strip leading uppercase letters from variant name to get the number
// 'G0' → '0', 'G20' → '20', 'Y50' → '50', 'Gr50' → '50'
function stripVariantPrefix(name) {
  return name.replace(/^[A-Z][a-z]?/, '');
}

// Extract colors from Token Studio multi-set JSON (Figma Variables export)
// Looks for 'Colors/Mode 1' or 'Colors/Mode*' key
function extractFigmaColors(raw) {
  const tokens = {};

  const colorsKey = Object.keys(raw).find(
    (k) => k.startsWith('Colors/') || k === 'Colors',
  );
  if (!colorsKey) return tokens;

  const colorSet = raw[colorsKey];

  for (const [groupName, groupVal] of Object.entries(colorSet)) {
    if (String(groupName).startsWith('$')) continue;

    // Special case: top-level non-group color (e.g. Primary → --color-primary-base)
    if (groupVal && '$value' in groupVal) {
      const cssVar = `color-${groupName.toLowerCase()}${groupName === 'Primary' ? '-base' : ''}`;
      tokens[cssVar] = { value: groupVal['$value'], type: 'color' };
      continue;
    }

    const prefix = FIGMA_GROUP_PREFIX[groupName];
    if (!prefix || typeof groupVal !== 'object') continue;

    for (const [variantName, variantVal] of Object.entries(groupVal)) {
      if (String(variantName).startsWith('$')) continue;
      if (!variantVal || !('$value' in variantVal)) continue;

      const num = stripVariantPrefix(variantName);
      const cssVar = `color-${prefix}-${num}`;
      tokens[cssVar] = { value: variantVal['$value'], type: 'color' };
    }
  }

  // Add semantic color vars that aren't in Figma Variables
  if (tokens['color-primary-base']) {
    tokens['color-primary'] = {
      value: 'var(--color-primary-base)',
      type: 'color',
    };
    tokens['color-primary-hover'] = {
      value: 'var(--color-y-100)',
      type: 'color',
    };
  }

  return tokens;
}

// Flatten our handwritten tokens.json format { a: { b: { value, type } } }
function flattenDesignTokens(obj, prefix = '') {
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    if (String(key).startsWith('$')) continue;
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === 'object' && 'value' in val && 'type' in val) {
      result[fullKey] = val;
    } else if (val && typeof val === 'object') {
      Object.assign(result, flattenDesignTokens(val, fullKey));
    }
  }
  return result;
}

function resolveReferences(value) {
  return String(value).replace(/\{([^}]+)\}/g, (_, ref) => {
    const parts = ref.split('.');
    const filtered = parts.filter((p) => p.toUpperCase() !== 'DEFAULT');
    return `var(--${filtered.join('-')})`;
  });
}

function formatValue(token) {
  const { value, type } = token;

  if (String(value).startsWith('var(') || String(value).includes('{')) {
    return String(value).includes('{')
      ? resolveReferences(value)
      : String(value);
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
        return `${st === 'innerShadow' ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${color}`;
      }
      return String(value);
    }
    default:
      return String(value);
  }
}

const CATEGORY_LABELS = {
  color: 'Colors',
  font: 'Typography',
  'line-height': 'Line Height',
  'letter-spacing': 'Letter Spacing',
  radius: 'Radius',
  shadow: 'Shadow',
};

function buildThemeBlock(colorTokens, designTokens) {
  const lines = ['@theme {'];

  // 1. Colors from Figma
  if (Object.keys(colorTokens).length > 0) {
    lines.push('  /* ===== Colors ===== */');
    lines.push('');
    for (const [cssVar, token] of Object.entries(colorTokens)) {
      lines.push(`  --${cssVar}: ${formatValue(token)};`);
    }
    lines.push('');
  }

  // 2. Non-color tokens from our design file
  const groups = new Map();
  for (const [tokenPath, token] of Object.entries(designTokens)) {
    const category = tokenPath.split('.')[0];
    if (category === 'color') continue; // skip color — already handled above
    if (!groups.has(category)) groups.set(category, []);
    groups.get(category).push([tokenPath, token]);
  }

  for (const [category, entries] of groups) {
    const label = CATEGORY_LABELS[category] ?? category;
    lines.push(`  /* ===== ${label} ===== */`);
    lines.push('');
    for (const [tokenPath, token] of entries) {
      const parts = tokenPath.split('.');
      const filtered = parts.filter((p) => p.toUpperCase() !== 'DEFAULT');
      const cssVar = '--' + filtered.join('-');
      lines.push(`  ${cssVar}: ${formatValue(token)};`);
    }
    lines.push('');
  }

  lines.push('}');
  return lines.join('\n');
}

function main() {
  // Read colors (Token Studio multi-set format)
  let colorTokens = {};
  if (fs.existsSync(COLORS_FILE)) {
    const raw = JSON.parse(fs.readFileSync(COLORS_FILE, 'utf-8'));
    colorTokens = extractFigmaColors(raw);
    console.log(
      `Read ${Object.keys(colorTokens).length} color tokens from tokens/colors.json`,
    );
  } else {
    console.log('tokens/colors.json not found, skipping colors');
  }

  // Read design tokens (our handwritten format)
  let designTokens = {};
  if (fs.existsSync(DESIGN_FILE)) {
    const raw = JSON.parse(fs.readFileSync(DESIGN_FILE, 'utf-8'));
    // If it's Token Studio multi-set format, skip (wrong file)
    if (!raw.$metadata) {
      designTokens = flattenDesignTokens(raw);
      console.log(
        `Read ${Object.keys(designTokens).length} design tokens from tokens/tokens.json`,
      );
    }
  }

  const themeBlock = buildThemeBlock(colorTokens, designTokens);

  const css = fs.readFileSync(GLOBALS_CSS, 'utf-8');
  const updated = css.replace(/@theme\s*\{[\s\S]*?\n\}/, themeBlock);

  if (updated === css) {
    console.error('Error: @theme { } block not found in globals.css');
    process.exit(1);
  }

  fs.writeFileSync(GLOBALS_CSS, updated, 'utf-8');
  const total =
    Object.keys(colorTokens).length + Object.keys(designTokens).length;
  console.log(`Synced ${total} tokens → src/styles/globals.css`);
}

main();
