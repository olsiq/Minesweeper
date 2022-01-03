import { cellPosition, gameLogic } from "./func.js";
import * as controls from "./controls.js";
import { checkLocalStorage, getScores, setScores } from "./localstorage.js";
import { viewScore } from "./highscores.js";
//initialize gameBoard
let gameArray = gameLogic();
//initialize timer
let sec = 0;
let min = 0;
const timer = document.getElementById("timer");
//timer function
const Timer = () => {
  sec++;
  if (sec === 60) {
    sec = 0;
    min++;
  }
  timer.innerHTML = `${min}:${sec}`;
};
//set a timer id to null
let Timer_Id = null;

//start timer function will assign the set interval id to timer id
const startTimer = () => {
  Timer_Id = setInterval(Timer, 1000);
  return Timer_Id;
};

//stop timer function stops the interval with the timer idd
const stopTimer = () => clearInterval(Timer_Id);
//game function
//takes as parameter the array  from the func.js
const makeGrid = (Array) => {
  const grid = document.getElementById("grid");

  //get the input values based on the level provided
  let input = controls.setLevel();
  //spread input array to variables
  let [row, col, bombs, level] = input;
  let totalCells = row * col;
  //changing the css grid
  grid.style.setProperty("--grid-rows", row);
  grid.style.setProperty("--grid-cols", col);
  //flags counter
  let flags = bombs;
  //empty cells counter
  let cellsToOpen = row * col - bombs;

  //only  the first time they click should start the timer
  let firstClick = true;

  //getting and setting the innerhtml to the flag-counter element
  const flagCounter = document.querySelector("#flag-counter");
  flagCounter.innerHTML = flags;

  //decrement flags function
  const decrementFlags = () =>
    flags === 0 ? console.log("no more flags") : flags--;

  //decrement cells function
  const decrementCellsToOpen = () => {
    cellsToOpen === 1 ? youWin() : cellsToOpen--;
  };

  //you win function
  const youWin = () => {
    stopTimer();
    let time = min * 60 + sec;
    let name = "miaou" + time;
    setScores((name = "user"), time, level);
  };
  const EmptyCellsNeighbors = (cellPosition, col, x) => {
    let Cells = [];
    switch (cellPosition) {
      case "top-left-cell":
        Cells = [x + 1, x + col, x + (col + 1)];

        break;
      case "top-right-cell":
        Cells = [x - 1, x + (col - 1), x + col];

        break;
      case "buttom-left-cell":
        Cells = [x - col, x - (col - 1), x + 1];

        break;
      case "buttom-right-cell":
        Cells = [x - 1, x - col, x - (col + 1)];

        break;
      case "buttom-right-col":
        Cells = [x - 1, x - col, x - (col + 1)];

        break;
      case "first-column":
        Cells = [x - col, x - (col - 1), x + 1, x + col, x + (col + 1)];

        break;
      case "last-column":
        Cells = [x - col, x + col, x - 1, x - (col + 1), x + (col - 1)];

        break;
      case "first-row":
        Cells = [x - 1, x + 1, x + (col - 1), x + col, x + (col + 1)];

        break;
      case "last-row":
        Cells = [x - 1, x + 1, x - (col + 1), x - (col - 1), x - col];

        break;
      case "middle":
        Cells = [
          x + 1,
          x - 1,
          x - col,
          x + col,
          x - (col - 1),
          x - (col + 1),
          x + (col + 1),
          x + (col - 1),
        ];

        break;

      default:
        console.error("switch statement");
        break;
    }
    return Cells;
  };
  //initialize game
  //check (and remove) if game-over class exist

  Array.map((c, index) => {
    let cell = document.createElement("div");

    cell.setAttribute("data-isOpen", false);
    cell.setAttribute("data-hasBomb", "N/A");
    cell.setAttribute("isFlaged", false);

    //timer section

    let x = cell.getAttribute("data-isOpen");
    cell.addEventListener("click", () => {
      //the first time users click timer function executes
      //firstClick =false so the timer function doesnt executes again
      if (firstClick == true) {
        firstClick = false;
        startTimer();
      }

      const openCell = (cell, c, index) => {
        cell.setAttribute("data-isOpen", true);
        switch (c) {
          case "bomb":
            cell.innerHTML = "💣";
            cell.classList.add("bomb");
            cell.setAttribute("data-hasBomb", true);
            //timer will stop
            stopTimer();
            //disable clicks on the cells
            gameOver(grid);

            break;
          case "":
            disableClick(cell);
            cell.setAttribute("data-value", c);
            cell.innerText = c;
            //if cell is open prevent from clicking it again
            decrementCellsToOpen();
            //cell position on the first array
            let CellPosition = index + 1;
            //store the position of the cell using the cellPosition function  from func.js
            let position = cellPosition(CellPosition, col, totalCells);
            //store  in an array the neighbor cells of the empty cell using the EmptyCellsNeighbors function
            let neighbors = EmptyCellsNeighbors(position, col, CellPosition);
            //loop  through neighbors array
            neighbors.map((x) => {
              //find the class with the value x and store it as neighbor
              let neighbor = document.getElementsByClassName(`${x}`)[0];
              //store the index of the cell x in the first array we imported from func.js
              let arrayindex = x - 1;
              //store the value of the cell x in the first array we imported from func.js
              let ArrayIndexValue = Array[x - 1];
              //check if neighbour cell was open
              if (neighbor.getAttribute("data-isOpen") === "false") {
                //open the neighbor cell
                openCell(neighbor, ArrayIndexValue, arrayindex);
              }
            });
            break;

          default:
            disableClick(cell);
            cell.setAttribute("data-value", c);
            cell.innerText = c;
            //if cell is open prevent from clicking it again

            decrementCellsToOpen();
            break;
        }
      };
      openCell(cell, c, index);
    });

    grid.appendChild(cell).className = "grid-item";
    cell.classList.add(index + 1);
    //disable click functions
    const disableClick = (x) => {
      x.style.pointerEvents = "none";
    };

    //gameOver function
    const gameOver = (x) => {
      setScores("olsi", 2, level);
      x.classList.add("game-over");
      console.log("game over");
    };
  });
  checkLocalStorage(level);
  viewScore(level);
};

makeGrid(gameArray);
const clearGame = () => {
  const gameBoard = document.getElementById("grid");
  while (gameBoard.lastElementChild) {
    gameBoard.removeChild(gameBoard.lastElementChild);
  }
};
const btn = document.querySelector(".btn-start");
btn.addEventListener("click", (e) => {
  e.preventDefault;
  //remove class game-over if it exists
  if (grid.classList.contains("game-over")) {
    grid.classList.remove("game-over");
  }
  clearGame();
  stopTimer();
  //set the time values to 0 on new game
  min = 0;
  sec = 0;
  timer.innerHTML = `${min}:${sec}`;
  gameArray = gameLogic();
  makeGrid(gameArray);
});
