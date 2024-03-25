document.addEventListener("DOMContentLoaded", function () {
    const gridSize = 9;
    const solveBtn = document.querySelector(".solve");

    const board = document.querySelector(".grid");

    for (let i = 0; i < gridSize; i++) {
        const newRow = document.createElement("tr");
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.className = "cell";
            input.id = `cell-${i}-${j}`;
            cell.appendChild(input);
            newRow.appendChild(cell);
        }
        board.appendChild(newRow);
    }

    solveBtn.addEventListener('click', solveGrid);
});

solveGrid = async function () {
    const gridSize = 9;

    const gridArray = [];
    for (let i = 0; i < gridSize; i++) {
        gridArray[i] = [];
        for (let j = 0; j < gridSize; j++) {
            const cellValue = document.querySelector(`#cell-${i}-${j}`).value;
            if (cellValue != "") {
                gridArray[i][j] = parseInt(cellValue);
            }
            else {
                gridArray[i][j] = 0;
            }
        }
    }

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.querySelector(`#cell-${i}-${j}`);
            if (gridArray[i][j] != 0) {
                cell.classList.add("user");
            }
        }
    }

    if (solve(gridArray)) {
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const cell = document.querySelector(`#cell-${i}-${j}`);
                if (!cell.classList.contains('user')) {
                    cell.value = gridArray[i][j];
                    cell.classList.add("solved");
                    await sleep(20);
                }
            }
        }
    }
    else {
        alert("No Solution");
    }
}

function solve(board) {
    const gridSize = 9;
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (board[i][j] == 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(i, j, num, board)) {
                        board[i][j] = num;
                        if (solve(board)) {
                            return true;
                        }
                        board[i][j] = 0;
                    }
                }
                return false;
            }
        }
    }

    return true;
}

function isValid(row, col, num, board) {
    const gridSize = 9;

    for (let i = 0; i < gridSize; i++) {
        if (board[row][i] == num || board[i][col] == num) {
            return false;
        }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] == num) {
                return false;
            }
        }
    }

    return true;
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}