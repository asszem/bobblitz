# Game component references

I will refer to various parts of the game by these names.
Consider them while responding to prompts. Slight variations in wording are fine.
Keep this list updated as the UI evolves.

## Table of contents

- [c1 Game states](#game-states)
- [c2 Header](#header)
- [c3 Score bar](#score-bar)
- [c4 Game board](#game-board)
- [c5 Word input area](#word-input-area)
- [c6 Bottom controls](#bottom-controls)
- [c7 Found words list](#found-words-list)
- [c8 Toast](#toast)
- [c9 Modals](#modals)
  - [c9-1 Confirm modal](#confirm-modal)
  - [c9-2 Win modal](#win-modal)
  - [c9-3 Game modes modal](#game-modes-modal)
  - [c9-4 Hide a word config modal](#hide-a-word-config-modal)
  - [c9-5 Enter letters config](#enter-letters-config)
  - [c9-6 Entry ready modal](#entry-ready-modal)
  - [c9-7 Share modal](#share-modal)
  - [c9-8 Greeting modal](#greeting-modal)
  - [c9-9 Help modal](#help-modal)
  - [c9-10 URL error modal](#url-error-modal)
  - [c9-11 Feedback modal](#feedback-modal)
- [c10 Footer](#footer)

## c1 Game states

- **c1-1 solo game** — game started by the player locally, not from a shared link
- **c1-2 link-shared game** — game loaded from a shared URL
- **c1-3 config phase** — the player is setting up a game; varies by mode
- **c1-4 entry phase** — the player is filling in the grid in Enter letters mode (a sub-type of config phase)
- **c1-5 solve phase** — the player is actively swiping to find words
- **c1-6 win state** — all words found; the win modal is shown

---

## c2 Header

- **c2-1 title** — the "BöbBlitz" `<h1>` logo at the top
- **c2-2 lang button** — language toggle in the top-right (`#lang-btn`); cycles between Hungarian and English

---

## c3 Score bar

The row of three stat counters below the header (`#score-row`).

- **c3-1 score counter** — accumulated point total (`#score`)
- **c3-2 word counter** — found / total word count (`#word-count`), e.g. "3 / 7"
- **c3-3 best counter** — highest single-word score this game (`#best`)

---

## c4 Game board

- **c4-1 board** / **grid** — the 4×4 letter grid (`#grid` inside `#grid-wrap`)
- **c4-2 cell** — a single letter tile (`.cell`)
- **c4-3 focused cell** — the active cell during entry phase (`.cell.cell-focused`)
- **c4-4 empty cell** — a cell with no letter yet in entry phase (`.cell.cell-empty`)
- **c4-5 path overlay** — the canvas over the grid that draws the swipe line (`#canvas-overlay`)

---

## c5 Word input area

The panel below the board showing live swipe feedback (`#word-area`). Hidden during entry phase.

- **c5-1 word display** — the word being formed as the player swipes (`#word-display`)
- **c5-2 word meta** — letter count and point value of the word in progress (`#word-meta`)

---

## c6 Bottom controls

The strip below the word input area (`#controls`).

- **c6-1 mode bar** — row showing the active mode name and help button (`.game-mode-row`)
- **c6-2 mode label** — text displaying the active game mode (`#game-mode-label`)
- **c6-3 help button** — `?` icon; opens the help modal (`#help-btn`)

Buttons visible during **solve phase:**

- **c6-4 reveal button** — reveals all unfound words (`#reveal-btn`)
- **c6-5 share button** — opens the share modal (`#share-btn`)
- **c6-6 new game button** — opens the game modes modal; shows confirm modal if progress exists (`#new-btn`)

Button visible during **entry phase** only:

- **c6-7 close button** — discards the board and returns to mode selection (`#entry-close-btn`); also triggered by Escape

---

## c7 Found words list

Below the controls; lists all discovered words (`#found-section`).

- **c7-1 found words header** — "Found Words" heading with tally (`#found-header`)
- **c7-2 word tally** — count of found words (`#word-tally`)
- **c7-3 word chip** — a found-word pill in the list (`.chip` inside `#words-list`); hover/tap highlights the path on the board
- **c7-4 revealed chip** — a chip for a word revealed by the reveal button (`.chip.chip-revealed`); styled differently

---

## c8 Toast

- **c8-1 toast** — brief pop-up notification at the bottom of the screen (`#toast`); used for copy confirmation, invalid character warnings, etc.

---

## c9 Modals

### c9-1 Confirm modal
Shown before discarding game progress. Features Lexi the cat.

- **c9-1-1 confirm modal** — the warning dialog (`#confirm-modal`)
- **c9-1-2 confirm cancel button** — dismisses without action (`#confirm-cancel-btn`)
- **c9-1-3 confirm ok button** — proceeds with the destructive action (`#confirm-ok-btn`)

### c9-2 Win modal
Shown when all words are found. Features Kavics the cat.

- **c9-2-1 win modal** — the end-of-game dialog (`#win-modal`)
- **c9-2-2 win new game button** — closes the modal and opens the game modes modal (`#win-new-btn`)
- **c9-2-3 win share button** — closes the modal and opens the share modal (`#win-share-btn`)

### c9-3 Game modes modal
Shown when starting a new game.

- **c9-3-1 modes modal** — the game mode selection dialog (`#modes-modal`)
- **c9-3-2 standard mode card** — selects Standard mode (`#mode-standard-btn`)
- **c9-3-3 hide-word mode card** — selects Hide a Word mode (`#mode-hide-word-btn`)
- **c9-3-4 enter-letters mode card** — selects Enter letters mode (`#mode-enter-letters-btn`)

### c9-4 Hide a word config modal
Shown during config phase for Hide a Word mode.

- **c9-4-1 hide-word modal** — the secret word entry dialog (`#hide-word-modal`)
- **c9-4-2 hide-word hint** — short instruction text (`#hide-word-text`)
- **c9-4-3 hide-word input** — text field for the secret word (`#hide-word-input`)
- **c9-4-4 hide-word error** — inline validation message (`#hide-word-error`)
- **c9-4-5 hide-word cancel button** — closes without starting (`#hide-word-cancel-btn`)
- **c9-4-6 hide-word start button** — validates and starts the game (`#hide-word-start-btn`)

### c9-5 Enter letters config
Not a modal — the board itself becomes the input surface during entry phase. See [c4 Game board](#c4-game-board) and [c6 Bottom controls](#c6-bottom-controls) for the relevant components. The close button (c6-7) and Escape exit this phase.

### c9-6 Entry ready modal
Shown automatically when all 16 cells are filled in Enter letters mode.

- **c9-6-1 entry ready modal** — the completion dialog (`#entry-ready-modal`)
- **c9-6-2 entry ready title** — headline ("Ready!" or similar) (`#entry-ready-title`)
- **c9-6-3 entry ready text** — word count, or no-words message (`#entry-ready-text`)
- **c9-6-4 entry ready play button** — starts solve phase; hidden when no words found (`#entry-ready-play-btn`)
- **c9-6-5 entry ready share button** — opens the share modal without leaving entry phase; hidden when no words found (`#entry-ready-share-btn`)
- **c9-6-6 entry ready back button** — closes the modal and returns to entry phase, preserving all letters and cursor position (`#entry-ready-back-btn`)

### c9-7 Share modal
Lets the player compose and copy a shareable link.

- **c9-7-1 share modal** — the sharing dialog (`#share-modal`)
- **c9-7-2 sender field** — text input for the sharer's name (`#share-sender-input`)
- **c9-7-3 message field** — text input for an optional message (`#share-message-input`)
- **c9-7-4 share link field** — read-only textarea with the generated URL (`#share-url-input`)
- **c9-7-5 copy link button** — copies the URL to clipboard and closes the modal (`#share-modal-copy-btn`)

### c9-8 Greeting modal
Shown to the recipient when opening a link-shared game.

- **c9-8-1 greeting modal** — the welcome dialog (`#greeting-modal`)
- **c9-8-2 greeting sender** — displays the sharer's name (`#greeting-sender`)
- **c9-8-3 greeting message** — displays the sharer's message (`#greeting-message`)
- **c9-8-4 greeting rules** — describes the game mode / rules (`#greeting-mode-desc`)
- **c9-8-5 greeting word count** — tells the recipient how many words to find (`#greeting-word-count`)
- **c9-8-6 greeting close button** — dismisses the greeting and starts solve phase (`#greeting-close-btn`)

### c9-9 Help modal
Opened via the help button (c6-3); describes the currently active game mode.

- **c9-9-1 help modal** — the mode description dialog (`#help-modal`)
- **c9-9-2 help modal title** — name of the current mode (`#help-modal-title`)
- **c9-9-3 help modal description** — full description of the current mode (`#help-modal-desc`)
- **c9-9-4 help modal close button** — closes the dialog (`#help-modal-close-btn`)

### c9-10 URL error modal
Shown when a shared link is invalid or cannot be decoded.

- **c9-10-1 url error modal** — the invalid-link error dialog (`#url-error-modal`)
- **c9-10-2 url error close button** — closes the dialog and starts a fresh game (`#url-error-close-btn`)

### c9-11 Feedback modal
Opened via the feedback button (c10-1); lets the player contact the developer.

- **c9-11-1 feedback modal** — the contact dialog (`#feedback-modal`)
- **c9-11-2 feedback avatar** — developer's Bluesky profile picture (`.feedback-modal-avatar`)
- **c9-11-3 feedback title** — modal heading (`#feedback-modal-title`)
- **c9-11-4 feedback description** — explanatory text (`#feedback-modal-desc`)
- **c9-11-5 feedback email link** — mailto link to the developer's email (`#feedback-modal-email`)
- **c9-11-6 feedback bluesky link** — link to the developer's Bluesky profile (`#feedback-modal-bluesky`)
- **c9-11-7 feedback close button** — closes the dialog (`#feedback-modal-close-btn`)

---

## c10 Footer

- **c10-1 feedback button** — opens the feedback modal (c9-11); always visible at the bottom of the page (`#feedback-btn`)
