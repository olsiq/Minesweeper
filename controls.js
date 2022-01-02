let row;
let col;
let bombs;
export const setLevel = () => {
  let level = document.getElementById("lvl").value;
  let inputs;
  switch (level) {
    case "easy":
      row = 5;
      col = 10;
      bombs = 10;
      inputs = [row, col, bombs, level];
      break;
    case "difficult":
      row = 10;
      col = 7;
      bombs = 9;
      inputs = [row, col, bombs, level];
      break;
    case "expert":
      row = 10;
      col = 7;
      bombs = 50;
      inputs = [row, col, bombs, level];
      break;

    default:
      console.log("error");
      break;
  }
  return inputs;
};
