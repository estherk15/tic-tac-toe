const board = require('./board.js');
const game = require('./game.js');
// const ticTacToe = require('./ticTacToe.js')
const assert = require('assert');

// Rules of the Game
describe('Board', () => {
  describe('#displayBoard()', () => {
    it('displays a board with numbers', () => {
      assert.deepStrictEqual(board.displayBoard(board.standard, true),
          '  1 | 2 | 3 \n -----------\n  4 | 5 | 6 \n -----------\n  7 | 8 | 9 ');
    });
  });
});
// ===========================================================================
// validates that numbers are entered
describe('Validations', () => {
  describe('#validateNumbers()', () => {
    it('runs when a number is input value', () => {
      assert.equal(game.validateNumbers(2), true);
    });
    it('fails when a string is input value', () => {
      assert.equal(game.validateNumbers('single'), false);
    });
  });

  describe('#validatePlay()', () => {
    // when you make a move, the square you choose should be empty
    board.grid1 = ['O', 2, 'X', 4, 'X', 6, 'O', 8, 'X'];
    it('returns true if input is an empty spot on the board', () => {
      assert.equal(game.validatePlay(2, board.grid1), true);
      assert.equal(game.validatePlay(4, board.grid1), true);
    });

    it('returns false if input already has a token', () => {
      assert.equal(game.validatePlay(1, board.grid1), false);
      assert.equal(game.validatePlay(9, board.grid1), false);
    });

    // validates selected number is within range of the grid being played
    it('only allows the play if selected position is within range', () => {
      const grid = ['O', 2, 'X', 4, 'X', 6, 'O', 8, 'X'];
      assert.equal(game.validatePlay(-1, grid), false);
      assert.equal(game.validatePlay(10, grid), false);
      assert.equal(game.validatePlay(2, grid), true);
    });
  });
});

// ===========================================================================

describe('Game play', () => {
  describe('#currentPlayer()', () => {
    // Whose turn is it?
    it('determines which token is next based on how many moves have been made', () => {
      assert.equal(game.currentPlayer(2), 'O');
      assert.equal(game.currentPlayer(7), 'X');
    });
  });
  describe('#move()', () => {
    // when you select a spot on the grid, the current token takes that place
    it('puts the correct token onto selected grid spot', () => {
      assert.deepStrictEqual(game.move(1, 'O'), ['O', 2, 3, 4, 5, 6, 7, 8, 9]);
    });
    it('puts the correct token onto selected grid spot', () => {
      assert.deepStrictEqual(game.move(2, 'X'), ['O', 'X', 3, 4, 5, 6, 7, 8, 9]);
    });
  });
  describe('#checkForWin()', () => {
    // Check after every move if someone has won
    it('returns true if there is a winning combination on the board', () => {
      const grid1 = ['X', 'X', 'X', 'O', 'O', 6, 7, 8, 9];
      const grid2 = ['X', 'O', 'O', 4, 'X', 6, 7, 8, 'X'];
      assert.equal(game.checkForWin(grid1), true);
      assert.equal(game.checkForWin(grid2), true);
    });
    it('returns false if there is no winning combination on the board', () => {
      const grid1 = ['X', 'X', 'O', 'O', 'O', 'X', 'X', 8, 9];
      assert.equal(game.checkForWin(grid1), false);
    });

    it('runs when a board shows none of the winning combinations', () => {
      const grid = ['X', 'O', 'X', 'O', 'O', 'X', 7, 8, 9];
      assert.equal(game.checkForWin(grid), false);
    });
  });
  describe('#fullBoard()', () => {
    // Make sure after every move, the board isn't full
    it('returns false for a board that still has open spots', () => {
      const grid1 = ['X', 'X', 'X', 4, 'O', 6, 'O', 'O', 9];
      assert.equal(game.fullBoard(grid1), false);
    });

    it('returns true for a board that is full', () => {
      const grid2 = ['X', 'X', 'X', 'O', 'O', 'X', 'O', 'O', 'X'];
      assert.equal(game.fullBoard(grid2), true);
    });
  });
  describe('#draw()', () => {
    it('returns true if the game is a draw', () => {
      const grid = ['X', 'O', 'X', 'O', 'X', 'X', 'O', 'X', 'O'];
      assert.equal(game.draw(grid), true);
    });
  });
  describe('#availablePlays()', () => {
    // returns the available spots on a grid
    it('returns available spot on the grid', () => {
      const grid = ['O', 2, 'X', 4, 'X', 6, 'O', 8, 'X'];
      assert.deepStrictEqual(game.availablePlays(grid), [2, 4, 6, 8]);
    });
  });
  describe('#randomPlay()', () => {
  // Given random idx num, the play will return the corresponding element
    const available = [2, 4, 6, 8];

    it('returns the correct element of a given index', () => {
      assert.equal(game.randomPlay(available, 3), 8);
      assert.equal(game.randomPlay(available, 1), 4);
      assert.equal(game.randomPlay(available, 2), 6);
    });
    it('returns undefined for an index outside the length of the array', () => {
      assert.equal(game.randomPlay(available, 5), undefined);
    });

    it('returns the correct element if index is 0', () => {
      assert.equal(game.randomPlay(available, 0), 2);
    });
  });
  describe('#winningMove()', () => {
    const testGame1 = ['X', 'O', 'X', 'X', 'O', 'X', 'O', 8, 9];
    const testGame2 = ['X', 'O', 'X', 4, 'X', 'O', 'O', 'X', 9];
    const testGame3 = ['O', 2, 'O', 4, 5, 6, 7, 8, 9];
    const testGame4 = ['X', 'O', 'X', 'X', 'O', 6, 7, 8, 9];
    // Which spot will lead to a win?
    it('returns the spot that will lead to "X" winning game', () => {
      assert.equal(game.winningMove(testGame1, 'X'), 9);
    });
    it('returns the spot that will lead to "X" winning game', () => {
      assert.equal(game.winningMove(testGame2, 'X'), 9);
    });
    it('returns the spot that will lead to "O" winning game', () => {
      assert.equal(game.winningMove(testGame3, 'O'), 2);
    });
    it('returns the spot that will lead to "O" winning game', () => {
      assert.equal(game.winningMove(testGame4, 'O'), 8);
    });
  });
  describe('#strategicPlay()', () => {
    const testGame1 = ['X', 'O', 'X', 4, 5, 6, 7, 8, 9];
    const testGame2 = ['X', 'O', 3, 'O', 5, 'X', 'X', 8, 9];
    const testGame3 = ['X', 2, 3, 4, 'O', 6, 7, 8, 'X'];
    const testGame4 = ['X', 2, 3, 4, 'O', 'X', 7, 8, 9];
    const testGame5 = [1, 'X', 3, 4, 'O', 'X', 7, 8, 9];
    const testGame6 = [1, 2, 3, 4, 'X', 6, 7, 8, 9];

    it('takes the center spot if open', () => {
      assert.equal(game.strategicPlay(testGame1), 5);
    });
    it('takes the center spot if open', () => {
      assert.equal(game.strategicPlay(testGame2), 5);
    });
    it('plays the first adjacent edge spot, playing offense', () => {
      assert.equal(game.strategicPlay(testGame3, 2), 2);
    });
    it('plays the first adjacent edge spot, playing offense', () => {
      assert.equal(game.strategicPlay(testGame4), 2);
    });
    it('plays a strategic move if no winning or losing play', () => {
      assert.equal(game.strategicPlay(testGame5), 1);
    });
    it('take the corner if X take the center on first play', () => {
      assert.equal(game.strategicPlay(testGame6, 1), 1);
    });
  });
});
