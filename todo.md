# Tasks

## Share game

- add share game option
  - generate url from generated game, without solves
  - accept url parameters to load game
- assign unique id for every word
- keep this id during dictionary updates

## Persistence

- save multiple games in localStore
- export save to file

## UI

- improve the found word effect
- remove the gamemode button, clicking new game should open the game mode selection
- the selected new game should be the previous game
- display the current game mode

## Game modes

- set minimum words and maximum words. add random characters to fill up the space and confirm that no valid word can be made
- hide multiple words. check during entering new word whether it is possible to add that word.
  - display possible word options

## Game options

- adjustable grid size

## Usability

- fix less sensitive vertical movement
