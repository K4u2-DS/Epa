// ============================
// Jogo da Velha (Tic-Tac-Toe)
// ============================

const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const gameArea = document.getElementById('game-area');
const difficultySelect = document.getElementById('difficulty');
const difficultySelectionDiv = document.getElementById('difficulty-selection');
const cells = [];

let gameMode = null;
let botDifficulty = 'easy';
let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const HUMAN_PLAYER = 'X';
const BOT_PLAYER = 'O';

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// ======= Funções de Interface =======
function showDifficultySelection() {
    difficultySelectionDiv.style.display = 'block';
    gameArea.style.display = 'none';
}

function setMode(mode) {
    gameMode = mode;
    if (mode === 'bot') {
        botDifficulty = difficultySelect.value;
        difficultySelectionDiv.style.display = 'none';
    }
    gameArea.style.display = 'block';
    resetGame();
}

function initializeBoard() {
    boardElement.innerHTML = ''; 
    cells.length = 0; 
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleCellClick(i));
        boardElement.appendChild(cell);
        cells.push(cell);
    }
}

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = HUMAN_PLAYER;
    gameActive = true;
    initializeBoard();
    statusElement.textContent = `É a vez do ${currentPlayer}`;
}

// ======= Lógica de Jogo =======
function makeMove(index, player) {
    boardState[index] = player;
    cells[index].textContent = player;
}

function checkWin(board, player) {
    return winningConditions.some(condition => condition.every(index => board[index] === player));
}

function checkResult() {
    if (checkWin(boardState, currentPlayer)) {
        gameActive = false;
        statusElement.textContent = `O Jogador ${currentPlayer} Venceu!`;
        highlightWinningCells(currentPlayer);
        return true;
    }

    if (!boardState.includes('')) {
        gameActive = false;
        statusElement.textContent = `Empate!`;
        return true;
    }

    return false;
}

function highlightWinningCells(player) {
    winningConditions.forEach(condition => {
        if (condition.every(i => boardState[i] === player)) {
            condition.forEach(i => cells[i].style.backgroundColor = '#4CAF50');
        }
    });
}

// ======= Controle de Turnos =======
function handleCellClick(index) {
    if (boardState[index] !== '' || !gameActive || (gameMode === 'bot' && currentPlayer === BOT_PLAYER)) {
        return;
    }

    makeMove(index, currentPlayer);
    if (checkResult()) return;

    currentPlayer = currentPlayer === HUMAN_PLAYER ? BOT_PLAYER : HUMAN_PLAYER;
    statusElement.textContent = `É a vez do ${currentPlayer}`;

    if (gameMode === 'bot' && currentPlayer === BOT_PLAYER) {
        setTimeout(botMove, 500);
    }
}

// ======= Inteligência Artificial (IA) =======
function getAvailableMoves(board) {
    return board.map((v, i) => v === '' ? i : null).filter(v => v !== null);
}

function easyMove(board) {
    const available = getAvailableMoves(board);
    return available[Math.floor(Math.random() * available.length)];
}

function mediumMove(board) {
    for (const move of getAvailableMoves(board)) {
        let newBoard = [...board];
        newBoard[move] = BOT_PLAYER;
        if (checkWin(newBoard, BOT_PLAYER)) return move;
    }

    for (const move of getAvailableMoves(board)) {
        let newBoard = [...board];
        newBoard[move] = HUMAN_PLAYER;
        if (checkWin(newBoard, HUMAN_PLAYER)) return move;
    }

    return easyMove(board);
}

function hardMove(board) {
    const bestMove = minimax([...board], BOT_PLAYER);
    return bestMove.index;
}

function minimax(currentBoard, player) {
    const availableMoves = getAvailableMoves(currentBoard);

    if (checkWin(currentBoard, HUMAN_PLAYER)) return { score: -10 };
    if (checkWin(currentBoard, BOT_PLAYER)) return { score: 10 };
    if (availableMoves.length === 0) return { score: 0 };

    const moves = [];

    for (let i of availableMoves) {
        const move = { index: i };
        currentBoard[i] = player;

        const result = minimax(currentBoard, player === BOT_PLAYER ? HUMAN_PLAYER : BOT_PLAYER);
        move.score = result.score;

        currentBoard[i] = '';
        moves.push(move);
    }

    let bestMove;
    if (player === BOT_PLAYER) {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}

function botMove() {
    let move;
    if (botDifficulty === 'easy') move = easyMove(boardState);
    else if (botDifficulty === 'medium') move = mediumMove(boardState);
    else move = hardMove(boardState);

    if (move !== undefined && gameActive) {
        makeMove(move, BOT_PLAYER);
        if (checkResult()) return;
        currentPlayer = HUMAN_PLAYER;
        statusElement.textContent = `É a vez do ${currentPlayer}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    statusElement.textContent = "Selecione um modo de jogo para começar.";
});
