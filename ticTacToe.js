const board = require('./board.js')
const game = require('./game.js')
const readline = require('readline') //Node.js CLI

const rl = readline.createInterface({ //rl is the CLI program that outputs in the terminal and take player inputs
  input: process.stdin,
  output: process.stdout,
})

rl.setPrompt(`Play your move by entering the grid number Player: `)

const gameOver = (winner) => {
  if(!!game.checkForWin(board.multiplayer)){
    console.log(`Player [${winner}] You Win!!!`)
    rl.close()
  } else if (game.draw(board.multiplayer)){
    console.log('It\'s a tie, you\'re both winners! Huzzah!')
    rl.close()
  }
}

const gamePlay = () => {

  //At the start of the game, check to see whether you've won or not:
  if(!game.checkForWin(board.multiplayer) && !game.draw(board.multiplayer)){//As long as the game is not over, I want to continually prompt a Player
    rl.prompt()
    rl.on('line', (input) => {
      if(game.validatePlay(input, board.multiplayer)){ //checks to make sure you enter a number w/i range
        const token = game.currentPlayer(game.currentPlay)
        const newBoard = game.move(input, token) //updates the grid by putting player token at desired location

        game.currentPlay++

        board.displayBoard(newBoard) //displays the new grid on console.
        console.log(`\n`);

        gamePlay()
      }
    })
  } else if (game.checkForWin(board.multiplayer) || game.draw(board.multiplayer)){
    const winner = game.currentPlayer(game.currentPlay-1) //The currentPlay will be the next play since the function doesn't check to see who the winner is until the next go around.
    return gameOver(winner)
    // rl.close()
  }
}

const startGame = () => {
  board.displayBoard(board.multiplayer)
  console.log('\nPlayer X  ||  Player O \n')
  console.log('When it is your turn, enter the number in the corresponding\nsquare on the board you want to place your token. For example, \nif you want to place an [X] in the top left corner, you would\ntype 1 on your turn.\n')

  gamePlay()
}

//Starts the game
console.log(`
  Let's play Tic Tac Toe!
  Version: 1.0.0
  `)

startGame()
