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
  console.log(level);
  switch (level) {
    case "easy": {
      localStorage.getItem("easy") !== null
        ? console.log("there is smth there")
        : returnNullScores(level);
      break;
    }
    case "difficult": {
      localStorage.getItem("difficult") !== null
        ? console.log("there is smth there")
        : returnNullScores(level);
      break;
    }
    case "expert": {
      localStorage.getItem("expert") !== null
        ? console.log("there is smth there")
        : returnNullScores(level);
      break;
    }
    default: {
      console.log("not an accepted value");
      break;
    }
  }
};
checkLocalStorage(gameLevel);

//get the array of objects from local storage based on the level
export const getScores = (level) => JSON.parse(localStorage.getItem(level));
