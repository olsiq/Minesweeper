import * as gameLogic from "./func.js";
import * as controls from "./controls.js";
//initialize gameBoard
let gameArray = gameLogic.view();
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
  let input = controls.setLevel();
  let [row, col, bombs] = input;

  //changing the css grid
  grid.style.setProperty("--grid-rows", row);
  grid.style.setProperty("--grid-cols", col);
  //flags counter
  let flags = bombs;
  //empty cells counter
  let cellsToOpen = row * col - bombs;
  // //initialize timer
  // let sec = 0;
  // let min = 0;
  // const timer = document.getElementById("timer");
  // //timer function
  // const Timer = () => {
  //   sec++;
  //   if (sec === 60) {
  //     sec = 0;
  //     min++;
  //   }
  //   timer.innerHTML = `${min}:${sec}`;
  // };
  // //set a timer id to null
  // let Timer_Id = null;

  // //start timer function will assign the set interval id to timer id
  // const startTimer = () => {
  //   Timer_Id = setInterval(Timer, 1000);
  //   return Timer_Id;
  // };

  // //stop timer function stops the interval with the timer idd
  // const stopTimer = () => clearInterval(Timer_Id);
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
    console.log("set name and time to highscores");
  };

  //initialize game

  Array.map((c, index) => {
    let cell = document.createElement("div");

    cell.setAttribute("data-isOpen", false);
    cell.setAttribute("data-hasBomb", "N/A");
    cell.setAttribute("isFlaged", false);

    //timer section

    let x = cell.getAttribute("data-isOpen");
    cell.addEventListener("click", () => {
      cell.setAttribute("data-isOpen", true);

      //the first time users click timer function executes
      //firstClick =false so the timer function doesnt executes again
      if (firstClick == true) {
        firstClick = false;
        startTimer();
      }
      switch (c) {
        case "bomb":
          cell.innerHTML = "💣";
          cell.classList.add("bomb");
          cell.setAttribute("data-hasBomb", true);
          //timer will stop
          stopTimer();
          //disable clicks on the cells
          //
          gameOver(grid);

          break;
        case "":
          cell.setAttribute("data-isOpen", true);
          cell.setAttribute("data-value", "0");
          cell.innerText = "";
          //if cell is open prevent from clicking it again
          disableClick(cell);
          decrementCellsToOpen();

          break;

        default:
          cell.setAttribute("data-isOpen", true);
          cell.setAttribute("data-value", c);
          cell.innerText = c;
          //if cell is open prevent from clicking it again
          disableClick(cell);
          decrementCellsToOpen();
          break;
      }
    });

    grid.appendChild(cell).className = "grid-item";
    cell.classList.add(index + 1);
    //disable click functions
    const disableClick = (x) => {
      x.style.pointerEvents = "none";
    };
    //gameOver function
    const gameOver = (x) => {
      x.classList.add("game-over");
      console.log("game over");
    };
  });
};

makeGrid(gameArray);
const clearGame = () => {
  const gameBoard = document.getElementById("grid");
  while (gameBoard.lastElementChild) {
    gameBoard.removeChild(gameBoard.lastElementChild);
  }
};
const btn = document.querySelector(".btn");
btn.addEventListener("click", (e) => {
  e.preventDefault;
  clearGame();
  stopTimer();
  makeGrid(gameArray);
});
