//Anything related to the rules of the game goes here
const board = require('./board.js')

const winningCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
]

//Players
//whenever a move is made this will increase, since there are only 9 squares on the grid, there are only 9 moves.
let currentPlay = 1
const currentPlayer = (turn) => turn % 2 === 0 ? 'O' : 'X'

const move = (num, grid) => {//when a player chooses which spot they want to place their token
  let token = currentPlayer(currentPlayer)
  currentPlay++
  grid[num - 1] = token
  return grid
}

const checkForWin = (grid) => {//check to see if any of the winnig cobinations is on the board
  let winner = false
  winningCombo.some(combo => {
    if(combo.every(index => grid[index] == "X" || grid[index] == "O")){
      winner = true
    }
  })
  return winner
}

const validateNumbers = (num) => {//player can only enter numbers
  if(isNaN(num)) {
    return false
  }
  return true
}

const validatePlay = (num, grid) => {//player can only pick a number that is not already picked
  if((grid[num-1] === "") && 0 < num <= grid.length) {
    return true
  }
  return false
}


module.exports = {
  validateNumbers,
  validatePlay,
  currentPlay,
  currentPlayer,
  move,
  winningCombo,
  checkForWin,
}
