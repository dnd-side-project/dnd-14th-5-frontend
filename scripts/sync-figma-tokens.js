#!/usr/bin/env node
// Reads tokens/tokens.json (Token Studio push) and syncs:
//   - Colors/Mode 1  → src/styles/globals.css @theme colors
//   - Typography/Mode 1 → src/styles/typography.css @utility classes
//   - Primitive tokens (font/radius/shadow) → src/styles/globals.css @theme

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TOKENS_FILE = path.join(ROOT, 'tokens/tokens.json');
const GLOBALS_CSS = path.join(ROOT, 'src/styles/globals.css');
const TYPO_CSS = path.join(ROOT, 'src/styles/typography.css');

// ─── Color extraction ──────────────────────────────────────────────────────

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

function stripVariantPrefix(name) {
  return name.replace(/^[A-Z][a-z]?/, '');
}

function extractColors(colorSet) {
  const tokens = {};
  for (const [groupName, groupVal] of Object.entries(colorSet)) {
    if (String(groupName).startsWith('$')) continue;

    // Top-level single color (e.g. Primary → --color-primary-base)
    const leafVal = groupVal?.['$value'] ?? groupVal?.value;
    if (leafVal !== undefined) {
      const cssVar = `color-${groupName.toLowerCase()}${groupName === 'Primary' ? '-base' : ''}`;
      tokens[cssVar] = leafVal;
      continue;
    }

    const prefix = FIGMA_GROUP_PREFIX[groupName];
    if (!prefix || typeof groupVal !== 'object') continue;

    for (const [variantName, variantVal] of Object.entries(groupVal)) {
      if (String(variantName).startsWith('$')) continue;
      const val = variantVal?.['$value'] ?? variantVal?.value;
      if (val === undefined) continue;
      tokens[`color-${prefix}-${stripVariantPrefix(variantName)}`] = val;
    }
  }

  if (tokens['color-primary-base']) {
    tokens['color-primary'] = 'var(--color-primary-base)';
    tokens['color-primary-hover'] = 'var(--color-y-100)';
  }
  return tokens;
}

// ─── Typography extraction ─────────────────────────────────────────────────

const FONT_WEIGHT_VAR = {
  400: 'var(--font-weight-regular)',
  600: 'var(--font-weight-semibold)',
  700: 'var(--font-weight-bold)',
};

function fontSizeVar(px) {
  return `var(--font-size-${px})`;
}
function lineHeightVar(lh) {
  return `var(--line-height-${Math.round(Number(lh) * 100)})`;
}
function letterSpacingVar(v) {
  return Number(v) === -0.035 ? 'var(--letter-spacing-tight)' : `${v}em`;
}
function fontWeightVar(w) {
  return FONT_WEIGHT_VAR[Number(w)] ?? String(w);
}

function getLeaf(obj, ...keys) {
  let cur = obj;
  for (const k of keys) {
    if (!cur || typeof cur !== 'object') return undefined;
    cur = cur[k];
  }
  return cur?.['$value'] ?? cur?.value;
}

function extractTypography(typoSet) {
  const roles = [];
  const props = [
    'fontFamily',
    'fontSize',
    'lineHeight',
    'fontWeight',
    'letterSpacing',
  ];

  // Discover roles from fontSize keys (most reliable)
  const fontSizeNode = typoSet?.fontSize ?? {};
  for (const [category, variants] of Object.entries(fontSizeNode)) {
    if (String(category).startsWith('$') || typeof variants !== 'object')
      continue;
    for (const variantName of Object.keys(variants)) {
      if (String(variantName).startsWith('$')) continue;
      roles.push([category, variantName]);
    }
  }

  return roles.map(([category, variant]) => {
    const className = `font-${category}-${variant}`;
    const fontSize = getLeaf(typoSet, 'fontSize', category, variant);
    const lineHeight = getLeaf(typoSet, 'lineHeight', category, variant);
    const fontWeight = getLeaf(typoSet, 'fontWeight', category, variant);
    const letterSpacing = getLeaf(typoSet, 'letterSpacing', category, variant);

    return {
      className,
      fontSize: fontSize !== undefined ? fontSizeVar(fontSize) : null,
      lineHeight: lineHeight !== undefined ? lineHeightVar(lineHeight) : null,
      fontWeight: fontWeight !== undefined ? fontWeightVar(fontWeight) : null,
      letterSpacing:
        letterSpacing !== undefined ? letterSpacingVar(letterSpacing) : null,
    };
  });
}

function buildTypographyCss(roles) {
  return roles
    .map(({ className, fontSize, lineHeight, fontWeight, letterSpacing }) => {
      const lines = [`@utility ${className} {`];
      if (fontSize) lines.push(`  font-size: ${fontSize};`);
      if (lineHeight) lines.push(`  line-height: ${lineHeight};`);
      if (fontWeight) lines.push(`  font-weight: ${fontWeight};`);
      if (letterSpacing) lines.push(`  letter-spacing: ${letterSpacing};`);
      lines.push('}');
      return lines.join('\n');
    })
    .join('\n\n');
}

// ─── Design token (primitive) extraction ───────────────────────────────────

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
    const parts = ref.split('.').filter((p) => p.toUpperCase() !== 'DEFAULT');
    return `var(--${parts.join('-')})`;
  });
}

function formatDesignValue({ value, type }) {
  if (String(value).startsWith('var(') || String(value).includes('{')) {
    return String(value).includes('{')
      ? resolveReferences(value)
      : String(value);
  }
  switch (type) {
    case 'borderRadius':
    case 'fontSize':
    case 'fontSizes': {
      const num = parseFloat(value);
      if (!isNaN(num) && String(num) === String(value))
        return `${(num / 16).toFixed(4).replace(/\.?0+$/, '')}rem`;
      return String(value);
    }
    case 'boxShadow': {
      if (Array.isArray(value))
        return value
          .map((s) => formatDesignValue({ value: s, type }))
          .join(', ');
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

// ─── globals.css @theme builder ────────────────────────────────────────────

const CATEGORY_LABELS = {
  font: 'Typography',
  'line-height': 'Line Height',
  'letter-spacing': 'Letter Spacing',
  radius: 'Radius',
  shadow: 'Shadow',
};

function buildThemeBlock(colorTokens, designTokens) {
  const lines = ['@theme {'];

  if (Object.keys(colorTokens).length > 0) {
    lines.push('  /* ===== Colors ===== */', '');
    for (const [cssVar, val] of Object.entries(colorTokens))
      lines.push(`  --${cssVar}: ${val};`);
    lines.push('');
  }

  const groups = new Map();
  for (const [tokenPath, token] of Object.entries(designTokens)) {
    const category = tokenPath.split('.')[0];
    if (category === 'color') continue;
    if (!groups.has(category)) groups.set(category, []);
    groups.get(category).push([tokenPath, token]);
  }

  for (const [category, entries] of groups) {
    lines.push(
      `  /* ===== ${CATEGORY_LABELS[category] ?? category} ===== */`,
      '',
    );
    for (const [tokenPath, token] of entries) {
      const cssVar =
        '--' +
        tokenPath
          .split('.')
          .filter((p) => p.toUpperCase() !== 'DEFAULT')
          .join('-');
      lines.push(`  ${cssVar}: ${formatDesignValue(token)};`);
    }
    lines.push('');
  }

  lines.push('}');
  return lines.join('\n');
}

// ─── Main ──────────────────────────────────────────────────────────────────

function main() {
  if (!fs.existsSync(TOKENS_FILE)) {
    console.error(`Not found: ${TOKENS_FILE}`);
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(TOKENS_FILE, 'utf-8'));

  const colorsKey = Object.keys(raw).find(
    (k) => k.startsWith('Colors/') || k === 'Colors',
  );
  const typoKey = Object.keys(raw).find(
    (k) => k.startsWith('Typography/') || k === 'Typography',
  );

  // Colors
  const colorTokens = colorsKey ? extractColors(raw[colorsKey]) : {};
  console.log(`Colors: ${Object.keys(colorTokens).length} tokens`);

  // Typography → typography.css
  if (typoKey) {
    const roles = extractTypography(raw[typoKey]);
    if (roles.length > 0) {
      fs.writeFileSync(TYPO_CSS, buildTypographyCss(roles) + '\n', 'utf-8');
      console.log(
        `Typography: ${roles.length} utilities → src/styles/typography.css`,
      );
    }
  }

  // Primitive design tokens (non-color, non-multiset keys) → globals.css
  // Filter out Token Studio system keys and multi-set entries (contain '/')
  const primitiveRaw = Object.fromEntries(
    Object.entries(raw).filter(([k]) => !k.startsWith('$') && !k.includes('/')),
  );
  const designTokens = flattenDesignTokens(primitiveRaw);
  console.log(`Design tokens: ${Object.keys(designTokens).length}`);

  const css = fs.readFileSync(GLOBALS_CSS, 'utf-8');
  const updated = css.replace(
    /@theme\s*\{[\s\S]*?\n\}/,
    buildThemeBlock(colorTokens, designTokens),
  );

  if (updated === css) {
    console.error('Error: @theme { } block not found in globals.css');
    process.exit(1);
  }

  fs.writeFileSync(GLOBALS_CSS, updated, 'utf-8');
  console.log('Done → src/styles/globals.css');
}

main();
