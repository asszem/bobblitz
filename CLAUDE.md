# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

BöbBlitz is a single-player, browser-based word-hunt game (WordBlitz-style). The entire game lives in a single file: `index.html`.

## Running the game

Open `index.html` directly in a browser — no build step, no server, no dependencies.

For a local dev server (enables proper `file://` behavior on stricter browsers):
```
npx serve .
# or
python -m http.server
```

## Architecture

Everything is in one file with three clearly delimited sections:

- **CSS** (`<style>`) — all styling, animations, and responsive layout
- **HTML** (`<body>`) — static shell; the 16 `.cell` divs are created dynamically by JS
- **JS** (`<script>`) — all game logic, no frameworks

### Key JS concepts

**State** (module-level vars): `grid` (16-char array), `sel` (selected cell indices in order), `drag` (bool), `score`, `bestWord`, `found` (Set of submitted words), `winModalShown` (bool), `wordPathCache` (Map, word→path), `hoveredChip` (DOM element or null), `hideWordTarget` (string, hide-word mode only).

**Input pipeline**: Both mouse and touch funnel through `cellFromPoint(x, y)` → `trySelect(idx)` → `applyVisuals()`. The canvas overlay has `pointer-events: none` so `document.elementFromPoint` resolves to the `.cell` beneath it.

**Direction-based selection**: When `sel` is non-empty, `cellFromPoint` does not use hit-testing. Instead it computes the movement angle from the last selected cell's center, snaps it to one of 8 directions (45° sectors), and returns the cell in that direction. A 50%-of-slot-width dead zone ensures a cell switch only fires once the pointer has crossed the cell boundary into the gap. This stops diagonal swipes from accidentally registering orthogonal neighbors.

**Backtracking**: `trySelect` trims `sel` back to any already-selected cell when the pointer re-enters it, rather than blocking the move.

**Canvas path**: `fitCanvas()` positions/sizes the `<canvas>` to exactly overlap the `#grid` div (computed via `getBoundingClientRect` offsets). `redrawPath()` draws two strokes (wide glow + thin line) between `cellCenter()` positions. Must be called after any layout change (init, resize).

**Letter distribution**: `POOL` is a ~100-char weighted string; `LETTERS` is the same string with a stray space replaced with `I`. Sampling is `LETTERS[Math.floor(Math.random() * LETTERS.length)]`.

**Scoring**: `calcScore(word)` — 3 letters = 1 pt, 4 = 2, 5 = 4, 6 = 7, 7 = 11, 8+ = 15 + (n−8)×5.

**Game modes**: `currentMode` tracks the active mode (`MODE_STANDARD` or `MODE_HIDE_WORD`). Game generation rules and mode-specific constraints are defined in `RULES.md` — always consult it when generating games or validating game state.

**Win condition**: tracked via `winModalShown` flag; `openWinModal()` fires once when `found.size >= totalWords`. Closing the win modal immediately opens the game mode selector.

**Word path cache**: `wordPathCache` (Map) caches `findWordPath` results per word to avoid redundant traversals on chip hover.

**Share**: `generateShareUrl()` encodes `l` (lang), `m` (mode), `g` (grid string) as URL params. In hide-word mode the target word is encoded with `encodeWord()` (UTF-8 → base64) and stored as `w`. `tryLoadFromUrl()` reads these params at boot, switches language first (so char validation uses the correct alphabet), then restores game state. Invalid/malformed URLs show a modal error and fall through to the mode selector.

**New game flow**: pressing New Game (or closing the win modal) opens the game mode modal. The mode modal is mandatory — it has no close button and cannot be dismissed with Escape or backdrop click. After mode selection, Standard mode starts immediately; Hide a word mode opens a word-entry modal.

## Implementation tasks

`IMPLEMENTATION-TASKS.md` tracks feature/fix tasks. Update rules are defined in its own `# Update rules` section. Key points:
- Task headers follow the format: `(Status) iN Description`
- Steps follow the format: `- [x] iN-N Description`
- Assign the next available integer ID to each new task; assign sequential sub-IDs to its steps.
- Mark each step `[x]` when done, `[ ]` when not. Heading is `(Done)` when all steps are checked, `(Open)` otherwise.
- Do **not** move tasks to `implementations-done.md` unless the user explicitly asks.

## Todo list

`todo.md` tracks all work items. When completing a task or adding new items, update `todo.md` according to the rules defined in its own `# Update rules` section. Key points:
- Move checked items to `# Done` with a `- completed at yyyy-mm-dd hh:mm` timestamp.
- Move re-opened items back to `# Todo` with a `- reopened at yyyy-mm-dd hh:mm` timestamp.
- Keep section header counts accurate after every change.

## Component references

All UI components have canonical names defined in **`COMPONENT-REFERENCES.md`**. Always consult it when:
- Interpreting a prompt that refers to a part of the UI (e.g. "the close button", "the win modal", "entry phase")
- Describing UI elements in a response
- Deciding which HTML element or JS function to touch for a given change

When the user refers to a component by name or a reasonable variation of a name, map it to the entry in `COMPONENT-REFERENCES.md` before acting.

## Game rules

All game rules (dictionary rules, game mode requirements, word constraints) live in **`RULES.md`**. Always read `RULES.md` before:
- Generating or validating a game board
- Adding or modifying dictionary entries (`lang/*.words`)
- Implementing or changing game mode logic

### CSS conventions

- Dark theme: background `#0e0e1a`, card `#1a1a30`, accent `#e94560`
- Responsive grid width: `min(340px, 96vw)` with `aspect-ratio: 1` cells
- Animations: `cellAppear`, `letterPop`, `chipIn`, `shake` — all CSS keyframes, triggered by adding/removing classes
