const board = require('./board.js')
const game = require('./game.js')
const readline = require('readline') //Node.js CLI

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log(`
  Let's play Tic Tac Toe!
  Version: 1.0.0
  `)
// 
// rl.question(`Please select from the following options:
//   [1] Single player
//   [2] Multi - player
// `, answer => {
//   if()
// })
