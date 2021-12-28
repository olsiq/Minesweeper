import * as gameLogic from "./func.js";

//initialize game

//variables
const grid = document.getElementById("grid");
let gameArray = gameLogic.view;
let row = gameLogic.row;
let col = gameLogic.col;
let bombs = gameLogic.bombs;

console.log(`${row} rows || ${col} colums || ${bombs} bombs`);
console.log(gameArray);
grid.style.setProperty("--grid-rows", row);
grid.style.setProperty("--grid-cols", col);
const makeGrid = (Array) => {
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
  //only  the first time they click should start the timer
  let firstClick = true;

  //initialize game
  Array.map((c, index) => {
    let cell = document.createElement("div");

    cell.setAttribute("data-pressed", false);
    cell.setAttribute("data-hasBomb", "N/A");
    cell.setAttribute("isFlaged", false);

    //timer section

    let x = cell.getAttribute("data-pressed");
    cell.addEventListener("click", () => {
      cell.setAttribute("data-pressed", true);

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
          disableClick(cell);
          //
          gameOver(grid);

          break;
        case "":
          cell.setAttribute("data-pressed", true);
          cell.setAttribute("data-value", "0");
          cell.innerText = "";
          disableClick(cell);
          break;

        default:
          cell.setAttribute("data-pressed", true);
          cell.setAttribute("data-value", c);
          cell.innerText = c;
          disableClick(cell);
          break;
      }
    });

    grid.appendChild(cell).className = "grid-item";
    cell.classList.add(index + 1);

    const disableClick = (x) => {
      x.style.pointerEvents = "none";
    };
    const gameOver = (x) => {
      x.classList.add("game-over");
      console.log("game over");
    };
  });
};
let game = makeGrid(gameArray);
