Tic Tac Toe

MVP
two player tictactoe game with TDD ****
3 days

FEATURE ONE
One player vs computer tictactoe game with TDD **
Rand if else statement space empty
1-2 days

FEATURE TWO
one player tictactoe game with TDD - level 2 *
Add more spaces
Make the algorithim harder (make the computer smarter) **
Timed feature
1-2 days




Select one player or two player
(test)
One Player (easy)
Show the board
(test)
Player choose the location to put token (X or O)
Test
Token needs to be shown on the board
A player (or computer) cannot choose that location anymore
(TEST) => if there is a spot chosen that’s not empty it can say to the player its not empty they try again
Computer needs to pick a location on the board
If there is 3 in a row of the same token the game stops and declares the winner
If the board is filled but no 3 in a row then tie

Board = [
“”, “”, “”,
“”, “”, “”,
“”, “”, “”		]

WINNING_POSITIONS = [[Board[0], Board[1], Board[2]], [Board[3],Board[4],Board[5]] ]

JAVASCRIPT
.some
.every

Curently_playing =
WINNING_POSITIONS.any?{ | combo |  combo.all?{|token| token == currently_playing}} #true


**The program displays a board with a token on the grid you choose, but it does not register the current player token, it's always X! The currentPlay counter is running though. Console.logs register that the counter increases after every move, but the player token always remains the same.
