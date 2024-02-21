const ticTacToeGame = (function () {
    const newGameButton = document.getElementById("new-game");
    const gridSquares = document.querySelectorAll(".cell");
    const turnIndicator = document.getElementById("current-turn");

    const gameBoard = [[".", ".", "."], [".", ".", "."], [".", ".", "."]];
    let playerState = "x";
    let turns = 0;

    const newGame = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                gameBoard[i][j] = ".";
            }
        }
        playerState = "x";
        turnIndicator.src = "./images/close.svg";
        turns = 0;
        gridSquares.forEach((square) => square.querySelector("img").src = "");
        gridSquares.forEach((square) => square.addEventListener("click", handleCellClick));
        gridSquares.forEach((square) => square.classList.remove("win"));
    };

    const handleCellClick = (event) => {
        if (event.target.tagName.toUpperCase() === "DIV") {
            handlePlayerChoice(event);
        }
        else if (event.target.tagName.toUpperCase() === "IMG") {
            console.log("Position already taken. Try again.");
            event.target.parentNode.style.backgroundColor = "red";
            setTimeout(function () {event.target.parentNode.style.backgroundColor = ""}, 500);
        }
        else {
            console.log(`O.o wat this should not have happened ${event.target}`);
        }
    }

    const handlePlayerChoice = (event) => {
        const cellClasses = event.target.className.split(" ");
        let row = cellClasses[1].charAt(cellClasses[1].length - 1);
        let col = cellClasses[2].charAt(cellClasses[2].length - 1);

        if (gameBoard[row][col] === ".") {
            drawShape(event);
            turns++;
            gameBoard[row][col] = playerState;
            let gameState = checkWinner(row, col);

            if (gameState[0] === "WINNER") {
                console.log(`${playerState} wins.`);
                gridSquares.forEach((square) => square.removeEventListener("click", handleCellClick));
                highlightWinner(gameState[1], row, col);
                return;
            }
            else if (gameState[0] === "DRAW") {
                console.log("It's a draw.");
                gridSquares.forEach((square) => square.removeEventListener("click", handleCellClick));
                return;
            }
            else if (gameState[0] === "ONGOING") {
                if (playerState === "x") {
                    playerState = "o";
                    turnIndicator.src = "./images/circle-outline.svg";
                }
                else {
                    playerState = "x";
                    turnIndicator.src = "./images/close.svg";
                }
            }
        }
        else {
            console.log("Position already taken. Try again.");
        }
    };

    const displayBoard = () => {
        console.log("  1 2 3");
        for (let i = 0; i < 3; i++) {
            console.log(`${i + 1} ${gameBoard[i].join(" ")}`);
        }
    };

    const checkWinner = (row, col) => {
        for (let i = 0; i < 3; i++) {
            if (gameBoard[row][i] !== playerState) {
                break;
            }
            if (i == 2) {
                return ["WINNER", "ROW"];
            }
        }

        for (let i = 0; i < 3; i++) {
            if (gameBoard[i][col] !== playerState) {
                break;
            }
            if (i == 2) {
                return ["WINNER", "COLUMN"];
            }
        }

        if (row === col) {
            for (let i = 0; i < 3; i++) {
                if (gameBoard[i][i] !== playerState) {
                    break;
                }
                if (i == 2) {
                    return ["WINNER", "DIAGONAL"];
                }
            }
        }

        if (parseInt(row) + parseInt(col) === 2) {
            for (let i = 0; i < 3; i++) {
                if (gameBoard[i][2 - i] !== playerState) {
                    break;
                }
                if (i == 2) {
                    return ["WINNER", "ANTIDIAGONAL"];
                }
            }
        }

        if (turns >= 9) {
            return ["DRAW"];
        }

        return ["ONGOING"];
    };

    const highlightWinner = (type, row, col) => {
        let winningLine;

        switch (type) {
            case "ROW":
                winningLine = document.querySelectorAll(`.row-${row}`);
                break;
            case "COLUMN":
                winningLine = document.querySelectorAll(`.col-${col}`);
                break;
            case "DIAGONAL":
                winningLine = document.querySelectorAll(".row-0.col-0, .row-1.col-1, .row-2.col-2");
                break;
            case "ANTIDIAGONAL":
                winningLine = document.querySelectorAll(".row-0.col-2, .row-1.col-1, .row-2.col-0");
                break;
            default:
                console.log("O.o what issue in highlighting winning line");
        }
        winningLine.forEach((square) => square.style.backgroundColor = "white");
        winningLine.forEach((square) => square.style.backgroundColor = "");
        winningLine.forEach((square) => square.classList.add("win"));
    };

    const drawShape = (event) => {
        if (playerState === "x") {
            event.target.querySelector("img").src = "./images/close.svg";
        }
        else {
            event.target.querySelector("img").src = "./images/circle-outline.svg";
        }
    }

    newGameButton.addEventListener("click", newGame);
    newGame();

    return {newGame, displayBoard};
})();