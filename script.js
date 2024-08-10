const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.querySelector('.status-message');
const restartButton = document.getElementById('restartButton');

let isXTurn = true;
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'X' : 'O';

    if (cell.textContent !== '' || !gameActive) {
        return;
    }

    cell.textContent = currentClass;
    if (checkWin(currentClass)) {
        statusMessage.textContent = `${currentClass} Wins!`;
        gameActive = false;
    } else if (isDraw()) {
        statusMessage.textContent = 'Draw!';
        gameActive = false;
    } else {
        isXTurn = !isXTurn;
        statusMessage.textContent = `${isXTurn ? 'X' : 'O'}'s Turn`;
    }
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentClass;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

function restartGame() {
    isXTurn = true;
    gameActive = true;
    cells.forEach(cell => (cell.textContent = ''));
    statusMessage.textContent = 'X\'s Turn';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
