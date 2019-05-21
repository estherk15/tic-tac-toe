const board = require('./board.js')
const game = require('./game.js')
const readline = require('readline') //Node.js CLI
const grid = Array(9).fill("") //grid = ["", "", "", "", "", "", "", "", ""]

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log(`
  Let's play Tic Tac Toe!
  Version: 1.0.0
  `)

const multiPlayer = () => {
  rl.question('Play your move by entering the grid number: \n', answer => {
    if (!game.validateNumbers(answer)){
      multiPlayer()
    } else {
      console.log("Stop here")
    }
  })
}

const player = rl.question(`Please select:
  [1] Single player
  [2] Multi - player
`, answer => {
  if(!game.validateNumbers(answer)){
    console.log('Please restart the program and only enter a number value')
    rl.close()
  } else if(answer == 2) {
    console.log('Player 1 = X  ||  Player 2 = O')
    multiPlayer()

  } else {
    console.log('Player 1 = X  ||  Player 2 = O')
    singlePlayer()
  }
})
