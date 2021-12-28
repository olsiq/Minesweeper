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

  const startTimer = () => {
    sec++;
    if (sec === 60) {
      sec = 0;
      min++;
    }
    timer.innerHTML = `${min}:${sec}`;
  };

  //initialize game
  Array.map((c, index) => {
    let cell = document.createElement("div");

    cell.setAttribute("data-pressed", false);
    cell.setAttribute("data-hasBomb", "N/A");
    cell.setAttribute("isFlaged", false);

    // cell.addEventListener("oncontextmenu", (e) => {
    //   console.loc("it works");
    //   e.preventDefault();
    //   cell.toggleAttribute("marked");
    // });
    //on click events function

    let x = cell.getAttribute("data-pressed");
    cell.addEventListener("click", () => {
      cell.setAttribute("data-pressed", true);
      let setTimer;
      let firstClick = true;
      if (firstClick) {
        firstClick = false;
        setTimer = setInterval(startTimer, 100);
      }

      switch (c) {
        case "bomb":
          cell.innerHTML = "💣";
          cell.classList.add("bomb");
          cell.setAttribute("data-hasBomb", true);
          clearInterval(setTimer);
          disableClick(cell);
          gameOver(grid);

          break;
        case "":
          cell.setAttribute("data-pressed", true);
          cell.setAttribute("data-value", "0");
          cell.innerText = "";
          disableClick(cell);
          break;

        default:
          console.log(c);
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
