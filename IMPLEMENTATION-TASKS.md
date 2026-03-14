# (Open) ID:1 New game selection menu redesign

- [x] ID1-1 Replace the plain list of mode name buttons with selectable cards
- [x] ID1-2 Each card shows the mode name (bold) and its full description text at all times — no hover or interaction needed to see the description
- [x] ID1-3 Cards should be visually distinct and tappable on mobile (adequate touch target size, responsive width)
- [ ] ID1-4 Add a subtitle below the modal title ("Select a game mode." / localized) so the purpose of the modal is immediately clear
- [x] ID1-5 Functionality is unchanged: clicking a card starts that game mode

# (Done) ID:2 Fix flickering word selection on cell boundaries

- [x] ID2-1 Increased the direction-based dead zone from 40% to 50% of slot width in `cellFromPoint`
- [x] ID2-2 Root cause: at 40%, a direction switch could fire while the pointer was still inside the current cell (actual cell edge is at ~46% of slot width)
- [x] ID2-3 At 50%, a cell switch only triggers once the pointer has crossed into the gap between cells, matching the expected "stay selected while inside the letter" behavior

# Update rules

- Each task header follows the format: `(Status) ID:n Description`
- Each step follows the format: `- [x] IDn-n Description` (where the first `n` is the task ID and the second `n` is the step number)
- Assign the next available integer ID to each new task; assign sequential sub-IDs to its steps.
- Mark each individual step `[x]` when done, `[ ]` when not.
- If all steps are done, mark the heading `(Done)`; if any step is still open, mark it `(Open)`.
- Do not move tasks to `implementations-done.md` unless explicitly asked.
