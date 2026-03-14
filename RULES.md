# Dictionary Rules

Apply these rules for every dictionary update (`lang/*.words`).

## General rules

- Minimum word length: **3 characters**.
- Maximum word length: **8 characters**.
- All words must be unique.
- Only real, valid words in the target language.
- Suffixes count as separate valid words (e.g. plurals).
- Names are allowed if they are common words in the language.
- Never remove valid words. Only remove words that do not exist in the language.
- Add shorter valid words when the board needs more findable words.
- Do not add placeholders, random letter combinations, or invented words.
- Validate 3- and 4-letter words with extra care.

## Hungarian

- Preserve all diacritics (á, é, í, ó, ö, ő, ú, ü, ű).

## Scope

- Apply rules separately per language.

---

# Game phases

Every game mode has two phases.

**Config phase** — the player sets up the game. What happens here depends on the mode.

**Solve phase** — the player swipes across adjacent cells to form words. Swipe paths can go in all 8 directions. Each cell can only be used once per word. A word is submitted when the player lifts their finger or releases the mouse.

---

# Game modes

## Standard

The board is randomly generated. Generation repeats until the board meets these requirements:

- At least 5 findable words total.
- At least 3 words with exactly 4 letters.
- At least 2 words with exactly 5 letters.

There is no config phase. The board is ready immediately.

## Hide a word

**Config phase:** the player types a secret word. Rules for the secret word:

- Between 4 and 10 characters. No spaces.
- Only characters valid in the selected language.

The secret word is placed on the board along a random adjacent path. The remaining cells are filled with random language-valid characters. The secret word is the only findable word on the board.

**Solve phase:** the recipient must find the hidden word by swiping.

## Enter letters

**Config phase:** the player fills in all 16 cells manually.

- Navigate between cells with arrow keys or by tapping.
- Type any language-valid character into the focused cell.
- Invalid characters show a toast error and are not accepted.
- Any cell can be overwritten at any time.
- Pressing Backspace clears the current cell and moves back one.
- Pressing Close or Escape discards the board and returns to mode selection.

When all 16 cells are filled, a modal appears automatically:

- If words were found: shows the word count. The player can start the game or share the board.
- If no words were found: shows a message. The player can go back and edit the board. The letters and cursor position are preserved.

**Solve phase:** works the same as Standard mode, using the player's custom board.
