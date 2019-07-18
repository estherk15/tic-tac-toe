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

const move = (num, token) => {//when a player chooses which spot they want to place their token, fn places the current token from gamePlay into the grid
  board.directionsGrid[num - 1] = token
  return board.directionsGrid
}

const checkForWin = (grid) => {//check to see if one of the winning combinations is on the board, returns boolean
  let winner = false
  //Do any of the winning combinations in winningCombo match up to th
	winningCombo.some(combo => {
		if((grid[combo[0]] === "X" || grid[combo[0]] === "O") && grid[combo[0]] === grid[combo[1]] && grid[combo[1]] === grid[combo[2]]){
      winner = true
    	}
	})

  return winner
}

const fullBoard = (grid) => { //runs through every element in an array and checks that it's an X or O, returns boolean
  return grid.every(spot => (spot === "X" || spot === "O"))
}

const draw = (grid) => {
  if(!checkForWin(grid) && fullBoard(grid)){
    return true
  }
  return false
}

//Validations
const validateNumbers = (num) => {//player can only enter numbers
  if(isNaN(num)) {
    return false
  }
  return true
}

const validatePlay = (num, grid) => {//player can only pick a number that is not already picked and it has to be a number
  if((grid[num-1] !== "X" && grid[num-1] !== "O") && (0 < num && num <= grid.length) && validateNumbers(num)){
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
