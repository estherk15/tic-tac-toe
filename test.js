const board = require('./board.js')
const game = require('./game.js')
const ticTacToe = require('./ticTacToe.js')
const assert = require('assert')


//Rules of the Game
//validates that numbers are entered
it('displays a board with numbers', () =>{
  assert.deepStrictEqual(board.displayBoard(board.standard),
  "  1 | 2 | 3 \n -----------\n  4 | 5 | 6 \n -----------\n  7 | 8 | 9 ")
})

it('runs only when a number is entered', () => {
  assert.equal(game.validateNumbers(2), true)
  assert.equal(game.validateNumbers("single"), false)
})

//when you make a move, the square you choose should be empty
it('only allows the play if selected position is empty', () => {
  board.grid1 = ["O", 2, "X", 4, "X", 6, "O", 8, "X"]
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

//returns the available spots on a grid
it('returns available spot on the grid',  () => {
  grid = ["O", 2, "X", 4, "X", 6, "O", 8, "X"]
  // console.log(game.availablePlays(grid));
  assert.deepStrictEqual(game.availablePlays(grid), [2, 4, 6, 8])
})

//Given a random index number, the play will return the corresponding element
it('returns the correct element of a given index', () => {
  available = [2, 4, 6, 8]
  randomizerFn = num => num
  assert.equal(game.randomPlay(available, randomizerFn(5)), undefined)
  assert.equal(game.randomPlay(available, randomizerFn(3)), 8)
  // console.log(randomizerFn(0))
  // assert.equal(game.randomPlay(available, randomizerFn(0)), 2)
  assert.equal(game.randomPlay(available, randomizerFn(1)), 4)
  assert.equal(game.randomPlay(available, randomizerFn(2)), 6)
})

//
// it('returns the correct element of a given index', () => {
//   available = [2, 4, 6, 8]
//   randomizerFn = num => num
//   console.log(randomizerFn(0));
//   assert.equal(game.randomPlay(available, randomizerFn(0)), 2)
//
// })

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

// it('determines if "X" takes up two of the three spots', () => {
//   testGame1 = ["X", "O", 3]
//   testGame2 = ["X", "X", 3]
//   testGame3 = ["X", 1, "X"]
//   testGame4 = ["O", 1, "X"]
//   assert.equal(game.defense(testGame1), false)
//   assert.equal(game.defense(testGame2), true)
//   assert.equal(game.defense(testGame3), true)
//   assert.equal(game.defense(testGame4), false)
// })
// //I just want to see if I can evaluate whether two of the three are X
//
// it('determines if "O" takes up two of the three spots', () => {
//   testGame1 = ["O", "O", 3]
//   testGame2 = ["X", "X", 3]
//   testGame3 = ["X", 1, "O"]
//   testGame4 = ["O", 1, "O"]
//   assert.equal(game.offense(testGame1), true)
//   assert.equal(game.offense(testGame2), false)
//   assert.equal(game.offense(testGame3), false)
//   assert.equal(game.offense(testGame4), true)
// })

it('returns the spot that will lead to a winning game', () => {
  testGame1 = ["X", "O", "X", "X", "O", "X", "O", 8, 9]
  testGame2 = ["X", "O", "X", 4, "X", "O", "O", "X", 9]
  testGame3 = ["O", 2, "O", 4, 5, 6, 7, 8, 9]
  assert.equal(game.winningMove(testGame1, "X"), 9)
  assert.equal(game.winningMove(testGame2, "X"), 9)
  assert.equal(game.winningMove(testGame3, "O"), 2)
})

it('blocks the X from winning', () => {
  testGame1 = ["X", "O", "X", "X", "O", "X", "O", 8, 9]
  assert.equal(game.winningMove(testGame1, "X"), 9)

})

//if the O has a winning move(truthy), then place the token at the winning spot, otherwise,

// X O X
// X O X
// O
//
// X O X
//   X O
// O X



//if the above are the boards you're dealt, what move will be optimal? What will lead to a win if filled

//iterate thru each winningCombo and evaluate if the current

//See whether the beginning of a winning combination is taking place, whether two of the three requirements has been met by the user
//Two of the three spots have to be the same, and the third must be available to play.
//place the move on the third option to prevent a win
//winning combination looks at three elements of the board,
  //if there is one "X" and one "O", then I don't care
  //If there are two of the same values, then I do care.

  //Next step: create a fn that will identify which winningcombo a player mostly closely matches and place O token in the available spot (either defensively or offensively)
