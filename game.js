// Anything related to the rules of the game goes here
const board = require('./board.js');

const winningCombo = [// These are arrays of index numbers
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

// Players====================================================
// whenever a move is made this will increase, there are only 9 moves.
const currentPlay = 1;
const currentPlayer = (currentPlay) => currentPlay % 2 === 0 ? 'O' : 'X';

// Gameplay===================================================
const move = (num, token) => {
  // fn places the current token from gamePlay into chosen spot
  board.standard[num - 1] = token;
  return board.standard;
};

// Is there a winning combination?
const checkForWin = (grid) => {// returns boolean
  let winner = false;

  winningCombo.some((combo) => {
    const currentCombo = combo.map((idx) => grid[idx]);
    const threeInARow = ((currentCombo[0] === currentCombo[1])
     && (currentCombo[1] === currentCombo[2]));
    winner = ((typeof currentCombo[0] === 'string') && threeInARow);
    return winner;
  });
  return winner;
};

const fullBoard = (grid) => {// returns boolean
  return grid.every((spot) => (spot === 'X' || spot === 'O'));
};

const draw = (grid) => {
  if (!checkForWin(grid) && fullBoard(grid)) {
    return true;
  }
  return false;
};

// Single Player Easy Mode ======================================
const availablePlays = (board) => {// returns an array of available open spots
  const available = [];
  board.forEach((spot) => {
    if (typeof spot === 'number') {
      available.push(spot);
    }
  });
  return available;
};

const randomPlay = (array, testIdx) => {// returns a spot NOT an index
  if (typeof testIdx === 'number') {
    return array[testIdx];
  } else {
    // Math.random(), returns a float between 0 and 1
    const randomIdx = (Math.floor(Math.random() * (array.length)));
    return array[randomIdx];
  }
};

// Single Player Unbeatable Mode ===========================
const winningMove = (currentBoard, token) => {
  const possiblePlays = availablePlays(currentBoard);
  let winningSpot = null;
  possiblePlays.forEach((spot) => {
    const copyBoard = [...currentBoard];
    copyBoard[spot - 1] = token;
    if (checkForWin(copyBoard)) {
      winningSpot = spot;
      return;
    }
  });
  return winningSpot;
};

const strategicPlay = (currentBoard, isTest) => {
// If there is no immediate danger, or immediate win, play to win determines best play for O when there is neither defensive or offensive play to be made.
// O should play the middle if available, otherwise play a positions where two out of the three winning positions are still open
  let bestMove;

  const openSpots = availablePlays(currentBoard);
  const randomIdx = (array) => Math.floor(Math.random() * array.length);
  const diagonalMove = () => ((currentBoard[0] === currentBoard[8]) || (currentBoard[2] === currentBoard[6]));
  const middleCombo = winningCombo.filter((combo) => combo[1] === 4);
  // look through all the winning combos involving the middle positions
  // if the first and last are empty, then return one of those values
  const playStrategy = () => !isTest && !diagonalMove()
  const strategy = () => middleCombo.find((combo) => {
    const boardCombo = combo.map((idx) => currentBoard[idx]);
    const potWinCombo = () => ((typeof boardCombo[0] === 'number') && (typeof boardCombo[2] ==='number'))
    if (potWinCombo()) {
      bestMove = currentBoard[combo[0]];
      return combo;
    }
  });

  switch (true) {
    case !!isTest:
      bestMove = isTest
      break;
    case openSpots.includes(5):
      bestMove = 5
      break;
    case openSpots.length === 8:
      bestMove = board.corners[randomIdx(board.corners)]
      break;
    case diagonalMove():
      bestMove = board.edges[randomIdx(board.edges)]
      break;
    case playStrategy():
      strategy();
      break;
    default:
      bestMove = openSpots[randomIdx(openSpots)];
  }
  return bestMove;
};

// Validations ===========================================
const validateNumbers = (num) => {// player can only enter numbers
  if (isNaN(num)) {
    return false;
  }
  return true;
};

const validatePlay = (num, grid) => {// boolean
  // is the number a spot? is it empty? is it a number?
  const isToken = () => (typeof grid[num-1] === 'number') ? true : false;
  const isValidSpot = () => (0 < num <= grid.length) ? true : false;
  const validPlay = isToken() && isValidSpot() && validateNumbers(num);

  return validPlay;
};

module.exports = {
  validateNumbers,
  validatePlay,
  currentPlay,
  currentPlayer,
  move,
  winningCombo,
  checkForWin,
  fullBoard,
  draw,
  availablePlays,
  randomPlay,
  winningMove,
  strategicPlay,
};
