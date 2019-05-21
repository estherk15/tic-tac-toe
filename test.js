const board = require('./board.js')
const game = require('./game.js')
const ticTacToe = require('./ticTacToe.js')
const assert = require('assert')

//test that at the start of the game, an empty board is rendered.
it('renders tic tac toe board', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  assert.equal(board.displayBoard(array), ` 1 | 2 | 3\n ------------\n 4 | 5 | 6\n ------------\n 7 | 8 | 9`)
})

//player can enter a location for their marker


//Rules of the Game
//validates that numbers are entered
it('runs when a number is entered', () => {
  assert.equal(game.validateNumbers(2), true)
  assert.equal(game.validateNumbers("single"), false)
})

//when you make a move, the square you choose should be empty
it('only allows the play if selected position is empty and is within range', () => {
  board.grid = ["O", "", "X", "", "X", "", "O", "", "X"]
  assert.equal(game.validatePlay(1), false)
  assert.equal(game.validatePlay(2), true)
  assert.equal(game.validatePlay(9), false)
  assert.equal(game.validatePlay(4), true)
  assert.equal(game.validatePlay(-1), false)
  assert.equal(game.validatePlay(10), false)
})

//validates selected number is within range of the grid being played
it('only allows the play if selected position is within range', () => {
  board.grid = ["O", "", "X", "", "X", "", "O", "", "X"]
  assert.equal(game.validatePlay(-1), false)
  assert.equal(game.validatePlay(10), false)
})

//Whose turn is it?
it('determines which symbol is next at play', () => {
  // board.grid = ["O", "", "X", "", "X", "", "O", "", "X"]

})
