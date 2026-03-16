# (open) i10 Update winning screens
(open) i10-1 Add mode-specific winning modals with different images for each game mode
(open) i10-2 Standard mode win modal: default win screen
(open) i10-3 Hide a Word mode win modal: display the found hidden word; offer to create a new Hide a Word game to send back
(open) i10-4 Enter Letters mode win modal: custom win screen for that mode

# (open) i11 Dictionary update
(open) i11-1 Add more valid short words (3 or 4 letters) to the dictionary

# (done) i12 Set maximum number of findable words per game
(done) i12-1 Add a max-words selector to the new game modal, defaulting to 5
(done) i12-2 Allow the user to change the value (min 1, max 100)
(done) i12-3 When generating a game, ensure only the allowed maximum number of words is findable on the board
(done) i12-4 Ensure filler letters do not accidentally allow additional words beyond the maximum
(done) i12-5 In Hide a Word mode, set the maximum word count to the number of hidden words (currently 1)
(done) i12-6 The max word limit is not respected when a game is shared — the shared game should reflect the same word limit as the original
(done) i12-7 The max words label is hardcoded — it should come from the language file ("Max words" in English, "Max szavak" in Hungarian)
(done) i12-8 Change the default max words value from 5 to 15
(done) i12-9 If the board has fewer words than the limit, that is acceptable — the limit is a cap, not a required count

# Update rules

- Each task header follows the format: `# (Status) iN Description`
- Each step follows the format: `(status) iN-N Description`
- Assign the next available integer ID to each new task; assign sequential sub-IDs to its steps. IDs are permanent — never reuse an iN ID, even after a task is moved to `implementations-done.md`.
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
- If there are unformatted lines at the top of the file (before any `#` header), treat them as a new task: assign the next available iN ID, infer a descriptive header title from the content, format each bullet as a numbered step with `(open)` status, and set the header status to `(open)`. If any line references a known UI component (e.g. c5-1, c5-2, or a description matching a component in `COMPONENT-REFERENCES.md`), include the component ID in the step description.
- Before assigning a new iN ID to any new task (formatted or unformatted), check `implementations-done.md` for a semantically similar completed task. If a close match is found, ask the user: "This looks similar to iN — do you want to reopen that task, or treat this as a new one?" Do not proceed until the user answers.
- Do not move tasks to `implementations-done.md` unless explicitly asked.
- When moving a task to `implementations-done.md`, append a completion timestamp to the end of its header line in the format: `- completed at yyyy-mm-dd hh:mm`
- When asked to "reopen iN": find that task in `implementations-done.md`, move it back to `IMPLEMENTATION-TASKS.md` (above the Update rules section), replace its completion timestamp with `- reopened at yyyy-mm-dd hh:mm`, and set the header status to `(reopen)`
- Command shortcut: `imp` is shorthand for implementation commands — e.g. `imp i3` = implement i3, `imp update` = implementations update, `imp move i3 to done` = move i3 to done, `imp reopen i3` = reopen i3
