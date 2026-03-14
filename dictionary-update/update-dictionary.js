#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const SCRIPT_DIR = __dirname;
const REPO_ROOT = resolveRepoRoot(SCRIPT_DIR);
const RULES_PATH = path.join(REPO_ROOT, 'RULES.md');
const LANG_DIR = path.join(REPO_ROOT, 'lang');
const DICTIONARY_SOURCES_DIR = path.join(SCRIPT_DIR, 'dictionary-sources');

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
      '  update-dictionary <language|all> <verify|build>',
      '',
      'Examples:',
      '  update-dictionary hu verify',
      '  update-dictionary en build',
      '  update-dictionary all verify',
      '',
      'Notes:',
      '  - Rules (min/max length) are read from RULES.md.',
      '  - verify removes words not present in dictionary-sources/<language>/ (and illegal words).',
      '  - build adds every valid missing source word from dictionary-sources/<language>/ to the game dictionary.',
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

function parseArgs(argv) {
  if (argv.length !== 2) {
    usage();
    fail('Expected exactly 2 arguments: <language|all> <verify|build>');
  }
  const target = argv[0].toLowerCase();
  const actionToken = argv[1].toLowerCase();
  const action = actionToken === 'verify'
    ? 'verify'
    : (actionToken === 'build' || actionToken === 'buil' ? 'build' : null);

  if (!action) {
    fail(`Invalid action "${argv[1]}". Use "verify" or "build".`);
  }
  if (target !== 'all' && !/^[a-z]{2,8}$/.test(target)) {
    fail(`Invalid language "${argv[0]}". Use a language code (e.g. en, hu) or "all".`);
  }

  return { target, action };
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

function parseSourceFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.dic') return parseHunspellDic(raw);

  const words = [];
  const lines = raw.split(/\r?\n/);
  for (const lineRaw of lines) {
    const line = lineRaw.trim();
    if (!line || line.startsWith('#')) continue;
    let token = line.split(/\s+/)[0];
    token = token.split('/')[0].trim();
    if (token) words.push(token);
  }
  return words;
}

function walkFilesRecursive(rootDir) {
  const out = [];
  const stack = [rootDir];
  while (stack.length > 0) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (entry.isFile()) out.push(full);
    }
  }
  return out.sort((a, b) => a.localeCompare(b));
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

function loadVerifySourceSet(language, min, max) {
  const sourceDir = path.join(DICTIONARY_SOURCES_DIR, language);
  if (!fs.existsSync(sourceDir)) {
    fail(`Missing source folder for "${language}": ${sourceDir}`);
  }

  const sourceFiles = walkFilesRecursive(sourceDir);
  if (sourceFiles.length < 1) {
    fail(`No source files found for "${language}" in: ${sourceDir}`);
  }

  const sourceWords = [];
  for (const filePath of sourceFiles) {
    sourceWords.push(...parseSourceFile(filePath));
  }

  const sourceValid = toValidUnique(sourceWords, language, min, max, null);
  if (sourceValid.length < 1) {
    fail(`No valid source words parsed for "${language}" from: ${sourceDir}`);
  }

  return {
    sourcePath: `${sourceDir} (${sourceFiles.length} files)`,
    sourceFiles,
    sourceValid,
    sourceSet: new Set(sourceValid),
  };
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

function verifyLanguage(language, min, max) {
  const dictPath = targetDictionaryPath(language);
  if (!fs.existsSync(dictPath)) {
    fail(`Dictionary not found: ${dictPath}`);
  }

  const existingRaw = parseWordLines(fs.readFileSync(dictPath, 'utf8'));
  const { sourcePath, sourceSet, sourceFiles, sourceValid } = loadVerifySourceSet(language, min, max);
  const cleaned = toValidUnique(existingRaw, language, min, max, sourceSet);

  fs.writeFileSync(dictPath, cleaned.join('\n') + (cleaned.length ? '\n' : ''), 'utf8');

  console.log(`Verified ${dictPath}`);
  console.log(`Rules: min=${min}, max=${max}`);
  console.log(`Source: ${sourcePath}`);
  console.log(`Source files used: ${sourceFiles.length}`);
  console.log(`Valid source words: ${sourceValid.length}`);
  console.log(`Removed invalid/unsupported existing words: ${existingRaw.length - cleaned.length}`);
  console.log(`Final word count: ${cleaned.length}`);
  console.log(`Length histogram: ${histogram(cleaned)}`);
}

function buildLanguage(language, min, max) {
  if (!language) {
    fail('Language is required for build mode. Example: update-dictionary hu build');
  }

  const dictPath = targetDictionaryPath(language);
  if (!fs.existsSync(dictPath)) {
    fail(`Dictionary not found: ${dictPath}`);
  }

  const existingRaw = parseWordLines(fs.readFileSync(dictPath, 'utf8'));
  const { sourcePath, sourceFiles, sourceValid } = loadVerifySourceSet(language, min, max);
  const cleanedExisting = toValidUnique(existingRaw, language, min, max, null);
  const existingSet = new Set(cleanedExisting);

  const toAdd = [];
  for (const w of sourceValid) {
    if (existingSet.has(w)) continue;
    existingSet.add(w);
    toAdd.push(w);
  }

  const finalWords = cleanedExisting.concat(toAdd);
  fs.writeFileSync(dictPath, finalWords.join('\n') + (finalWords.length ? '\n' : ''), 'utf8');

  console.log(`Built ${dictPath}`);
  console.log(`Rules: min=${min}, max=${max}`);
  console.log(`Source: ${sourcePath}`);
  console.log(`Source files used: ${sourceFiles.length}`);
  console.log(`Valid source words: ${sourceValid.length}`);
  console.log(`Removed invalid existing words: ${existingRaw.length - cleanedExisting.length}`);
  console.log(`Added unique words: ${toAdd.length}`);
  console.log(`Final word count: ${finalWords.length}`);
  console.log(`Length histogram: ${histogram(finalWords)}`);
}

function resolveTargetLanguages(target) {
  const available = listLanguages();
  if (target === 'all') return available;
  if (!available.includes(target)) {
    fail(`Unknown language "${target}". Available: ${available.join(', ')}`);
  }
  return [target];
}

function main() {
  const { min, max } = parseRules();
  const { target, action } = parseArgs(process.argv.slice(2));
  const languages = resolveTargetLanguages(target);

  for (const lang of languages) {
    if (action === 'verify') verifyLanguage(lang, min, max);
    else buildLanguage(lang, min, max);
  }
}

main();
