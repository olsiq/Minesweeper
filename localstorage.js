//need changes
//convert time to only seconds
//examble 1:3 ==> 63
//variables
//const scoresBtn = document.getElementById("scores");
<<<<<<< Updated upstream

//check the level of the game
=======
//
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

const checkLocalStorage = (level) => {
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

>>>>>>> Stashed changes
let level;

let player1 = { name: "as1", time: "100" };
let player2 = { name: "as1", time: "3" };
let player3 = { name: "as3", time: "54" };
let player4 = { name: "as4", time: "67" };
let score = [];
score.push(player1, player2, player3, player4);
//convert string to int
score.forEach((element) => {
  element.time = parseInt(element.time);
});
console.log(score);
let player5 = { name: "djkl", time: 3 };
score.push(player5);
let newarray = score.sort((a, b) => a.time - b.time);
newarray = newarray.slice(0, 3);
console.log(newarray);
