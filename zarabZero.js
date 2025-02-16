// DOM Elements
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const localModeButton = document.getElementById('localMode');
const onlineModeButton = document.getElementById('onlineMode');
const homeButton = document.getElementById('homeButton');
const boxes = document.querySelectorAll('.box');
const infoDisplay = document.querySelector('.info');
const resetButton = document.getElementById('reset');
const gameMessage = document.getElementById('gameMessage');
const winGif = document.getElementById('winGif');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const modalMessage = document.getElementById('modalMessage');
const modalGif = document.getElementById('modalGif');
const modalButton = document.getElementById('modalButton');
const clickSound = document.getElementById('clickSound');
const winSound = document.getElementById('winSound');
const drawSound = document.getElementById('drawSound');

// Game Variables
let currentPlayer = 'X'; // X starts first
let gameState = ['', '', '', '', '', '', '', '', '']; // Represents the 3x3 grid
let gameActive = true; // Tracks if the game is still ongoing

// Winning Conditions
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

// Event Listeners
localModeButton.addEventListener('click', startLocalMultiplayer);
onlineModeButton.addEventListener('click', startOnlineMultiplayer);
homeButton.addEventListener('click', goToHome);
resetButton.addEventListener('click', resetGame);
modalButton.addEventListener('click', closeModal);
boxes.forEach(box => box.addEventListener('click', handleBoxClick));

// Start Local Multiplayer
function startLocalMultiplayer() {
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    resetGame(); // Reset the game state
}

// Start Online Multiplayer (Placeholder)
function startOnlineMultiplayer() {
    alert('Online Multiplayer is coming soon!');
}

// Go to Home Screen
function goToHome() {
    gameScreen.style.display = 'none';
    startScreen.style.display = 'block';
}

// Handle Box Click
function handleBoxClick(event) {
    const clickedBox = event.target;
    const clickedBoxIndex = parseInt(clickedBox.getAttribute('data-index'));

    // Check if the box is already filled or the game is over
    if (gameState[clickedBoxIndex] !== '' || !gameActive) return;

    // Play click sound
    clickSound.play();

    // Update the game state and UI
    gameState[clickedBoxIndex] = currentPlayer;
    clickedBox.textContent = currentPlayer;

    // Check for a winner or draw
    checkForWinner();

    // Switch to the other player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    infoDisplay.textContent = `Turn for ${currentPlayer}`;
}

// Check for Winner
function checkForWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            // If a winning condition is met
            gameMessage.textContent = `Player ${gameState[a]} wins!`;
            winSound.play();
            showModal(`Player ${gameState[a]} wins!`);
            gameActive = false;
            highlightWinningBoxes(condition); // Highlight the winning boxes
            return;
        }
    }

    // Check for a draw
    if (!gameState.includes('')) {
        gameMessage.textContent = 'It\'s a draw! Play again.';
        drawSound.play();
        showModal('It\'s a draw!');
        gameActive = false;
    }
}

// Highlight Winning Boxes
function highlightWinningBoxes(condition) {
    condition.forEach(index => {
        boxes[index].style.backgroundColor = '#a8e6cf'; // Light green background
    });
}

// Show Modal
function showModal(message) {
    modalMessage.textContent = message;
    modal.style.display = 'block';
    overlay.style.display = 'block';

    // Show the appropriate GIF
    if (message.includes('wins')) {
        modalGif.style.display = 'block';
        drawGif.style.display = 'none';
    } else if (message.includes('draw')) {
        modalGif.style.display = 'none';
        drawGif.style.display = 'block';
    }
}

// Close Modal
function closeModal() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    resetGame();
}
// Reset Game
function resetGame() {
    // Reset game state and UI
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    infoDisplay.textContent = `Turn for ${currentPlayer}`;
    gameMessage.textContent = 'Welcome to Zarab Zero!';
    winGif.style.display = 'none';
    boxes.forEach(box => {
        box.textContent = '';
        box.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; // Reset background color
    });
}

// Play Click Sound
function playClickSound() {
    clickSound.currentTime = 0; // Reset the audio to the start
    clickSound.play();
}

// Handle Box Click
function handleBoxClick(event) {
    const clickedBox = event.target;
    const clickedBoxIndex = parseInt(clickedBox.getAttribute('data-index'));

    // Check if the box is already filled or the game is over
    if (gameState[clickedBoxIndex] !== '' || !gameActive) return;

    // Play click sound
    playClickSound();

    // Update the game state and UI
    gameState[clickedBoxIndex] = currentPlayer;
    clickedBox.textContent = currentPlayer;

    // Check for a winner or draw
    checkForWinner();

    // Switch to the other player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    infoDisplay.textContent = `Turn for ${currentPlayer}`;
}