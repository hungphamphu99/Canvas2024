const gameBoard = document.getElementById('game-board');
const M = 3; 
const N = 4; 
const totalTiles = M * N;
let tiles = [];
let firstTile = null;
let secondTile = null;
let canClick = true;

// Define image paths (at least totalTiles / 2 unique images are needed)
const imagePaths = [
    'assets/images/01.png',
    'assets/images/02.png',
    'assets/images/03.png',
    'assets/images/04.png',
    'assets/images/05.png',
    'assets/images/06.png',
    'assets/images/07.png',
    'assets/images/08.png'
];

// Function to create a 2D array of image paths with pairs
function createImageGrid(M, N, imagePaths) {
    if (M * N % 2 !== 0) throw new Error("Grid size must be even.");

    // Check unique pair
    const requiredPairs = (M * N) / 2;
    if (imagePaths.length < requiredPairs) {
        throw new Error(`Need at least ${requiredPairs} unique images.`);
    }

    // Duplicate and shuffle pairs
    let pairedImages = [...imagePaths.slice(0, requiredPairs), ...imagePaths.slice(0, requiredPairs)];
    pairedImages.sort(() => Math.random() - 0.5);

    // Convert to 2D array
    const imageGrid = [];
    for (let i = 0; i < M; i++) {
        imageGrid[i] = [];
        for (let j = 0; j < N; j++) {
            imageGrid[i][j] = pairedImages[i * N + j];
        }
    }
    return imageGrid;
}

// Initialize the game board
function initializeGameBoard(M, N) {
    gameBoard.innerHTML = ''; 
    gameBoard.style.gridTemplateColumns = `repeat(${N}, 100px)`;
    tiles = [];

    const imageGrid = createImageGrid(M, N, imagePaths);
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');

            const img = document.createElement('img');
            img.src = imageGrid[i][j];
            img.style.display = 'none';
            tile.appendChild(img);

            tile.addEventListener('click', () => revealTile(i, j));

            tiles.push({ element: tile, image: img, matched: false });
            gameBoard.appendChild(tile);
        }
    }
}

// Function to reveal a tile
function revealTile(row, col) {
    const index = row * N + col;
    const tile = tiles[index];

    if (!canClick || tile.matched || tile.image.style.display === 'block') return;

    tile.image.style.display = 'block';

    if (!firstTile) {
        firstTile = tile;
    } else if (!secondTile) {
        secondTile = tile;
        canClick = false;
        setTimeout(checkMatch, 500);
    }
}

// Function to check if two revealed tiles match
function checkMatch() {
    if (firstTile.image.src === secondTile.image.src) {
        firstTile.matched = true;
        secondTile.matched = true;
        resetTiles();
    } else {
        setTimeout(() => {
            firstTile.image.style.display = 'none';
            secondTile.image.style.display = 'none';
            resetTiles();
        }, 1000);
    }
}

// Reset selected tiles and allow clicking again
function resetTiles() {
    firstTile = null;
    secondTile = null;
    canClick = true;
    checkGameCompletion();
}

// Check if all tiles are matched
function checkGameCompletion() {
    if (tiles.every(tile => tile.matched)) {
        setTimeout(() => alert('Congratulations! You matched all the faces!'), 500);
    }
}

// Start the game
initializeGameBoard(M, N);
