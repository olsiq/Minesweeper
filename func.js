//variables
export const row = 7;
export const col = 5;
export const bombs = 1;
export const totalCells = row * col;

//makebombs function

const makebombs = (bombs, totalCells) => {
  let bombArray = new Array(bombs);
  const randomNumbers = new Array(totalCells)
    .fill()
    .map((_, index) => index + 1);
  randomNumbers.sort(() => Math.random() - 0.5);
  bombArray = randomNumbers.slice(0, bombs);
  return bombArray;
};
const bombArray = makebombs(bombs, totalCells).sort((a, b) => a - b);
//test

// const bombArray = [1, 3, 5, 11, 13, 15, 21, 23, 14, 25];

// find Cells Position function
const cellPosition = (cell, col, totalCells) => {
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

//find neighbour cells function

const findNeighbors = (bcell, col, x) => {
  let Cells = [];
  //test cell
  //console.log("bomb-cell=>" + x, "col->" + col, bcell);

  switch (bcell) {
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
};
//find cells that are neighbours of bomb cells
const neighbour = bombArray.map((x) => {
  let position = cellPosition(x, col, totalCells);
  //console.log(`cell position is ${position},cell ${x}`);
  let neighborCells = findNeighbors(position, col, x);
  //console.log(`neighbour position is ${neighborCells}`);
  return neighborCells;
});

//merge and sort all the neighbour cells together
const allNeighbours = [].concat(...neighbour);
allNeighbours.sort((a, b) => a - b);
allNeighbours.filter((x) => {
  bombArray.includes(x) ? (x = "bomb") : (x = x);
});

//game array

const gameArray = new Array(totalCells).fill().map((_, index) => index + 1);
export let view = gameArray.map((x) => {
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
