// const board = require('./board.js');
// const game = require('./game.js');
const ticTacToe = require('../ticTacToe.js')
const assert = require('assert');

describe('TicTacToe.js', () => {
  describe('startGame()', () => {
    it('Writes the winner to the console', () => {
      const outputTest = (testMsg) => {
        let storedValue;
        return {
          // test msg becomes the storedValue
          read: storedValue,
          write: (testMsg) => {
            console.log(testMsg)
            storedValue = testMsg
          },
        };
      };
      assert.equal(ticTacToe.startGame(outputTest, true), outputTest.read);
    });
  });
  // given a fn how do you store a value that was passed into it

})
