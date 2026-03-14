# Game component references

I will refer to various parts of the game by these names.
Consider them while responding to prompts. Slight variations in wording are fine.
Keep this list updated as the UI evolves.

## Table of contents

- [Game states](#game-states)
- [Header](#header)
- [Score bar](#score-bar)
- [Game board](#game-board)
- [Word input area](#word-input-area)
- [Bottom controls](#bottom-controls)
- [Found words list](#found-words-list)
- [Toast](#toast)
- [Modals](#modals)
  - [Confirm modal](#confirm-modal)
  - [Win modal](#win-modal)
  - [Game modes modal](#game-modes-modal)
  - [Hide a word config modal](#hide-a-word-config-modal)
  - [Enter letters config](#enter-letters-config)
  - [Entry ready modal](#entry-ready-modal)
  - [Share modal](#share-modal)
  - [Greeting modal](#greeting-modal)
  - [Help modal](#help-modal)
  - [URL error modal](#url-error-modal)

## Game states

- **solo game** — game started by the player locally, not from a shared link
- **link-shared game** — game loaded from a shared URL
- **config phase** — the player is setting up a game; varies by mode
- **entry phase** — the player is filling in the grid in Enter letters mode (a sub-type of config phase)
- **solve phase** — the player is actively swiping to find words
- **win state** — all words found; the win modal is shown

---

## Header

- **title** — the "BöbBlitz" `<h1>` logo at the top
- **lang button** — language toggle in the top-right (`#lang-btn`); cycles between Hungarian and English

---

## Score bar

The row of three stat counters below the header (`#score-row`).

- **score counter** — accumulated point total (`#score`)
- **word counter** — found / total word count (`#word-count`), e.g. "3 / 7"
- **best counter** — highest single-word score this game (`#best`)

---

## Game board

- **board** / **grid** — the 4×4 letter grid (`#grid` inside `#grid-wrap`)
- **cell** — a single letter tile (`.cell`)
- **focused cell** — the active cell during entry phase (`.cell.cell-focused`)
- **empty cell** — a cell with no letter yet in entry phase (`.cell.cell-empty`)
- **path overlay** — the canvas over the grid that draws the swipe line (`#canvas-overlay`)

---

## Word input area

The panel below the board showing live swipe feedback (`#word-area`). Hidden during entry phase.

- **word display** — the word being formed as the player swipes (`#word-display`)
- **word meta** — letter count and point value of the word in progress (`#word-meta`)

---

## Bottom controls

The strip below the word input area (`#controls`).

- **mode bar** — row showing the active mode name and help button (`.game-mode-row`)
- **mode label** — text displaying the active game mode (`#game-mode-label`)
- **help button** — `?` icon; opens the help modal (`#help-btn`)

Buttons visible during **solve phase:**

- **reveal button** — reveals all unfound words (`#reveal-btn`)
- **share button** — opens the share modal (`#share-btn`)
- **new game button** — opens the game modes modal; shows confirm modal if progress exists (`#new-btn`)

Button visible during **entry phase** only:

- **close button** — discards the board and returns to mode selection (`#entry-close-btn`); also triggered by Escape

---

## Found words list

Below the controls; lists all discovered words (`#found-section`).

- **found words header** — "Found Words" heading with tally (`#found-header`)
- **word tally** — count of found words (`#word-tally`)
- **word chip** — a found-word pill in the list (`.chip` inside `#words-list`); hover/tap highlights the path on the board
- **revealed chip** — a chip for a word revealed by the reveal button (`.chip.chip-revealed`); styled differently

---

## Toast

- **toast** — brief pop-up notification at the bottom of the screen (`#toast`); used for copy confirmation, invalid character warnings, etc.

---

## Modals

### Confirm modal
Shown before discarding game progress. Features Lexi the cat.

- **confirm modal** — the warning dialog (`#confirm-modal`)
- **confirm cancel button** — dismisses without action (`#confirm-cancel-btn`)
- **confirm ok button** — proceeds with the destructive action (`#confirm-ok-btn`)

### Win modal
Shown when all words are found. Features Kavics the cat.

- **win modal** — the end-of-game dialog (`#win-modal`)
- **win new game button** — closes the modal and opens the game modes modal (`#win-new-btn`)
- **win share button** — closes the modal and opens the share modal (`#win-share-btn`)

### Game modes modal
Shown when starting a new game.

- **modes modal** — the game mode selection dialog (`#modes-modal`)
- **modes description** — long description of the hovered/focused mode (`#modes-long-desc`)
- **standard mode button** — selects Standard mode (`#mode-standard-btn`)
- **hide-word mode button** — selects Hide a Word mode (`#mode-hide-word-btn`)
- **enter-letters mode button** — selects Enter letters mode (`#mode-enter-letters-btn`)

### Hide a word config modal
Shown during config phase for Hide a Word mode.

- **hide-word modal** — the secret word entry dialog (`#hide-word-modal`)
- **hide-word description** — long mode description at the top (`#hide-word-long-desc`)
- **hide-word hint** — short instruction text (`#hide-word-text`)
- **hide-word input** — text field for the secret word (`#hide-word-input`)
- **hide-word error** — inline validation message (`#hide-word-error`)
- **hide-word cancel button** — closes without starting (`#hide-word-cancel-btn`)
- **hide-word start button** — validates and starts the game (`#hide-word-start-btn`)

### Enter letters config
Not a modal — the board itself becomes the input surface during entry phase. See [Game board](#game-board) and [Bottom controls](#bottom-controls) for the relevant components. The close button and Escape exit this phase.

### Entry ready modal
Shown automatically when all 16 cells are filled in Enter letters mode.

- **entry ready modal** — the completion dialog (`#entry-ready-modal`)
- **entry ready title** — headline ("Ready!" or similar) (`#entry-ready-title`)
- **entry ready text** — word count, or no-words message (`#entry-ready-text`)
- **entry ready play button** — starts solve phase; hidden when no words found (`#entry-ready-play-btn`)
- **entry ready share button** — opens the share modal without leaving entry phase; hidden when no words found (`#entry-ready-share-btn`)
- **entry ready back button** — closes the modal and returns to entry phase, preserving all letters and cursor position (`#entry-ready-back-btn`)

### Share modal
Lets the player compose and copy a shareable link.

- **share modal** — the sharing dialog (`#share-modal`)
- **sender field** — text input for the sharer's name (`#share-sender-input`)
- **message field** — text input for an optional message (`#share-message-input`)
- **share link field** — read-only textarea with the generated URL (`#share-url-input`)
- **copy link button** — copies the URL to clipboard and closes the modal (`#share-modal-copy-btn`)

### Greeting modal
Shown to the recipient when opening a link-shared game.

- **greeting modal** — the welcome dialog (`#greeting-modal`)
- **greeting sender** — displays the sharer's name (`#greeting-sender`)
- **greeting message** — displays the sharer's message (`#greeting-message`)
- **greeting rules** — describes the game mode / rules (`#greeting-mode-desc`)
- **greeting word count** — tells the recipient how many words to find (`#greeting-word-count`)
- **greeting close button** — dismisses the greeting and starts solve phase (`#greeting-close-btn`)

### Help modal
Opened via the help button; describes the currently active game mode.

- **help modal** — the mode description dialog (`#help-modal`)
- **help modal title** — name of the current mode (`#help-modal-title`)
- **help modal description** — full description of the current mode (`#help-modal-desc`)
- **help modal close button** — closes the dialog (`#help-modal-close-btn`)

### URL error modal
Shown when a shared link is invalid or cannot be decoded.

- **url error modal** — the invalid-link error dialog (`#url-error-modal`)
- **url error close button** — closes the dialog and starts a fresh game (`#url-error-close-btn`)
