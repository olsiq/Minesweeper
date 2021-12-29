let row = 5;
let col = 10;
let bombs = 10;
export const setLevel = () => {
  let level = document.getElementById("lvl").value;
  console.log(level);
  switch (level) {
    case "easy":
      row = 5;
      col = 10;
      bombs = 10;
      console.log(bombs, row, col);
      break;
    case "difficult":
      row = 10;
      col = 7;
      bombs = 9;
      console.log(bombs, row, col);

      break;
    case "expert":
      row = 10;
      col = 7;
      bombs = 50;
      console.log(bombs, row, col);
      break;

    default:
      console.log("error");
      break;
  }
};
export { row, col, bombs };
