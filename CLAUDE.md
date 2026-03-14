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

**State** (module-level vars): `grid` (16-char array), `sel` (selected cell indices in order), `drag` (bool), `score`, `bestWord`, `found` (Set of submitted words).

**Input pipeline**: Both mouse and touch funnel through `cellFromPoint(x, y)` → `trySelect(idx)` → `applyVisuals()`. The canvas overlay has `pointer-events: none` so `document.elementFromPoint` resolves to the `.cell` beneath it.

**Backtracking**: `trySelect` trims `sel` back to any already-selected cell when the pointer re-enters it, rather than blocking the move.

**Canvas path**: `fitCanvas()` positions/sizes the `<canvas>` to exactly overlap the `#grid` div (computed via `getBoundingClientRect` offsets). `redrawPath()` draws two strokes (wide glow + thin line) between `cellCenter()` positions. Must be called after any layout change (init, resize).

**Letter distribution**: `POOL` is a ~100-char weighted string; `LETTERS` is the same string with a stray space replaced with `I`. Sampling is `LETTERS[Math.floor(Math.random() * LETTERS.length)]`.

**Scoring**: `calcScore(word)` — 3 letters = 1 pt, 4 = 2, 5 = 4, 6 = 7, 7 = 11, 8+ = 15 + (n−8)×5.

**Game modes**: `currentMode` tracks the active mode (`MODE_STANDARD` or `MODE_HIDE_WORD`). Game generation rules and mode-specific constraints are defined in `RULES.md` — always consult it when generating games or validating game state.

**Win condition**: tracked via `winModalShown` flag; `openWinModal()` fires once when `found.size >= totalWords`.

**Word path cache**: `wordPathCache` (Map) caches `findWordPath` results per word to avoid redundant traversals on chip hover.

## Game rules

All game rules (dictionary rules, game mode requirements, word constraints) live in **`RULES.md`**. Always read `RULES.md` before:
- Generating or validating a game board
- Adding or modifying dictionary entries (`lang/*.words`)
- Implementing or changing game mode logic

### CSS conventions

- Dark theme: background `#0e0e1a`, card `#1a1a30`, accent `#e94560`
- Responsive grid width: `min(340px, 96vw)` with `aspect-ratio: 1` cells
- Animations: `cellAppear`, `letterPop`, `chipIn`, `shake` — all CSS keyframes, triggered by adding/removing classes
