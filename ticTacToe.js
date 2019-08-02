const board = require('./board.js')
const game = require('./game.js')
const readline = require('readline') //Node.js CLI

const rl = readline.createInterface({ //rl is the CLI program that outputs in the terminal and take player inputs
  input: process.stdin,
  output: process.stdout,
})

const gameOver = (winner) => {
  if(!!game.checkForWin(board.standard)){
    console.log(` Player [${winner}] You Win!!!`)
    return rl.close()
  } else if (game.draw(board.standard)){
    console.log('\n It\'s a tie, you\'re both winners! Huzzah!')
    return rl.close()
  }
}

//Multplayer mode ==================================
const gamePlay = () => { //multiplayer mode
  const token = game.currentPlayer(game.currentPlay)
  rl.question(`\n Player ${token}, your move:  `, (input) => {
    if(game.validatePlay(input, board.standard)){ //checks to make sure you enter a number w/i range
      const newBoard = game.move(input, token) //updates the grid by putting player token at desired location
      console.log(`\n`)
      board.displayBoard(newBoard) //displays the new grid on console.
      // console.log(`\n`);

      if((game.checkForWin(board.standard)) || (game.draw(board.standard))){
        return gameOver(token)
        //without the return, the game continues to prompt
      }
      game.currentPlay++
      gamePlay()
    } else { //if the input is not valid
      console.log(`\n ***Invalid input, please try again***`);
      gamePlay()
    }
  })
}

//Singleplayer mode ================================
const singlePlay1 = () => { //single play easy mode
  const token = game.currentPlayer(game.currentPlay)

  if(token === "X") {
    rl.question(`\n Player ${token}, your move: `, (input) => {
      if(game.validatePlay(input, board.standard)){
        const newBoard = game.move(input, token)
        console.log(`\n`)
        board.displayBoard(newBoard)

        if((game.checkForWin(board.standard)) || (game.draw(board.standard))){ //if there is a winner do this:
          return gameOver(token)
        } else { //if there isn't a winner do this
          game.currentPlay++
          singlePlay1()
        }
      } else {
        console.log(`\n ***Invalid input, please try again***`);
        singlePlay1()
      }
    })
  }
  if(token === "O") {
    const possiblePlays = game.availablePlays(board.standard) //returns an array of all possible plays the computer can make
    const computerMove = game.randomPlay(possiblePlays) //returns the spot that the computer is placing its token
    const newBoard = game.move(computerMove, token)
    console.log(`\n Player O's move: ${computerMove} \n`)
    // setTimeout(() => board.displayBoard(newBoard), 2500)
    board.displayBoard(newBoard)
    if((game.checkForWin(board.standard)) || (game.draw(board.standard))){ //if there is a winner do this:
      return gameOver(token)
    } else { //if there isn't a winner do this
      game.currentPlay++
      singlePlay1()
    }
  }
}//singlePlay1

const singlePlay2 = () => { //Unbeatable mode
  const token = game.currentPlayer(game.currentPlay)
  if(token === "X") {
    rl.question(`\n Player ${token}, your move: `, (input) => {
      if(game.validatePlay(input, board.standard)){
        const newBoard = game.move(input, token)
        console.log(`\n`)
        board.displayBoard(newBoard)

        if((game.checkForWin(board.standard)) || (game.draw(board.standard))){ //if there is a winner do this:
          return gameOver(token)
        } else { //if there isn't a winner do this
          game.currentPlay++
          singlePlay2()
        }
      } else {
        console.log(`\n ***Invalid input, please try again***`);
        singlePlay2()
      }
    })
  }
  if(token === "O"){
    // console.log("Token is O");
    const possiblePlays = game.availablePlays(board.standard)
    const offensivePlay = game.winningMove(board.standard, "O")
    const defensivePlay = game.winningMove(board.standard, "X")
    const computerMove = game.randomPlay(possiblePlays)

    if(offensivePlay){
      const newBoard = game.move(offensivePlay, token)
      board.displayBoard(newBoard)
      return gameOver(token)
    } else if(defensivePlay){//if the O is defense, then there is no winner yet
      const newBoard = game.move(defensivePlay, token)
      board.displayBoard(newBoard)
      game.currentPlay++
      singlePlay2()//go back to the beginning

    } else {//there's no best defense or offense
      const newBoard = game.move(computerMove, token)
      board.displayBoard(newBoard)
      // console.log("Board after strategicPlay", newBoard);
      if((game.checkForWin(board.standard)) || (game.draw(board.standard))){
        return gameOver(token)
        //without the return, the game continues to prompt
      }
      game.currentPlay++
      singlePlay2()
    }
  }
}//singlePlay2

const singlePlay3 = () => { //Unbeatable mode
  const token = game.currentPlayer(game.currentPlay)
  if(token === "X") {
    rl.question(`\n Player ${token}, your move: `, (input) => {
      if(game.validatePlay(input, board.standard)){
        const newBoard = game.move(input, token)
        console.log(`\n`)
        board.displayBoard(newBoard)

        if((game.checkForWin(board.standard)) || (game.draw(board.standard))){ //if there is a winner do this:
          return gameOver(token)
        } else { //if there isn't a winner do this
          game.currentPlay++
          singlePlay3()
        }
      } else {
        console.log(`\n ***Invalid input, please try again***`);
        singlePlay3()
      }
    })
  }
  if(token === "O"){
    // console.log("Token is O");
    const possiblePlays = game.availablePlays(board.standard)
    const offensivePlay = game.winningMove(board.standard, "O")
    const defensivePlay = game.winningMove(board.standard, "X")

    if(offensivePlay){
      const newBoard = game.move(offensivePlay, token)
      board.displayBoard(newBoard)
      return gameOver(token)
    } else if(defensivePlay){//if the O is defense, then there is no winner yet
      const newBoard = game.move(defensivePlay, token)
      board.displayBoard(newBoard)
      game.currentPlay++
      singlePlay3()//go back to the beginning

    } else {//there's no best defense or offense
      const strategicPlay = game.strategicPlay(board.standard)//returns a spot number
      console.log("O's strategic play: ", strategicPlay);
      console.log(`\n`);
      const newBoard = game.move(strategicPlay, token)

      board.displayBoard(newBoard)
      // console.log("Board after strategicPlay", newBoard);
      if((game.checkForWin(board.standard)) || (game.draw(board.standard))){
        return gameOver(token)
        //without the return, the game continues to prompt
      }
      game.currentPlay++
      singlePlay3()
    }
  }
}

//Game Options and Menus ==================================
const menu = () => {
  rl.question('[1] Single Player \n[2] Multi Player \n :', (input) => {
    switch(input){
      case "1":  //if it's a single player, go to the difficulty menu
        difficultyMode()
        break
      case "2":
        gamePlay()
        break
      default:
        menu()
    }
  })
}

const difficultyMode = () => {
  rl.question('Pick a difficulty level: \n[1] Easy \n[2] Difficult \n[3] Unbeatable\n', (input) => {
    switch(input) {
      case "1":
        singlePlay1()
        break
      case "2":
        singlePlay2()
        break
      case "3":
      // console.log("Work in progress");
        singlePlay3()
        break
      default:
        difficultyMode()
    }
  })
}

const startGame = () => {
  board.displayBoard(board.standard)
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
