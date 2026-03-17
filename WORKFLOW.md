# BöbBlitz Development Workflow

## Overview

Work is tracked across three systems: **todo.md** (ideas and goals), **IMPLEMENTATION-TASKS.md** (active implementation work), and **implementations-done.md** (completed tasks). UI elements are referenced by canonical IDs from **COMPONENT-REFERENCES.md**.

---

## 1. Todo list (`todo.md`)

High-level ideas, bugs, and goals. Not tied to implementation steps.

- Items use format: `- [ ] Pn - description`
- Priority: P0 = highest, P10 = lowest
- Checking an item (`[x]`) moves it to `# Done` with a timestamp
- Command: update `todo.md` directly or ask Claude to add/complete items

### `update-todo.js` script

`update-todo.js` is the authoritative processor for `todo.md`. It enforces all formatting rules, moves done/reopened items, recalculates section counts, and keeps the file consistent.

Run it directly from Claude Code with a bang command:
```
!node update-todo.js
```

The script has its own version number that must stay in sync with the rule version in `todo.md`:

```
** Rule version **
- rule version: 1.0
- script version: 1.0
- rule update date: 2026-03-14 15:14
```

**Version responsibilities:**
- **Claude** increments `rule version` (and updates `rule update date`) every time the update rules in `todo.md` are changed.
- **The human** increments `script version` (and updates `update-todo.js`) once the new rules are stable enough to be reflected in the script.

A mismatch between the two versions is intentional and meaningful: `rule version > script version` means rules have been updated but the script hasn't caught up yet. Equal versions mean the script fully reflects the current rules.

---

## 2. Implementation tasks (`IMPLEMENTATION-TASKS.md`)

Concrete, step-by-step implementation work.

### Task format
```
# (status) iN Description

- (status) iN-1 Step one
- (status) iN-2 Step two
```

### Step lifecycle
| Status | Meaning |
|--------|---------|
| `(open)` | Not yet started |
| `(fix)` | Implemented but broken, needs a fix |
| `(change)` | A prior requirement was changed; this step tracks the updated requirement |
| `(test)` | Implemented — awaiting user approval |
| `(done)` | Approved by user |

Status priority markers are also allowed: `(fix!)`, `(fix!!)`, `(change!)`, `(change!!)` and similar. More `!` means higher priority, and those steps should be treated as more important than the same base status without priority markers.

**Claude sets steps to `(test)` after implementing. Only the user sets `(done)`.**

### Header status
- `(open)` — at least one step is open
- `(test)` — all steps implemented, not all approved
- `(done)` — all steps approved

### Command shortcuts (`imp`)
| Command | Action |
|---------|--------|
| `imp i3` | Implement open steps in i3 |
| `imp update` | Reformat all tasks to follow rules |
| `imp move i3 to done` | Move i3 to `implementations-done.md` |
| `imp reopen i3` | Move i3 back from done, mark `(reopen)` |

### Completed tasks
Finished tasks live in `implementations-done.md` with a completion timestamp on the header line.

---

## 3. Component references (`COMPONENT-REFERENCES.md`)

Every UI element has a canonical ID (e.g. `c4`, `c9-6`, `c11-2`). Always use these IDs when referring to UI parts in prompts or task descriptions.

| Range | Area |
|-------|------|
| c1–c10 | Game screen sections (states, header, board, modals…) |
| c11 | Game modes (c11-1 Classic, c11-2 Hide a Word, c11-3 Enter Letters) |

Use `comp update` to ask Claude to update `COMPONENT-REFERENCES.md`.

---

## 4. Typical feature workflow

1. **Idea surfaces** → add to `todo.md`
2. **Ready to build** → write steps in `IMPLEMENTATION-TASKS.md` as a new `iN` task with `(open)` steps
3. **Implement** → `imp iN` — Claude implements open steps and sets them to `(test)`
4. **Test** → open `index.html` in browser and verify
5. **Approve** → tell Claude the steps are done; steps become `(done)`
6. **Close task** → `imp move iN to done` — task moves to `implementations-done.md`
7. **Update todo** → mark the corresponding todo item as done

---

## 5. Game rules and dictionary

- All game mode rules and constraints live in `RULES.md` — consult before touching game logic or dictionaries
- Dictionaries are in `lang/*.words`
- Always read `RULES.md` before generating boards, adding words, or changing mode logic

---

## 6. Running the game

```
# Open directly
open index.html

# Or local server
npx serve .
python -m http.server
```

No build step. Everything is in `index.html`.
