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

const randomPlay = (array, randomizerFn) => {//returns a spot NOT an index
  if(!randomizerFn){
    // console.log("Using random fn");
    const randomizerFn = () => (Math.floor(Math.random() * (array.length)))
    return array[randomizerFn()]
  }

  return array[randomizerFn]
}
//Math.random(), returns a float between 0 and 1

//Single Player Unbeatable Mode ===========================
const winningMove = (currentBoard, token) => {
  let possiblePlays = availablePlays(currentBoard)
  let winningSpot = null
  possiblePlays.forEach(spot => {
    const copyBoard = [...currentBoard]
    copyBoard[spot - 1] = token
    if(checkForWin(copyBoard)){
      winningSpot = spot
      return
    }
  })

  return winningSpot
}


const strategicPlay = (currentBoard) => {//determines best play for O when there is neither defensive or offensive play to be made.
//if there is no immediate danger, play to win, so O should play the middle if available, otherwise play a positions where two out of the three winning positions are still open
  const openSpots = availablePlays(currentBoard)
  const randomIdx = (array) => Math.floor(Math.random() * array.length) //apply this to either corners or edges for a random spot
  let bestMove

  if(openSpots.includes(5)){ //take the middle if it's open
    bestMove = 5
    return bestMove
  } else if(openSpots.length === 8){ //this might be redundant
    bestMove = board.corners[randomIdx(board.corners)]
  } else if((currentBoard[0] === currentBoard[8]) || currentBoard[2] === currentBoard[6]){ //if any of the opposing diagnols are taken
    //return the first edge
    bestMove =  board.edges[randomIdx(board.edges)]
    return bestMove
  } else {
    const middleCombo = winningCombo.filter(combo => combo[1] === 4)
//look through all the winning combos involving the middle positions
//if the first and last are empty, then return one of those values
    middleCombo.find(combo => {
      if(typeof currentBoard[combo[0]] === "number" && typeof currentBoard[combo[2]] ==="number"){

        bestMove = currentBoard[combo[0]]
        return combo
      }
    })
  }
  if (!bestMove) {
    bestMove = openSpots[randomIdx(openSpots)]
  }

  return bestMove
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
  winningMove,
  strategicPlay,
}
