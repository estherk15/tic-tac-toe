
//The board array that is passed into the function is shown.
const displayBoard = (board=Array(3).fill("")) => {
  // const board = Array(3).fill("") //this creates an array with 9 empty strings
  const row1 = `${board[0]} | ${board[1]} | ${board[2]}`
  const row2 = `${board[0]} | ${board[1]} | ${board[2]}`
  const row3 = `${board[0]} | ${board[1]} | ${board[2]}`
  const line = '----------------------'

  return row1

}





module.exports = {
  add,
  displayBoard,
 }
