const board = require('./board.js');
const game = require('./game.js');
const readline = require('readline'); // Node.js CLI

const rl = readline.createInterface({
// rl is the CLI program that outputs in the terminal and take player inputs
  input: process.stdin,
  output: process.stdout,
});

let gameMode; // what difficulty is being played

const outputDriver = () => {
  return {
    write: (output) => console.log(output),
  };
};

const gameOver = (currentPlayer, outputDriver) => {
  const winLoseGame = game.checkForWin(board.standard);
  const tiedGame = game.draw(board.standard);

  if (winLoseGame) {
    const message = ` Player [${currentPlayer}] is the Winner!!!`
    // console.log(` Player [${winner}] is the Winner!!!`);;
    output.write(message);

    return rl.close();
  } else if (tiedGame) {
    const message = '\n It\'s a tie, you\'re both winners! Huzzah!';
    // console.log('\n It\'s a tie, you\'re both winners! Huzzah!');
    output.write(message)
    return rl.close();
  }
};

const playerPrompt = (token) => {
  rl.question(`\n Player ${token}, your move:  `, (input) => {
    if (game.validatePlay(input, board.standard)) {
      const newBoard = game.move(input, token);
      board.displayBoard(newBoard);
      if ((game.checkForWin(board.standard)) || (game.draw(board.standard))) {
        return gameOver(token);
      }
      game.currentPlay++;
      gameMode();
    } else { // if the input is not valid
      console.log(`\n ***Invalid input, please try again***`);
      gameMode();
    }
  });
};

// Multplayer mode ==================================
const multiPlay = () => { // multiplayer mode
  const token = game.currentPlayer(game.currentPlay);
  gameMode = multiPlay;
  playerPrompt(token);
};

// Singleplayer Easy mode ================================
const singlePlay1 = () => { // single play easy mode
  gameMode = singlePlay1;
  const token = game.currentPlayer(game.currentPlay);
  if (token === 'X') {
    playerPrompt(token);
  }
  if (token === 'O') {
    const openSpots = game.availablePlays(board.standard);
    // returns an array of all possible plays the computer can make
    const computerMove = game.randomPlay(openSpots);
    // returns the spot that the computer is placing its token
    const newBoard = game.move(computerMove, token);
    console.log(`\n Player O's move: ${computerMove}`);
    // setTimeout(() => board.displayBoard(newBoard), 2500)
    // console.log(`\n`)
    board.displayBoard(newBoard);
    if ((game.checkForWin(board.standard)) || (game.draw(board.standard))) {
    // if there is a winner do this:
      return gameOver(token);
    } else { // if there isn't a winner do this
      game.currentPlay++;
      singlePlay1();
    }
  }
};// singlePlay1

const singlePlay2 = () => { // Unbeatable mode
  const token = game.currentPlayer(game.currentPlay);
  gameMode = singlePlay2;
  if (token === 'X') {
    playerPrompt(token);
  }
  if (token === 'O') {
    const openSpots = game.availablePlays(board.standard);
    const offensivePlay = game.winningMove(board.standard, 'O');
    const defensivePlay = game.winningMove(board.standard, 'X');
    const computerMove = game.randomPlay(openSpots);

    if (offensivePlay) {
      const newBoard = game.move(offensivePlay, token);
      console.log(`\n Player O's move: ${offensivePlay}`);
      board.displayBoard(newBoard);
      return gameOver(token);
    } else if (defensivePlay) {
      // if the O is defense, then there is no winner yet
      const newBoard = game.move(defensivePlay, token);
      console.log(`\n Player O's move: ${defensivePlay}`);
      board.displayBoard(newBoard);
      game.currentPlay++;
      singlePlay2();// go back to the beginning
    } else {// there's no best defense or offense
      const newBoard = game.move(computerMove, token);
      console.log(`\n Player O's move: ${computerMove}`);
      board.displayBoard(newBoard);
      if ((game.checkForWin(board.standard)) || (game.draw(board.standard))) {
        return gameOver(token);
      }
      game.currentPlay++;
      singlePlay2();
    }
  }
};// singlePlay2

const singlePlay3 = () => { // Unbeatable mode
  const token = game.currentPlayer(game.currentPlay);
  gameMode = singlePlay3;
  if (token === 'X') {
    playerPrompt(token);
  }
  if (token === 'O') {
    const offensivePlay = game.winningMove(board.standard, 'O');
    const defensivePlay = game.winningMove(board.standard, 'X');

    if (offensivePlay) {
      const newBoard = game.move(offensivePlay, token);
      console.log(`\n Player O's move: ${offensivePlay}`);
      board.displayBoard(newBoard);
      return gameOver(token);
    } else if (defensivePlay) {
      // if the O is defense, then there is no winner yet
      const newBoard = game.move(defensivePlay, token);
      console.log(`\n Player O's move: ${defensivePlay}`);
      board.displayBoard(newBoard);
      game.currentPlay++;
      singlePlay3();
    } else {// there's no best defense or offense
      const strategicPlay = game.strategicPlay(board.standard);
      const newBoard = game.move(strategicPlay, token);
      console.log(`\n Player O's move: ${strategicPlay}`);
      board.displayBoard(newBoard);
      if ((game.checkForWin(board.standard)) || (game.draw(board.standard))) {
        return gameOver(token);
      }
      game.currentPlay++;
      singlePlay3();
    }
  }
};

// Game Options and Menus ==================================
const menu = () => {
  rl.question('[1] Single Player \n[2] Multi Player \n :', (input) => {
    switch (input) {
      case '1': // if it's a single player, go to the difficulty menu
        difficultyMode();
        break;
      case '2':
        multiPlay();
        break;
      default:
        menu();
    }
  });
};

const difficultyMode = () => {
  rl.question('Pick a difficulty level: \n[1] Easy \n[2] Difficult \n[3] Unbeatable\n', (input) => {
    switch (input) {
      case '1':
        singlePlay1();
        break;
      case '2':
        singlePlay2();
        break;
      case '3':
        singlePlay3();
        break;
      default:
        difficultyMode();
    }
  });
};

const startGame = (outputFn, isTest) => {
  if (isTest) {
    return;
  }

  board.displayBoard(board.standard);
  // console.log('\nPlayer X  ||  Player O \n');
  const instructions = ('\nWhen it is your turn, enter the number in the corresponding\nsquare on the board you want to place your token. For example, \nif you want to place an [X] in the top left corner, you would\ntype 1 on your turn.\n');
  const output = outputDriver();
  output.write(instructions);

  menu();
};

// Starts the game
// ================================================================
const welcomeMsg = `
  Let's play Tic Tac Toe!
  Version: 1.0.0
  `
const output = outputDriver();
output.write(welcomeMsg)

startGame(outputDriver);

module.exports = {
  gameOver,
  startGame,
};
