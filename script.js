"use strict";

// Selecting elements from the DOM
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Declaration of variables to keep track of scores, the current score, the active player, and the game state
let scores, currentScore, activePlayer, playing;

// Initialization function to reset the game to its starting state
const init = function () {
     scores = [0, 0];
     currentScore = 0;
     activePlayer = 0;
     playing = true;
  
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    
    diceEl.classList.add("hidden");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
};
// Calling the init function to start the game
init(); 

// Function to switch the active player
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
// Event listener for the Roll Dice button
btnRoll.addEventListener("click", function () {
  // Checking if the game is still ongoing
  if (playing) {
    // Generating a random dice roll between 1 and 6
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    diceEl.classList.remove("hidden");
    // Updating the dice image according to the roll
    diceEl.src = `./pictures/dice-${dice}.png`;

    // If dice roll is not 1, add it to the current score
    if (dice !== 1) {
      // Add dice current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // If dice roll is 1, switch to the next player
      switchPlayer();
    }
  }
});

// Event listener for the Hold button
btnHold.addEventListener("click", function () {
  if (playing) {
    // Add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // If the active player's score is 20 or more, they win
    if (scores[activePlayer] >= 20) {
      // Finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      // else, switch to the next player
    } else {
      switchPlayer();
    }
  }
});

// Event listener for the New Game button
btnNew.addEventListener("click", function () {
  // Reset the game to its initial state
  init();
});
