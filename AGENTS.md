# Repository Guidelines

## Project Structure & Module Organization
- `index.html`: main application file (UI, styles, and game logic).
- `lang/en.json`, `lang/hu.json`: language config (labels, pool, limits, dictionary file path).
- `lang/en.words`, `lang/hu.words`: newline-separated dictionary word lists.
- `lexi.png`: modal image asset.
- `CLAUDE.md`: internal project notes and architecture hints.

Keep feature logic in the existing JS section of `index.html` unless a clear split is needed.

## Build, Test, and Development Commands
- Run locally with a static server (recommended because dictionaries are loaded via `fetch`):
  - `python -m http.server`
  - or `npx serve .`
- Quick JS syntax check:
  - `node --check path/to/extracted-script.js` (useful after larger edits).

There is no build step, package manager workflow, or CI test runner in this repo.

## Coding Style & Naming Conventions
- Use 2-space indentation in HTML/CSS/JS.
- Prefer clear, small functions (`verbNoun` style), e.g. `applyLang`, `startNewGame`.
- Keep constants uppercase (`LANG_FILES`) and state variables camelCase (`bestWord`).
- Preserve current architecture: DOM refs grouped, then state, then behavior.
- For dictionaries:
  - one uppercase word per line in `*.words`
  - obey configured min/max length
  - keep characters valid for the target language.

## Testing Guidelines
- Manual testing is required:
  - start game, select words, submit, reveal, language switch, new game modal flow.
  - verify no UI jump in bottom controls and no broken glyphs in labels.
- Data validation for dictionaries:
  - ensure words parse cleanly and character set is valid.
  - confirm Hungarian games still satisfy target playable word count.

## Commit & Pull Request Guidelines
- Follow Conventional Commit style seen in history:
  - `feat(scope): ...`, `fix(scope): ...`, `refactor: ...`, `style: ...`, `docs: ...`
- Keep commits focused (UI, dictionary, or logic change per commit when possible).
- PRs should include:
  - concise summary,
  - files changed,
  - manual test notes,
  - screenshots/GIFs for UI changes,
  - any dictionary generation/validation details.
