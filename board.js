
//The board array that is passed into the function is shown.
const displayBoard = (grid) => {
  const row1 = `${grid[0]} | ${grid[1]} | ${grid[2]}`
  const row2 = `${grid[3]} | ${grid[4]} | ${grid[5]}`
  const row3 = `${grid[6]} | ${grid[7]} | ${grid[8]}`
  const line = '------------'

  return
  `${row1}
    ${line}
    ${row2}
    ${line}
    ${row3}`
}





module.exports = {
  displayBoard,
 }
