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
const currentPlayer = (currentPlay) => currentPlay % 2 === 0 ? 'O' : 'X'

const move = (num, grid) => {//when a player chooses which spot they want to place their token
  let token = currentPlayer(currentPlay)
  grid[num - 1] = token
  return grid
}

const checkForWin = (grid) => {//check to see if any of the winnig cobinations is on the board
  let winner = false
  winningCombo.some(combo => {//looks through winning combinations and the first combination that meets
    if(grid[combo[0]] !== "" && grid[combo[0]] === grid[combo[1]] && grid[combo[1]] === grid[combo[2]]){
      winner = true
    }
  })
  return winner
}

const fullBoard = (grid) => { //runs through every element in an array and checks that it's a truthy value
  return grid.every(spot => !!spot)
}

const draw = (grid) => {
  if(!checkForWin(grid) && fullBoard(grid)){
    return true
  }
}

const validateNumbers = (num) => {//player can only enter numbers
  if(isNaN(num)) {
    return false
  }
  return true
}

const validatePlay = (num, grid) => {//player can only pick a number that is not already picked
  if((grid[num-1] === "") && 0 < num <= grid.length && validateNumbers(num)) {
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
  fullBoard,
  draw,
}
