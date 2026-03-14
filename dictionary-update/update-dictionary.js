#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const SCRIPT_DIR = __dirname;
const REPO_ROOT = resolveRepoRoot(SCRIPT_DIR);
const RULES_PATH = path.join(REPO_ROOT, 'RULES.md');
const LANG_DIR = path.join(REPO_ROOT, 'lang');

function resolveRepoRoot(startDir) {
  const direct = path.join(startDir, 'RULES.md');
  if (fs.existsSync(direct)) return startDir;
  const parent = path.dirname(startDir);
  const parentRules = path.join(parent, 'RULES.md');
  if (fs.existsSync(parentRules)) return parent;
  return startDir;
}

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function usage() {
  console.log(
    [
      'Usage:',
      '  update-dictionary <language> <length-count> [<length-count> ...]',
      '  update-dictionary verify [language]',
      '',
      'Examples:',
      '  update-dictionary hu 3-100 4-100 5-100',
      '  update-dictionary verify',
      '  update-dictionary verify hu',
      '',
      'Notes:',
      '  - <length-count> format: 3-100 means add 100 new words of length 3.',
      '  - Rules (min/max length) are read from RULES.md.',
      '  - verify mode removes invalid words from existing dictionaries.',
    ].join('\n')
  );
}

function parseRules() {
  if (!fs.existsSync(RULES_PATH)) fail(`RULES.md not found at ${RULES_PATH}`);
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
  if (argv.length < 1) {
    usage();
    process.exit(1);
  }

  const verify = argv.some((t) => t.toLowerCase() === 'verify');
  const nonVerify = argv.filter((t) => t.toLowerCase() !== 'verify');

  let language = null;
  const specs = new Map();

  for (const token of nonVerify) {
    const spec = token.match(/^(\d+)-(\d+)$/);
    if (spec) {
      const len = Number(spec[1]);
      const count = Number(spec[2]);
      if (!Number.isInteger(len) || !Number.isInteger(count) || len < 1 || count < 0) {
        fail(`Invalid spec "${token}"`);
      }
      if (len < min || len > max) {
        fail(`Length ${len} is outside rules range ${min}..${max}`);
      }
      specs.set(len, (specs.get(len) || 0) + count);
      continue;
    }

    if (!language) {
      language = token.toLowerCase();
      continue;
    }

    fail(`Unexpected argument: "${token}"`);
  }

  return { verify, language, specs };
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
    { type: 'dic', file: path.join(REPO_ROOT, `${language}.dic`) },
    { type: 'dic', file: path.join(REPO_ROOT, `${language}_HU.dic`) },
    { type: 'dic', file: path.join(REPO_ROOT, `${language}_US.dic`) },
    { type: 'dic', file: path.join(SCRIPT_DIR, `${language}.dic`) },
    { type: 'dic', file: path.join(SCRIPT_DIR, `${language}_HU.dic`) },
    { type: 'dic', file: path.join(SCRIPT_DIR, `${language}_US.dic`) },
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

function listLanguages() {
  if (!fs.existsSync(LANG_DIR)) fail(`Language directory not found: ${LANG_DIR}`);
  return fs
    .readdirSync(LANG_DIR)
    .filter((name) => name.endsWith('.words'))
    .map((name) => name.replace(/\.words$/, ''))
    .sort();
}

function loadSourceSet(language, min, max, existingRaw) {
  const source =
    findSourceCandidates(language) ||
    {
      sourcePath: `${targetDictionaryPath(language)} (self)`,
      words: existingRaw,
    };
  const sourceValid = toValidUnique(source.words, language, min, max, null);
  return {
    sourcePath: source.sourcePath,
    sourceValid,
    sourceSet: new Set(sourceValid),
  };
}

function verifyLanguage(language, min, max) {
  const dictPath = targetDictionaryPath(language);
  if (!fs.existsSync(dictPath)) {
    fail(`Dictionary not found: ${dictPath}`);
  }

  const existingRaw = parseWordLines(fs.readFileSync(dictPath, 'utf8'));
  const { sourcePath, sourceSet } = loadSourceSet(language, min, max, existingRaw);
  const cleaned = toValidUnique(existingRaw, language, min, max, sourceSet);

  fs.writeFileSync(dictPath, cleaned.join('\n') + (cleaned.length ? '\n' : ''), 'utf8');

  console.log(`Verified ${dictPath}`);
  console.log(`Rules: min=${min}, max=${max}`);
  console.log(`Source: ${sourcePath}`);
  console.log(`Removed invalid/unsupported existing words: ${existingRaw.length - cleaned.length}`);
  console.log(`Final word count: ${cleaned.length}`);
  console.log(`Length histogram: ${histogram(cleaned)}`);
}

function updateLanguage(language, specs, min, max) {
  if (!language) {
    fail('Language is required when adding words. Example: update-dictionary hu 3-100 4-100');
  }
  if (specs.size < 1) {
    fail('At least one <length-count> spec is required when adding words.');
  }

  const dictPath = targetDictionaryPath(language);
  if (!fs.existsSync(dictPath)) {
    fail(`Dictionary not found: ${dictPath}`);
  }

  const existingRaw = parseWordLines(fs.readFileSync(dictPath, 'utf8'));
  const { sourcePath, sourceValid, sourceSet } = loadSourceSet(language, min, max, existingRaw);
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
  console.log(`Source: ${sourcePath} (${sourceValid.length} valid candidates)`);
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

function main() {
  const { min, max } = parseRules();
  const { verify, language, specs } = parseArgs(process.argv.slice(2), min, max);

  if (verify && specs.size === 0) {
    const languages = language ? [language] : listLanguages();
    for (const lang of languages) {
      verifyLanguage(lang, min, max);
    }
    return;
  }

  updateLanguage(language, specs, min, max);
}

main();
