// Declare the global variables
let init = 0;
let winCount = 0;
let lossCount = 0;
let guessesRemaining = 0;

let keyPress = '';
let emptyWord = [];
let guessedLetters = [];
let currentFruit = '';

const fruitsList = [
  "apple",
  "apricot",
  "avocado",
  "banana",
  "blackberry",
  "blackcurrant",
  "blueberry",
  "cantaloupe",
  "cherry",
  "clementine",
  "coconut",
  "cranberry",
  "cucumber",
  "currant",
  "date",
  "dragonfruit",
  "durian",
  "elderberry",
  "eggplant",
  "fig",
  "gooseberry",
  "grape",
  "grapefruit",
  "guava",
  "huckleberry",
  "jackfruit",
  "kiwifruit",
  "lemon",
  "lime",
  "loquat",
  "longan",
  "lychee",
  "mandarine",
  "mango",
  "mulberry",
  "nectarine",
  "olive",
  "orange",
  "papaya",
  "passionfruit",
  "peach",
  "pear",
  "persimmon",
  "plantain",
  "plum",
  "pineapple",
  "pomegranate",
  "pomelo",
  "pumpkin",
  "raspberry",
  "squash",
  "strawberry",
  "tamarind",
  "tangerine",
  "tomato",
  "watermelon"
];

// Divs
const scoreDiv = document.getElementById('score');
const guessDiv = document.getElementById('guess');
const wordDiv = document.getElementById('word');
const guessedDiv = document.getElementById('guessed');
const initializerDiv = document.getElementById('initializer');
const cheaterDiv = document.getElementById('cheater');
const button = document.querySelector('button');

// Init function
function initialize() {
  currentFruit = fruitsList[Math.round(Math.random() * fruitsList.length)].toUpperCase();

  guessesRemaining = currentFruit.length + 5;
  guessDiv.innerHTML = `Guess Left: ${guessesRemaining}`;

  guessedLetters = [];
  guessedDiv.textContent = 'Ready, Set, Go!';

  scoreDiv.innerHTML = `Wins: ${winCount} | Losses: ${lossCount}`;

  // hangman
  emptyWord = [];
  for (let i = 0; i < currentFruit.length; i++) {
    emptyWord.push('_');
  }
  wordDiv.textContent = emptyWord.join(' ');

  initializerDiv.innerHTML = `<h3>Good Luck!</h3>`;

  cheaterDiv.textContent = 'You cheater! The fruit is: ' + currentFruit;

  // Finally start the game
  init = 1;
}

initialize();

button.addEventListener('click', function (event) {
  initialize();
  event.stopPropagation();
})

document.addEventListener('keydown', function (event) {
  if (init === 1 && event.which >= 65 && event.which <= 90) {
    keyPress = event.key.toUpperCase();

    for (let i = 0; i < currentFruit.length; i++) {
      if (keyPress === currentFruit.charAt(i)) {
        emptyWord[i] = keyPress;
        wordDiv.textContent = emptyWord.join(' ');
      }
    }

    if (guessedLetters.indexOf(keyPress) === -1) {
      guessedLetters.push(keyPress);
      guessedDiv.textContent = guessedLetters.join(', ');
      guessesRemaining--;
      guessDiv.innerHTML = `Guess Left: ${guessesRemaining}`;
    }

    // Game end with a win
    if (emptyWord.join('') === currentFruit) {
      winCount++;
      scoreDiv.innerHTML = `Wins: ${winCount} | Losses: ${lossCount}`;
      initializerDiv.innerHTML = `<h5>Congratz! You have won! Click "NEW GAME" button to start a new game..</h5>`;
      init = 0;
    }

    // Game end with a loss
    if (guessesRemaining === 0 && init === 1) {
      lossCount++;
      scoreDiv.innerHTML = `Wins: ${winCount} | Losses: ${lossCount}`;
      initializerDiv.innerHTML = `<h5>Oups! You have lost! Click "NEW GAME" button to start a new game..</h5>`;
      init = 0;
    }
  }
});