# Repository Guidelines

## Project Structure & Module Organization

- `index.html`: main application file (UI, styles, and game logic — all in one file).
- `lang/en.json`, `lang/hu.json`: language config (labels, letter pool, limits, dictionary file path).
- `lang/en.words`, `lang/hu.words`: newline-separated dictionary word lists (one uppercase word per line).
- `lexi.png`: modal image asset.
- `CLAUDE.md`: internal project notes, architecture hints, and operational rules.
- `COMPONENT-REFERENCES.md`: canonical names and hierarchical IDs (cN, cN-N, cN-N-N) for every UI component and game mode. **Always consult before interpreting prompts that mention UI elements or deciding which element to modify.**
- `RULES.md`: game rules and dictionary rules. **Always consult before touching game logic, game generation, or dictionaries.**
- `IMPLEMENTATION-TASKS.md`: active feature/fix tasks with step-level tracking. See workflow below.
- `implementations-done.md`: completed (and optionally reopened) implementation tasks.
- `todo.md`: general work item tracking. Update when completing or adding tasks, following the rules in its `# Update rules` section (checkbox states, timestamps, section counts, done/reopen flow).
- `ideas-inbox.md`: raw ideas and notes not yet promoted to tasks.

Keep all feature logic in the existing JS section of `index.html` unless a clear split is needed.

---

## Command Shortcuts

- `imp <command>` — shorthand for implementation commands:
  - `imp i3` = implement task i3
  - `imp update` = implementations update (reformat/reword only, no code changes)
  - `imp move i3 to done` = move i3 to `implementations-done.md`
  - `imp reopen i3` = reopen i3 from `implementations-done.md`
- `comp <command>` — shorthand for component-references commands:
  - `comp update` = update component references
- Component ID format: `cN` (section), `cN-N` (sub-component), `cN-N-N` (element within sub-component). When a prompt uses a cN ID, resolve it via `COMPONENT-REFERENCES.md` before acting.

---

## Component References

All UI components and game modes have canonical names and IDs in **`COMPONENT-REFERENCES.md`**. Read it before:
- Interpreting any prompt that mentions a UI element (e.g. "the close button", "the win modal", "entry phase", "game mode select")
- Deciding which HTML element or JS function to modify
- Describing UI elements in a response

**ID format:** `cN` → section, `cN-N` → sub-component, `cN-N-N` → individual element. When a prompt uses a cN ID, resolve it via `COMPONENT-REFERENCES.md`.

**Top-level sections:**
- c1 Game states, c2 Header, c3 Score bar, c4 Game board, c5 Word input area
- c6 Bottom controls, c7 Found words list, c8 Toast, c9 Modals, c10 Footer
- c11 Game modes (c11-1 Classic, c11-2 Hide a Word, c11-3 Enter Letters)

**Key modal IDs (c9):** c9-1 Confirm, c9-2 Win, c9-3 Game modes, c9-4 Hide-a-word config, c9-5 Enter-letters config, c9-6 Entry ready, c9-7 Share, c9-8 Greeting, c9-9 Help, c9-10 URL error, c9-11 Feedback

---

## Implementation Task Workflow

Tasks are tracked in `IMPLEMENTATION-TASKS.md`. Completed tasks live in `implementations-done.md`.

### Format

- Header: `(Status) iN Description` — optionally followed by `- completed at yyyy-mm-dd hh:mm` or `- reopened at yyyy-mm-dd hh:mm`
- Step: `(status) iN-N Description`

### Step statuses

- `(open)` — not yet implemented
- `(fix)` — previously implemented but not working correctly; needs a fix
- `(test)` — implemented or fixed, awaiting user test approval
- `(done)` — approved by user or manually marked done

### Header statuses

- `(open)` — at least one step is open
- `(test)` — all steps are at least (test) but not all (done)
- `(done)` — all steps are (done)
- `(reopen)` — task was previously completed and moved to `implementations-done.md`, then reopened with new steps added

### Rules

- When implementing a step, set it to `(test)`. **Never set to `(done)` yourself** — only the user does that.
- When asked to implement `iN`, only implement open/fix steps under that exact task ID. Never touch steps from a different task ID.
- Always list the implemented step IDs in the response (e.g. "Implemented: i3-5, i3-6").
- When asked for "imp update" / "implementations update": reformat and reword all tasks to follow the rules. Do not implement anything.
- Do **not** move tasks to `implementations-done.md` unless explicitly asked.
- When moving a task to `implementations-done.md`: append `- completed at yyyy-mm-dd hh:mm` to its header line.
- When reopening a task ("imp reopen iN"): move it from `implementations-done.md` back to `IMPLEMENTATION-TASKS.md` (above the Update rules section), replace its completion timestamp with `- reopened at yyyy-mm-dd hh:mm`, and set the header status to `(reopen)`.
- Assign the next available integer ID to each new task; assign sequential sub-IDs to its steps.

---

## Build, Test, and Development Commands

Run locally with a static server (recommended — dictionaries are loaded via `fetch`):
- `python -m http.server`
- or `npx serve .`

Quick JS syntax check after larger edits:
- `node --check path/to/extracted-script.js`

There is no build step, package manager workflow, or CI test runner in this repo.

---

## Coding Style & Naming Conventions

- 2-space indentation in HTML/CSS/JS.
- Prefer clear, small functions (`verbNoun` style) — e.g. `applyLang`, `startNewGame`.
- Constants uppercase (`LANG_FILES`), state variables camelCase (`bestWord`).
- Preserve current architecture: DOM refs grouped, then state, then behavior.
- Dictionary files: one uppercase word per line, obey configured min/max length, characters valid for the target language.

---

## Testing Guidelines

Manual testing is required:
- Start game, select words, submit, reveal, language switch, new game modal flow.
- Verify no UI jump in bottom controls and no broken glyphs in labels.
- Data validation for dictionaries: words parse cleanly, character set is valid, Hungarian games satisfy target playable word count.

---

## Commit & Pull Request Guidelines

Follow Conventional Commit style seen in history:
- `feat(scope): ...`, `fix(scope): ...`, `refactor: ...`, `style: ...`, `docs: ...`

Keep commits focused (UI, dictionary, or logic change per commit when possible).

PRs should include: concise summary, files changed, manual test notes, screenshots/GIFs for UI changes, and any dictionary generation/validation details.
