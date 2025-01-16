

const gameBoard = document.getElementById("gameBoard");
const winPopup = document.getElementById("winPopup");
const losePopup = document.getElementById("losePopup");

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let totalPairs = 8; // Set the number of pairs

// Initialize the game
function initializeGame() {
  matchedPairs = 0;
  winPopup.classList.remove("show");
  losePopup.classList.remove("show");
  gameBoard.innerHTML = "";

  const cardValues = [...Array(totalPairs).keys(), ...Array(totalPairs).keys()];
  shuffleArray(cardValues);

  cards = cardValues.map(value => createCard(value));
  cards.forEach(card => gameBoard.appendChild(card));
}

// Shuffle the cards
function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
}

// Create a card element
function createCard(value) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">?</div>
      <div class="card-back">${value}</div>
    </div>
  `;
  card.addEventListener("click", () => flipCard(card, value));
  return card;
}

// Flip card logic
function flipCard(card, value) {
  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    flippedCards.push({ card, value });

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

// Check if two flipped cards match
function checkMatch() {
  const [first, second] = flippedCards;

  if (first.value === second.value) {
    matchedPairs++;
    flippedCards = [];

    if (matchedPairs === totalPairs) {
      setTimeout(showWinPopup, 500);
    }
  } else {
    setTimeout(() => {
      first.card.classList.remove("flipped");
      second.card.classList.remove("flipped");
      flippedCards = [];
    }, 1000);
  }
}

// Show win popup
function showWinPopup() {
  winPopup.classList.add("show");
}

// Reset game
function resetGame() {
  initializeGame();
}

// Initialize on load
initializeGame();
