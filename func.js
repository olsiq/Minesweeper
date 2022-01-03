import * as controls from "./controls.js";
//find neighbour cells function
//find neighbour cells function
export const findNeighbors = (cellPosition, col, x, bombArray) => {
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
  if (Cells.includes(bombArray)) {
    Cells = Cells.map((x) => {
      if (x.includes(bombArray)) {
        return "bomb";
      } else {
        return x;
      }
    });
  }
  return Cells;
}; // find Cells Position function
export const cellPosition = (cell, col, totalCells) => {
  let position = "";
  if (cell === 1) {
    position = "top-left-cell";
  } else if (cell === col) {
    position = "top-right-cell";
  } else if (cell === totalCells - (col - 1)) {
    position = "buttom-left-cell";
  } else if (cell === totalCells) {
    position = "buttom-right-cell";
  } else if (cell > 1 && cell < col) {
    position = "first-row";
  } else if (cell > totalCells - col && cell < totalCells) {
    position = "last-row";
  } else if (cell % col === 1) {
    position = "first-column";
  } else if (cell % col === 0) {
    position = "last-column";
  } else {
    position = "middle";
  }

  return position;
};
export let gameLevel;
//game array
export const gameLogic = () => {
  //input values

  let input = controls.setLevel();
  let [row, col, bombs, level] = input;
  gameLevel = level;
  let totalCells = row * col;

  //main functions

  const makebombs = (bombs, totalCells) => {
    let bombArray = new Array(bombs);
    const randomNumbers = new Array(totalCells)
      .fill()
      .map((_, index) => index + 1);
    randomNumbers.sort(() => Math.random() - 0.5);
    bombArray = randomNumbers.slice(0, bombs);
    return bombArray;
  }; //find cells that are neighbours of bomb cells
  const neighbours = (array) =>
    array.map((x) => {
      let position = cellPosition(x, col, totalCells);
      //console.log(`cell position is ${position},cell ${x}`);
      let neighborCells = findNeighbors(position, col, x, array);
      //console.log(`neighbour position is ${neighborCells}`);
      return neighborCells;
    });

  //game board
  const gameArray = new Array(totalCells).fill().map((_, index) => index + 1);
  const bombArray = makebombs(bombs, totalCells).sort((a, b) => a - b);

  const neighbour = neighbours(bombArray);
  //merge and sort all the neighbour cells together
  const allNeighbours = [].concat(...neighbour);
  allNeighbours.sort((a, b) => a - b);
  allNeighbours.filter((x) => {
    bombArray.includes(x) ? (x = "bomb") : (x = x);
  });
  let view = gameArray.map((x) => {
    const innerValues = (x) => {
      if (bombArray.includes(x)) {
        return "bomb";
      } else if (allNeighbours.includes(x)) {
        let filter = allNeighbours.filter((y) => x === y);
        filter = filter.length;
        return filter;
      } else {
        return "";
      }
    };

    return innerValues(x);
  });
  console.log("below are the values of each cell");
  console.log(view);
  return view;
};
