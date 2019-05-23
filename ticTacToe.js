const board = require('./board.js')
const game = require('./game.js')
const readline = require('readline') //Node.js CLI

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})


//Take a look at this fn, invoking multiPlayer breaks the program
const prompt =  () => {
  rl.question('Play your move by entering the grid number: \n', answer => {
    if(game.validatePlay(answer, board.grid1)){
      game.move(answer, board.grid1)
      console.log(board.grid1)
      return multiPlayer()
    } else {
      prompt()
    }
  })
}

const gameOver = () => {
  if(!!game.checkForWin(board.grid1)){
    console.log(`${game.currentPlayer} You Win!!!`)
    rl.close()
  } else if (game.draw(board.grid)){
    console.log('Congratulations, you\'re both winners! Huzzah!')
    rl.close()
  }
}

const multiPlayer = () => { //As long as the game is not over, I want to continually prompt a Player
  //a game is over when there is a winner or it's a draw.
  //if it's either,
  if(!!game.checkForWin(board.grid1) || game.draw(board.grid)){//check is gameOver conditions are met then fire fn that will log a message
    gameOver()
  } else { //the game isn't tied and there's no winner, game should continue
    return prompt()
  }
}

//Node CLI
const startGame = () => {
  board.displayBoard(board.directionsGrid)
  console.log('\nPlayer X  ||  Player O \n')
  console.log('When it is your turn, enter the number in the corresponding\nsquare on the board you want to place your token. For example, \nif you want to place an [X] in the top left corner, you would\ntype 1 on your turn.\n')

  prompt()
}

console.log(`
  Let's play Tic Tac Toe!
  Version: 1.0.0
  `)

startGame()
