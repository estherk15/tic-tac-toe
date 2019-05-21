//Anything related to the rules of the game goes here
const board = require('./board.js')

const validateNumbers = (num) => {//player can only enter numbers
  if(isNaN(num)) {
    return false
  }
  return true
}

const validatePlay = (num) => {//player can only pick a number that is not already picked
  if(board.grid[num-1] === ""){
    return true
  }
  return false
}

module.exports = {
  validateNumbers,
  validatePlay,
}
