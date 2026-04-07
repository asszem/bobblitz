# Claude Code — Git & Session Notes

*Added: 2026-03-17*

## How Claude Code branching works

- Each Claude Code conversation gets its own automatically created `claude/...` branch.
- Claude never works directly on `main` — always on a dedicated session branch.
- Changes are committed and pushed to that branch, not to `main`.

## The internal git proxy

- Claude's `origin` remote points to a **local proxy** (`127.0.0.1:43147`), not directly to GitHub.
- This proxy is only reachable from within the session environment — you cannot add it as a remote from your local machine.
- Pushes go to this proxy, **not to your GitHub repo**.
- Claude branches do **not appear on GitHub** unless explicitly pushed there through a real remote.

## What this means in practice

- Edits or commits made by Claude in a session are **not visible on GitHub**.
- They are also **not guaranteed to persist** after the session ends.
- Do not rely on Claude's session environment for persistent or private storage.
- For anything important: make changes locally via CLI, commit, and push to GitHub directly.

## Session memory

- Claude has **no memory between conversations** — each CLI or app session starts fresh.
- To preserve context across sessions, use `CLAUDE.md`, `todo.md`, or paste relevant notes into the new session.

## Your repo remotes (as of this session)

- `origin` → `http://local_proxy@127.0.0.1:43147/git/asszem/bobblitz` (Claude's internal proxy)
- Real GitHub repo: `github.com/asszem/bobblitz`
- Branches visible on GitHub: `main`, `feat-i13-codex`
