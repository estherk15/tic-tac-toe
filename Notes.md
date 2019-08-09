[To Do]
focus on these this week:
* X only player [**resolved**]
* Invalid input - outside of range [**resolved**]
* Invalid input - Same square [**resolved**]
* Grid entry disappear after initial entry (figure out whether you want to display the directionsGrid or have the tokens replace the numbers on the directionsGrid.)[**numberDisplay branch displays the directions grid**]
* Debug the game not checking for winners [**resolved** fn were referencing grid1 and not directionsGrid].
* Debug why the switch statement won't accept any number other than 1 [**The input is not an integer, it's a string, so each case had to be changed to a string**]
* Debug the recursive winner message[**resolved**]
* creating a dependency injection for a console.log?[**resolved**]
- There's a bug, O's strategic play is undefined when there's no winner/loser/strategy [**Resolved**]
x x o
o o x
x    
- Solve the randomizerFN test (0 is a falsy value)[**resolved**]
- Clean tests, break them out [**Resolved**]
* Packaging code options (build readme)
- when you set up ESLint, no more than 5 overrides

[After Above]
- Create a new test file for building tests for ticTacToe.js
- Make a commit before Refactor, make a commit before ESLint
- Add instructions for the developer, run the tests, Readline,
- virtualbox, ubuntu.
- delay O's move on single player easy mode. setTimeout

- Do another round of refactoring for the sinplePlay fn.


***Notes***
- The move function no longer worries about the token, it's given the token from the gamePlay fn and all it does is to replace the board with the given token.
- The gamePlay fn now has access to the current play and the token, so it distributes the information to the fn.
- Found the branch with updated functions to toggle between 'X' and 'O'
- However!!! Upon winning, the checkForWin runs in a loop multiple times and prints out the message over as many times as there are grid entries
- You may need to adjust the gamePlay fn, instead of calling the function again and again, looping? [**Resolved** got rid of the on.line fn]
- usable vs testable, your boardDisplay fn needs to be both, needs to console log the board, but also have something to return so that you can test it.
- git stash save


**Hotwash**
- Between all the indices and the actual grid numbers, it could become very confusing which functions were returning index numbers vs having to convert them.
- I didn't have as much awareness of what the readline built in CLI stuff was doing in the background.
- Learned about ESLint
- Ran into many git issues, lesson in version control
