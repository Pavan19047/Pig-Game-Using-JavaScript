'use strict'
const score0El = document.querySelector('#score--0')
const score1El = document.getElementById('score--1')

const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')

const diceEl = document.querySelector('.dice')

const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

let scores, currentScore, activePlayer, playing

const init = () => {
  scores = [0, 0]
  currentScore = 0
  activePlayer = 0
  playing = true

  score0El.textContent = score1El.textContent = 0
  current0El.textContent = current1El.textContent = 0
  diceEl.classList.add('hidden')
  player0El.classList.remove('player--winner')
  player1El.classList.remove('player--winner')
  player0El.classList.add('player--active')
  player1El.classList.remove('player--active')


  // player0El.classList.remove('player-winner')
  // player1El.classList.remove('player-winner')

  // // Set the active player
  // player0El.classList.add('player-active')
  // player1El.classList.remove('player-active')
}
init()

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0
  activePlayer = activePlayer === 0 ? 1 : 0
  currentScore = 0
  player0El.classList.toggle('player--active')
  player1El.classList.toggle('player--active')
}

score0El.textContent = score1El.textContent = 0
diceEl.classList.add('hidden')

const rollDice = () => {
  if (playing) {
    const roll = Math.trunc(Math.random() * 6) + 1

    diceEl.classList.remove('hidden')
    diceEl.src = `./images/dice-${roll}.png`

    if (roll !== 1) {
      currentScore += roll
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore
    } else {
      switchPlayer()
    }
  }
}

const addScore = () => {
  if (playing) {
    scores[activePlayer] += currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]
    if (scores[activePlayer] >= 20) {
      playing = false
      diceEl.classList.add('hidden')
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner')
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active')
    } else {
      switchPlayer()
    }
  }
}

btnRoll.addEventListener('click', rollDice)
btnHold.addEventListener('click', addScore)
btnNew.addEventListener('click', init)
