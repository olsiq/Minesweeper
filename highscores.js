import { getScores } from "./localstorage.js";

//add click event on btn with id easy
const btnScoreE = document.getElementById("easy");
btnScoreE.addEventListener("click", () => viewScore("easy"));
//add click event on btn with id difficult
const btnScoreD = document.getElementById("difficult");
btnScoreD.addEventListener("click", () => viewScore("difficult"));
//add click event on btn with id expert
const btnScoreEX = document.getElementById("expert");
btnScoreEX.addEventListener("click", () => viewScore("expert"));

//variables

const first_name = document.getElementById("first-name");
const first_time = document.getElementById("first-time");
const second_name = document.getElementById("second-name");
const second_time = document.getElementById("second-time");
const third_name = document.getElementById("third-name");
const third_time = document.getElementById("third-time");
const forth_name = document.getElementById("forth-name");
const forth_time = document.getElementById("forth-time");
const fifth_name = document.getElementById("fifth-name");
const fifth_time = document.getElementById("fifth-time");

const viewScore = (x) => {
  let scoreTable = getScores(x);
  let [first, second, third, forth, fifth] = scoreTable;
  first_name.innerHTML = first.name;
  first_time.innerHTML = first.time;
  second_name.innerHTML = second.name;
  second_time.innerHTML = second.time;
  third_name.innerHTML = third.name;
  third_time.innerHTML = third.time;
  forth_name.innerHTML = forth.name;
  forth_time.innerHTML = forth.time;
  fifth_name.innerHTML = fifth.name;
  fifth_time.innerHTML = fifth.time;
};
