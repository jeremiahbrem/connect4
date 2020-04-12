/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let width = 7;
let height = 6;
let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
const htmlBoard = document.querySelector('#board');
const newGameBtn = document.querySelector('button');
newGameBtn.addEventListener('click', () => {
  board.length = 0;
  htmlBoard.innerHTML = '';
  makeBoard();
  makeHtmlBoard();
})

makeBoard();
makeHtmlBoard();

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // creates empty game board array with height number of rows and width number of cells
  for (let y = 0; y < height; y++) {
    board[y] = [];
    for (let x = 0; x < width; x++) {
      board[y].push(null);
    }
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  
  //creates top row where users will click to drop game pieces into game board
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  //adds clickable top row boxes, the width of the game board
  for (let x = 0; x < width; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  /* creates game board for user to drop pieces into, adding game board height number of rows each 
   with board width number of spots, each with a x,y coordinate id */
  for (let y = 0; y < height; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < width; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for (let y = height - 1; y >= 0 ; y--) {
    if (board[y][x] === null) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece')
  currPlayer === 1 ? piece.classList.add('p1') : piece.classList.add('p2');
  const cell = document.getElementById(`${y}-${x}`)
  cell.append(piece);
}

/** endGame: announce game end remove click listener from top row*/

function endGame(msg) {
  setTimeout(() => alert(msg), 750);
  document.getElementById('column-top').removeEventListener('click', handleClick);
  
}



/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  placeInTable(y, x);

  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  if (checkForTie()) {
    return endGame('The game is a tie!');
  }

  // switch players
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
}

/* checks if every cell in each row contains either 1 or 2 (player1 or player2); if true the board
    is filled up and the game is a tie*/
function checkForTie() {
  for (let y = 0; y < height; y++) {
    if (!board[y].every(cell => cell === 1 || cell === 2)) {
      return false;
    }
  }
  return true;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < height &&
        x >= 0 &&
        x < width &&
        board[y][x] === currPlayer
    );
  }

  /* loops through the board array and checks for every connect 4 scenario
      (horiz,vert,diagonal down/right, diagonal down/left) to enter as an argument
      to the _win function; */      
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // four cells across in the same row (same y row, consecutive x values)
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      // four consecutive cells in a column (same x cell, consecutive y row value
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      // four cells diagonally going down and right (each consecutive cell is down one y row value 
      // and one x value to the right)
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      // four cells diagonally going down and left (each consecutive cell is down one y row value 
      // and one x value to the left)
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      /* if the x,y coordinates are within board boundaries and the same currPlayer has a piece in each
      cell of any connect 4 scenario, the function returns true */
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}


