import { gameLevel } from "./func.js";
const returnNullScores = (level) => {
  const scoresTable = [
    { name: "-", time: "-" },
    { name: "-", time: "-" },
    { name: "-", time: "-" },
    { name: "-", time: "-" },
    { name: "-", time: "-" },
  ];

  localStorage.setItem(level, JSON.stringify(scoresTable));
};
//check if the level of the game has stored any scores.if not insert null scores

export const checkLocalStorage = (level) => {
  switch (level) {
    case "easy": {
      localStorage.getItem("easy") !== null ? "" : returnNullScores(level);
      break;
    }
    case "difficult": {
      localStorage.getItem("difficult") !== null ? "" : returnNullScores(level);
      break;
    }
    case "expert": {
      localStorage.getItem("expert") !== null ? "" : returnNullScores(level);
      break;
    }
    default: {
      break;
    }
  }
};
checkLocalStorage(gameLevel);

//get the array of objects from local storage based on the level
export const getScores = (level) => JSON.parse(localStorage.getItem(level));

export const setScores = (name, time, level) => {
  name === "" ? (name = `user ${time}`) : "";

  let preVal = getScores(level);

  //remove the previous values
  localStorage.removeItem(level);
  //get the new score and push it to the old array
  const newScore = { name: `${name}`, time: time };

  preVal.push(newScore);

  //sort the array of object based on the time
  preVal.sort((a, b) => {
    //insert temporerly big numbers if they are null to sort them based on time
    a.time === "-" ? (a.time = 100000000) : "";
    b.time === "-" ? (b.time = 100000000) : "";
    return a.time - b.time;
  });
  /*make a new object of arrays and as values 
  loop the first 5 values and if time is the big number we add before make it "-" again*/
  const newVal = preVal
    .map((x) => {
      x.time === 100000000 ? (x.time = "-") : "";
      return x;
    })
    .filter((x, index) => index < 5);

  //set the new array of objects to the LocalStorage

  //another way to do it is get all the old values and use slice to get the first 5
  // const newVal = preVal.slice(0, 5);

  localStorage.setItem(level, JSON.stringify(newVal));
};
