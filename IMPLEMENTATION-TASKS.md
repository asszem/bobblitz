# (reopen) i3 Next letter hint in Hide a Word mode - reopened at 2026-03-14 19:22

- (done) i3-1 Add a "Reveal 1 letter" button visible only during Hide a Word solve phase
- (done) i3-2 First press reveals the first letter of the hidden word on the board
- (done) i3-3 Each subsequent press reveals the next letter in sequence
- (done) i3-4 All letters of the hidden word can be revealed this way
- (done) i3-5 Layout: action buttons in two rows — "Reveal all" + "Reveal 1 letter" on top, "Share game" + "New game" on bottom
- (done) i3-6 Bug fix: "Reveal 1 letter" button stays disabled after starting a new game if all letters were revealed in the previous game
- (done) i3-7 Bug fix: after starting a new game, the first "Reveal 1 letter" press always reveals letter 1, not a later letter
- (done) i3-8 Bug fix: "Reveal all words" button is no longer visible
- (open) i3-9 When all letters of the hidden word are revealed via hint, also trigger "Reveal all" so the word is marked as found
- (open) i3-10 After all letters are revealed via hint, update game state so starting a new game does not show a progress-loss warning


# (open) i4 Win screen button order and highlight

- (open) i4-1 On the win screen, move "New game" to the right side and apply a highlighted (primary) style
- (open) i4-2 Move "Share game" to the left side with the default ghost style

# Update rules

- Each task header follows the format: `(Status) iN Description`
- Each step follows the format: `(status) iN-N Description`
- Assign the next available integer ID to each new task; assign sequential sub-IDs to its steps.
- Step statuses:
  - `(open)` — not yet implemented
  - `(fix)` — previously implemented but not working correctly; needs a fix
  - `(test)` — implemented (or fixed), awaiting user test approval
  - `(done)` — approved by user or manually marked done
- Header statuses:
  - `(open)` — at least one step is open
  - `(test)` — all steps are at least (test) but not all (done)
  - `(done)` — all steps are (done)
  - `(reopen)` — task was previously completed and moved to `implementations-done.md`, then reopened with new steps added
- When you implement a step, set it to `(test)`. Do not set it to `(done)` yourself.
- When asked to implement `iN`, only implement open steps under that task. Never implement steps belonging to a different task ID.
- Always list the implemented step IDs (e.g. i3-5, i3-6) in the response.
- When asked for "implementations update": reformat and reword all tasks to follow these rules (IDs, statuses, header format), but do not implement anything.
- Do not move tasks to `implementations-done.md` unless explicitly asked.
- When moving a task to `implementations-done.md`, append a completion timestamp to the end of its header line in the format: `- completed at yyyy-mm-dd hh:mm`
- When asked to "reopen iN": find that task in `implementations-done.md`, move it back to `IMPLEMENTATION-TASKS.md` (above the Update rules section), replace its completion timestamp with `- reopened at yyyy-mm-dd hh:mm`, and set the header status to `(reopen)`
- Command shortcut: `imp` is shorthand for implementation commands — e.g. `imp i3` = implement i3, `imp update` = implementations update, `imp move i3 to done` = move i3 to done, `imp reopen i3` = reopen i3
