1. Core Structure
Gameboard Module: Manages the game board as an array and ensures players can add marks only to valid spots.
Player Factory: Creates player objects with names and their respective marks (X or O).
Game Controller: Manages game flow, including turn switching, checking for winners, and resetting the game.
Display Controller: Handles updating the DOM, displaying the board, and showing game results.
2. Functionality
Players take turns marking empty spots on a 3x3 grid.
The game checks for a winner after every move (three in a row, column, or diagonal).
If all spots are filled and no winner is determined, the game ends in a tie.
A restart button resets the game and lets players enter new names.
3. Features
Minimal global code: Logic is encapsulated in factories and modules.
Game starts in the console first; then, DOM interaction is added.
Dynamic rendering of the board using JavaScript.
Players can't play on already marked spots.
4. Flow
Players input names.
Game alternates turns between Player 1 and Player 2.
Updates are displayed dynamically on the board.
On a win or tie, the result is displayed.
Restart button resets the game for a new round.
This approach ensures the game is modular, scalable, and easy to debug or expand upon!
