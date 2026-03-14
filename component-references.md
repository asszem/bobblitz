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
  - [Share modal](#share-modal)
  - [Greeting modal](#greeting-modal)
  - [Help modal](#help-modal)
  - [URL error modal](#url-error-modal)

## Game states

- **solo game** — game started by the player locally, not from a shared link
- **link-shared game** — game loaded from a shared URL
- **config phase** — a configuration modal is open; game has not yet started
- **solve phase** — the player is actively swiping and finding words
- **win state** — all words have been found; the win modal is shown

---

## Header

- **title** — the "BöbBlitz" `<h1>` logo at the top
- **lang button** — the language toggle button in the top-right of the header (`#lang-btn`); cycles between Hungarian and English

---

## Score bar

The row of three stat counters directly below the header (`#score-row`).

- **score counter** — displays the current accumulated point total (`#score`)
- **word counter** — shows found/total word count (`#word-count`), e.g. "3 / 7"
- **best counter** — shows the highest single-word score in this game (`#best`)

---

## Game board

- **board** / **grid** — the 4×4 letter grid (`#grid` inside `#grid-wrap`)
- **cell** — a single letter tile on the board (`.cell`)
- **path overlay** — the canvas drawn on top of the grid that renders the swipe line (`#canvas-overlay`)

---

## Word input area

The row just below the board that gives live feedback while swiping (`#word-area`).

- **word display** — shows the word being formed as the player swipes (`#word-display`)
- **word meta** — shows letter count and point value of the current word in progress (`#word-meta`)

---

## Bottom controls

The control strip below the word input area (`#controls`).

- **mode bar** — the row containing the active mode name and the help button (`.game-mode-row`)
- **mode label** — text showing the currently active game mode name (`#game-mode-label`)
- **help button** — the `?` icon button that opens the help modal (`#help-btn`)
- **reveal button** — "Reveal all words" / "Szabad a gazda!" action button (`#reveal-btn`)
- **share button** — "Share game" action button that opens the share modal (`#share-btn`)
- **new game button** — starts a new game, triggers the confirm modal if progress exists (`#new-btn`)

---

## Found words list

The section below the controls listing all discovered words (`#found-section`).

- **found words header** — the "Found Words" heading and word tally count (`#found-header`)
- **word tally** — the count of found words shown next to the heading (`#word-tally`)
- **word chip** — an individual found-word pill/chip in the list (`.word-chip` inside `#words-list`)

---

## Toast

- **toast** — the temporary pop-up notification that appears at the bottom of the screen (`#toast`), e.g. after copying a link

---

## Modals

### Confirm modal
Shown before discarding progress (e.g. starting a new game). Features Lexi the cat image.

- **confirm modal** — the "Warning!" confirmation dialog (`#confirm-modal`)
- **confirm cancel button** — dismisses the modal without action (`#confirm-cancel-btn`)
- **confirm ok button** — proceeds with the destructive action (`#confirm-ok-btn`)

### Win modal
Shown when the player finds all words. Features Kavics the cat image.

- **win modal** — the "Congratulations!" end-of-game dialog (`#win-modal`)
- **win close button** — closes the win modal (`#win-close-btn`)

### Game modes modal
Shown when the player selects a new game mode.

- **modes modal** — the game mode selection dialog (`#modes-modal`)
- **modes description** — long description text of the highlighted/selected mode (`#modes-long-desc`)
- **standard mode button** — selects Classic/Standard mode (`#mode-standard-btn`)
- **hide-word mode button** — selects Hide a Word mode (`#mode-hide-word-btn`)

### Hide a word config modal
Shown during config phase when Hide a Word mode is selected.

- **hide-word modal** — the word entry dialog for Hide a Word mode (`#hide-word-modal`)
- **hide-word description** — long description of the mode shown at the top of the modal (`#hide-word-long-desc`)
- **hide-word hint** — short instructional text below the description (`#hide-word-text`)
- **hide-word input** — the text field where the secret word is typed (`#hide-word-input`)
- **hide-word error** — inline validation error message (`#hide-word-error`)
- **hide-word cancel button** — closes the modal without starting (`#hide-word-cancel-btn`)
- **hide-word start button** — validates and starts the game with the hidden word (`#hide-word-start-btn`)

### Share modal
Opened via the share button; lets the player customise and copy a shareable link.

- **share modal** — the game-sharing dialog (`#share-modal`)
- **sender field** — text input for the sharer's name (`#share-sender-input`)
- **message field** — text input for an optional personal message (`#share-message-input`)
- **share link field** — read-only textarea showing the generated URL (`#share-url-input`)
- **copy link button** — copies the URL to clipboard and closes the modal (`#share-modal-copy-btn`)

### Greeting modal
Shown to the recipient when opening a link-shared game.

- **greeting modal** — the welcome dialog for link-shared games (`#greeting-modal`)
- **greeting sender** — displays the sharer's name (`#greeting-sender`)
- **greeting message** — displays the sharer's personal message (`#greeting-message`)
- **greeting rules** — shows a description of the game mode / rules (`#greeting-mode-desc`)
- **greeting word count** — tells the recipient how many words to find (`#greeting-word-count`)
- **greeting close button** — dismisses the greeting and starts solve phase (`#greeting-close-btn`)

### Help modal
Opened via the help button; shows the description of the currently active game mode.

- **help modal** — the mode description dialog (`#help-modal`)
- **help modal title** — name of the current mode (`#help-modal-title`)
- **help modal description** — full description of the current mode (`#help-modal-desc`)
- **help modal close button** — closes the dialog (`#help-modal-close-btn`)

### URL error modal
Shown when a shared link is invalid or cannot be decoded.

- **url error modal** — the invalid-link error dialog (`#url-error-modal`)
- **url error close button** — closes the dialog and starts a fresh game (`#url-error-close-btn`)
