const rows = 3; 
const columns = 4; 

// Ensure we have enough pairs of images for the grid size
const totalCards = rows * columns;
if (totalCards % 2 !== 0) {
    throw new Error("The grid must have an even number of cells.");
}

const images = [
    { name: 'A', path: './assets/img/01.png' },
    { name: 'B', path: './assets/img/02.png' },
    { name: 'C', path: './assets/img/03.png' },
    { name: 'D', path: './assets/img/04.png' },
    { name: 'E', path: './assets/img/05.png' },
    { name: 'F', path: './assets/img/06.png' },
    { name: 'G', path: './assets/img/07.png' },
    { name: 'H', path: './assets/img/08.png' },
    // Add more images if needed
];

// Select enough pairs for the grid and duplicate them
const cardImages = [...images.slice(0, totalCards / 2), ...images.slice(0, totalCards / 2)];
cardImages.sort(() => Math.random() - 0.5); // Shuffle cards

const gameBoard = document.getElementById('game-board');
gameBoard.style.gridTemplateColumns = `repeat(${columns}, 100px)`; // Set dynamic columns in CSS

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Create card elements
cardImages.forEach(image => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src="${image.path}" alt="${image.name}" />
            </div>
            <div class="card-back"></div>
        </div>
    `;
    card.dataset.name = image.name;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
});

// Flip card function
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

// Check if cards match
function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

// Disable matched cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

// Unflip unmatched cards
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Reset board for next turn
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}
