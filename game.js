//Anything related to the rules of the game goes here
const board = require('./board.js')

const winningCombo = [//Remember that these are arrays of index numbers, don't confuse them for grid spots, which start at 1.
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
]

//Players====================================================
//whenever a move is made this will increase, since there are only 9 squares on the grid, there are only 9 moves.
let currentPlay = 1
const currentPlayer = (currentPlay) => currentPlay % 2 === 0 ? 'O' : 'X'

//Gameplay===================================================
const move = (num, token) => {//when a player chooses which spot they want to place their token, fn places the current token from gamePlay into the grid
  board.standard[num - 1] = token
  return board.standard
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

//Single Player Easy Mode ======================================
const availablePlays = (board) => {//returns an array of available open spots on the board
  let available = []
  board.forEach(spot => {
    if(spot !== "X" && spot !=="O"){
      available.push(spot)
    }
  })
  return available
}

const randomPlay = (array, randomizerFn) => {
  // console.log(randomizerFn);
  if(!randomizerFn){
    // console.log("Using random fn");
    const randomizerFn = () => (Math.floor(Math.random() * (array.length)))
    return array[randomizerFn()]
  }
  return array[randomizerFn]
}
//Math.random(), returns a float between 0 and 1

//Single Player Unbeatable Mode ===========================
// const defense = (array) => {//can only be an array of three
//   let canWin = false
//   if(array.includes("O")){//if there's an O, there is no winning combination here
//     return canWin
//   }
//   if((array[0] === array[1]) || (array[0] === array[2]) || (array[1] === array[2])){
//     canWin = true
//   }
//
//   return canWin
// }
//
// const offense = (array) => {
//   let canWin = false
//   if(array.includes("X")){
//     return canWin
//   }
//   if((array[0] === array[1]) || (array[0] === array[2]) || (array[1] === array[2])){
//     canWin = true
//   }
//   return canWin
// }

const winningMove = (currentBoard) => {
  let possiblePlays = availablePlays(currentBoard)
  let winningSpot = null
  possiblePlays.forEach(spot => {
    const copyBoard = currentBoard
    copyBoard[spot - 1] = "O" //this replaces one of the empty spots with the current tokens
    console.log(copyBoard);
    console.log(spot);
    if(checkForWin(copyBoard)){
      winningSpot = spot
      return
    }
  })
  return winningSpot
}

//Validations ===========================================
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
  availablePlays,
  randomPlay,
  // defense,
  // offense,
  winningMove,
}
