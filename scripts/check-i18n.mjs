#!/usr/bin/env node
/**
 * Translation key audit.
 * Finds every literal t('key') call in src/ and reports keys missing from any of the
 * id / en / zh dictionaries (per-language files + trilingual files merged at runtime).
 * Usage: node scripts/check-i18n.mjs   (exits with code 1 when keys are missing)
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const srcDir = join(root, 'src');
const trDir = join(srcDir, 'i18n', 'translations');

const keyPattern = /^\s*'([^']+)'\s*:/gm;
const keysIn = (file) => new Set([...readFileSync(file, 'utf8').matchAll(keyPattern)].map((m) => m[1]));

const tri = new Set();
for (const f of ['sections.ts', 'faq.ts', 'pages.ts', 'seo.ts']) {
  for (const k of keysIn(join(trDir, f))) tri.add(k);
}
const dicts = Object.fromEntries(
  ['id', 'en', 'zh'].map((lang) => [lang, new Set([...keysIn(join(trDir, `${lang}.ts`)), ...tri])])
);

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name === 'i18n' ? [] : walk(p);
    return ['.ts', '.tsx'].includes(extname(p)) ? [p] : [];
  });

const callPattern = /\bt[r]?\(\s*'([^'$]+)'\s*\)/g;
const missing = [];
let used = 0;
for (const file of walk(srcDir)) {
  const text = readFileSync(file, 'utf8');
  for (const m of text.matchAll(callPattern)) {
    used++;
    const key = m[1];
    const absent = ['id', 'en', 'zh'].filter((lang) => !dicts[lang].has(key));
    if (absent.length) missing.push(`${file.replace(root, '')}: '${key}' missing in ${absent.join(', ')}`);
  }
}

console.log(`Checked ${used} literal translation calls.`);
if (missing.length) {
  console.log([...new Set(missing)].join('\n'));
  process.exit(1);
}
console.log('All literal keys exist in id, en and zh.');
