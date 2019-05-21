const board = require('./board.js')
const game = require('./game.js')
const ticTacToe = require('./ticTacToe.js')
const assert = require('assert')

it('correctly calculates the sume of 1 and 3', () => {
  assert.equal(board.add(1, 3), 4)
})

//test that at the start of the game, an empty board is rendered.
it('renders tic tac toe board', () => {
  const array = ["one", "two", "three"]
  assert.equal(board.displayBoard(array), "one | two | three")
})

//test to ensure that at the start there are 9 spots on the board


//Rules of the Game
//validates that numbers are entered
it('runs when a number is entered', () => {
  assert.equal(game.validateNumbers(2), true)
})

it('runs when a number is entered', () => {
  assert.equal(game.validateNumbers("single"), false)
})
