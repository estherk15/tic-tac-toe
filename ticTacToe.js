const board = require('./board.js')
const game = require('./game.js')
const readline = require('readline') //Node.js CLI

const rl = readline.createInterface({ //rl is the CLI program that outputs in the terminal and take player inputs
  input: process.stdin,
  output: process.stdout,
})

const gameOver = (winner) => {
  if(!!game.checkForWin(board.multiplayer)){
    console.log(`Player [${winner}] You Win!!!`)
    return rl.close()
  } else if (game.draw(board.multiplayer)){
    console.log('It\'s a tie, you\'re both winners! Huzzah!')
    return rl.close()
  }
}

const gamePlay = () => { //multiplayer mode
  const token = game.currentPlayer(game.currentPlay)
  rl.question(`\n Player ${token}, your move:  `, (input) => {
    if(game.validatePlay(input, board.multiplayer)){ //checks to make sure you enter a number w/i range
      const newBoard = game.move(input, token) //updates the grid by putting player token at desired location
      console.log(`\n`)
      board.displayBoard(newBoard) //displays the new grid on console.
      // console.log(`\n`);

      if((game.checkForWin(board.multiplayer)) || (game.draw(board.multiplayer))){
        const winner = game.currentPlayer(game.currentPlay)
        gameOver(winner)
        return //without the return, the game continues to prompt
      }
      game.currentPlay++
      gamePlay()
    } else { //if the input is not valid
      console.log(`Invalid input, please try again \n`);
      gamePlay()
    }
  })
}

const singlePlay1 = () => { //single play easy mode
  
}

const menu = () => {
  rl.question('[1] Single Player \n[2] Multi Player \n :', (input) => {
    if(input == 1) { //if it's a single player, go to the difficulty menu
      difficultyMode()
    } else { //if it's a multiplayer, go to the game
      gamePlay()
    }
  })
}

const difficultyMode = () => {
  rl.question('Pick a difficulty level: \n[1] Easy \n[2] Moderate \n[3] Difficult\n', (input) => {
    switch(input) {
      case 1:
        // singlePlay1()
        break
      case 2:
        console.log("Work in progress");
        // singlePlay2()
        break
      case 3:
      console.log("Work in progress");
        // singlePlay3()
        break
      default:
        // singlePlay1()
    }
  })
}


const startGame = () => {
  board.displayBoard(board.multiplayer)
  console.log('\nPlayer X  ||  Player O \n')
  console.log('When it is your turn, enter the number in the corresponding\nsquare on the board you want to place your token. For example, \nif you want to place an [X] in the top left corner, you would\ntype 1 on your turn.\n')

  menu()
}

//Starts the game
console.log(`
  Let's play Tic Tac Toe!
  Version: 1.0.0
  `)

startGame()
