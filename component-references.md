# Game component references

I will refer to various parts of the game by these names.
Consider them while responding to prompts. Slight variations in wording are fine.
Keep this list updated as the UI evolves.

## Table of contents

- [C1 Game states](#game-states)
- [C2 Header](#header)
- [C3 Score bar](#score-bar)
- [C4 Game board](#game-board)
- [C5 Word input area](#word-input-area)
- [C6 Bottom controls](#bottom-controls)
- [C7 Found words list](#found-words-list)
- [C8 Toast](#toast)
- [C9 Modals](#modals)
  - [C9.1 Confirm modal](#confirm-modal)
  - [C9.2 Win modal](#win-modal)
  - [C9.3 Game modes modal](#game-modes-modal)
  - [C9.4 Hide a word config modal](#hide-a-word-config-modal)
  - [C9.5 Enter letters config](#enter-letters-config)
  - [C9.6 Entry ready modal](#entry-ready-modal)
  - [C9.7 Share modal](#share-modal)
  - [C9.8 Greeting modal](#greeting-modal)
  - [C9.9 Help modal](#help-modal)
  - [C9.10 URL error modal](#url-error-modal)
  - [C9.11 Feedback modal](#feedback-modal)
- [C10 Footer](#footer)

## C1 Game states

- **C1.1 solo game** — game started by the player locally, not from a shared link
- **C1.2 link-shared game** — game loaded from a shared URL
- **C1.3 config phase** — the player is setting up a game; varies by mode
- **C1.4 entry phase** — the player is filling in the grid in Enter letters mode (a sub-type of config phase)
- **C1.5 solve phase** — the player is actively swiping to find words
- **C1.6 win state** — all words found; the win modal is shown

---

## C2 Header

- **C2.1 title** — the "BöbBlitz" `<h1>` logo at the top
- **C2.2 lang button** — language toggle in the top-right (`#lang-btn`); cycles between Hungarian and English

---

## C3 Score bar

The row of three stat counters below the header (`#score-row`).

- **C3.1 score counter** — accumulated point total (`#score`)
- **C3.2 word counter** — found / total word count (`#word-count`), e.g. "3 / 7"
- **C3.3 best counter** — highest single-word score this game (`#best`)

---

## C4 Game board

- **C4.1 board** / **grid** — the 4×4 letter grid (`#grid` inside `#grid-wrap`)
- **C4.2 cell** — a single letter tile (`.cell`)
- **C4.3 focused cell** — the active cell during entry phase (`.cell.cell-focused`)
- **C4.4 empty cell** — a cell with no letter yet in entry phase (`.cell.cell-empty`)
- **C4.5 path overlay** — the canvas over the grid that draws the swipe line (`#canvas-overlay`)

---

## C5 Word input area

The panel below the board showing live swipe feedback (`#word-area`). Hidden during entry phase.

- **C5.1 word display** — the word being formed as the player swipes (`#word-display`)
- **C5.2 word meta** — letter count and point value of the word in progress (`#word-meta`)

---

## C6 Bottom controls

The strip below the word input area (`#controls`).

- **C6.1 mode bar** — row showing the active mode name and help button (`.game-mode-row`)
- **C6.2 mode label** — text displaying the active game mode (`#game-mode-label`)
- **C6.3 help button** — `?` icon; opens the help modal (`#help-btn`)

Buttons visible during **solve phase:**

- **C6.4 reveal button** — reveals all unfound words (`#reveal-btn`)
- **C6.5 share button** — opens the share modal (`#share-btn`)
- **C6.6 new game button** — opens the game modes modal; shows confirm modal if progress exists (`#new-btn`)

Button visible during **entry phase** only:

- **C6.7 close button** — discards the board and returns to mode selection (`#entry-close-btn`); also triggered by Escape

---

## C7 Found words list

Below the controls; lists all discovered words (`#found-section`).

- **C7.1 found words header** — "Found Words" heading with tally (`#found-header`)
- **C7.2 word tally** — count of found words (`#word-tally`)
- **C7.3 word chip** — a found-word pill in the list (`.chip` inside `#words-list`); hover/tap highlights the path on the board
- **C7.4 revealed chip** — a chip for a word revealed by the reveal button (`.chip.chip-revealed`); styled differently

---

## C8 Toast

- **C8.1 toast** — brief pop-up notification at the bottom of the screen (`#toast`); used for copy confirmation, invalid character warnings, etc.

---

## C9 Modals

### C9.1 Confirm modal
Shown before discarding game progress. Features Lexi the cat.

- **C9.1.1 confirm modal** — the warning dialog (`#confirm-modal`)
- **C9.1.2 confirm cancel button** — dismisses without action (`#confirm-cancel-btn`)
- **C9.1.3 confirm ok button** — proceeds with the destructive action (`#confirm-ok-btn`)

### C9.2 Win modal
Shown when all words are found. Features Kavics the cat.

- **C9.2.1 win modal** — the end-of-game dialog (`#win-modal`)
- **C9.2.2 win new game button** — closes the modal and opens the game modes modal (`#win-new-btn`)
- **C9.2.3 win share button** — closes the modal and opens the share modal (`#win-share-btn`)

### C9.3 Game modes modal
Shown when starting a new game.

- **C9.3.1 modes modal** — the game mode selection dialog (`#modes-modal`)
- **C9.3.2 standard mode card** — selects Standard mode (`#mode-standard-btn`)
- **C9.3.3 hide-word mode card** — selects Hide a Word mode (`#mode-hide-word-btn`)
- **C9.3.4 enter-letters mode card** — selects Enter letters mode (`#mode-enter-letters-btn`)

### C9.4 Hide a word config modal
Shown during config phase for Hide a Word mode.

- **C9.4.1 hide-word modal** — the secret word entry dialog (`#hide-word-modal`)
- **C9.4.2 hide-word hint** — short instruction text (`#hide-word-text`)
- **C9.4.3 hide-word input** — text field for the secret word (`#hide-word-input`)
- **C9.4.4 hide-word error** — inline validation message (`#hide-word-error`)
- **C9.4.5 hide-word cancel button** — closes without starting (`#hide-word-cancel-btn`)
- **C9.4.6 hide-word start button** — validates and starts the game (`#hide-word-start-btn`)

### C9.5 Enter letters config
Not a modal — the board itself becomes the input surface during entry phase. See [C4 Game board](#c4-game-board) and [C6 Bottom controls](#c6-bottom-controls) for the relevant components. The close button (C6.7) and Escape exit this phase.

### C9.6 Entry ready modal
Shown automatically when all 16 cells are filled in Enter letters mode.

- **C9.6.1 entry ready modal** — the completion dialog (`#entry-ready-modal`)
- **C9.6.2 entry ready title** — headline ("Ready!" or similar) (`#entry-ready-title`)
- **C9.6.3 entry ready text** — word count, or no-words message (`#entry-ready-text`)
- **C9.6.4 entry ready play button** — starts solve phase; hidden when no words found (`#entry-ready-play-btn`)
- **C9.6.5 entry ready share button** — opens the share modal without leaving entry phase; hidden when no words found (`#entry-ready-share-btn`)
- **C9.6.6 entry ready back button** — closes the modal and returns to entry phase, preserving all letters and cursor position (`#entry-ready-back-btn`)

### C9.7 Share modal
Lets the player compose and copy a shareable link.

- **C9.7.1 share modal** — the sharing dialog (`#share-modal`)
- **C9.7.2 sender field** — text input for the sharer's name (`#share-sender-input`)
- **C9.7.3 message field** — text input for an optional message (`#share-message-input`)
- **C9.7.4 share link field** — read-only textarea with the generated URL (`#share-url-input`)
- **C9.7.5 copy link button** — copies the URL to clipboard and closes the modal (`#share-modal-copy-btn`)

### C9.8 Greeting modal
Shown to the recipient when opening a link-shared game.

- **C9.8.1 greeting modal** — the welcome dialog (`#greeting-modal`)
- **C9.8.2 greeting sender** — displays the sharer's name (`#greeting-sender`)
- **C9.8.3 greeting message** — displays the sharer's message (`#greeting-message`)
- **C9.8.4 greeting rules** — describes the game mode / rules (`#greeting-mode-desc`)
- **C9.8.5 greeting word count** — tells the recipient how many words to find (`#greeting-word-count`)
- **C9.8.6 greeting close button** — dismisses the greeting and starts solve phase (`#greeting-close-btn`)

### C9.9 Help modal
Opened via the help button (C6.3); describes the currently active game mode.

- **C9.9.1 help modal** — the mode description dialog (`#help-modal`)
- **C9.9.2 help modal title** — name of the current mode (`#help-modal-title`)
- **C9.9.3 help modal description** — full description of the current mode (`#help-modal-desc`)
- **C9.9.4 help modal close button** — closes the dialog (`#help-modal-close-btn`)

### C9.10 URL error modal
Shown when a shared link is invalid or cannot be decoded.

- **C9.10.1 url error modal** — the invalid-link error dialog (`#url-error-modal`)
- **C9.10.2 url error close button** — closes the dialog and starts a fresh game (`#url-error-close-btn`)

### C9.11 Feedback modal
Opened via the feedback button (C10.1); lets the player contact the developer.

- **C9.11.1 feedback modal** — the contact dialog (`#feedback-modal`)
- **C9.11.2 feedback avatar** — developer's Bluesky profile picture (`.feedback-modal-avatar`)
- **C9.11.3 feedback title** — modal heading (`#feedback-modal-title`)
- **C9.11.4 feedback description** — explanatory text (`#feedback-modal-desc`)
- **C9.11.5 feedback email link** — mailto link to the developer's email (`#feedback-modal-email`)
- **C9.11.6 feedback bluesky link** — link to the developer's Bluesky profile (`#feedback-modal-bluesky`)
- **C9.11.7 feedback close button** — closes the dialog (`#feedback-modal-close-btn`)

---

## C10 Footer

- **C10.1 feedback button** — opens the feedback modal (C9.11); always visible at the bottom of the page (`#feedback-btn`)
