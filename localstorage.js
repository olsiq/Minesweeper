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

export const setScores=(name,time,level)=>{
  let preVal=getScores(level);
  //remove the previous values
  localStorage.removeItem(level);
  //get the new score and push it to the old array
  const newScore={name:`${name}`,time:`${time}`};
  preVal.push(newScore);
  //sort the array of object based on the time
  preVal.sort((a,b)=>a.time-b.time);
  //set the new array of objects to the LocalStorage 
  const newVal=preVal.slice(0,5);
  localStorage.setItem(localStorage.setItem(level, JSON.stringify(newVal))
}
