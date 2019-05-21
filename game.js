const board = require('./board.js')

const validateNumbers = (num) => {
  if(isNaN(num)) {
    return false
  }
  return true
}

module.exports = {
  validateNumbers,
}
