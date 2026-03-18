#!/usr/bin/env node
// update-todo.js — applies all # Update rules from todo.md and rewrites the file.

const fs = require('fs');
const path = require('path');

const TODO_FILE = path.join(__dirname, 'todo.md');

// ─── Helpers ────────────────────────────────────────────────────────────────

function now() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function sectionPriority(header) {
  const m = header.match(/^#{1,3}\s+P(\d+)/i);
  return m ? parseInt(m[1], 10) : 999;
}

function itemPriority(line) {
  const m = line.match(/^- \[.*?\]\s+P(\d+)/i);
  return m ? parseInt(m[1], 10) : 999;
}

function isOpenInTodo(line) {
  // Only `[ ]` is open
  return /^- \[ \]/.test(line);
}

function isOpenInDone(line) {
  // `[ ]` or `[]` is open
  return /^- \[ \]/.test(line) || /^- \[\]/.test(line);
}

function stripCounts(header) {
  return header.replace(/\s*\(open:\s*\d+,\s*done:\s*\d+\)/, '')
               .replace(/\s*\(done:\s*\d+\)/, '')
               .trimEnd();
}

function sectionKey(header) {
  // e.g. "## P2 Game modes" → "P2 Game modes"
  return stripCounts(header).replace(/^#+\s+/, '').trim();
}

function headerDepth(line) {
  const m = line.match(/^(#{1,6})\s/);
  return m ? m[1].length : 0;
}

// ─── Parse ──────────────────────────────────────────────────────────────────
// Returns { todo: Section[], done: Section[], rules: string[] }
// Section = { header: string, depth: number, subsections: Section[], items: string[], trailing: string[] }

function parseFile(content) {
  const lines = content.split('\n');
  let todoLines = [], doneLines = [], rulesLines = [];
  let which = null;

  for (const line of lines) {
    if (line.startsWith('# Todo')) { which = 'todo'; continue; }
    if (line.startsWith('# Done')) { which = 'done'; continue; }
    if (line.startsWith('# Update rules')) { which = 'rules'; continue; }
    if (which === 'todo') todoLines.push(line);
    else if (which === 'done') doneLines.push(line);
    else if (which === 'rules') rulesLines.push(line);
  }

  return {
    todo: parseSections(todoLines, 2),
    done: parseSections(doneLines, 2),
    rules: rulesLines,
  };
}

// Parse a block of lines into a flat list of sections at given root depth.
// Each section has { header, depth, items: [], subsections: [], key }
function parseSections(lines, rootDepth) {
  // Build a tree: [ { header, depth, items, subsections } ]
  const root = { header: null, depth: rootDepth - 1, items: [], subsections: [], key: '__root__' };
  const stack = [root];

  for (const line of lines) {
    if (!line.trim()) continue; // skip blank lines (we'll re-add them on output)
    const depth = headerDepth(line);
    if (depth >= rootDepth) {
      const section = { header: line.trim(), depth, items: [], subsections: [], key: sectionKey(line) };
      // pop stack until parent depth < this depth
      while (stack.length > 1 && stack[stack.length-1].depth >= depth) stack.pop();
      stack[stack.length-1].subsections.push(section);
      stack.push(section);
    } else {
      // Any non-blank, non-header line is treated as an item; fixItemFormat will normalize it
      stack[stack.length-1].items.push(line.trim());
    }
  }

  // Items before any section header go into an Uncategorized section
  if (root.items.length > 0) {
    const uncatKey = 'P0 Uncategorized';
    let uncat = root.subsections.find(s => s.key === uncatKey);
    if (!uncat) {
      uncat = { header: '## P0 Uncategorized', depth: rootDepth, items: [], subsections: [], key: uncatKey };
      root.subsections.unshift(uncat);
    }
    uncat.items.unshift(...root.items);
    root.items = [];
  }

  return root.subsections;
}

// ─── Fix item format ─────────────────────────────────────────────────────────

function fixItemFormat(line) {
  let fixed = line;
  // ensure starts with `- `
  if (!fixed.startsWith('- ')) fixed = '- ' + fixed.replace(/^-?\s*/, '');
  // ensure has checkbox
  if (!/^- \[/.test(fixed)) fixed = fixed.replace(/^- /, '- [ ] ');
  // ensure has priority after checkbox
  if (/^- \[.*?\]\s+(?!P\d)/.test(fixed) || /^- \[.*?\]\s*$/.test(fixed)) {
    fixed = fixed.replace(/^(- \[.*?\])\s*(.*)$/, (_, cb, rest) => {
      if (rest && !/^P\d/.test(rest)) return `${cb} P0 - ${rest}`;
      if (!rest) return `${cb} P0 - `;
      return `${cb} ${rest}`;
    });
  }
  return fixed;
}

// ─── Move items ──────────────────────────────────────────────────────────────

function moveToDone(item, ts) {
  // remove existing timestamp if present, then append new one
  const base = item.replace(/\s*- (completed|reopened) at \d{4}-\d{2}-\d{2} \d{2}:\d{2}$/, '');
  return base + ` - completed at ${ts}`;
}

function moveToTodo(item, ts) {
  const base = item.replace(/\s*- (completed|reopened) at \d{4}-\d{2}-\d{2} \d{2}:\d{2}$/, '');
  return base + ` - reopened at ${ts}`;
}

// Find or create a section by key in an array of sections
function findOrCreateSection(sections, key, templateHeader) {
  let sec = sections.find(s => s.key === key);
  if (!sec) {
    sec = { header: templateHeader, depth: headerDepth(templateHeader), items: [], subsections: [], key };
    sections.push(sec);
  }
  return sec;
}

// ─── Apply rules ─────────────────────────────────────────────────────────────

function applyRules(parsed) {
  const ts = now();
  const changes = [];

  // Walk todo sections and subsections; collect items to move
  function walkTodo(sections, doneSections, parentKey) {
    for (const sec of sections) {
      const toMove = [];
      const toKeep = [];

      // Process subsections first
      if (sec.subsections.length > 0) {
        const doneSec = findOrCreateSection(doneSections, sec.key, sec.header);
        walkTodo(sec.subsections, doneSec.subsections, sec.key);
      }

      for (const item of sec.items) {
        const fixed = fixItemFormat(item);
        if (fixed !== item) changes.push({ action: 'format-fixed', item: fixed, was: item, section: sec.key });
        if (!isOpenInTodo(fixed)) {
          const movedItem = moveToDone(fixed, ts);
          toMove.push({ item: movedItem, section: sec });
          changes.push({ action: 'todo→done', item: fixed, section: sec.key });
        } else {
          toKeep.push(fixed);
        }
      }
      sec.items = toKeep;

      // Place moved items in matching Done section
      for (const { item } of toMove) {
        const doneSec = findOrCreateSection(doneSections, sec.key, sec.header);
        doneSec.items.push(item);
      }
    }
  }

  // Walk done sections; collect items to reopen
  function walkDone(sections, todoSections) {
    for (const sec of sections) {
      const toReopen = [];
      const toKeep = [];

      if (sec.subsections.length > 0) {
        const todoSec = findOrCreateSection(todoSections, sec.key, sec.header);
        walkDone(sec.subsections, todoSec.subsections);
      }

      for (const item of sec.items) {
        if (isOpenInDone(item)) {
          const reopenedItem = moveToTodo(item, ts);
          toReopen.push({ item: reopenedItem, section: sec });
          changes.push({ action: 'done→todo', item, section: sec.key });
        } else {
          toKeep.push(item);
        }
      }
      sec.items = toKeep;

      for (const { item } of toReopen) {
        const todoSec = findOrCreateSection(todoSections, sec.key, sec.header);
        todoSec.items.push(item);
      }
    }
  }

  walkTodo(parsed.todo, parsed.done, null);
  walkDone(parsed.done, parsed.todo);

  // Fix format on all remaining todo items (walkTodo already fixes items it processes;
  // this pass catches any items added directly to done sections during reopening)
  for (const sec of flatSections(parsed.todo)) {
    sec.items = sec.items.map(item => {
      const fixed = fixItemFormat(item);
      if (fixed !== item) changes.push({ action: 'format-fixed', item: fixed, was: item, section: sec.key });
      return fixed;
    });
  }

  // Remove empty Todo sections (no items AND no subsections with items)
  parsed.todo = removeEmpty(parsed.todo);

  // Sort sections by priority
  function sortAndTrack(sections, area) {
    const before = sections.map(s => s.key);
    sortSections(sections);
    const after = sections.map(s => s.key);
    if (before.join() !== after.join())
      changes.push({ action: 'sections-reordered', area, before, after });
  }
  sortAndTrack(parsed.todo, 'Todo');
  sortAndTrack(parsed.done, 'Done');

  // Sort items within each section
  for (const sec of flatSections(parsed.todo)) {
    const before = [...sec.items];
    sec.items = stableSort(sec.items, itemPriority);
    if (sec.items.some((v, i) => v !== before[i]))
      changes.push({ action: 'items-reordered', section: sec.key });
  }
  for (const sec of flatSections(parsed.done)) {
    const before = [...sec.items];
    sec.items = stableSort(sec.items, itemPriority);
    if (sec.items.some((v, i) => v !== before[i]))
      changes.push({ action: 'items-reordered', section: sec.key });
  }

  return changes;
}

function flatSections(sections) {
  const result = [];
  for (const sec of sections) {
    result.push(sec);
    result.push(...flatSections(sec.subsections));
  }
  return result;
}

function hasContent(sec) {
  if (sec.items.length > 0) return true;
  return sec.subsections.some(hasContent);
}

function removeEmpty(sections) {
  return sections.filter(sec => {
    sec.subsections = removeEmpty(sec.subsections);
    return hasContent(sec);
  });
}

function sortSections(sections) {
  sections.sort((a, b) => sectionPriority(a.header) - sectionPriority(b.header));
  for (const sec of sections) sortSections(sec.subsections);
}

function stableSort(arr, keyFn) {
  return arr.map((v, i) => ({ v, i, k: keyFn(v) }))
            .sort((a, b) => a.k !== b.k ? a.k - b.k : a.i - b.i)
            .map(x => x.v);
}

// ─── Count items ─────────────────────────────────────────────────────────────

function countItems(sec) {
  let own = sec.items.length;
  for (const sub of sec.subsections) own += countItems(sub);
  return own;
}

function countOpen(sec) {
  let own = sec.items.filter(isOpenInTodo).length;
  for (const sub of sec.subsections) own += countOpen(sub);
  return own;
}

// ─── Render ──────────────────────────────────────────────────────────────────

function renderHeader(sec, isDone, doneSections) {
  const base = stripCounts(sec.header);
  if (isDone) {
    const count = countItems(sec);
    return `${base} (done: ${count})`;
  } else {
    const open = countOpen(sec);
    const doneSec = (doneSections || []).find(s => s.key === sec.key);
    const done = doneSec ? countItems(doneSec) : 0;
    return `${base} (open: ${open}, done: ${done})`;
  }
}

function renderSection(sec, isDone, doneSections, lines) {
  lines.push(renderHeader(sec, isDone, doneSections));
  for (const sub of sec.subsections) {
    const doneSub = isDone ? null : (doneSections || []).find(s => s.key === sec.key)?.subsections;
    renderSection(sub, isDone, doneSub, lines);
  }
  for (const item of sec.items) lines.push(item);
  lines.push('');
}

function renderFile(parsed) {
  const lines = ['# Todo'];
  for (const sec of parsed.todo) {
    renderSection(sec, false, parsed.done, lines);
  }

  lines.push('# Done');
  lines.push('');
  for (const sec of parsed.done) {
    renderSection(sec, true, null, lines);
  }

  lines.push('# Update rules ');
  lines.push(...parsed.rules);

  return lines.join('\n');
}

// ─── Read rules meta ─────────────────────────────────────────────────────────

function readRulesMeta(rules) {
  let ruleVersion = '(unknown)', scriptVersion = '(unknown)', date = '(unknown)';
  for (const line of rules) {
    const rvm = line.match(/^-\s*rule version:\s*([\d.]+)/i);
    if (rvm) ruleVersion = rvm[1];
    const svm = line.match(/^-\s*script version:\s*([\d.]+)/i);
    if (svm) scriptVersion = svm[1];
    const dm = line.match(/rule update date:\s*(\S+\s+\S+)/i);
    if (dm) date = dm[1];
  }
  return { ruleVersion, scriptVersion, date };
}

// ─── Main ────────────────────────────────────────────────────────────────────

const raw = fs.readFileSync(TODO_FILE, 'utf8');
const parsed = parseFile(raw);
const { ruleVersion, scriptVersion, date } = readRulesMeta(parsed.rules);

if (ruleVersion !== scriptVersion) {
  console.error('\n⚠️  Version mismatch detected!\n');
  console.error(`  Script version : ${scriptVersion}`);
  console.error(`  Rules version  : ${ruleVersion}  (updated ${date})`);
  console.error('\n  The update rules in todo.md have changed since this script was written.');
  console.error('  Please ask the AI to update update-todo.js to rules version ' + ruleVersion + '.\n');
  process.exit(1);
}

const changes = applyRules(parsed);

const output = renderFile(parsed);
fs.writeFileSync(TODO_FILE, output, 'utf8');

// ─── Summary ─────────────────────────────────────────────────────────────────

console.log('\n=== todo.md update complete ===\n');
console.log(`Script version: ${scriptVersion}`);
console.log(`Rules version : ${ruleVersion}`);
console.log(`Rules updated : ${date}`);
console.log(`Run at        : ${now()}`);
console.log('');

if (changes.length === 0) {
  console.log('No changes — file was already up to date.');
} else {
  console.log(`Changes (${changes.length}):`);
  for (const c of changes) {
    if (c.action === 'todo→done') {
      const preview = c.item.replace(/^- \[.*?\]\s+/, '').slice(0, 60);
      console.log(`  ✓ Todo → Done  [${c.section}]  ${preview}`);
    } else if (c.action === 'done→todo') {
      const preview = c.item.replace(/^- \[.*?\]\s+/, '').slice(0, 60);
      console.log(`  ↩ Done → Todo  [${c.section}]  ${preview}`);
    } else if (c.action === 'format-fixed') {
      console.log(`  ✎ Format fixed  [${c.section}]`);
      console.log(`      was: ${c.was}`);
      console.log(`      now: ${c.item}`);
    } else if (c.action === 'sections-reordered') {
      console.log(`  ⇅ Sections reordered  [${c.area}]  ${c.before.join(', ')} → ${c.after.join(', ')}`);
    } else if (c.action === 'items-reordered') {
      console.log(`  ⇅ Items reordered  [${c.section}]`);
    }
  }
}
console.log('');
