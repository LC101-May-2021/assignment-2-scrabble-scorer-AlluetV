// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let newPointStructure = transform(oldPointStructure);
console.log(newPointStructure);

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `\nPoints for '${word[i]}': ${pointValue}`;
		 }
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  let usserWord =input.question("Let's play some scrabble! Enter a word: ");
   return usserWord;
};


let simpleScore = function(word){
  word = word.toUpperCase();
  let usserScore = word.length;
  return usserScore;
}
//test simpleScore
//console.log(simpleScore('patito'));

let vowelBonusScore = function(word){
  let vowelArr = ["A","E","I","O","U"];
  word = word.toUpperCase();
  let vowelScore = 0;
  let consonatScore = 0;
  let scoreBonus = 0;
  let wordArr = word.split("");
  for(let i = 0 ; i< wordArr.length ; i++){
    if(vowelArr.includes(wordArr[i]) === true){
      vowelScore += 3;
    }else {
      consonatScore ++;
    }
  }
  scoreBonus = vowelScore + consonatScore;
  return scoreBonus;
}

//console.log(vowelBonusScore("pa"));
let scrabbleScore = function(word){
  word = word.toLowerCase();
  let score = 0;
  for( let letter of word){
    score += newPointStructure[letter];
  }
  return score;
};


let simpleScoreObj = {
  name:"Simple Score",
  description: "Each letter is worth 1 point.",
  scorerFunction:simpleScore
}

let vowelBonusObj = {
  name:"Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scorerFunction: vowelBonusScore
}

let scrabbleObj = {
  name:"Scrabble",
  description: "The traditional scoring algorithm.",
  scorerFunction: scrabbleScore
}



const scoringAlgorithms = [simpleScoreObj , vowelBonusObj , scrabbleObj];

function scorerPrompt() {
  let validOptions = ['0', '1', '2'];
  let userChoose = '';
  while(!validOptions.includes(userChoose)){
    userChoose =  input.question("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: ");
  }
  userChoose = Number(userChoose);
  return scoringAlgorithms[userChoose];
}

function transform(objectA) {
  let newObj = {' ': 0};
  for(let num in objectA){
    for(let letter of objectA[num]){
      newObj[letter.toLowerCase()] = Number(num);
    }
  }
  return newObj;
};


function runProgram() {
  let word = initialPrompt();
  let algorithm = scorerPrompt(); 
  let score = algorithm.scorerFunction(word);
  console.log(`Score for '${word}': ${score}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

