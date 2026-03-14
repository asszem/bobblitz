# r1 Dictionary Rules

Apply these rules for every dictionary update (`lang/*.words`).

## r1-1 General rules

- r1-1-1 Minimum word length: **3 characters**.
- r1-1-2 Maximum word length: **8 characters**.
- r1-1-3 All words must be unique.
- r1-1-4 Only real, valid words in the target language.
- r1-1-5 Suffixes count as separate valid words (e.g. plurals).
- r1-1-6 Names are allowed if they are common words in the language.
- r1-1-7 Never remove valid words. Only remove words that do not exist in the language.
- r1-1-8 Add shorter valid words when the board needs more findable words.
- r1-1-9 Do not add placeholders, random letter combinations, or invented words.
- r1-1-10 Validate 3- and 4-letter words with extra care.

## r1-2 Hungarian

- r1-2-1 Preserve all diacritics (á, é, í, ó, ö, ő, ú, ü, ű).

## r1-3 Scope

- r1-3-1 Apply rules separately per language.

---

# r2 Game phases

Every game mode has two phases.

- **r2-1 config phase** — the player sets up the game. What happens here depends on the mode.

- **r2-2 solve phase** — the player swipes across adjacent cells to form words. Swipe paths can go in all 8 directions. Each cell can only be used once per word. A word is submitted when the player lifts their finger or releases the mouse.

---

# r3 Game modes

## r3-1 Standard

The board is randomly generated. Generation repeats until the board meets these requirements:

- r3-1-1 At least 5 findable words total.
- r3-1-2 At least 3 words with exactly 4 letters.
- r3-1-3 At least 2 words with exactly 5 letters.

There is no config phase. The board is ready immediately.

## r3-2 Hide a word

**Config phase:** the player types a secret word. Rules for the secret word:

- r3-2-1 Between 4 and 10 characters. No spaces.
- r3-2-2 Only characters valid in the selected language.

The secret word is placed on the board along a random adjacent path. The remaining cells are filled with random language-valid characters. The secret word is the only findable word on the board.

**Solve phase:** the recipient must find the hidden word by swiping.

## r3-3 Enter letters

**Config phase:** the player fills in all 16 cells manually.

- r3-3-1 Navigate between cells with arrow keys or by tapping.
- r3-3-2 Type any language-valid character into the focused cell.
- r3-3-3 Invalid characters show a toast error and are not accepted.
- r3-3-4 Any cell can be overwritten at any time.
- r3-3-5 Pressing Backspace clears the current cell and moves back one.
- r3-3-6 Pressing Close or Escape discards the board and returns to mode selection.

When all 16 cells are filled, a modal appears automatically:

- r3-3-7 If words were found: shows the word count. The player can start the game or share the board.
- r3-3-8 If no words were found: shows a message. The player can go back and edit the board. The letters and cursor position are preserved.

**Solve phase:** works the same as Standard mode, using the player's custom board.
