const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLettersArray = [];

// Add placeholders for each letter in the chosen word.
const placeholders = function (word) {
  const wordLetters = [];
  for (const letter of word) {
    //console.log(letter);
    wordLetters.push("●");
  }
  wordInProgress.innerText = wordLetters.join("");
};
placeholders(word);


// Click event for the Guess button.
const guessButtonClick = document.addEventListener("click", function (e) {
  e.preventDefault();
  const letterGuess = letterInput.value;
  console.log(letterGuess);

  // Validate input.
  const guessCheck = inputValidator(letterGuess);

  // Clear message.
  message.innerText = "";

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
    message.innerText = "Just one, please. Don't get carried away.";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Those don't spell words, silly!";
  } else {
    return input;
  }
};


// Capture the player's input, preventing duplicate guesses.
const makeGuess = function (letterGuess) {
  letterGuess = letterGuess.toUpperCase();
  if (guessedLettersArray.includes(letterGuess)) {
    message.innerText = "You already guessed that one, silly. Try again.";
  } else {
    guessedLettersArray.push(letterGuess);
    console.log(guessedLettersArray);
  }
};