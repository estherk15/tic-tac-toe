[Week of 15 July 2019]
focus on these this week:
* X only player [**resolved**]
* Invalid input - outside of range [**resolved**]
* Invalid input - Same square [**resolved**]
* Grid entry disappear after initial entry (figure out whether you want to display the directionsGrid or have the tokens replace the numbers on the directionsGrid.)

**Notes**
~~The move function no longer worries about the token, it's given the token from the gamePlay fn and all it does is to replace the board with the given token.~~

- The gamePlay fn now has access to the current play and the token, so it distributes the information to the fn.
- Found the branch with updated functions to toggle between 'X' and 'O'
- However!!! Upon winning, the checkForWin runs in a loop multiple times and prints out the message over as many times as there are grid entries

- You may need to adjust the gamePlay fn, instead of calling the function again and again, looping?

- usable vs testable, your boardDisplay fn needs to be both, needs to console log the board, but also have something to return so that you can test it.

- test line 33 isn't passing

- (0 < num && num <= grid.length) vs (0 < num <= grid.length)
