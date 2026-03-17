# (done) i9 Share game with hint/reveal restrictions - completed at 2026-03-15

- (done) i9-1 Add two toggle buttons to the share game modal (c9-6): "Disable hints" and "Disable reveal words", both off by default
- (done) i9-2 Encode the toggle states in the share URL as a parameter, using the same encoding scheme as the target word (UTF-8 → base64) so the values are not easily tweakable
- (done) i9-3 When loading a game from URL, disable or enable the hint button (c4-6) and reveal-all button (c5-4) according to the encoded URL parameters
- (done) i9-4 Ensure the hint/reveal restrictions apply only to the specific game loaded from the URL, not to subsequently started games
- (done) i9-5 Persist the hint/reveal restriction state in localStorage alongside the game state, so reloading without URL parameters preserves the button states
- (done) i9-6 When resharing a received game, pre-check and lock the hint/reveal disable toggles so the restrictions cannot be removed by the resharer

# (done) i8 Modal keyboard navigation consistency - completed at 2026-03-15 00:00

- (done) i8-1 Arrow key navigation should move focus between buttons in every modal (confirm, win, hide-word, entry-ready)
- (done) i8-2 Enter key should activate the currently focused button in every modal
- (done) i8-3 Escape key should trigger the back/close button in every modal
- (done) i8-4 Arrow key navigation should work in the game mode select modal (c9-3)

# (done) i7 Enter letters mode updates - completed at 2026-03-15 00:00

- (done) i7-1 Add a game modes section to `COMPONENT-REFERENCES.md` so individual modes can be referenced by ID
- (done) i7-2 Change letter entry navigation (c4 entry phase): when a letter is typed, focus stays on the current cell instead of advancing to the next
- (done) i7-3 When the last empty cell (c4-4) is filled, automatically open the entry ready modal (c9-6)
- (done) i7-4 When the user re-enters entry phase with all cells already filled, do not auto-trigger c9-6; instead show an "I'm Done" button next to the close button (c6-7) that opens c9-6 on press
- (done) i7-5 In c9-6, arrange buttons in a single row in order: Back (c9-6-6), Share (c9-6-5), Start game (c9-6-4)
- (done) i7-6 When the share link is copied from c9-6, keep the modal open so the user can choose to go back to edit or start the game
- (done) i7-7 Remove the blinking cursor from the focused cell (c4-3) in entry phase, but keep the focused/selected visual style
- (done) i7-8 When the "I'm Done" button (c6-7) is visible in entry phase, pressing Enter should open c9-6

# (Done) i6 Fix incorrectly displayed letter hint when a shared game is loaded - completed at 2026-03-14 19:22

- (done) i6-1 When a shared Hide a Word game is loaded via URL, ensure hint letters (c4-3 cell-hint highlights) are restored correctly and not shown when they shouldn't be

# (Done) i5 Word input area (c5) fixes - completed at 2026-03-14 19:22

- (done) i5-1 Remove the typed-letters preview (c5-2) from the word input area
- (done) i5-2 Ensure the word input area (c5-1) does not change size when a letter is selected or deselected
- (done) i5-3 When a new letter is added to the selection, append it to c5 instead of redrawing the full display

# (Done) i3 Next letter hint in Hide a Word mode - completed at 2026-03-14 19:22

- (done) i3-1 Add a "Reveal 1 letter" button visible only during Hide a Word solve phase
- (done) i3-2 First press reveals the first letter of the hidden word on the board
- (done) i3-3 Each subsequent press reveals the next letter in sequence
- (done) i3-4 All letters of the hidden word can be revealed this way
- (done) i3-5 Layout: action buttons in two rows — "Reveal all" + "Reveal 1 letter" on top, "Share game" + "New game" on bottom
- (done) i3-6 Bug fix: "Reveal 1 letter" button stays disabled after starting a new game if all letters were revealed in the previous game
- (done) i3-7 Bug fix: after starting a new game, the first "Reveal 1 letter" press always reveals letter 1, not a later letter
- (done) i3-8 Bug fix: "Reveal all words" button is no longer visible
- (done) i3-9 When all letters of the hidden word are revealed via hint, also trigger "Reveal all" so the word is marked as found
- (done) i3-10 After all letters are revealed via hint, update game state so starting a new game does not show a progress-loss warning

# (Done) i4 Win screen button order and highlight - completed at 2026-03-14 19:22

- (done) i4-1 On the win screen, move "New game" to the right side and apply a highlighted (primary) style
- (done) i4-2 Move "Share game" to the left side with the default ghost style

# (Done) i2 Fix flickering word selection on cell boundaries - completed at 2026-03-14 19:22

- (done) i2-1 Increased the direction-based dead zone from 40% to 50% of slot width in `cellFromPoint`
- (done) i2-2 Root cause: at 40%, a direction switch could fire while the pointer was still inside the current cell (actual cell edge is at ~46% of slot width)
- (done) i2-3 At 50%, a cell switch only triggers once the pointer has crossed into the gap between cells, matching the expected "stay selected while inside the letter" behavior
- (done) i2-4 Diagonal flickering is still present — investigate and reduce further

# (Done) i1 New game selection menu redesign

- (done) i1-1 Replace the plain list of mode name buttons with selectable cards
- (done) i1-2 Each card shows the mode name (bold) and its full description text at all times — no hover or interaction needed to see the description
- (done) i1-3 Cards should be visually distinct and tappable on mobile (adequate touch target size, responsive width)
- (done) i1-4 Add a subtitle below the modal title ("Select a game mode." / localized) so the purpose of the modal is immediately clear
- (done) i1-5 Functionality is unchanged: clicking a card starts that game mode


# Footer
- Added a footer to the bottom of the page
- Added a feedback button with localized text: "Submit feedback, feature request or incorrect word" (EN) / "Visszajelzés, funkcióötlet vagy hibás szó beküldése" (HU)
- Modal includes:
  - Profile picture fetched from Bluesky (cdn.bsky.app avatar)
  - Descriptive text: "For any game related feedback, feature request or bug report, contact me via email" (localized in both languages)
  - Email address as a `mailto:asszem78@gmail.com` link with "Send email to" label
  - Bluesky profile link: https://bsky.app/profile/asszem.bsky.social
  - Close button
# (done) i12 Set maximum number of findable words per game - completed at 2026-03-17 22:07

- (done) i12-1 Add a max-words selector to the new game modal, defaulting to 5
- (done) i12-2 Allow the user to change the value (min 1, max 100)
- (done) i12-3 When generating a game, ensure only the allowed maximum number of words is findable on the board
- (done) i12-4 Ensure filler letters do not accidentally allow additional words beyond the maximum
- (done) i12-5 In Hide a Word mode, set the maximum word count to the number of hidden words (currently 1)
- (done) i12-6 The max word limit is not respected when a game is shared — the shared game should reflect the same word limit as the original
- (done) i12-7 The max words label is hardcoded — it should come from the language file ("Max words" in English, "Max szavak" in Hungarian)
- (done) i12-8 Change the default max words value from 5 to 15
- (done) i12-9 If the board has fewer words than the limit, that is acceptable — the limit is a cap, not a required count
