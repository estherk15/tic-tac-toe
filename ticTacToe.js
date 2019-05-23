const board = require('./board.js')
const game = require('./game.js')
const readline = require('readline') //Node.js CLI

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const prompt =  () => {
  rl.question('Play your move by entering the grid number: \n', answer => {
    if(game.validatePlay(answer)){
      return game.move(answer, board.grid1)
    } else {
      prompt()
    }
  })
}

const multiPlayer = () => {
  if(game.checkForWin(board.grid1)){
    console.log(`${game.currentPlayer} You Win!!!`)
    rl.close()
  } else if (game.draw(board.grid)){
    console.log('Congratulations, you\'re both winners! Huzzah!')
    rl.close()
  } else { //the game isn't tied and there's no winner, game should continue
    prompt()
    multiplayer()
  // rl.on('line', (num) => {
  //   //if(validatePlay(num))
  //   game.move(num, board.grid1)
  //   console.log(game.currentPlayer())
  //   board.displayBoard(board.grid1)
  //   game.currentPlay++
  //   console.log(game.currentPlay)
  //   console.log(game.currentPlayer(game.currentPlay))
  // })
  }
}

//Node CLI
const startGame = (() => {
  console.log(`
    Let's play Tic Tac Toe!
    Version: 1.0.0
    `)

  // rl.question(`Please select:
  //   [1] Single player
  //   [2] Multi - player
  // `, answer => {
  //   if(!game.validateNumbers(answer)){
  //     console.log('Please only enter a number value of 1 or 2; restart the program with node ticTacToe')
  //     rl.close()
  //   } else if (answer != 1 && answer != 2){
  //     console.log('Please only enter a number value of 1 or 2; restart the program with node ticTacToe')
  //     rl.close()
  //   } else if(answer == 2) {
      board.displayBoard(board.directionsGrid)
      console.log('\nPlayer X  ||  Player O \n')
      console.log('When it is your turn, enter the number in the corresponding\nsquare on the board you want to place your token. For example, \nif you want to place an [X] in the top left corner, you would\ntype 1 on your turn.\n')

      // rl.question('Play your move by entering the grid number: \n', answer => answer)
      prompt()
      multiPlayer()
    //
    // } else { //PLayer has entered 1, this needs to fire off varying levels of difficulty
    //   singlePlayer()
    // }
  // })
})()
