const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const typeOneLetter = document.querySelector("form label");


let word = "magnolia";
let guessedLettersArray = [];
let remainingGuesses = 8;


const getWord = async function () {
  const res = await fetch(
    'https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt'
  );
  const words = await res.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholders(word);
};

// Fire off the game
getWord();


// Add placeholders for each letter in the chosen word.
const placeholders = function (word) {
  const wordLetters = [];
  for (const letter of word) {
    //console.log(letter);
    wordLetters.push("●");
  }
  wordInProgress.innerText = wordLetters.join("");
};


// Click event for the Guess button.
guessButton.addEventListener("click", function (e) {
  e.preventDefault(); // Don't refresh screen.

  // Clear message.
  message.innerText = "";

  // Grab the input.
  const letterGuess = letterInput.value;

  // Validate input.
  const guessCheck = inputValidator(letterGuess);

  // If it's a letter, make a guess.
  if (guessCheck) {
    makeGuess(letterGuess);
  }

  // Clear input.
  letterInput.value = "";

});


// Validate the player's input.
const inputValidator = function (input) {
  const acceptedLetter = /[a-zA-Z]/; // Only letters are accepted.
  
  // Return a message based on input to guide player to enter one letter.
  if (input.length === 0) {
    message.innerText = "Enter a letter to play!";
  } else if (input.length > 1) {
    message.innerText = "Just one, please.  Don't get carried away.";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Dude, those don't make words!  Try a letter.";
  } else {
    return input;
  }
};


// Capture the player's input, preventing duplicate guesses.
const makeGuess = function (letterGuess) {
  letterGuess = letterGuess.toUpperCase();
  if (guessedLettersArray.includes(letterGuess)) {
    message.innerText = "You already guessed that one, silly!";
  } else {
    guessedLettersArray.push(letterGuess);
    console.log(guessedLettersArray);

    updateGuessCount(letterGuess);

    // Display on screen.
    showGuessedLetters();

    updateWord(guessedLettersArray);
  }
};


// Show guessed letters on the screen.
const showGuessedLetters = function () {

  // Empty the ul for the guessed letters.
  guessedLetters.innerHTML = "";

  // For every guessed letter of the array, create a li and add it to the ul.
  for (letter of guessedLettersArray) {
    let li = document.createElement("li");
    li.innerText = letter;
    guessedLetters.append(li);
  }
};


// Update the word in progress to replace circles with correct letters.
const updateWord = function (guessedLettersArray) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];

  // For every correct guessed letter, reveal that letter in the word.
  // Otherwise, keep the circle there.
  for (letter of wordArray) {
    if (guessedLettersArray.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  // Update the empty paragraph where the word will appear.
  wordInProgress.innerText = revealWord.join("");

  // Check for a win!
  checkIfWon();
};


// Update number of remaining guesses and display message.
const updateGuessCount = function (guess) {
  upperWord = word.toUpperCase();

  if (!upperWord.includes(guess)) {
    message.innerText = `Sorry, no ${guess}.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! ${guess} is in it.`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game over... The word was <span class="highlight">${word}</span>.`;
    
    startOver();
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  }
};


// Check to see if the player won!
const checkIfWon = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = '<p class="highlight">You guessed it! 🎉 Congrats!</p>';
    
    startOver();
  }
};


// Start the game over.
const startOver = function () {
  guessButton.classList.add("hide");
  remainingGuessesElement.classList.add("hide");
  guessedLetters.classList.add("hide");
  playAgainButton.classList.remove("hide");
  letterInput.classList.add("hide");
  typeOneLetter.classList.add("hide");
};


// Reset the game.
playAgainButton.addEventListener("click", function () {
  message.classList.remove("win");
  remainingGuesses = 8;
  guessedLettersArray = [];
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  message.innerText = "";
  guessedLetters.innerHTML = "";

  // Grab a new word.
  getWord();

  // Show the right elements.
  guessButton.classList.remove("hide");
  playAgainButton.classList.add("hide");
  remainingGuessesElement.classList.remove("hide");
  guessedLetters.classList.remove("hide");
  letterInput.classList.remove("hide");
  typeOneLetter.classList.remove("hide");
});


