'use strict';

//selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  //reset current score
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  //change active player within code
  activePlayer = activePlayer === 0 ? 1 : 0;

  //change aesthetics
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const hideDice = function () {
  diceEl.classList.add('hidden');
};

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      //current0El.textContent = currentScore; //change later
    } else {
      switchPlayer();
    }
  }
});

//holding score functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if score >= 100 finish game
    if (scores[activePlayer] >= 100) {
      playing = false;

      //hide the dice
      hideDice();

      //add the winner class to the player class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      //remove the active player from the winning player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

//new game functionality
btnNew.addEventListener('click', init);
