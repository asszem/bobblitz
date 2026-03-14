# Dictionary Rules

Use these rules for every dictionary update in this repository (`lang/*.words`):

# General rules, applicable for every language

- Words minimum length: **3 characters**.
- Words maximum length: **8 characters**.
- All words must be unique
- Suffixes are valid new words (like plurals)
- Only valid words can be used, that exists in the selected language.
- Names can be valid words
- Remove only invalid words from the dictionary when updating dictionary
- Add shorter, but valid words to reach the minimum words / game rule

## Hungarian special rules

- Make sure Hungarian diacritics preserved

## Scope

- Apply these rules separately per language dictionary.
- Do not add placeholders, random combinations, or non-words.
- Validate short words (3 or 4 letters) especially carefully to be existing, real words in the given language

# Game rules

- When creating a new game, the following rules must be met

## Standard game

- The minimum findable words per game should be at least 5 words
- Every game must have at least the following number of words
  - 4 letter word: 3
  - 5 letter word: 2

## Hide a word game
- Hidden word must be at least 4, max 10 character long, no space
- Only this word should be included in the game field
- The rest of the positions should be filled with random, language valid characters