# (open) i13 Report incorrect words flow
(open) i13-1 When all words are revealed, add a "Report incorrect words" button
(open) i13-2 When the button is pressed, show a localized label instructing the user to click incorrect words
(open) i13-3 When a user clicks a word, mark it as selected for reporting and highlight it differently
(open) i13-4 When a user clicks an already selected word again, deselect it
(open) i13-5 Add two buttons below the selection area: "Back" and "Send report"
(open) i13-6 When Back is pressed, return to the state from before "Report incorrect words" was opened
(open) i13-7 When Send report is pressed, display a modal with a localized subject line in the format "Incorrect words found in [game version number, iso date]" and a body listing the incorrect words one per line
(open) i13-8 In the report modal, display 3 buttons: "Close", "Copy to Clipboard", and "Send by email"
(open) i13-9 When Close is pressed, return to incorrect word selection
(open) i13-10 When Copy to Clipboard is pressed, copy the message subject and body to the clipboard and keep the modal open
(open) i13-11 When Send by email is pressed, open a `mailto:` link to `asszem78@gmail.com` with the subject and body prepopulated, and keep the modal open


# (open) i11 Dictionary update (pass 4)
(open) i11-1 Strip everything from the `/` onwards (including `/`) on each line of hu_HU-ispell-original.dic; save stripped lines to a separate file (pass 4, step 1)
(open) i11-2 Remove every word containing `Å` or `-` or `.`; remove 1 or 2 letter words; save removed words to a separate file (pass 4, step 2)
(open) i11-3 Remove duplicate words; save removed duplicates to a separate file (pass 4, step 3)
(open) i11-4 Order words by letter count ascending, then alphabetically as secondary order (no separate file needed) (pass 4, step 4)
(open) i11-5 Prepend X_ to every 3-4 letter word that is not a valid Hungarian word; abbreviations are invalid; save marked words to a separate file (pass 4, step 5)
(open) i11-6 Remove every word that is marked with X_ and make sure every line has only one single word (pass 4, step 6)
(open) i11-7 Write a summary of actions and results to claude-cleanup-pass-4.md

# (open) i10 Update winning screens
(open) i10-1 Add mode-specific winning modals with different images for each game mode
(open) i10-2 Standard mode win modal: default win screen
(open) i10-3 Hide a Word mode win modal: display the found hidden word; offer to create a new Hide a Word game to send back
(open) i10-4 Enter Letters mode win modal: custom win screen for that mode

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
