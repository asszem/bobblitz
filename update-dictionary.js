#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const RULES_PATH = path.join(ROOT, 'RULES.md');
const LANG_DIR = path.join(ROOT, 'lang');

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function usage() {
  console.log(
    [
      'Usage:',
      '  update-dictionary <language> <length-count> [<length-count> ...]',
      '',
      'Example:',
      '  update-dictionary hu 3-100 4-100 5-100',
      '',
      'Notes:',
      '  - <length-count> format: 3-100 means add 100 new words of length 3.',
      '  - Rules (min/max length) are read from RULES.md.',
      '  - Source candidates are read from lang/<language>.source.words or known .dic files.',
    ].join('\n')
  );
}

function parseRules() {
  const raw = fs.readFileSync(RULES_PATH, 'utf8');
  const minMatch = raw.match(/Words minimum length:\s*\*\*(\d+)\*\*/i);
  const maxMatch = raw.match(/Words maximum length:\s*\*\*(\d+)\*\*/i);
  const min = minMatch ? Number(minMatch[1]) : 3;
  const max = maxMatch ? Number(maxMatch[1]) : 8;
  if (!Number.isInteger(min) || !Number.isInteger(max) || min < 1 || max < min) {
    fail('Invalid min/max length in RULES.md');
  }
  return { min, max };
}

function parseArgs(argv, min, max) {
  if (argv.length < 2) {
    usage();
    process.exit(1);
  }
  const language = argv[0].toLowerCase();
  const specs = new Map();

  for (const token of argv.slice(1)) {
    const match = token.match(/^(\d+)-(\d+)$/);
    if (!match) {
      fail(`Invalid spec "${token}". Expected format <length-count>, e.g. 4-120`);
    }
    const len = Number(match[1]);
    const count = Number(match[2]);
    if (!Number.isInteger(len) || !Number.isInteger(count) || len < 1 || count < 0) {
      fail(`Invalid spec "${token}"`);
    }
    if (len < min || len > max) {
      fail(`Length ${len} is outside rules range ${min}..${max}`);
    }
    specs.set(len, (specs.get(len) || 0) + count);
  }
  return { language, specs };
}

function targetDictionaryPath(language) {
  return path.join(LANG_DIR, `${language}.words`);
}

function normalizeWord(word, language) {
  const locale = language === 'hu' ? 'hu-HU' : 'en-US';
  return word.trim().toLocaleUpperCase(locale);
}

function wordLength(word) {
  return [...word].length;
}

function lettersOnlyRegex(language) {
  if (language === 'en') return /^[A-Z]+$/;
  return /^\p{L}+$/u;
}

function parseWordLines(text) {
  return text.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
}

function parseHunspellDic(text) {
  const lines = text.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  const start = /^\d+$/.test(lines[0] || '') ? 1 : 0;
  const words = [];
  for (let i = start; i < lines.length; i++) {
    const base = lines[i].split('/')[0].trim();
    if (base) words.push(base);
  }
  return words;
}

function findSourceCandidates(language) {
  const candidates = [
    { type: 'words', file: path.join(LANG_DIR, `${language}.source.words`) },
    { type: 'dic', file: path.join(ROOT, `${language}.dic`) },
    { type: 'dic', file: path.join(ROOT, `${language}_HU.dic`) },
    { type: 'dic', file: path.join(ROOT, `${language}_US.dic`) },
  ];

  if (language === 'hu') {
    candidates.push({ type: 'dic', file: 'E:/hu_HU.dic' });
  }

  for (const src of candidates) {
    if (!fs.existsSync(src.file)) continue;
    const raw = fs.readFileSync(src.file, 'utf8');
    const words = src.type === 'dic' ? parseHunspellDic(raw) : parseWordLines(raw);
    if (words.length > 0) {
      return { sourcePath: src.file, words };
    }
  }
  return null;
}

function toValidUnique(words, language, min, max, sourceSetOrNull) {
  const out = [];
  const seen = new Set();
  const re = lettersOnlyRegex(language);

  for (const raw of words) {
    const w = normalizeWord(raw, language);
    const len = wordLength(w);
    if (len < min || len > max) continue;
    if (!re.test(w)) continue;
    if (sourceSetOrNull && !sourceSetOrNull.has(w)) continue;
    if (seen.has(w)) continue;
    seen.add(w);
    out.push(w);
  }

  return out;
}

function histogram(words) {
  const hist = {};
  for (const w of words) {
    const len = wordLength(w);
    hist[len] = (hist[len] || 0) + 1;
  }
  return Object.keys(hist)
    .map(Number)
    .sort((a, b) => a - b)
    .map((k) => `${k}:${hist[k]}`)
    .join(' ');
}

function main() {
  if (!fs.existsSync(RULES_PATH)) fail('RULES.md not found');

  const { min, max } = parseRules();
  const { language, specs } = parseArgs(process.argv.slice(2), min, max);
  const dictPath = targetDictionaryPath(language);

  if (!fs.existsSync(dictPath)) {
    fail(`Dictionary not found: ${dictPath}`);
  }

  const existingRaw = parseWordLines(fs.readFileSync(dictPath, 'utf8'));
  const source =
    findSourceCandidates(language) ||
    {
      sourcePath: `${dictPath} (self)`,
      words: existingRaw,
    };

  const sourceValid = toValidUnique(source.words, language, min, max, null);
  const sourceSet = new Set(sourceValid);
  const cleanedExisting = toValidUnique(existingRaw, language, min, max, sourceSet);
  const existingSet = new Set(cleanedExisting);

  const addedByLength = {};
  for (const len of specs.keys()) {
    addedByLength[len] = 0;
  }

  const toAdd = [];
  for (const w of sourceValid) {
    const len = wordLength(w);
    const need = specs.get(len) || 0;
    if (need <= 0) continue;
    if (addedByLength[len] >= need) continue;
    if (existingSet.has(w)) continue;
    existingSet.add(w);
    toAdd.push(w);
    addedByLength[len]++;
  }

  for (const [len, need] of specs.entries()) {
    if ((addedByLength[len] || 0) < need) {
      fail(
        `Not enough new unique words for length ${len}. Requested ${need}, got ${addedByLength[len] || 0}`
      );
    }
  }

  const finalWords = cleanedExisting.concat(toAdd);
  fs.writeFileSync(dictPath, finalWords.join('\n') + '\n', 'utf8');

  console.log(`Updated ${dictPath}`);
  console.log(`Rules: min=${min}, max=${max}`);
  console.log(`Source: ${source.sourcePath} (${sourceValid.length} valid candidates)`);
  console.log(`Removed invalid/unsupported existing words: ${existingRaw.length - cleanedExisting.length}`);
  console.log(`Added new words: ${toAdd.length}`);
  console.log(
    `Added by length: ${Object.keys(addedByLength)
      .map(Number)
      .sort((a, b) => a - b)
      .map((len) => `${len}:${addedByLength[len]}`)
      .join(' ')}`
  );
  console.log(`Final word count: ${finalWords.length}`);
  console.log(`Length histogram: ${histogram(finalWords)}`);
}

main();
