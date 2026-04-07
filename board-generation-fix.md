# Board Generation Fix

## Findings

- Standard-mode board analysis was already finding every valid dictionary word on the 4x4 board.
- The bug happened after analysis in [`index.html`](/home/andras/github/bobblitz/index.html): standard-mode `initGame()` sorted the full board-word set and then truncated it to `maxWordsLimit`.
- After truncation, `buildGameWordSets()` replaced normal dictionary lookups with a reduced accepted-word/prefix set, so valid board words like `KÖR` could exist on the board but still be rejected and omitted from reveal.
- Saved games and shared URLs could preserve the same mismatch because they stored a limited word list instead of deriving the playable words from the board each time.
- `analyzeGridWords()` itself was not the source of the omission.

## Fix Implemented

- Standard mode now rerolls boards until they both satisfy the generation rules and fit within `maxWordsLimit`.
- Once a board is accepted, the game now keeps the full analyzed board-word set. It no longer slices the accepted/revealed list after generation.
- Hide-a-word mode now rerolls filler letters until the hidden word is the only valid board word, which prevents accidental extra dictionary words from being silently missed.
- Saved games now expand back to the full analyzed board-word set, so older truncated saves recover previously missed valid words.
- Shared URLs now derive playable words from the shared grid itself instead of trusting a separate truncated word list.
- Enter-letters solve mode now uses the same board-word finalization helper so acceptance, reveal, and persistence stay aligned.

## Follow-Up Plan

1. Manual-test standard mode with a low `maxWordsLimit` and confirm every valid board word is accepted and shown by reveal.
2. Manual-test hide-a-word mode with several different target words and confirm reveal/win state only ever contains the hidden word.
3. Load an older saved game or shared link and confirm previously omitted words are restored automatically.
