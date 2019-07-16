[15 July 2019]
focus on these this week:
* X only player
* Invalid input - outside of range
* Invalid input - Same square
* Grid entry disappear after initial entry

**Notes**
- Found the branch with updated functions to toggle between 'X' and 'O'
- However!!! Upon winning, the checkForWin runs in a loop multiple times and prints out the message over as many times as there are grid entries
