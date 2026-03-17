# AI-Assisted Development Workflow Installer

> **What this is:** A self-contained workflow definition that an AI coding assistant can execute to set up a structured development environment in any project. It creates tracking files, establishes conventions, and defines the rules that govern how the AI and the developer collaborate.
>
> **How to use:** Copy this file into your project root. Open it with your AI coding assistant and say: **"Read this file and execute the setup instructions."** The AI will create all the necessary files and configure itself to follow the workflow.

---

## Setup Instructions (for the AI)

When asked to execute this workflow installer, do the following:

1. **Read the entire file** before doing anything.
2. **Survey the project** — look at the directory structure, identify the tech stack, understand what already exists.
3. **Create each file** listed below using the provided templates. If a file already exists, do NOT overwrite it — instead, merge the rules from this installer into the existing file, preserving existing content.
4. **Fill in the `CLAUDE.md` template** with project-specific details discovered during the survey (tech stack, entry points, build commands, architecture notes).
5. **Fill in the `RULES.md` template** with any domain rules you can infer from the codebase (validation rules, business logic constraints, etc.). If none are obvious, leave placeholders.
6. **Fill in the `COMPONENT-REFERENCES.md` template** by scanning the codebase for UI components, pages, modules, or API endpoints. If the project has no UI, adapt the template to reference whatever the project's main structural units are (modules, services, endpoints, etc.).
7. **Report what you created** and ask the user to review.

### Files to create

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Primary AI instruction file — project overview, architecture, conventions, shortcuts |
| `IMPLEMENTATION-TASKS.md` | Active feature/fix task tracker with embedded update rules |
| `implementations-done.md` | Archive of completed implementation tasks |
| `todo.md` | General work item tracker with embedded update rules |
| `RULES.md` | Domain-specific rules (business logic, validation, constraints) |
| `COMPONENT-REFERENCES.md` | Registry of UI components / modules / structural units with canonical IDs |

---

## File Templates

Each template below should be created as-is, then customized with project-specific content where indicated by `{{placeholders}}` or `<!-- comments -->`.

---

### 1. CLAUDE.md

```markdown
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

<!-- AI: Fill this in by surveying the project. One paragraph describing what the project is. -->
{{Project description}}

## Running the project

<!-- AI: Fill in with the actual commands discovered from package.json, Makefile, etc. -->
```
{{build/run commands}}
```

## Architecture

<!-- AI: Describe the project structure, key directories, tech stack, frameworks. -->
{{Architecture overview}}

## Command shortcuts

- `imp` is shorthand for implementation commands — e.g. `imp i3` means "implement i3", `imp update` means "implementations update", `imp move i3 to done` means "move i3 to done", `imp reopen i3` means "reopen i3", etc.
- `comp` is shorthand for component-references commands — e.g. `comp update` means "update component references".

## Implementation tasks

`IMPLEMENTATION-TASKS.md` tracks feature/fix tasks. Update rules are defined in its own `# Update rules` section. Key points:
- Task headers follow the format: `# (Status) iN Description`
- Steps follow the format: `(status) iN-N Description`
- IDs are permanent — never reuse an iN ID, even after a task is moved to `implementations-done.md`.
- Step statuses: `(open)` = not started, `(fix)` = implemented but broken and needs a fix, `(change)` = a prior requirement was changed and this step tracks the updated requirement, `(test)` = implemented/fixed and awaiting user approval, `(done)` = approved by user.
- Priority markers are valid on step statuses: for example `(fix!)`, `(fix!!)`, `(change!)`, `(change!!)`; more `!` means higher priority and these steps should be treated as more important than the same base status without priority markers.
- When implementing or fixing a step, set it to `(test)` — never set to `(done)` yourself.
- Header status: `(open)` if any step is open, `(test)` if all implemented but not all approved, `(done)` only when all steps are done.
- When asked to implement `iN`, only implement open steps under that exact task. Never touch steps from a different task ID.
- Always list the implemented step IDs in the response (e.g. "Implemented: i3-5, i3-6").
- When asked for "implementations update": reformat and reword all tasks to follow the rules (IDs, statuses, header format), but do not implement anything.
- Do **not** move tasks to `implementations-done.md` unless the user explicitly asks.
- When moving a task to `implementations-done.md`, append a completion timestamp to its header: `- completed at yyyy-mm-dd hh:mm`

## Todo list

`todo.md` tracks all work items. When completing a task or adding new items, update `todo.md` according to the rules defined in its own `# Update rules` section. Key points:
- Move checked items to `# Done` with a `- completed at yyyy-mm-dd hh:mm` timestamp.
- Move re-opened items back to `# Todo` with a `- reopened at yyyy-mm-dd hh:mm` timestamp.
- Keep section header counts accurate after every change.

## Component references

All structural units (UI components, modules, services, endpoints) have canonical names and hierarchical IDs defined in **`COMPONENT-REFERENCES.md`**. Always consult it when:
- Interpreting a prompt that refers to a part of the system (e.g. "the login form", "the API handler", "the settings page")
- Describing structural units in a response
- Deciding which file or function to touch for a given change
- A prompt uses a cN or cN-N ID (e.g. c9-6, c11-2) — look it up in `COMPONENT-REFERENCES.md` to resolve the exact element

When the user refers to a component by name, variation, or cN ID, map it to the canonical entry in `COMPONENT-REFERENCES.md` before acting.

## Rules

All domain rules (validation, business logic, constraints) live in **`RULES.md`**. Always read `RULES.md` before:
- Implementing or changing domain logic
- Adding or modifying data schemas
- Validating inputs or outputs
```

---

### 2. IMPLEMENTATION-TASKS.md

```markdown
<!-- This file tracks active feature and fix tasks. Completed tasks are moved to implementations-done.md -->

# Update rules

- Each task header follows the format: `# (Status) iN Description`
- Each step follows the format: `(status) iN-N Description`
- Assign the next available integer ID to each new task; assign sequential sub-IDs to its steps. IDs are permanent — never reuse an iN ID, even after a task is moved to `implementations-done.md`.
- Step statuses:
  - `(open)` — not yet implemented
  - `(fix)` — previously implemented but not working correctly; needs a fix
  - `(change)` — a previously defined requirement was changed and the step now tracks the updated requirement
  - `(test)` — implemented (or fixed), awaiting user test approval
  - `(done)` — approved by user or manually marked done
- Priority markers:
  - Exclamation marks are valid priority markers on step statuses, for example `(fix!)`, `(fix!!)`, `(change!)`, `(change!!)`
  - More exclamation marks mean higher priority
  - Treat steps with priority markers as more important than the same base status without priority markers
  - Priority markers do not change the underlying status meaning; for example `(fix!!)` is still a fix step, but urgent
- Header statuses:
  - `(open)` — at least one step is open
  - `(test)` — all steps are at least (test) but not all (done)
  - `(done)` — all steps are (done)
  - `(reopen)` — task was previously completed and moved to `implementations-done.md`, then reopened with new steps added
- When you implement a step, set it to `(test)`. Do not set it to `(done)` yourself.
- When asked to implement `iN`, only implement open steps under that task. Never implement steps belonging to a different task ID.
- Always list the implemented step IDs (e.g. i3-5, i3-6) in the response.
- When asked for "implementations update": reformat and reword all tasks to follow these rules (IDs, statuses, header format), but do not implement anything.
- If there are unformatted lines at the top of the file (before any `#` header), treat them as a new task: assign the next available iN ID, infer a descriptive header title from the content, format each bullet as a numbered step with `(open)` status, and set the header status to `(open)`. If any line references a known component (e.g. c5-1, c5-2, or a description matching a component in `COMPONENT-REFERENCES.md`), include the component ID in the step description.
- Before assigning a new iN ID to any new task (formatted or unformatted), check `implementations-done.md` for a semantically similar completed task. If a close match is found, ask the user: "This looks similar to iN — do you want to reopen that task, or treat this as a new one?" Do not proceed until the user answers.
- Do not move tasks to `implementations-done.md` unless explicitly asked.
- When moving a task to `implementations-done.md`, append a completion timestamp to the end of its header line in the format: `- completed at yyyy-mm-dd hh:mm`
- When asked to "reopen iN": find that task in `implementations-done.md`, move it back to `IMPLEMENTATION-TASKS.md` (above the Update rules section), replace its completion timestamp with `- reopened at yyyy-mm-dd hh:mm`, and set the header status to `(reopen)`
- Command shortcut: `imp` is shorthand for implementation commands — e.g. `imp i3` = implement i3, `imp update` = implementations update, `imp move i3 to done` = move i3 to done, `imp reopen i3` = reopen i3
```

---

### 3. implementations-done.md

```markdown
<!-- Archive of completed implementation tasks. Tasks are moved here from IMPLEMENTATION-TASKS.md when the user explicitly asks. -->
```

---

### 4. todo.md

```markdown
# Todo

# Done

# Update rules

**Rule version**
- rule version: 1.0
- script version: 1.0
- rule update date: {{current date}}
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
```

---

### 5. RULES.md

```markdown
<!-- Domain-specific rules for this project. AI: scan the codebase and fill in rules that govern the project's logic. -->
<!-- Use hierarchical IDs: r1, r1-1, r1-1-1 for easy reference. -->

# r1 {{Domain Area}}

<!-- AI: Identify the first major domain area (e.g. "Data Validation", "API Contracts", "Game Rules") and list its rules. -->

## r1-1 {{Sub-area}}

- r1-1-1 {{Rule description}}

---

# r2 {{Domain Area}}

<!-- AI: Continue with additional domain areas as needed. -->
```

---

### 6. COMPONENT-REFERENCES.md

```markdown
<!-- Registry of all structural units in the project. Each entry has a unique hierarchical ID (cN, cN-N, cN-N-N). -->
<!-- AI: Scan the codebase for UI components, pages, modules, services, or API endpoints and catalog them here. -->
<!-- Use `comp update` to ask the AI to rescan and update this file. -->

# Component References

<!-- For UI projects, organize by screen/page/section. For backend projects, organize by module/service/endpoint. -->

## c1 {{Top-level section or module}}

| ID | Name | Selector / Path | Description |
|----|------|-----------------|-------------|
| c1-1 | {{Name}} | {{CSS selector, file path, or route}} | {{What it is}} |
| c1-2 | {{Name}} | {{CSS selector, file path, or route}} | {{What it is}} |

## c2 {{Top-level section or module}}

| ID | Name | Selector / Path | Description |
|----|------|-----------------|-------------|
| c2-1 | {{Name}} | {{CSS selector, file path, or route}} | {{What it is}} |

<!-- Continue for all major structural units -->

# Update rules

- Every UI component, module, service, or endpoint gets a unique hierarchical ID: `cN` for top-level groups, `cN-N` for children, `cN-N-N` for grandchildren.
- IDs are permanent. Never reuse a cN ID, even if the component is removed.
- When new components are added to the codebase, assign the next available ID.
- When the user says `comp update`, rescan the codebase and update this file — add new entries, mark removed ones as `(removed)`, update descriptions.
- Keep the table format consistent.
```

---

## Workflow Quick Reference

### Command shortcuts

| Shortcut | Expands to | Example |
|----------|-----------|---------|
| `imp iN` | Implement task iN | `imp i3` |
| `imp update` | Reformat all tasks (no implementation) | `imp update` |
| `imp move iN to done` | Move task iN to done archive | `imp move i3 to done` |
| `imp reopen iN` | Reopen a completed task | `imp reopen i3` |
| `comp update` | Rescan and update component references | `comp update` |

### Task lifecycle

```
User writes unformatted notes in IMPLEMENTATION-TASKS.md
        │
        ▼
  "imp update" ──► AI formats into (open) iN tasks with steps
        │
        ▼
  "imp iN" ──► AI implements open steps, sets them to (test)
        │
        ▼
  User tests ──► User sets steps to (done) or (fix)
        │
        ▼
  All steps (done) ──► "imp move iN to done" ──► moved to implementations-done.md
        │
        ▼
  Need to revisit? ──► "imp reopen iN" ──► moved back with (reopen) status
```

### Status meanings

| Status | Meaning |
|--------|---------|
| `(open)` | Not yet implemented |
| `(fix)` | Implemented but broken, needs a fix |
| `(test)` | Implemented/fixed, awaiting user approval |
| `(done)` | Approved by user |
| `(reopen)` | Previously completed, reopened with new work |

### Key principles

1. **The AI never marks a step as `(done)`** — only the user can approve.
2. **IDs are permanent** — never reuse an iN or cN ID, even after deletion.
3. **Check for duplicates** — before creating a new task, check if a similar one exists in the done archive.
4. **Rules live in their files** — domain rules in `RULES.md`, not scattered in code comments.
5. **Components have canonical names** — always resolve references through `COMPONENT-REFERENCES.md`.
6. **Todo items are priority-ordered** — P0 is highest, P5+ is lowest.
