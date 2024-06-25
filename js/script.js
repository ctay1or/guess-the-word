const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining")
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

//Add placeholders for each letter in chosen word.
const placeholders = function (word) {
    const wordLetters = [];
    for (const letter of word) {
        console.log(letter);
        wordLetters.push("●");
    }
    wordInProgress.innerText = wordLetters.join("");
};
placeholders(word);


//Click event listener for the Guess button.
const buttonClick = document.addEventListener("click", function (e) {
    e.preventDefault();
    const letterGuess = letterInput.value;
    console.log(letterGuess);
    letterInput.value = "";
});
