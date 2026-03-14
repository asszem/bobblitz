# Todo
## P1 Dictionary fix (open: 3, done: 0)
- [ ] P0 - update hungarian dictionary with ragozott alakok
- [ ] P0 - add new words
- [ ] P0 - purge incorrect words - reopened at 2026-03-14 15:22

## P2 Game modes (open: 5, done: 5)
### P1 Word hide (open: 2, done: 5)
- [ ] P0 - check board to make sure no other valid word is added
- [ ] P4 - validate findable word (no spaces, language valid characters)

### P3 New modes (open: 3, done: 0)
- [] P0 - set minimum words and maximum words. add random characters to fill up the space and confirm that no valid word can be made
- [ ] P0 - hide multiple words. check during entering new word whether it is possible to ndd that word.
- [ ] P0 - display possible word options


## P3 UI (open: 1, done: 2)
- [ ] P0 - play mode redesign - when in game phase, hide controls, options, footer

## P3 Game options (open: 2, done: 0)
- [ ] P0 - option to combine languages
- [ ] P0 - adjustable grid size

## P4 Feedback (open: 1, done: 1)
- [ ] P0 - report missing word option
- [] P0 - report incorrect word option for revealed list - reopened at 2026-03-14 20:38

## P4 Usability (open: 1, done: 0)
- [x ] P0 - fix less sensitive vertical movement

## P5 Share game (open: 2, done: 0)
- [ ] P0 - assign unique id for every word
- [ ] P0 - keep this id during dictionary updates

## P5 Persistence (open: 5, done: 0)
- [ ] P0 - user can set their name which will be included in local storage
- [ ] P0 - if user profile does not exist when game loaded
- [ ] P0 - save multiple games in localStore
- [ ] P0 - export save to file
- [ ] P0 - create a game seed that results in the same words that can be used for the same

## P5 Leaderboard (open: 3, done: 1)
- [ ] P0 - create a leaderboard for a specific game
- [ ] P0 - create a leaderboard list
- [ ] P0 - create a list of handmade levels

## P10 Világom (open: 1, done: 0)
- [ ] P0 - Create a modal and add to the game

# Done

## P0 Uncategorized (done: 3)
- [x] P0 - this is a test todo ite - completed at 2026-03-14 15:10
- [x ] P0 - ask to ID component references - completed at 2026-03-14 20:38
- [x] P3 - this is another test todo item - completed at 2026-03-14 15:10

## P2 Game modes (done: 5)
### P1 Word hide (done: 5)
- [x] P0 - test item in word hide j - completed at 2026-03-14 15:10
- [x] P2 - marked as done - completed at 2026-03-14 15:06
- [x] P2 - marked as done with wxtra whitespaces - completed at 2026-03-14 15:06
- [x] P2 - marked as done with wxtra whitespaces - completed at 2026-03-14 15:06
- [x] P2 - add next letter hint for szórejtő - completed at 2026-03-14 19:22


## P2 Dictionary fix (done: 0)

## P3 UI (done: 2)
- [x] P0 - update the color scheme for better visibility - completed at 2026-03-14 19:22
- [ x] P0 - update button visibility - completed at 2026-03-14 19:22

## P4 Feedback (done: 1)
- [x ] P0 - add feedback and name to header - completed at 2026-03-14 19:22

## P5 Leaderboard (done: 1)
- [x] P0 - add author to saved game - completed at 2026-03-14 15:22

# Update rules 

** Rule version **
- rule version: 1.0
- script version: 1.0
- rule update date: 2026-03-14 15:14
- increment the minor version number and the date, every time these rules are updated

**Structure**
- The file has exactly three top-level headers: `# Todo`, `# Done`, `# Update rules`.
- Both `# Todo` and `# Done` use the same category sections (e.g. `## P2 Game modes`) and subsections (e.g. `### P1 Word hide`).
- When moving a done item, create the matching section/subsection under `# Done` if it does not already exist.

**Format**
- Every todo item must follow this exact format: `- [ ] Pn - description`
- If a new item has no checkbox, add `- [ ]` before it.
- If a new item has no priority, assign `P0` as the default.

**Do not change**
- Do not change the checkbox status (`[ ]` vs `[x]`).
- Do not change the priority number on existing items.
- Do not change the wording of any existing description.
- Only fix items that violate the format rule above.

**Ordering**
- Lower Pn number = higher priority. P0 is highest, P5 is lowest.
- Order markdown headers and subheaders by their Pn value, lowest number first.
- Within each header, order items by their Pn value, lowest number first.
- Items with the same Pn keep their existing relative order.

**Done items**
- In `# Todo`: `[ ]` is open. Everything else (including `[]`, `[x]`, `[X]`, `[~]`, `[-]`, `[x ]`, `[ x ]`) is considered done — move to `# Done`.
- In `# Done`: `[ ]` or `[]` is open — move back to `# Todo`. Everything else is considered done — leave in place.
- When moving from `# Todo` to `# Done`, append a timestamp: `- completed at yyyy-mm-dd hh:mm`.
- When moving from `# Done` to `# Todo`, append a timestamp: `- reopened at yyyy-mm-dd hh:mm`.
- If the target section or subsection does not exist, create it.
- Remove a section from `# Todo` if it becomes empty after moving.

**Section header counts**
- Every section and subsection header must show item counts after the title.
- For `# Todo` headers: `Pn Category Title (open: n, done: n)` — open is the number of open items in that section, done is the number of items in the matching `# Done` section.
- For `# Done` headers: `Pn Category Title (done: n)` — done is the number of items in that section.
- For parent sections that contain subsections, counts are the sum across all their subsections.
- Recalculate and update all counts whenever items are added, moved, or checked.
