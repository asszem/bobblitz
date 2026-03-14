# BöbBlitz

A single-player, browser-based word-hunt game inspired by WordBlitz. Swipe across a 4×4 letter grid to form words — the longer the word, the more points you score.

## How to play

1. Press and drag across adjacent letters (including diagonals) to form a word.
2. Release to submit. Valid words are added to your score and shown in the found-words list.
3. Hover over a found word to highlight its path on the board.
4. Find all words on the board to win.

## Game modes

**Standard** — The board is generated with a guaranteed set of findable words. Find them all.

**Hide a word** — A friend enters a secret word (4–10 letters). It is hidden somewhere on the board. Can you find it?

## Sharing

Use the **Share game** button to copy a link to the current board. Anyone who opens the link gets the exact same grid and game mode — including the hidden word in Hide a word mode (encoded so it stays secret in the URL).

## Languages

Supports **English** and **Hungarian**. Switch with the language toggle at the top. Each language has its own letter pool weighted by frequency and its own dictionary.

## Running locally

No build step or server required — open `index.html` directly in any modern browser.

```
# Optional local dev server
npx serve .
# or
python -m http.server
```
