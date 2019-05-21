const board = require('./board.js')
const game = require('./game.js')
const ticTacToe = require('./ticTacToe.js')
const assert = require('assert')

//test that at the start of the game, an empty board is rendered.
// it('renders tic tac toe board', () => {
//   const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
//   // assert.equal(board.displayBoard(array),` 1 | 2 | 3
//   // ------------
//   //  4 | 5 | 6
//   // ------------
//   //  7 | 8 | 9 `
//   // )
//   assert.equal(board.displayBoard(array),
//   ` 1 | 2 | 3
//   4 | 5 | 6
//   7 |`
//   )
// })

//player can enter a location for their marker


//Rules of the Game
//validates that numbers are entered
it('runs when a number is entered', () => {
  assert.equal(game.validateNumbers(2), true)
  assert.equal(game.validateNumbers("single"), false)
})


//when you make a move, the square you choose should be empty
it('only allows the play if selected position is empty', () => {
  board.grid = ["O", "", "X", "", "X", "", "O", "", "X",]
  assert.equal(game.validatePlay(1), false)
  assert.equal(game.validatePlay(2), true)
  assert.equal(game.validatePlay(9), false)
  assert.equal(game.validatePlay(4), true)
})

//Player can only pick a number within range of grid size
// it('runs when a number within ')
