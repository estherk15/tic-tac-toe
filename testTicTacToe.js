// const board = require('./board.js');
// const game = require('./game.js');
const ticTacToe = require('./ticTacToe.js')
const assert = require('assert');


// Game play
// describe('Board', () => {
//   describe('#displayBoard()', () => {
//     it('displays a board with numbers', () => {
//       assert.deepStrictEqual(board.displayBoard(board.standard, true),
//           '  1 | 2 | 3 \n -----------\n  4 | 5 | 6 \n -----------\n  7 | 8 | 9 ');
//     });
//   });
// });
// // ===========================================================================
// validates that numbers are entered

// describe('gameOver()', () => {
//   it('Writes the winner to the console', () => {
//     board.standard = ['X', 'X', 'X', 'O', 'O', 6, 7, 8, 9];
//     assert.equal(ticTacToe.gameOver(''), true);
//   });
// });

// describe('startGame()', () => {
//   it('Writes the winner to the console', () => {
//     const outputTest = () => {
//       return {
//         write: () => console.log('Welcome to the game'),
//       };
//     };
//     expect(ticTacToe.startGame(outputTest)).to.equal('Welcome to the game');
//   });
// });
