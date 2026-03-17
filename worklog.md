# Worklog

## 2026-03-18

Today’s work focused on the `i13` report flow and the workflow around it.

We first aligned the project process: reviewed the repo workflow docs, updated the implementation-task rules to support `(change)` steps and `!` priority markers, and synced those rule changes into [`workflow.md`](/home/andras/github/bobblitz/workflow.md) and [`general-development-workflow.md`](/home/andras/github/bobblitz/general-development-workflow.md). We also created and used the branches `feat-i13-codex` and `feat-i13-claude`, then worked on `feat-i13-codex`.

On the product side, we implemented and refined the full `i13` “Report incorrect words” flow in [`index.html`](/home/andras/github/bobblitz/index.html) and the language files. That included the report-selection UI, localized modal content, clipboard flow, email-link behavior, multiple layout fixes, moving the report action under the found words, stabilizing the chip layout during reporting, removing the modal’s separate subject section, auto-copying the final message, shortening the helper text, removing the extra “copied to clipboard” label, and hiding the report flow entirely in Hide a Word mode. We updated `IMPLEMENTATION-TASKS.md` throughout, then marked `i13` done and moved it to [`implementations-done.md`](/home/andras/github/bobblitz/implementations-done.md).

We also did a small release/admin pass: updated the displayed app version to `v1.1.1-codex-i13` in [`index.html`](/home/andras/github/bobblitz/index.html), added two new todo items in [`todo.md`](/home/andras/github/bobblitz/todo.md), and kept task files organized as we went.