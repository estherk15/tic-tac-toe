//Anything related to the rules of the game goes here
const board = require('./board.js')

const validateNumbers = (num) => {//player can only enter numbers
  if(isNaN(num)) {
    return false
  }
  return true
}

module.exports = {
  validateNumbers,
}
