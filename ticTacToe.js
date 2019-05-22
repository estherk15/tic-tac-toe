const board = require('./board.js')
const game = require('./game.js')
const readline = require('readline') //Node.js CLI

//Node CLI
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
    }

    if (!game.validatePlay(answer)){
      console.log('**Please select an empty square**')
      multiplayer()
    }
  })
}

//CLI program readline
rl.question(`Please select:
  [1] Single player
  [2] Multi - player
`, answer => {
  if(!game.validateNumbers(answer)){
    console.log('Please only enter a number value of 1 or 2; restart the program with node ticTacToe')
    rl.close()
  } else if (answer != 1 && answer != 2){
    console.log('Please only enter a number value of 1 or 2; restart the program with node ticTacToe')
    rl.close()
  } else if(answer == 2) {
    board.displayBoard(board.directionsGrid)
    console.log('\nPlayer 1 = X  ||  Player 2 = O \n')
    console.log('When it is your turn, enter the number in the corresponding\nsquare on the board you want to place your token. For example, \nif you want to place an [X] in the top left corner, you would\ntype 1 on your turn.\n')

    multiPlayer()

  } else { //PLayer has entered 1, this needs to fire off varying levels of difficulty
    singlePlayer()
  }
})
