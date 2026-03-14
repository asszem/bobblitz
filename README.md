# BöbBlitz

A single-player, browser-based word-hunt game inspired by WordBlitz. Swipe across a 4×4 letter grid to form words — the longer the word, the more points you score.

## How to play

1. Press and drag across adjacent letters (including diagonals) to form a word.
2. Release to submit. Valid words are added to your score and shown in the found-words list.
3. Hover over a found word to highlight its path on the board.
4. Find all words on the board to win.

## Game modes

**Standard** — The board is randomly generated with a guaranteed set of findable words. Find them all to win.

**Hide a word** — Enter a secret word (4–10 letters) and share the board with a friend. Your word is hidden somewhere among the letters — they have to find it by swiping. They won't see the word until they discover it themselves.

**Enter letters** — Fill in all 16 cells with letters of your choice. When the board is complete the game finds all valid words and you solve it yourself, or share it with someone else.

## Sharing

Use the **Share game** button to generate a link to the current board. The recipient gets the exact same grid and game mode. In Hide a word mode the secret word is encoded in the URL so it stays hidden. You can optionally include your name and a message that greets the recipient when they open the link.

## Languages

Supports **English** and **Hungarian**. Switch with the language toggle at the top-right. Each language has its own letter pool weighted by frequency and its own word dictionary.

## Running locally

No build step or server required — open `index.html` directly in any modern browser.

```
# Optional local dev server
npx serve .
# or
python -m http.server
```
