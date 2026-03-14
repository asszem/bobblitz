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
