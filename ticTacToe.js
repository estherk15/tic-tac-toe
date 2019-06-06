const board = require('./board.js')
const game = require('./game.js')
const readline = require('readline') //Node.js CLI

const rl = readline.createInterface({ //rl is the CLI program that outputs in the terminal and take player inputs
  input: process.stdin,
  output: process.stdout,
  // prompt: `Play your move by entering the grid number:
  // >`
})

rl.setPrompt(`Play your move by entering the grid number: `)
// const prompt =  () => {
//   for(let i = game.currentPlay; i < board.grid1.length; i += 1){
//     console.log("before the prompt question")
//     rl.question('Play your move by entering the grid number: \n', answer => {
//       if(game.validatePlay(answer, board.grid1)){ //checks to make sure you enter a number w/i range
//         const newBoard = game.move(answer, board.grid1) //updates the grid by putting player token at desired location
//         board.displayBoard(newBoard) //displays the new grid on console.
//       } else {
//         prompt()
//       }
//     })
//   }
// }

const gamePlay = () => {
  //As long as the game is not over, I want to continually prompt a Player
  //a game is over when there is a winner or it's a draw.
  rl.prompt()
  rl.on('line', (input) => {
    if(game.checkForWin(board.grid1) || game.draw(board.grid1)){
      gameOver()
      return
    }

    if(game.validatePlay(input, board.grid1)){ //checks to make sure you enter a number w/i range
      const token = game.currentPlayer(game.currentPlay)
      console.log('TOKEN BEFORE MOVE:', token)
      const newBoard = game.move(input, token) //updates the grid by putting player token at desired location
      game.currentPlay++

      board.displayBoard(newBoard) //displays the new grid on console.
      gamePlay()
    }
  })
}

const startGame = () => {
  board.displayBoard(board.directionsGrid)
  console.log('\nPlayer X  ||  Player O \n')
  console.log('When it is your turn, enter the number in the corresponding\nsquare on the board you want to place your token. For example, \nif you want to place an [X] in the top left corner, you would\ntype 1 on your turn.\n')

  gamePlay()
}

const gameOver = () => {
  if(!!game.checkForWin(board.grid1)){
    console.log(`${game.currentPlayer} You Win!!!`)
    rl.close()
  } else if (game.draw(board.grid1)){
    console.log('Congratulations, you\'re both winners! Huzzah!')
    rl.close()
  }
}

//Starts the game
console.log(`
  Let's play Tic Tac Toe!
  Version: 1.0.0
  `)

startGame()
