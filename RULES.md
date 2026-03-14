
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

# Game phases
There are two main phase 
1. Game configuration phasse
    - In this phase, according to the game mode, the user does the configurations
2. Game solve phase
    - in this phase, the user does the word highlighting and actually plays the gaame
# Game rules

- When creating a new game, the game rules depend on the actual game mode selected

## Standard game mode

- The minimum findable words per game should be at least 5 words
- Every game must have at least the following number of words
  - 4 letter word: 3
  - 5 letter word: 2

## Hide a word game mode
- Hidden word must be at least 4, max 10 character long, no space
- Only this word should be included in the game field
- The rest of the positions should be filled with random, language valid characters

## Enter letters game mode
- This game mode lets user enter enter a language-valid letter to any point in the grid. 
- When the game mode is selected, the user can navigate the grids with the cursor keys, or tap 
- When a grid is selected, it enters into input mode. 
- when an input is entered, itis validated against the available characters in that language
- when incorrect, a toast notification displayed and the letter is removed
- when valid, it remains
- the user can overwrite any letters
- When all letters are entered, a button of "Find words" becomes enabled
- When user presses this button, the game finds all the words that is on the board, according to the language file
- Then the user can go to Solve mode, which works the same 