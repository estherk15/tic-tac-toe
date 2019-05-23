const board = require('./board.js')
const game = require('./game.js')
const ticTacToe = require('./ticTacToe.js')
const assert = require('assert')

// //test that at the start of the game, an empty board is rendered.
// it('renders tic tac toe board', () => {
//   const array = Array(9).fill(" ")//[1, 2, 3, 4, 5, 6, 7, 8, 9]
//   assert.equal(board.displayBoard(array), ` 1 | 2 | 3\n ------------\n 4 | 5 | 6\n ------------\n 7 | 8 | 9`)
// })
//
// player can enter a location for their marker


//Rules of the Game
//validates that numbers are entered
it('runs when a number is entered', () => {
  assert.equal(game.validateNumbers(2), true)
  assert.equal(game.validateNumbers("single"), false)
})

//when you make a move, the square you choose should be empty
it('only allows the play if selected position is empty', () => {
  board.grid1 = ["O", "", "X", "", "X", "", "O", "", "X"]
  assert.equal(game.validatePlay(1, board.grid1), false)
  assert.equal(game.validatePlay(2, board.grid1), true)
  assert.equal(game.validatePlay(9, board.grid1), false)
  assert.equal(game.validatePlay(4, board.grid1), true)
})

//validates selected number is within range of the grid being played
it('only allows the play if selected position is within range', () => {
  const grid = ["", "", "", "", "", "", "", "", ""]
  assert.equal(game.validatePlay(-1, grid), false)
  assert.equal(game.validatePlay(10, grid), false)
  assert.equal(game.validatePlay(1, grid), true)
})

//Whose turn is it?
it('determines which token is next based on how many moves have been made', () => {
  assert.equal(game.currentPlayer(2), 'O')
  assert.equal(game.currentPlayer(7), 'X')
})

//when you select a spot on the grid, the current token takes that place
// it('puts the current token onto the selected grid spot', () => {
//   grid1 = Array(3).fill("")
//   grid2 = Array(9).fill("")
//   assert.deepStrictEqual(game.move(1, grid1), ["X", "", ""])
//   assert.deepStrictEqual(game.move(1, grid2), ["X", "", "", "", "", "", "", "", ""])
// })

//Check after every move if someone has won
it('runs when a board shows one of the winning combinations', () => {
  grid = ["X", "X", "X", "O", "O", "", "", "", ""]
  assert.equal(game.checkForWin(grid), true)
})

it('runs when a board shows one of the winning combinations', () => {
  grid = ["X", "O", "X", "O", "O", "X", "", "", ""]
  assert.equal(game.checkForWin(grid), false)
})

//Make sure after every move, the board isn't full
it('determines whether a board is full', () => {
  grid = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  assert.equal(game.fullBoard(grid), true)
  // assert.equal(game.fullBoard(grid), false)
})

it('determines if the game is a draw', () => {
  grid = ["X", "O", "X", "O", "X", "X", "O", "X", "O"]
  assert.equal(game.draw(grid), true)
})

//
