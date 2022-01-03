import { checkLocalStorage } from "./localstorage.js";

let row;
let col;
let bombs;
//if no keys are found on localStorage add them
let levels = ["easy", "difficult", "expert"];
levels.forEach((element) => {
  checkLocalStorage(element);
});
export const setLevel = () => {
  let level = document.getElementById("lvl").value;
  let inputs;
  switch (level) {
    case "easy":
      row = 5;
      col = 10;
      bombs = 5;
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
