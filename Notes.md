[Week of 15 July 2019]
focus on these this week:
* X only player [**resolved**]
* Invalid input - outside of range [**resolved**]
* Invalid input - Same square [**resolved**]
* Grid entry disappear after initial entry (figure out whether you want to display the directionsGrid or have the tokens replace the numbers on the directionsGrid.)[**numberDisplay branch displays the directions grid**]
* Debug the game not checking for winners [**resolved** fn were referencing grid1 and not directionsGrid].
* Debug the recursive winner message

[After Above]
computer Player
unbeatable Player
packaging code options

***Notes***
- The move function no longer worries about the token, it's given the token from the gamePlay fn and all it does is to replace the board with the given token.
- The gamePlay fn now has access to the current play and the token, so it distributes the information to the fn.
- Found the branch with updated functions to toggle between 'X' and 'O'
- However!!! Upon winning, the checkForWin runs in a loop multiple times and prints out the message over as many times as there are grid entries
- You may need to adjust the gamePlay fn, instead of calling the function again and again, looping?
- usable vs testable, your boardDisplay fn needs to be both, needs to console log the board, but also have something to return so that you can test it.

- git stash save
- recursive testing

//OK, so when I run my game, I want to:
//1. prompt a player to enter a number
//2. Check to see that it's a valid numbers
// 3. If invalid, ask the user to re-enter a correct input
// 4. If valid, take the user input and use game.move fn to put the token on the board.
// 5. Check the board to see if there is a winning combination or a draw.
// 6. If so, the game is no longer active, gameOver
// 7. If there is no winner nor draw, the game is still active and I want to repeat steps 1-5.
