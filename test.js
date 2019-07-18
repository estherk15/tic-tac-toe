const board = require('./board.js')
const game = require('./game.js')
const ticTacToe = require('./ticTacToe.js')
const assert = require('assert')


//Rules of the Game
//validates that numbers are entered
it('displays a board with numbers', () =>{
  assert.deepStrictEqual(board.displayBoard(board.directionsGrid),
  "  1 | 2 | 3 \n -----------\n  4 | 5 | 6 \n -----------\n  7 | 8 | 9 ")
})

it('runs when a number is entered', () => {
  assert.equal(game.validateNumbers(2), true)
  assert.equal(game.validateNumbers("single"), false)
})

//when you make a move, the square you choose should be empty
it('only allows the play if selected position is empty', () => {
  board.grid1 = ["O", 2, "X", 4, "X", 6, "O", 8, "X"]
  // board.grid2 = ["O", "O", "X", "X", "X", "O", "O", "O", "X"]
  assert.equal(game.validatePlay(1, board.grid1), false)
  assert.equal(game.validatePlay(2, board.grid1), true)
  assert.equal(game.validatePlay(9, board.grid1), false)
  assert.equal(game.validatePlay(4, board.grid1), true)
})

//validates selected number is within range of the grid being played
it('only allows the play if selected position is within range', () => {
  grid = ["O", 2, "X", 4, "X", 6, "O", 8, "X"]
  assert.equal(game.validatePlay(-1, grid), false)
  assert.equal(game.validatePlay(10, grid), false)
  assert.equal(game.validatePlay("a", grid), false)
  assert.equal(game.validatePlay(2, grid), true)
})

//Whose turn is it?
it('determines which token is next based on how many moves have been made', () => {
  assert.equal(game.currentPlayer(2), 'O')
  assert.equal(game.currentPlayer(7), 'X')
})

//when you select a spot on the grid, the current token takes that place
it('puts the current token onto the selected grid spot', () => {
  assert.deepStrictEqual(game.move(1, "O"), ["O", 2, 3, 4, 5, 6, 7, 8, 9])
  assert.deepStrictEqual(game.move(2, "X"), ["O", "X", 3, 4, 5, 6, 7, 8, 9])
})

//Check after every move if someone has won
it('runs when a board shows one of the winning combinations', () => {
  grid1 = ["X", "X", "X", "O", "O", 6, 7, 8, 9]
  grid2 = ["X", "O", "O", 4, "X", 6, 7, 8, "X"]
  assert.deepStrictEqual(game.checkForWin(grid1), true)
  assert.deepStrictEqual(game.checkForWin(grid2), true)
})

it('runs when a board shows none of the winning combinations', () => {
  grid = ["X", "O", "X", "O", "O", "X", 7, 8, 9]
  assert.deepStrictEqual(game.checkForWin(grid), false)
})

//Make sure after every move, the board isn't full
it('determines whether a board is or isnt full', () => {
  grid1 = ['X', 'X', 'X', 4, 'O', 6, 'O', 'O', 9]
  grid2 = ['X', 'X', 'X', 'O', 'O', 'X', 'O', 'O', 'X']
  assert.equal(game.fullBoard(grid1), false)
  assert.equal(game.fullBoard(grid2), true)
})

it('determines if the game is a draw', () => {
  grid = ["X", "O", "X", "O", "X", "X", "O", "X", "O"]
  assert.equal(game.draw(grid), true)
})
